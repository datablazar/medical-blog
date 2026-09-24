import { getAllPosts } from "@/lib/posts";

export const story = {
  quote: "I trusted the medical profession, even when it told me to distrust myself and my own body.",
  paragraphs: [
    "I was a medical student when I became severely ill with a cluster of symptoms that made it impossible to continue my studies. Over the next decade I grew worse, to the point of near-total disablement.",
    "I trusted the medical profession, even when it told me to distrust myself and my own body. Then I decided to take matters into my own hands, and set out on a scientific and exploratory journey. This is where I share what I have found.",
  ],
};

export type System = "Nervous" | "Immune" | "Heart and circulation" | "Metabolism" | "Connective tissue" | "Gut";

export const systems: System[] = ["Nervous", "Immune", "Heart and circulation", "Metabolism", "Connective tissue", "Gut"];

export type Condition = {
  slug: string;
  name: string;
  short: string;
  full: string;
  summary: string;
  systems: System[];
};

export const conditions: Condition[] = [
  {
    slug: "me-cfs",
    name: "ME/CFS",
    short: "ME",
    full: "Myalgic encephalomyelitis / chronic fatigue syndrome",
    summary: "Profound fatigue, and symptoms that get worse after physical or mental effort.",
    systems: ["Nervous", "Immune", "Metabolism"],
  },
  {
    slug: "long-covid",
    name: "Long COVID",
    short: "LC",
    full: "Post-COVID-19 condition",
    summary: "Symptoms that continue for months or longer after a COVID-19 infection.",
    systems: ["Immune", "Heart and circulation", "Nervous"],
  },
  {
    slug: "fibromyalgia",
    name: "Fibromyalgia",
    short: "FM",
    full: "Fibromyalgia syndrome",
    summary: "Widespread pain and fatigue, thought to involve how the nervous system processes pain.",
    systems: ["Nervous"],
  },
  {
    slug: "pots",
    name: "POTS",
    short: "PO",
    full: "Postural tachycardia syndrome",
    summary: "The heart races on standing up, often with dizziness, fatigue and brain fog.",
    systems: ["Heart and circulation", "Nervous"],
  },
  {
    slug: "heds",
    name: "hEDS",
    short: "ED",
    full: "Hypermobile Ehlers–Danlos syndrome",
    summary: "Very flexible joints and fragile connective tissue, often alongside pain and fatigue.",
    systems: ["Connective tissue"],
  },
  {
    slug: "ibs",
    name: "IBS",
    short: "IB",
    full: "Irritable bowel syndrome",
    summary: "Recurring gut pain and changed bowel habits, linked to signalling between gut and brain.",
    systems: ["Gut", "Nervous"],
  },
];

/** Number of posts whose topic mentions the condition. */
export function articleCount(condition: Condition) {
  const needle = condition.name.toLowerCase();
  return getAllPosts().filter((p) => p.topic.toLowerCase().includes(needle)).length;
}

export function countLabel(n: number) {
  return n === 0 ? "Coming soon" : `${n} article${n === 1 ? "" : "s"}`;
}

/** Commonly reported symptoms, used only for an illustrative overlap chart. */
export const symptomMatrix: { symptom: string; in: string[] }[] = [
  { symptom: "Fatigue", in: ["me-cfs", "long-covid", "fibromyalgia", "pots", "heds"] },
  { symptom: "Worse after exertion", in: ["me-cfs", "long-covid"] },
  { symptom: "Widespread pain", in: ["me-cfs", "fibromyalgia", "heds"] },
  { symptom: "Brain fog", in: ["me-cfs", "long-covid", "fibromyalgia", "pots"] },
  { symptom: "Dizziness on standing", in: ["me-cfs", "long-covid", "pots", "heds"] },
  { symptom: "Unrefreshing sleep", in: ["me-cfs", "long-covid", "fibromyalgia"] },
  { symptom: "Gut symptoms", in: ["heds", "ibs"] },
];

export const disclaimer = "This is general information, not a substitute for advice from your GP or pharmacist.";
