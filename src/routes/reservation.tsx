import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHero } from "@/components/site-layout";
import { RequestForm } from "@/components/request-form";
import { ServiceAdvisor } from "@/components/service-advisor";

export const Route = createFileRoute("/reservation")({ validateSearch: z.object({ service: z.string().optional().catch(undefined), besoin: z.string().optional().catch(undefined) }), head: () => ({ meta: [
  { title: "Demande d’accompagnement — LASISTANT.PRO" }, { name: "description", content: "Présentez votre besoin à LASISTANT.PRO en quelques étapes simples." }, { property: "og:title", content: "Demande d’accompagnement — LASISTANT.PRO" }, { property: "og:description", content: "Assistance médicale, logement ou accompagnement : préparez votre demande." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/reservation" },
], links: [{ rel: "canonical", href: "/reservation" }] }), component: ReservationPage });

function ReservationPage() { const search = Route.useSearch(); return <><PageHero eyebrow="Demande d’accompagnement" title="Parlez-nous de votre situation." intro="Quelques informations nous aideront à comprendre votre besoin. Aucun paiement n’est demandé dans ce parcours."/><section className="page-shell py-12 md:py-18"><div className="mx-auto grid max-w-3xl gap-8"><ServiceAdvisor initialDescription={search.besoin ?? ""} /><RequestForm initialService={search.service} initialMessage={search.besoin} /></div></section></> }