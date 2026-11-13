import { essenceOfDevotion } from "./content";

/**
 * Teaching library data.
 *
 * Add each new sermon, article, audio, video or study guide here.
 * Newest entries go at the top. Set `sample: true` only for test entries you never want live.
 */

export const categories = [
  "Faith",
  "Biblical Doctrine",
  "Christian Apologetics",
  "Prayer and Spiritual Formation",
  "Discipleship",
] as const;

export const formats = ["Sermon", "Article", "Audio", "Video", "Study Resource"] as const;

export type Category = (typeof categories)[number];
export type Format = (typeof formats)[number];

export type Teaching = {
  slug: string;
  title: string;
  category: Category;
  format: Format;
  summary: string;
  speaker?: string;
  date?: string; // ISO date, e.g. "2026-03-14"
  scripture?: string;
  audioUrl?: string;
  videoUrl?: string; // YouTube embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID
  downloadUrl?: string;
  body?: string[];
  /** Key thoughts shown as pull quotes */
  quotes?: readonly string[];
  /** Flyer or cover image path under /public */
  image?: { src: string; alt: string };
  sample?: boolean;
};


export const teachings: Teaching[] = [
  {
    slug: essenceOfDevotion.slug,
    title: essenceOfDevotion.title,
    category: "Prayer and Spiritual Formation",
    format: "Sermon",
    speaker: "Ezra Anya",
    summary: "An ILLUMINATE teaching on why we pursue God in devotion: to know Him, through the Holy Spirit, in a knowledge that is relational and experiential.",
    quotes: essenceOfDevotion.quotes,
    image: { src: "/images/flyers/illuminate-essence-of-devotion.webp", alt: "ILLUMINATE flyer: The Essence of Devotion with Ezra Anya" },
  },
];

export function getTeaching(slug: string) {
  return teachings.find((t) => t.slug === slug);
}

export const categoryNotes: Record<Category, string> = {
  Faith: "Understanding God's promises, trusting His character and living by faith in every season.",
  "Biblical Doctrine": "Careful, Christ-centred teaching on what the Scriptures reveal.",
  "Christian Apologetics": "Thoughtful engagement with honest questions about God, Scripture and the resurrection.",
  "Prayer and Spiritual Formation": "Growing a healthy devotional life rooted in prayer and the Word.",
  Discipleship: "Growing in character and becoming equipped to disciple others.",
};
