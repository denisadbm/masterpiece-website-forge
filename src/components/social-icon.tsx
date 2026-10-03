import { Facebook, Instagram, Linkedin, Music2, Youtube, type LucideIcon } from "lucide-react";
import type { SocialPlatform } from "@/lib/site-content";

const icons: Record<SocialPlatform, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function SocialIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const Icon = icons[platform];
  return <Icon className={className} aria-hidden="true" />;
}
