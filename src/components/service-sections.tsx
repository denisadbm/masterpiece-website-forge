import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-content";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <article key={service.title} className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1">
            <img src={service.image} alt={service.imageAlt} width="1200" height="912" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <div className="p-6">
              <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-card-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.short}</p>
              <Button asChild variant="link" className="mt-4 h-auto p-0 font-bold">
                <Link to={service.to}>Découvrir <ArrowRight /></Link>
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ProcessSteps() {
  const steps = [
    ["01", "Vous nous expliquez", "Votre situation, votre destination, vos priorités et vos contraintes."],
    ["02", "Nous préparons", "Nous clarifions les options utiles et coordonnons les démarches adaptées."],
    ["03", "Nous restons présents", "Vous avancez avec un interlocuteur disponible tout au long du parcours."],
  ];
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map(([number, title, text]) => (
        <div key={number} className="border-t border-border pt-6">
          <p className="font-display text-sm font-semibold text-brand-gold">{number}</p>
          <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base leading-7 text-muted-foreground">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}