/**
 * Teaching library data.
 *
 * Every entry below is a SAMPLE that shows how real content will appear.
 * Replace them with real sermons, articles, audio, video and study guides.
 * Set `sample: false` (or remove the field) on real entries so the
 * "Sample" badges and banner disappear.
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
  sample?: boolean;
};

const sampleBody = [
  "This is a sample entry. It shows the layout a teaching page will use once real content is added.",
  "Add the teaching notes, key scriptures and any reflection questions here. Each paragraph in the body array becomes a paragraph on the page.",
];

export const teachings: Teaching[] = [
  {
    slug: "sample-sermon-faith",
    title: "Sample sermon: Faith",
    category: "Faith",
    format: "Sermon",
    summary: "Placeholder for a sermon on the teaching of faith. Replace with a real title, summary and recording.",
    body: sampleBody,
    sample: true,
  },
  {
    slug: "sample-article-doctrine",
    title: "Sample article: Biblical Doctrine",
    category: "Biblical Doctrine",
    format: "Article",
    summary: "Placeholder for a written teaching on sound doctrine. Replace with a real article.",
    body: sampleBody,
    sample: true,
  },
  {
    slug: "sample-audio-apologetics",
    title: "Sample audio: Christian Apologetics",
    category: "Christian Apologetics",
    format: "Audio",
    summary: "Placeholder for an audio teaching that engages a sincere question about the Christian faith.",
    body: sampleBody,
    sample: true,
  },
  {
    slug: "sample-video-prayer",
    title: "Sample video: Prayer and Spiritual Formation",
    category: "Prayer and Spiritual Formation",
    format: "Video",
    summary: "Placeholder for a video teaching on prayer and the devotional life.",
    body: sampleBody,
    sample: true,
  },
  {
    slug: "sample-study-discipleship",
    title: "Sample study guide: Discipleship",
    category: "Discipleship",
    format: "Study Resource",
    summary: "Placeholder for a downloadable study resource for personal or group discipleship.",
    body: sampleBody,
    sample: true,
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
