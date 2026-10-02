import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createLovableAiGatewayRunIdFetch } from "./ai-run-id.server.ts";

const SYSTEM_PROMPT = `Tu es le conseiller d'orientation de LASISTANT.PRO en Tunisie.
À partir du besoin décrit, recommande uniquement parmi ces services : assistance médicale, logement/hébergement, accompagnement des malades.
Réponds en français avec :
1. "Service conseillé" et un service principal, éventuellement un service complémentaire.
2. "Pourquoi" en deux phrases maximum.
3. "Prochaines étapes" avec exactement trois actions concrètes.
4. Une courte phrase rappelant que LASISTANT.PRO facilite les démarches et ne remplace pas un professionnel de santé.
Ne pose aucun diagnostic, ne promets aucun résultat médical, n'invente ni tarif ni disponibilité. Reste rassurant, précis et concis.`;

function safeGatewayMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    if (error.message.includes("402")) return "Le conseiller est temporairement indisponible faute de crédits Lovable AI.";
    if (error.message.includes("403")) return "Le conseiller est momentanément désactivé pour cet espace.";
    if (error.message.includes("429")) return "Le conseiller reçoit beaucoup de demandes. Réessayez dans quelques instants.";
  }
  return "Le conseiller n’a pas pu préparer une recommandation. Vous pouvez réessayer ou nous contacter directement.";
}

export async function recommendServices(description: string) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) throw new Error("Le conseiller n’est pas encore configuré.");

  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: SYSTEM_PROMPT,
      prompt: description,
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    const text = await result.text;
    if (!text.trim()) throw new Error("Réponse vide");
    return { recommendation: text.trim(), runId: runIdFetch.getRunId() };
  } catch (error) {
    throw new Error(safeGatewayMessage(error));
  }
}