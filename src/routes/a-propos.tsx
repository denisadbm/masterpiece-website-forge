import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Ear, Handshake, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHero } from "@/components/site-layout";
import companionImage from "@/assets/companion-care.jpg";

export const Route = createFileRoute("/a-propos")({ head: () => ({ meta: [
  { title: "À propos — LASISTANT.PRO" }, { name: "description", content: "Découvrez la mission et l’approche humaine de LASISTANT.PRO en Tunisie." }, { property: "og:title", content: "À propos — LASISTANT.PRO" }, { property: "og:description", content: "Une mission : rendre vos démarches plus simples et votre séjour plus serein." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/a-propos" },
], links: [{ rel: "canonical", href: "/a-propos" }] }), component: AboutPage });

function AboutPage() { return <>
  <PageHero eyebrow="À propos" title="Rendre chaque parcours plus simple, plus clair, plus humain." intro="LASISTANT.PRO est née d’une conviction : lorsqu’on arrive dans un nouvel environnement, une présence attentive peut tout changer." />
  <section className="page-shell section-space grid gap-12 md:grid-cols-2 md:items-center"><img src={companionImage} alt="Une relation d’accompagnement fondée sur la confiance" width="1200" height="912" className="aspect-[4/3] w-full rounded-md object-cover"/><div><p className="eyebrow">Notre mission</p><h2 className="mt-4 text-3xl font-semibold md:text-4xl">Créer des repères là où les démarches peuvent sembler complexes.</h2><p className="mt-6 leading-8 text-muted-foreground">Nous accueillons chaque demande avec attention, puis mobilisons notre connaissance du terrain et notre réseau de partenaires pour faciliter le séjour. Notre rôle est d’écouter, d’organiser et d’orienter — jamais de nous substituer aux professionnels de santé.</p><Button asChild variant="outline" className="mt-7 rounded-full"><Link to="/contact">Nous contacter <ArrowRight /></Link></Button></div></section>
  <section className="bg-surface-strong"><div className="page-shell section-space"><p className="eyebrow">Nos valeurs</p><div className="mt-10 grid gap-8 md:grid-cols-3">{[[Ear,"Écouter avant d’agir"],[Heart,"Prendre soin du lien"],[Handshake,"Travailler en confiance"]].map(([Icon,title]) => { const ItemIcon = Icon as typeof Ear; return <div key={title as string} className="border-t border-border pt-6"><ItemIcon className="h-7 w-7 text-brand-purple"/><h3 className="mt-5 text-xl font-semibold">{title as string}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Une approche respectueuse, personnalisée et attentive aux réalités de chaque personne.</p></div>})}</div></div></section>
  <CtaBand />
  </> }