import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site-layout";
import { ProcessSteps, ServiceGrid } from "@/components/service-sections";
import { articles } from "@/lib/site-content";
import heroImage from "@/assets/hero-care.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "LASISTANT.PRO — Votre séjour en Tunisie, accompagné avec attention" },
    { name: "description", content: "Assistance médicale, logement et accompagnement humain pour préparer votre séjour en Tunisie avec sérénité." },
    { property: "og:title", content: "LASISTANT.PRO — Un accompagnement humain en Tunisie" },
    { property: "og:description", content: "Une présence attentive pour vos démarches médicales, votre logement et votre séjour." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "/" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: HomePage,
});

function HomePage() {
  return <>
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-footer text-footer-foreground md:min-h-[720px]">
      <img src={heroImage} alt="Une accompagnatrice accueille chaleureusement une famille en Tunisie" width="1920" height="1280" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--footer)_0%,color-mix(in_oklab,var(--footer)_85%,transparent)_45%,color-mix(in_oklab,var(--footer)_20%,transparent)_100%)]" />
      <div className="page-shell relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-16 md:min-h-[720px]">
        <div className="max-w-3xl reveal">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-secondary">Présence • écoute • orientation</p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-normal sm:text-5xl md:text-7xl">Votre séjour en Tunisie, accompagné avec attention.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-footer-muted md:text-lg">De la préparation de vos démarches à votre arrivée, LASISTANT.PRO vous aide à avancer avec des repères clairs et une présence humaine.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-6"><Link to="/reservation">Parler de mon besoin <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-footer-muted bg-transparent px-6 text-footer-foreground hover:bg-footer-foreground hover:text-footer"><Link to="/services">Découvrir nos services</Link></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space page-shell">
      <div className="mb-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div><p className="eyebrow">Notre accompagnement</p><h2 className="mt-4 text-3xl font-semibold md:text-5xl">À chaque besoin, une réponse coordonnée.</h2></div>
        <p className="max-w-xl text-base leading-8 text-muted-foreground md:justify-self-end">Un seul interlocuteur pour comprendre votre situation, faciliter vos démarches et vous orienter vers les bons professionnels.</p>
      </div>
      <ServiceGrid />
    </section>

    <section className="bg-surface-strong">
      <div className="page-shell section-space">
        <p className="eyebrow">Une méthode simple</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-5xl">Avancer sans vous sentir seul.</h2>
        <div className="mt-12"><ProcessSteps /></div>
      </div>
    </section>

    <section className="page-shell section-space grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
      <div><p className="eyebrow">Nos engagements</p><h2 className="mt-4 text-3xl font-semibold md:text-5xl">L’humain avant tout.</h2></div>
      <div className="grid gap-5 sm:grid-cols-3">
        {[[Heart,"Écoute","Votre situation est considérée avec attention."],[ShieldCheck,"Discrétion","Vos échanges sont traités avec respect."],[BadgeCheck,"Clarté","Chaque démarche vous est expliquée simplement."]].map(([Icon,title,text]) => { const ItemIcon = Icon as typeof Heart; return <div key={title as string} className="border-t border-border pt-5"><ItemIcon className="h-6 w-6 text-brand-purple"/><h3 className="mt-4 font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p></div> })}
      </div>
    </section>

    <section className="border-t border-border bg-card"><div className="page-shell section-space"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Espace infos</p><h2 className="mt-4 text-3xl font-semibold md:text-4xl">Des repères pour mieux préparer.</h2></div><Button asChild variant="outline"><Link to="/actualites">Voir tous les conseils <ArrowRight /></Link></Button></div><div className="mt-10 grid gap-6 md:grid-cols-3">{articles.map((article) => <article key={article.title}><img src={article.image} alt="" width="1200" height="912" loading="lazy" className="aspect-[16/10] w-full rounded-md object-cover"/><p className="eyebrow mt-5">{article.category}</p><h3 className="mt-3 text-xl font-semibold">{article.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{article.excerpt}</p></article>)}</div></div></section>
    <CtaBand />
  </>;
}