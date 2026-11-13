/**
 * Photo and video registry. Files live in /public/images and /public/video.
 * `asset()` adds the GitHub Pages base path so files resolve on any host.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}

export type Photo = { src: string; alt: string; w: number; h: number };

const p = (name: string, alt: string, w: number, h: number): Photo => ({ src: `/images/${name}.webp`, alt, w, h });

/** IMMERSION Minna 2024: The Spirit Influence */
export const spiritInfluence: Photo[] = [
  p("spirit-influence-01", "A minister speaking passionately at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-04", "Worshippers holding hands in prayer at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-06", "A minister praying with a worshipper at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-02", "A young man worshipping with open hands at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-05", "A teaching session at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-03", "A minister smiling during worship at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-07", "A minister laying hands on a worshipper in prayer at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-08", "A minister pointing upward while preaching at IMMERSION Minna 2024", 1800, 1192),
  p("spirit-influence-09", "A preacher making a point during a session at IMMERSION Minna 2024", 1800, 1192),
];

export const gatherings = {
  hall: p("gathering-hall", "A congregation standing in worship inside a large meeting hall", 1800, 1350),
  stage1: p("stage-01", "A minister leading worship on a stage lit in purple", 1080, 1350),
  stage2: p("stage-02", "A minister in prayer at the pulpit", 1080, 1350),
  stage3: p("stage-03", "A minister preaching with one hand raised", 1080, 1350),
  stage4: p("stage-04", "A minister preaching across the stage", 1080, 1350),
  stage5: p("stage-05", "A minister leading worship with singers", 1080, 1350),
  speaker1: p("speaker-01", "A speaker teaching from the pulpit", 1440, 1800),
  speaker2: p("speaker-02", "A speaker teaching with an open hand", 1440, 1800),
  speaker3: p("speaker-03", "A minister preaching in front of a stage screen", 1350, 1800),
  ff1: p("ff-01", "A minister preaching from the pulpit", 1350, 1800),
  ff2: p("ff-02", "A minister teaching from the pulpit", 1350, 1800),
  ff3: p("ff-03", "A minister praying with hand raised", 1350, 1800),
  ff4: p("ff-04", "Portrait of a minister in a red blazer", 1350, 1800),
};

export const intensifyFlyer = p(
  "intensify-jan-2025",
  "INTENSIFY flyer: 30 days of teachings and prayers, 2nd to 31st January 2025, with prayer at 12AM, 6AM and 6PM WAT and daily fasting ending by 3PM",
  1800,
  1800,
);

export const globeVideo = { src: "/video/globe.mp4", poster: "/video/globe-poster.webp" };
