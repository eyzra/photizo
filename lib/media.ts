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
  stage1: p("stage-01", "A minister leading a meeting from the stage while the congregation worships", 1080, 1053),
  stage2: p("stage-02", "A minister preaching with one hand to his head in thought", 1080, 1053),
  stage3: p("stage-03", "A minister preaching with one hand raised", 1080, 1053),
  stage4: p("stage-04", "A minister pointing across the congregation while preaching", 1080, 1053),
  stage5: p("stage-05", "A minister worshipping with eyes closed beside the singers", 1080, 1053),
  speaker1: p("speaker-01", "A speaker teaching from the pulpit", 1440, 1800),
  speaker2: p("speaker-02", "A speaker teaching with an open hand", 1440, 1800),
  speaker3: p("speaker-03", "A minister preaching in front of a stage screen", 1350, 1800),
  ff1: p("ff-01", "A minister in a blue suit preaching from the pulpit", 1800, 1764),
  ff2: p("ff-02", "A minister teaching from the pulpit with an open hand", 1800, 1764),
  ff3: p("ff-03", "A minister praying with his hand raised", 1800, 1764),
  ff4: p("ff-04", "Portrait of a minister in a red blazer", 1800, 1764),
};

/** Official headshot */
export const headshot = p("ezra-anya-headshot", "Portrait of Ezra Anya in a dark suit against a warm gold background", 992, 1072);

/** Ezra Anya preaching, black and white */
export const onStage = p("ezra-anya-on-stage", "Ezra Anya preaching on stage beside a pulpit, in black and white", 2000, 1116);

/** Founder portrait for the About page */
export const founderPortrait = p("founder-ezra-anya", "Ezra Anya ministering in worship with his eyes closed", 720, 900);

const f = (name: string, alt: string, w: number, h: number): Photo => ({ src: `/images/flyers/${name}.webp`, alt, w, h });

/** Programme flyers, newest knowledge from the ministry's own artwork. */
export const flyers = {
  spiritInfluence: f("immersion-spirit-influence", "IMMERSION Minna flyer: The Spirit Influence, May 19th and 20th, CACSF Auditorium, Gidan Kwano, with David Akanbi, Chidi Chukwuemeka and Ezra Anya", 864, 1080),
  shekinah: f("immersion-shekinah", "IMMERSION Abuja flyer: Shekinah, the temple, presence and glory of God, 27th to 28th December 2024, MFM NCR35 Phase IV, Nyanya, with Ezra Anya, Pastor Chidi Chukwuemeka and Minister Joel Babalola", 1280, 1280),
  nowFaithIs: f("immersion-now-faith-is", "IMMERSION Abuja flyer: Now Faith Is, December 19th and 20th, 9AM daily, MFM NCR35 Youth Church Auditorium, Nyanya, with Minister M Confidence, Ezra Anya and Minister Joel Babalola", 1024, 1280),
  immersionComing: f("immersion-is-coming", "IMMERSION is coming flyer with Ezra Anya: Salvation, Sanctification, Supernatural", 1024, 1280),
  illuminateDevotion: f("illuminate-essence-of-devotion", "ILLUMINATE flyer: The Essence of Devotion with Ezra Anya", 1280, 1280),
  intensify40: f("intensify-40-days", "INTENSIFY flyer: 40 days of prayer and fasting, 15th August to 24th September, prayers at 12AM and fasting until 3PM", 1024, 1280),
  intensify30: f("intensify-30-days-january", "INTENSIFY flyer: 30-day prayer and fasting, January 2nd to January 31st, prayer at 5AM and 11PM WAT", 1024, 1280),
  faithFundamentals: f("immersion-faith-fundamentals", "IMMERSION Minna flyer: Faith Fundamentals, Friday 11th December 5PM and Saturday 12th December 6AM and 5PM, 2026, MFM Campus Fellowship permanent site behind Alheri Lodge, Gofamint, Gidan Kwano, with Pastor Ezra Anya. Photizo Global in collaboration with MFM Campus Fellowship, FUTMinna Chapter", 1120, 1400),
  auxano: f("auxano-21-days", "AUXANO flyer: 21 days of discipleship, to cause to grow, In Christ Realities, 6th May to 27th May", 864, 1080),
};

export const intensifyFlyer = p(
  "intensify-jan-2025",
  "INTENSIFY flyer: 30 days of teachings and prayers, 2nd to 31st January 2025, with prayer at 12AM, 6AM and 6PM WAT and daily fasting ending by 3PM",
  1800,
  1800,
);

export const globeVideo = { src: "/video/globe.mp4", poster: "/video/globe-poster.webp" };
