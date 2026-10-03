import { HeartHandshake, Home, Stethoscope } from "lucide-react";
import medicalImage from "@/assets/medical-care.jpg";
import housingImage from "@/assets/housing-care.jpg";
import companionImage from "@/assets/companion-care.jpg";

export const contact = {
  phones: ["+216 54 479 391", "+216 25 393 214"],
  emails: ["imassist.service@hotmail.com", "moryendi@gmail.com"],
  address: "Avenue Habib Thamer, Tunisie",
  socialLinks: [
    { label: "Facebook", name: "imassist Tant", url: "https://www.facebook.com/imassist.tant" },
  ],
};

export const services = [
  {
    title: "Assistance médicale",
    short: "Préparer votre parcours de soins en Tunisie avec un interlocuteur attentif à chaque étape.",
    description:
      "Nous étudions votre besoin, facilitons vos démarches et vous orientons vers les professionnels de santé compétents une fois sur place.",
    to: "/assistance-medicale" as const,
    icon: Stethoscope,
    image: medicalImage,
    imageAlt: "Une coordinatrice échange avec une patiente",
  },
  {
    title: "Logement & hébergement",
    short: "Trouver un lieu de vie adapté à votre séjour, vos priorités et votre budget.",
    description:
      "Pour un patient, une famille ou un étudiant, nous recherchons des solutions auprès d’agences, de responsables et de propriétaires.",
    to: "/logement" as const,
    icon: Home,
    image: housingImage,
    imageAlt: "Un étudiant étudie une solution de logement avec une conseillère",
  },
  {
    title: "Accompagnement des malades",
    short: "Une présence humaine pour vivre son séjour avec davantage de confort et de sérénité.",
    description:
      "Accueil, accompagnement et attention particulière aux personnes âgées, dans le respect du rythme et des besoins de chacun.",
    to: "/accompagnement" as const,
    icon: HeartHandshake,
    image: companionImage,
    imageAlt: "Une accompagnatrice marche auprès d’une personne âgée",
  },
];

export const navItems = [
  { label: "Accueil", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "À propos", to: "/a-propos" as const },
  { label: "Espace infos", to: "/actualites" as const },
  { label: "Contact", to: "/contact" as const },
  { label: "Avis", to: "/avis" as const },
];

export const articles = [
  {
    category: "Parcours de soins",
    title: "Préparer sereinement un séjour médical en Tunisie",
    excerpt: "Les informations essentielles à réunir avant votre départ et les étapes à anticiper.",
    image: medicalImage,
  },
  {
    category: "Hébergement",
    title: "Choisir un logement adapté à la durée de son séjour",
    excerpt: "Budget, localisation, mobilité : les critères utiles pour orienter votre recherche.",
    image: housingImage,
  },
  {
    category: "Accompagnement",
    title: "Créer des repères rassurants pour une personne âgée",
    excerpt: "Quelques principes simples pour favoriser confort, écoute et sérénité au quotidien.",
    image: companionImage,
  },
];