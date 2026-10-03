import { useState, type FormEvent } from "react";
import { Check, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const serviceChoices = ["Assistance médicale", "Logement / hébergement", "Accompagnement des malades"];

type FormErrors = {
  service?: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  consent?: string;
};

export function RequestForm({ initialService = "", initialMessage = "" }: { initialService?: string | undefined; initialMessage?: string | undefined }) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({ service: serviceChoices.includes(initialService) ? initialService : "", name: "", phone: "", email: "", date: "", message: initialMessage, consent: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  function validate(currentStep: number) {
    const nextErrors: FormErrors = {};
    if (currentStep === 1 && !values.service) nextErrors.service = "Choisissez le type d’accompagnement recherché.";
    if (currentStep === 2) {
      if (values.name.trim().length < 2) nextErrors.name = "Indiquez votre nom complet.";
      if (!/^\+?[0-9\s()-]{8,20}$/.test(values.phone.trim())) nextErrors.phone = "Indiquez un numéro de téléphone valide.";
      if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Indiquez une adresse e-mail valide.";
    }
    if (currentStep === 3) {
      if (values.message.trim().length < 20) nextErrors.message = "Décrivez votre besoin en au moins 20 caractères.";
      if (!values.consent) nextErrors.consent = "Votre accord est nécessaire pour traiter la demande.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function nextStep() {
    if (validate(step)) setStep((value) => Math.min(3, value + 1));
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate(3)) setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted text-primary"><Check className="h-7 w-7" /></span>
        <h2 className="mt-5 text-2xl font-semibold">Votre demande a été vérifiée</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">Toutes les informations nécessaires sont complètes. Envoyez-la maintenant à LASISTANT.PRO sur WhatsApp pour recevoir une réponse.</p>
        <Button asChild className="mt-6 rounded-full"><a target="_blank" rel="noreferrer" href={`https://wa.me/21654479391?text=${encodeURIComponent(`Bonjour LASISTANT.PRO, je souhaite demander un accompagnement.\nService : ${values.service}\nNom : ${values.name}\nTéléphone : ${values.phone}\nE-mail : ${values.email || "Non renseigné"}\nDate souhaitée : ${values.date || "Non renseignée"}\nBesoin : ${values.message}`)}`}>Envoyer sur WhatsApp</a></Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-5 shadow-sm md:p-8">
      <div className="mb-8 grid grid-cols-3 gap-2" aria-label={`Étape ${step} sur 3`}>
        {[1, 2, 3].map((item) => <span key={item} className={`h-1.5 rounded-full ${item <= step ? "bg-primary" : "bg-muted"}`} />)}
      </div>
      {step === 1 && (
        <fieldset>
          <legend className="text-2xl font-semibold">Quel accompagnement recherchez-vous ?</legend>
          <div className="mt-6 grid gap-3">
            {serviceChoices.map((choice) => (
              <label key={choice} className={`cursor-pointer rounded-md border p-4 font-semibold transition-colors ${values.service === choice ? "border-primary bg-muted text-primary" : "border-border bg-background"}`}>
                <input type="radio" name="service" value={choice} checked={values.service === choice} onChange={() => setValues((current) => ({ ...current, service: choice }))} className="mr-3 accent-primary" />{choice}
              </label>
            ))}
          </div>
          {errors.service && <p role="alert" className="mt-3 text-sm text-destructive">{errors.service}</p>}
        </fieldset>
      )}
      {step === 2 && (
        <fieldset className="grid gap-5 md:grid-cols-2">
          <legend className="mb-6 text-2xl font-semibold">Vos coordonnées</legend>
          <label className="grid gap-2 text-sm font-bold">Nom complet<Input aria-invalid={Boolean(errors.name)} value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} name="name" autoComplete="name" className="h-11" />{errors.name && <span className="font-normal text-destructive">{errors.name}</span>}</label>
          <label className="grid gap-2 text-sm font-bold">Téléphone<Input aria-invalid={Boolean(errors.phone)} value={values.phone} onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))} name="phone" type="tel" autoComplete="tel" className="h-11" />{errors.phone && <span className="font-normal text-destructive">{errors.phone}</span>}</label>
          <label className="grid gap-2 text-sm font-bold md:col-span-2">E-mail<Input aria-invalid={Boolean(errors.email)} value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} name="email" type="email" autoComplete="email" className="h-11" />{errors.email && <span className="font-normal text-destructive">{errors.email}</span>}</label>
        </fieldset>
      )}
      {step === 3 && (
        <fieldset className="grid gap-5">
          <legend className="mb-6 text-2xl font-semibold">Précisez votre besoin</legend>
          <label className="grid gap-2 text-sm font-bold">Date souhaitée<Input value={values.date} onChange={(event) => setValues((current) => ({ ...current, date: event.target.value }))} name="date" type="date" className="h-11" /></label>
          <label className="grid gap-2 text-sm font-bold">Votre message<Textarea aria-invalid={Boolean(errors.message)} value={values.message} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} name="message" rows={6} placeholder="Décrivez votre situation et les points importants pour vous." />{errors.message && <span className="font-normal text-destructive">{errors.message}</span>}</label>
          <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><input type="checkbox" checked={values.consent} onChange={(event) => setValues((current) => ({ ...current, consent: event.target.checked }))} className="mt-1 h-4 w-4 shrink-0 accent-primary" /><span>J’accepte que mes informations soient utilisées uniquement pour répondre à ma demande.</span></label>
          {errors.consent && <p role="alert" className="text-sm text-destructive">{errors.consent}</p>}
        </fieldset>
      )}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
        <Button type="button" variant="ghost" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1}><ChevronLeft /> Retour</Button>
        {step < 3 ? <Button type="button" onClick={nextStep}>Continuer <ChevronRight /></Button> : <Button type="submit">Vérifier la demande <Send /></Button>}
      </div>
    </form>
  );
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = "Indiquez votre nom complet.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Indiquez une adresse e-mail valide.";
    if (values.message.trim().length < 20) nextErrors.message = "Votre message doit contenir au moins 20 caractères.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  }

  if (sent) return <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm" role="status"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-primary"><Check /></span><h2 className="mt-5 text-2xl font-semibold">Votre message est prêt</h2><p className="mt-3 leading-7 text-muted-foreground">Envoyez-le maintenant par e-mail à LASISTANT.PRO.</p><Button asChild className="mt-6 rounded-full"><a href={`mailto:imassist.service@hotmail.com?subject=${encodeURIComponent("Demande depuis le site LASISTANT.PRO")}&body=${encodeURIComponent(`Nom : ${values.name}\nE-mail : ${values.email}\n\n${values.message}`)}`}>Ouvrir mon e-mail <Send /></a></Button></div>;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
      <label className="grid gap-2 text-sm font-bold">Nom complet<Input aria-invalid={Boolean(errors.name)} value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} autoComplete="name" className="h-11" />{errors.name && <span className="font-normal text-destructive">{errors.name}</span>}</label>
      <label className="grid gap-2 text-sm font-bold">E-mail<Input aria-invalid={Boolean(errors.email)} value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} type="email" autoComplete="email" className="h-11" />{errors.email && <span className="font-normal text-destructive">{errors.email}</span>}</label>
      <label className="grid gap-2 text-sm font-bold">Votre message<Textarea aria-invalid={Boolean(errors.message)} value={values.message} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} rows={6} />{errors.message && <span className="font-normal text-destructive">{errors.message}</span>}</label>
      <Button type="submit" className="h-11 justify-self-start rounded-full px-6">Vérifier le message <Send /></Button>
    </form>
  );
}