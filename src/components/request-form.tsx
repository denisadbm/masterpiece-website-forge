import { useState, type FormEvent } from "react";
import { Check, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const serviceChoices = ["Assistance médicale", "Logement / hébergement", "Accompagnement des malades"];

export function RequestForm() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); setSent(true); };

  if (sent) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-muted text-primary"><Check className="h-7 w-7" /></span>
        <h2 className="mt-5 text-2xl font-semibold">Votre demande est prête</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">La transmission en ligne sera activée avec l’espace sécurisé. Pour être accompagné dès maintenant, contactez-nous par téléphone ou par e-mail.</p>
        <Button asChild className="mt-6 rounded-full"><a href="tel:+21654479391">Appeler le +216 54 479 391</a></Button>
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
              <label key={choice} className={`cursor-pointer rounded-md border p-4 font-semibold transition-colors ${service === choice ? "border-primary bg-muted text-primary" : "border-border bg-background"}`}>
                <input type="radio" name="service" value={choice} checked={service === choice} onChange={() => setService(choice)} className="mr-3 accent-primary" />{choice}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {step === 2 && (
        <fieldset className="grid gap-5 md:grid-cols-2">
          <legend className="mb-6 text-2xl font-semibold">Vos coordonnées</legend>
          <label className="grid gap-2 text-sm font-bold">Nom complet<Input required name="name" autoComplete="name" className="h-11" /></label>
          <label className="grid gap-2 text-sm font-bold">Téléphone<Input required name="phone" type="tel" autoComplete="tel" className="h-11" /></label>
          <label className="grid gap-2 text-sm font-bold md:col-span-2">E-mail<Input name="email" type="email" autoComplete="email" className="h-11" /></label>
        </fieldset>
      )}
      {step === 3 && (
        <fieldset className="grid gap-5">
          <legend className="mb-6 text-2xl font-semibold">Précisez votre besoin</legend>
          <label className="grid gap-2 text-sm font-bold">Date souhaitée<Input name="date" type="date" className="h-11" /></label>
          <label className="grid gap-2 text-sm font-bold">Votre message<Textarea required name="message" rows={6} placeholder="Décrivez votre situation et les points importants pour vous." /></label>
          <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"><Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} aria-label="Consentement" /><span>J’accepte que mes informations soient utilisées uniquement pour répondre à ma demande.</span></label>
        </fieldset>
      )}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
        <Button type="button" variant="ghost" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1}><ChevronLeft /> Retour</Button>
        {step < 3 ? <Button type="button" onClick={() => setStep((value) => Math.min(3, value + 1))} disabled={step === 1 && !service}>Continuer <ChevronRight /></Button> : <Button type="submit" disabled={!consent}>Préparer la demande <Send /></Button>}
      </div>
    </form>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="grid gap-5 rounded-lg border border-border bg-card p-6 shadow-sm md:p-8">
      <label className="grid gap-2 text-sm font-bold">Nom complet<Input required autoComplete="name" className="h-11" /></label>
      <label className="grid gap-2 text-sm font-bold">E-mail<Input required type="email" autoComplete="email" className="h-11" /></label>
      <label className="grid gap-2 text-sm font-bold">Votre message<Textarea required rows={6} /></label>
      <Button type="submit" className="h-11 justify-self-start rounded-full px-6">Préparer le message <Send /></Button>
      {sent && <p className="rounded-md bg-muted p-4 text-sm leading-6 text-primary" role="status">Le formulaire sera transmis dès l’activation de l’espace sécurisé. En attendant, écrivez-nous directement à imassist.service@hotmail.com.</p>}
    </form>
  );
}