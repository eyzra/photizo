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
  whatsappCommunity: "https://chat.whatsapp.com/DHqbXdwbmvBHf4Em5b7Y6q",
  whatsappChannel: "https://whatsapp.com/channel/0029VbC16sS8V0teuc8yUD2p",
  telegramHandle: "@photizoonline",
  /**
   * Google Apps Script web app URL that saves form entries to the Google Sheet.
   * Paste the URL from Deploy → New deployment (it ends in /exec). See google-apps-script/SETUP.md.
   */
  formsEndpoint:
    process.env.NEXT_PUBLIC_FORMS_ENDPOINT ||
    "https://script.google.com/macros/s/AKfycbyCKcNA6V9OeHyK4sNyIqMoEhrU_oShHoTagzKDVMYab49RadqyqJUtVjINKnI6N5M1lQ/exec",
  bank: { accountNumber: "6050522785", bankName: "Keystone Bank", accountName: "Favour Ejeh" },
} as const;

export function whatsappLink(message?: string) {
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp;
}

export const joinCommunityHref = site.whatsappCommunity;

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
