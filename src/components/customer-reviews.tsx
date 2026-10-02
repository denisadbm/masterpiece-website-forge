import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, MessageSquareQuote, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Review = {
  id: string;
  display_name: string;
  rating: number;
  comment: string;
  service: string | null;
  created_at: string;
};

const services = ["Assistance médicale", "Logement / hébergement", "Accompagnement des malades"];

function RatingStars({ value, interactive = false, onChange }: { value: number; interactive?: boolean; onChange?: (value: number) => void }) {
  return <div className="flex gap-1" aria-label={`${value} étoile${value > 1 ? "s" : ""} sur 5`}>{[1, 2, 3, 4, 5].map((star) => interactive ? <button key={star} type="button" onClick={() => onChange?.(star)} className="rounded-sm p-1 text-brand-gold focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Noter ${star} sur 5`}><Star className={`h-7 w-7 ${star <= value ? "fill-current" : "opacity-35"}`} /></button> : <Star key={star} className={`h-4 w-4 text-brand-gold ${star <= value ? "fill-current" : "opacity-30"}`} aria-hidden="true" />)}</div>;
}

export function ReviewsPreview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    void supabase.from("customer_reviews").select("id, display_name, rating, comment, service, created_at").order("created_at", { ascending: false }).limit(3).then(({ data }) => setReviews(data ?? []));
  }, []);

  return <section className="border-t border-border bg-surface-strong"><div className="page-shell section-space"><div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow">Avis clients</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-5xl">La confiance se construit par l’expérience.</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Seuls les témoignages vérifiés et approuvés sont publiés.</p></div><Button asChild variant="outline"><Link to="/avis">Voir et laisser un avis</Link></Button></div>{reviews.length > 0 ? <div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.map((review) => <article key={review.id} className="rounded-lg border border-border bg-card p-6 shadow-sm"><RatingStars value={review.rating} /><blockquote className="mt-5 text-sm leading-7">« {review.comment} »</blockquote><p className="mt-5 font-semibold">{review.display_name}</p>{review.service && <p className="mt-1 text-xs text-muted-foreground">{review.service}</p>}</article>)}</div> : <div className="mt-10 flex items-start gap-4 border-t border-border pt-7"><MessageSquareQuote className="mt-1 h-6 w-6 shrink-0 text-primary" /><p className="max-w-2xl leading-7 text-muted-foreground">Les premiers avis vérifiés apparaîtront ici après modération. Vous avez déjà fait appel à LASISTANT.PRO ? Partagez votre expérience.</p></div>}</div></section>;
}

export function ReviewForm() {
  const [values, setValues] = useState({ name: "", rating: 5, service: "", comment: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (values.name.trim().length < 2 || values.comment.trim().length < 20) {
      setError("Indiquez votre nom et décrivez votre expérience en au moins 20 caractères.");
      return;
    }
    setLoading(true);
    const { error: submitError } = await supabase.from("customer_reviews").insert({ display_name: values.name.trim(), rating: values.rating, service: values.service || null, comment: values.comment.trim(), status: "pending" });
    setLoading(false);
    if (submitError) setError("Votre avis n’a pas pu être envoyé. Veuillez réessayer.");
    else setSent(true);
  }

  if (sent) return <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm" role="status"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted text-primary"><Check /></span><h2 className="mt-5 text-2xl font-semibold">Merci pour votre avis</h2><p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">Il a bien été reçu et sera publié après vérification afin de préserver la qualité et l’authenticité des témoignages.</p></div>;

  return <form onSubmit={submit} className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-sm md:p-8"><div><p className="text-sm font-bold">Votre note</p><div className="mt-2"><RatingStars value={values.rating} interactive onChange={(rating) => setValues((current) => ({ ...current, rating }))} /></div></div><label className="grid gap-2 text-sm font-bold">Votre nom<Input value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} maxLength={80} autoComplete="name" /></label><label className="grid gap-2 text-sm font-bold">Service utilisé<select value={values.service} onChange={(event) => setValues((current) => ({ ...current, service: event.target.value }))} className="h-11 rounded-md border border-input bg-background px-3 font-normal"><option value="">Choisir un service (facultatif)</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label><label className="grid gap-2 text-sm font-bold">Votre expérience<Textarea value={values.comment} onChange={(event) => setValues((current) => ({ ...current, comment: event.target.value }))} maxLength={1000} rows={6} placeholder="Racontez ce qui vous a particulièrement satisfait…" /><span className="text-right text-xs font-normal text-muted-foreground">{values.comment.length}/1000</span></label>{error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive" role="alert">{error}</p>}<Button type="submit" disabled={loading} className="justify-self-start rounded-full">{loading ? "Envoi…" : "Publier mon avis"}</Button><p className="text-xs leading-5 text-muted-foreground">Votre avis est relu avant publication. Ne partagez aucune donnée médicale ou information sensible.</p></form>;
}