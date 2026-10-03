import { useState, type FormEvent } from "react";
import { Sparkles, WandSparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getServiceRecommendation } from "@/lib/service-advisor.functions";

function renderRecommendation(text: string) {
  return text.split("\n").map((line, index) => {
    const cleanLine = line.replace(/\*\*/g, "").trim();
    if (!cleanLine) return <span key={index} className="block h-2" />;
    if (cleanLine.startsWith("### ")) return <h3 key={index} className="mt-4 font-display text-base font-semibold text-primary first:mt-0">{cleanLine.slice(4)}</h3>;
    if (/^\d+\.\s/.test(cleanLine)) return <p key={index} className="pl-5 text-sm leading-7"><span className="-ml-5 mr-2 font-bold text-primary">{cleanLine.match(/^\d+\./)?.[0]}</span>{cleanLine.replace(/^\d+\.\s*/, "")}</p>;
    return <p key={index} className="text-sm leading-7 text-foreground">{cleanLine}</p>;
  });
}

const serviceDestinations = [
  { label: "Assistance médicale", path: "/assistance-medicale" as const, terms: ["assistance médicale", "médical", "soins"] },
  { label: "Logement / hébergement", path: "/logement" as const, terms: ["logement", "hébergement"] },
  { label: "Accompagnement des malades", path: "/accompagnement" as const, terms: ["accompagnement des malades", "accompagnement", "personne âgée"] },
];

export function ServiceAdvisor({ initialDescription = "" }: { initialDescription?: string }) {
  const recommend = useServerFn(getServiceRecommendation);
  const [description, setDescription] = useState(initialDescription);
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setRecommendation("");
    if (description.trim().length < 20) {
      setError("Décrivez votre besoin en au moins 20 caractères pour recevoir un conseil utile.");
      return;
    }
    setLoading(true);
    try {
      const result = await recommend({ data: { description: description.trim() } });
      setRecommendation(result.recommendation);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Le conseiller est temporairement indisponible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-border bg-surface-strong p-5 md:p-8" aria-labelledby="advisor-title">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles className="h-5 w-5" /></span>
        <div><p className="eyebrow">Conseiller intelligent</p><h2 id="advisor-title" className="mt-2 text-2xl font-semibold">Quel accompagnement vous conviendrait ?</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Décrivez votre situation. Lovable AI vous indiquera les services pertinents et les prochaines étapes possibles.</p></div>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <label htmlFor="advisor-description" className="text-sm font-bold">Votre besoin</label>
        <Textarea id="advisor-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={6} maxLength={2000} placeholder="Exemple : Je viens en Tunisie avec ma mère pour un rendez-vous médical et nous cherchons un logement proche, accessible et calme…" aria-describedby="advisor-help advisor-error" />
        <div id="advisor-help" className="flex justify-between gap-3 text-xs text-muted-foreground"><span>Ne partagez pas de données médicales sensibles.</span><span>{description.length}/2000</span></div>
        {error && <p id="advisor-error" role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={loading} className="h-11 justify-self-start rounded-full px-6">{loading ? "Analyse en cours…" : "Obtenir ma recommandation"} <WandSparkles /></Button>
      </form>
      {recommendation && <div className="mt-6 rounded-md border border-primary/20 bg-card p-5" role="status" aria-live="polite"><p className="font-display font-semibold text-primary">Votre recommandation</p><div className="mt-3">{renderRecommendation(recommendation)}</div><div className="mt-6 border-t border-border pt-5"><p className="text-sm font-bold">Poursuivre avec le service conseillé</p><div className="mt-3 flex flex-wrap gap-2">{serviceDestinations.filter((service) => service.terms.some((term) => recommendation.toLocaleLowerCase("fr").includes(term))).map((service) => <div key={service.path} className="flex flex-wrap gap-2"><Button asChild size="sm" variant="outline"><Link to={service.path}>Voir {service.label.toLocaleLowerCase("fr")}</Link></Button><Button asChild size="sm"><Link to="/reservation" search={{ service: service.label, besoin: description }}>Réserver ce service</Link></Button></div>)}</div></div></div>}
    </section>
  );
}