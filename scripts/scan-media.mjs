// Detecta qué imágenes y videos existen en /public/media y genera:
//   - src/content/media-manifest.json (lo usa el sitio para mostrarlos)
//   - docs/FORMATOS.md (lista de archivos, medidas y estado)
// Se ejecuta solo antes de `npm run dev` y `npm run build`.
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const publicDir = join(root, "public");
const mediaDir = join(publicDir, "media");

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    if (name.startsWith(".")) return [];
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : ["/" + relative(publicDir, full).split(sep).join("/")];
  });
}

const files = walk(mediaDir).sort();
writeFileSync(join(root, "src/content/media-manifest.json"), JSON.stringify({ files }, null, 2) + "\n");

// --- Documentación de formatos (lee el registro src/content/assets.ts) ---
const source = readFileSync(join(root, "src/content/assets.ts"), "utf8");
const block = /\n {2}"([\w.-]+)": \{([\s\S]*?)\n {2}\},/g;
const field = (body, name) => body.match(new RegExp(`${name}:\\s*(?:"([^"]*)"|(\\d+))`))?.slice(1).find(Boolean);
const brief = (body) => body.match(/brief:\s*\n?\s*"([^"]*)"/)?.[1] ?? "";

const groups = {
  hero: "Inicio (Hero)",
  founders: "About Us / Meet the Founders — fotos REALES",
  services: "Our Services (tarjetas)",
  "service-hero": "Video o imagen principal de cada especialidad",
  creative: "Creative Studio",
  branding: "Branding",
  web: "Web Studio",
  social: "Social & Content",
  work: "Our Work",
  numa: "NUMA Real Estate",
};

const rows = {};
let total = 0;
let done = 0;
for (const [, id, body] of source.matchAll(block)) {
  const kind = field(body, "kind");
  const file = field(body, "file");
  if (!kind || !file) continue;
  const exts = kind === "video" ? [".mp4", ".webm"] : [".avif", ".webp", ".jpg", ".jpeg", ".png", ".svg"];
  const found = exts.find((e) => files.includes(file + e));
  const mobile = field(body, "fileMobile");
  const mobileFound = mobile && [".mp4", ".webm"].find((e) => files.includes(mobile + e));
  total++;
  if (found) done++;
  const key = id.split(".")[0];
  (rows[key] ??= []).push(
    `| ${found ? "✅" : "⬜"} | \`${id}\` | ${kind === "video" ? "Video" : "Imagen"} | ${field(body, "ratio")} · mín. ${field(body, "minWidth")} px | \`public${file}${found ?? (kind === "video" ? ".mp4" : ".jpg")}\` | ${brief(body)} |`,
  );
  if (mobile) {
    total++;
    if (mobileFound) done++;
    rows[key].push(
      `| ${mobileFound ? "✅" : "⬜"} | \`${id}\` (celular) | Video | 9:16 · mín. 1080 px | \`public${mobile}${mobileFound ?? ".mp4"}\` | Versión vertical del mismo video. |`,
    );
  }
}

const doc = [
  "# Formatos de imágenes y videos",
  "",
  `> Generado automáticamente por \`npm run media:scan\`. Progreso: **${done} de ${total}** archivos.`,
  "",
  "## Cómo agregar un archivo",
  "",
  "1. Exporta con la proporción y el tamaño mínimo indicados.",
  "2. Guárdalo con **exactamente** el nombre de la columna *Archivo* (puedes usar .jpg, .png, .webp o .avif en imágenes; .mp4 en videos).",
  "3. Videos: sin audio, idealmente menos de 15 MB. Opcional: un póster con el mismo nombre terminado en `-poster.jpg`.",
  "4. Publica: el sitio lo detecta solo y reemplaza el espacio reservado.",
  "",
  "Reglas: las fotos de Pau y Dany son reales; el material de clientes debe estar autorizado; lo creado con IA que no sea de un cliente real se marca como conceptual.",
  "",
  ...Object.entries(groups).flatMap(([key, title]) =>
    rows[key]
      ? [`## ${title}`, "", "| | ID | Tipo | Proporción | Archivo | Indicaciones |", "|---|---|---|---|---|---|", ...rows[key], ""]
      : [],
  ),
].join("\n");

mkdirSync(join(root, "docs"), { recursive: true });
writeFileSync(join(root, "docs/FORMATOS.md"), doc);
console.log(`[media] ${files.length} archivo(s) en /public/media · ${done}/${total} espacios completos`);
