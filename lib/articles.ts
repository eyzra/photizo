/**
 * Articles by Ezra Anya, published on Substack (TEA's Newsletter).
 * Add new letters to the top of `dearAtheist` with the title, subtitle, date and link
 * exactly as they appear on Substack. The site lists them newest first.
 */

export const substack = {
  name: "TEA's Newsletter",
  url: "https://theezraanya.substack.com/",
  subscribe: "https://theezraanya.substack.com/subscribe",
};

export type Article = {
  title: string;
  subtitle: string;
  date: string; // ISO date
  url: string;
};

/** The Dear Atheist letters, in the order they were published. */
export const dearAtheist: Article[] = [
  {
    title: "Dear Atheist, Why Do You Believe There Is No God?",
    subtitle: "On evidence, certainty, and the rather interesting assumption that God is the one who has to explain Himself.",
    date: "2026-10-03",
    url: "https://theezraanya.substack.com/p/dear-atheist-why-do-you-believe-there",
  },
  {
    title: "Dear Atheist, Who Created God?",
    subtitle: "On the cosmological argument, necessary existence, and why the question itself reveals something important about the assumptions underneath it.",
    date: "2026-10-12",
    url: "https://theezraanya.substack.com/p/dear-atheist-who-created-god",
  },
  {
    title: "Dear Atheist, Why Would a Good God Allow So Much Evil?",
    subtitle: "On suffering, human freedom, divine goodness, and the question that Christians must answer.",
    date: "2026-10-18",
    url: "https://theezraanya.substack.com/p/dear-atheist-why-would-a-good-god",
  },
  {
    title: "Dear Atheist, If God Exists, Why Is He So Hidden?",
    subtitle: "On divine hiddenness, the longing to know, and a God who invites humanity to seek Him.",
    date: "2026-11-04",
    url: "https://theezraanya.substack.com/p/dear-atheist-if-god-exists-why-is",
  },
];

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** Strips the series prefix so the question can be set large on its own. */
export function questionOf(title: string) {
  return title.replace(/^Dear Atheist,\s*/, "");
}
