export type Direction = {
  slug: string;
  name: string;
  idea: string;
  signature: string;
  fonts: string;
  palette: { bg: string; ink: string; swatches: string[] };
};

export const directions: Direction[] = [
  {
    slug: "specimen",
    name: "Specimen",
    idea: "A research archive. Every article is an indexed entry, laid on a visible lab grid in condensed type and mono data labels.",
    signature: "A schematic figure: flat test results against fluctuating symptoms.",
    fonts: "Archivo (condensed) · IBM Plex Mono",
    palette: { bg: "#f2f0eb", ink: "#141414", swatches: ["#141414", "#ff3b1f", "#d6d3cc", "#f2f0eb"] },
  },
  {
    slug: "ultraviolet",
    name: "Ultraviolet",
    idea: "Invisible illness, made visible. A dark page that holds hidden writing, revealed only under the reader's UV torch.",
    signature: "The cursor is a torch that reveals symptoms written in invisible ink.",
    fonts: "Bricolage Grotesque · Space Mono",
    palette: { bg: "#0b0a10", ink: "#ece9f5", swatches: ["#0b0a10", "#d4ff3a", "#ff5ad1", "#ece9f5"] },
  },
  {
    slug: "pacing",
    name: "Pacing",
    idea: "Designed for readers with fatigue and brain fog. Soft shapes, hyper-legible type, and an energy cost on every article.",
    signature: "A low-energy mode that strips the page back to the essentials.",
    fonts: "Fraunces (soft) · Atkinson Hyperlegible",
    palette: { bg: "#f4efe6", ink: "#2d2a26", swatches: ["#c8643b", "#5f7a4f", "#3f5a73", "#e9dcc6"] },
  },
  {
    slug: "zine",
    name: "Case Notes",
    idea: "A grassroots patient zine. Two-ink risograph print, taped-in notes, typewriter copy and margin scribbles.",
    signature: "Overprinted pink and blue inks with deliberate misregistration.",
    fonts: "Anton · Courier Prime · Caveat",
    palette: { bg: "#f7f3ea", ink: "#3255a4", swatches: ["#ff48b0", "#3255a4", "#ffe800", "#f7f3ea"] },
  },
  {
    slug: "atlas",
    name: "Atlas",
    idea: "A nineteenth-century anatomical atlas for the parts of the body medicine hasn't finished mapping.",
    signature: "A procedurally engraved plate of branching nerves, with lettered callouts.",
    fonts: "IM Fell English · EB Garamond",
    palette: { bg: "#efe6d2", ink: "#2b1d14", swatches: ["#7a1f1a", "#3e6b5e", "#b08d3c", "#2b1d14"] },
  },
  {
    slug: "lumen",
    name: "Lumen",
    idea: "Ultraviolet's reveal meets Pacing's calm, in a light, airy, professional layout built for easy reading.",
    signature: "A lime lens that follows the cursor and reveals hidden symptoms; energy cost on every article.",
    fonts: "Bricolage Grotesque · Figtree",
    palette: { bg: "#fbfbf8", ink: "#15171c", swatches: ["#15171c", "#d4ff3a", "#e8efe4", "#efe9df"] },
  },
  {
    slug: "instrument",
    name: "Instrument",
    idea: "Product-grade precision for science writing: crisp type, calibrated graphics, sourced diagrams, and your story up front.",
    signature: "A calibrated dial of the six conditions, and a sourced diagram of post-exertional malaise.",
    fonts: "Geist · Geist Mono",
    palette: { bg: "#ffffff", ink: "#0b1624", swatches: ["#0b1624", "#ff5b3a", "#f5f7fa", "#e2e7ee"] },
  },
];
