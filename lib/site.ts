/**
 * Single source of truth for contact details and navigation.
 * Update values here and every page picks them up.
 */
export const site = {
  name: "Photizo Global",
  church: "The Illumination Church",
  mandate: "Till All Men See Jesus.",
  description:
    "Photizo Global is a Christian teaching and discipleship ministry, home of The Illumination Church. We help people see Jesus clearly through Christ-centred teaching, the teaching of faith, Christian apologetics and intentional discipleship.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://eyzra.github.io/photizo",
  founder: "Ezra Anya",
  phoneDisplay: "+234 912 663 4636",
  phoneHref: "tel:+2349126634636",
  email: "mail.photizoglobal@gmail.com",
  emailHref: "mailto:mail.photizoglobal@gmail.com",
  whatsapp: "https://wa.me/2349126634636",
  telegram: "https://t.me/photizoonline",
  telegramHandle: "@photizoonline",
} as const;

export function whatsappLink(message?: string) {
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp;
}

export const joinCommunityHref = whatsappLink(
  "Hello Photizo Global, I'd love to join the community. Please add me.",
);

export const primaryNav = [
  { label: "About", href: "/about/" },
  { label: "Our Beliefs", href: "/beliefs/" },
  { label: "Expressions", href: "/expressions/" },
  { label: "IMMERSION", href: "/immersion/" },
  { label: "Articles", href: "/articles/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Our Beliefs", href: "/beliefs/" },
  { label: "Expressions", href: "/expressions/" },
  { label: "IMMERSION", href: "/immersion/" },
  { label: "Articles", href: "/articles/" },
  { label: "Give", href: "/give/" },
  { label: "Contact", href: "/contact/" },
] as const;
