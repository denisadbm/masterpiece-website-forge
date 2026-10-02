import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const message = encodeURIComponent("Bonjour LASISTANT.PRO, je souhaite parler de mon besoin d’accompagnement en Tunisie.");
  return (
    <a
      href={`https://wa.me/21654479391?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-whatsapp px-4 font-bold text-whatsapp-foreground shadow-xl transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-7 md:right-7"
      aria-label="Contacter LASISTANT.PRO sur WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}