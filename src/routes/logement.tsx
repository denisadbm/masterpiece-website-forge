import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "@/components/site-layout";
import { DetailList } from "@/components/service-sections";
import housingImage from "@/assets/housing-care.jpg";

export const Route = createFileRoute("/logement")({ head: () => ({ meta: [
  { title: "Logement et hébergement en Tunisie — LASISTANT.PRO" }, { name: "description", content: "Recherche de logement selon votre ville, vos dates, votre budget et vos besoins en Tunisie." }, { property: "og:title", content: "Logement et hébergement — LASISTANT.PRO" }, { property: "og:description", content: "Une recherche de logement adaptée à votre séjour en Tunisie." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/logement" },
], links: [{ rel: "canonical", href: "/logement" }] }), component: HousingPage });

function HousingPage() { return <><PageHero eyebrow="Logement & hébergement" title="Trouver un lieu adapté à votre séjour." intro="Nous recherchons avec vous une solution cohérente avec votre destination, la durée de votre séjour, votre budget et vos priorités."><Button asChild size="lg" className="rounded-full"><Link to="/reservation">Lancer ma recherche <ArrowRight /></Link></Button></PageHero><section className="page-shell section-space grid gap-12 md:grid-cols-2 md:items-center"><div><p className="eyebrow">Une recherche personnalisée</p><h2 className="mt-4 text-3xl font-semibold">Les bons critères, dès le départ.</h2><div className="mt-7"><DetailList items={["Ville, quartier et proximité des lieux importants.","Dates d’arrivée et durée prévisionnelle du séjour.","Budget et type de logement recherché.","Accessibilité, mobilité et besoins particuliers.","Échanges facilités avec agences, responsables ou propriétaires."]}/></div></div><img src={housingImage} alt="Une conseillère présente une solution de logement" width="1200" height="912" className="aspect-[4/3] rounded-md object-cover"/></section><CtaBand /></> }