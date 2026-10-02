import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "@/components/site-layout";
import { DetailList } from "@/components/service-sections";
import companionImage from "@/assets/companion-care.jpg";

export const Route = createFileRoute("/accompagnement")({ head: () => ({ meta: [
  { title: "Accompagnement des malades en Tunisie — LASISTANT.PRO" }, { name: "description", content: "Accueil et accompagnement humain des malades et personnes âgées pendant leur séjour en Tunisie." }, { property: "og:title", content: "Accompagnement des malades — LASISTANT.PRO" }, { property: "og:description", content: "Une présence rassurante, attentive au confort et au rythme de chacun." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/accompagnement" },
], links: [{ rel: "canonical", href: "/accompagnement" }] }), component: CompanionPage });

function CompanionPage() { return <><PageHero eyebrow="Accompagnement des malades" title="Une présence humaine qui rassure." intro="Parce qu’un séjour loin de ses repères peut être éprouvant, nous veillons à offrir écoute, attention et continuité dans l’accompagnement."><Button asChild size="lg" className="rounded-full"><Link to="/reservation">Échanger avec nous <ArrowRight /></Link></Button></PageHero><section className="page-shell section-space grid gap-12 md:grid-cols-2 md:items-center"><img src={companionImage} alt="Accompagnement attentif d’une personne âgée" width="1200" height="912" className="aspect-[4/3] rounded-md object-cover"/><div><p className="eyebrow">À vos côtés</p><h2 className="mt-4 text-3xl font-semibold">Une attention adaptée à chaque personne.</h2><div className="mt-7"><DetailList items={["Accueil et création de repères à l’arrivée.","Présence attentive pendant les étapes du séjour.","Accompagnement adapté aux personnes âgées.","Prise en compte du confort, du rythme et de la mobilité.","Lien régulier avec les proches lorsque cela est souhaité."]}/></div></div></section><CtaBand /></> }