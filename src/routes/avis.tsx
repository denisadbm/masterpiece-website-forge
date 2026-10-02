import { createFileRoute } from "@tanstack/react-router";
import { ReviewForm, ReviewsPreview } from "@/components/customer-reviews";
import { PageHero } from "@/components/site-layout";

export const Route = createFileRoute("/avis")({
  head: () => ({ meta: [
    { title: "Avis clients — LASISTANT.PRO" },
    { name: "description", content: "Consultez les témoignages vérifiés et partagez votre expérience avec LASISTANT.PRO." },
    { property: "og:title", content: "Avis clients — LASISTANT.PRO" },
    { property: "og:description", content: "Des expériences authentiques pour choisir votre accompagnement en confiance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "/avis" },
  ], links: [{ rel: "canonical", href: "/avis" }] }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return <><PageHero eyebrow="Votre expérience compte" title="Des avis utiles, sincères et vérifiés." intro="Partagez votre expérience avec LASISTANT.PRO. Chaque témoignage est relu avant publication pour garantir un espace fiable et respectueux." /><section className="page-shell py-12 md:py-18"><div className="mx-auto max-w-2xl"><ReviewForm /></div></section><ReviewsPreview /></>;
}