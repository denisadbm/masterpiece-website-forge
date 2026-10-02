import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-layout";
import { articles } from "@/lib/site-content";

export const Route = createFileRoute("/actualites")({ head: () => ({ meta: [
  { title: "Espace infos — LASISTANT.PRO" }, { name: "description", content: "Conseils pratiques pour préparer un séjour médical, un logement ou un accompagnement en Tunisie." }, { property: "og:title", content: "Espace infos — LASISTANT.PRO" }, { property: "og:description", content: "Des repères simples pour mieux préparer chaque étape de votre séjour." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: "/actualites" },
], links: [{ rel: "canonical", href: "/actualites" }] }), component: InfoPage });

function InfoPage() { return <><PageHero eyebrow="Espace infos" title="Des conseils utiles, sans jargon." intro="Des repères pratiques pour anticiper votre séjour et avancer avec davantage de sérénité."/><section className="page-shell section-space"><div className="grid gap-8 md:grid-cols-3">{articles.map((article) => <article key={article.title} className="overflow-hidden rounded-lg border border-border bg-card"><img src={article.image} alt="" width="1200" height="912" className="aspect-[4/3] w-full object-cover"/><div className="p-6"><p className="eyebrow">{article.category}</p><h2 className="mt-3 text-xl font-semibold">{article.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{article.excerpt}</p><Button asChild variant="link" className="mt-4 h-auto p-0"><Link to="/contact">Poser une question <ArrowRight /></Link></Button></div></article>)}</div></section></> }