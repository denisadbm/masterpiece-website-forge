import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "@/components/site-layout";
import { ProcessSteps, ServiceGrid } from "@/components/service-sections";

export const Route = createFileRoute("/services")({ head: () => ({ meta: [
  { title: "Nos services — LASISTANT.PRO" }, { name: "description", content: "Assistance médicale, recherche de logement et accompagnement humain en Tunisie." },
  { property: "og:title", content: "Nos services — LASISTANT.PRO" }, { property: "og:description", content: "Découvrez nos trois offres d’accompagnement personnalisé en Tunisie." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/services" },
], links: [{ rel: "canonical", href: "/services" }] }), component: ServicesPage });

function ServicesPage() { return <>
  <PageHero eyebrow="Nos services" title="Une présence fiable pour organiser l’essentiel." intro="Chaque accompagnement commence par l’écoute de votre situation. Nous coordonnons ensuite les démarches utiles, avec clarté et attention."><Button asChild size="lg" className="rounded-full"><Link to="/reservation">Faire une demande <ArrowRight /></Link></Button></PageHero>
  <section className="page-shell section-space"><ServiceGrid /></section>
  <section className="bg-surface-strong"><div className="page-shell section-space"><p className="eyebrow">Comment ça se passe</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-5xl">Une organisation lisible, du premier échange au séjour.</h2><div className="mt-12"><ProcessSteps /></div></div></section>
  <CtaBand />
  </> }