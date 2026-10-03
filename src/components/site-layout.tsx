import { Link } from "@tanstack/react-router";
import { Menu, Phone, X, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/social-icon";
import logoAsset from "@/assets/lasistant-pro-logo.png.asset.json";
import { contact, navItems } from "@/lib/site-content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="page-shell grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:h-24">
        <Link to="/" className="flex min-w-0 items-center" aria-label="LASISTANT.PRO — Accueil">
          <img src={logoAsset.url} alt="LASISTANT.PRO" className="h-14 w-auto max-w-[190px] object-contain object-left lg:h-17 lg:max-w-[230px]" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>
              {item.label}
            </Link>
          ))}
          <Button asChild size="lg" className="ml-3 rounded-full px-5">
            <Link to="/reservation">Demander un accompagnement <ArrowUpRight /></Link>
          </Button>
        </nav>
        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navigation mobile">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-muted">
                {item.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-3 h-12 rounded-full">
              <Link to="/reservation" onClick={() => setOpen(false)}>Demander un accompagnement</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="page-shell grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img src={logoAsset.url} alt="LASISTANT.PRO" className="h-20 w-auto max-w-[240px] rounded bg-surface p-2 object-contain" loading="lazy" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-footer-muted">Un accompagnement humain pour vos démarches médicales, votre hébergement et votre séjour en Tunisie.</p>
        </div>
        <div>
          <p className="footer-title">Navigation</p>
          <div className="mt-5 grid gap-3 text-sm text-footer-muted">
            {navItems.map((item) => <Link key={item.to} to={item.to} className="w-fit hover:text-footer-foreground">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="footer-title">Nous joindre</p>
          <div className="mt-5 grid gap-4 text-sm text-footer-muted">
            <a href="tel:+21654479391" className="flex items-center gap-3 hover:text-footer-foreground"><Phone className="h-4 w-4" />{contact.phones[0]}</a>
            <a href={`mailto:${contact.emails[0]}`} className="flex items-center gap-3 break-all hover:text-footer-foreground"><Mail className="h-4 w-4" />{contact.emails[0]}</a>
            <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{contact.address}</p>
            {contact.socialLinks.map((social) => <a key={social.url} href={social.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-footer-foreground"><SocialIcon platform={social.platform} className="h-4 w-4" />{social.label} · {social.name}</a>)}
          </div>
        </div>
      </div>
      <div className="border-t border-footer-line">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LASISTANT.PRO. Tous droits réservés.</p>
          <p>Assistance, écoute et orientation en Tunisie.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return (
    <section className="hero-band">
      <div className="page-shell py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-normal text-foreground md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="page-shell grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-18">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">Parlons de votre besoin</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-normal md:text-4xl">Un premier échange suffit pour clarifier la prochaine étape.</h2>
        </div>
        <Button asChild variant="secondary" size="lg" className="h-12 rounded-full px-6">
          <Link to="/reservation">Faire une demande <ArrowUpRight /></Link>
        </Button>
      </div>
    </section>
  );
}