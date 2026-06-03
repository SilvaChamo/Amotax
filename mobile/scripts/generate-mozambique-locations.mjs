/**
 * Gera src/data/mozambique-locations.ts a partir da Wikipedia (PT).
 * Fontes: distritos, municípios e lista de postos administrativos (INE/Wikipedia).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../src/data/mozambique-locations.ts");

const UA = "AmotaxLocationGenerator/1.0 (https://github.com/SilvaChamo/Amotax)";

/** Postos extra no distrito de Matola (áreas de operação frequentes) */
const MATOLA_EXTRA_ADMIN_POSTS = [
  "Liberdade",
  "Zimpeto",
  "Belo Horizonte",
];

async function fetchWikitext(title) {
  const url =
    "https://pt.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "parse",
      page: title,
      prop: "wikitext",
      format: "json",
    });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const json = await res.json();
  return json.parse.wikitext["*"];
}

function slug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanCell(s) {
  return s
    .replace(/\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, a, b) => (b || a).trim())
    .replace(/<[^>]+>/g, "")
    .trim();
}

const PROVINCE_ALIASES = [
  [/cidade de maputo/i, "maputo-cidade"],
  [/cabo delgado/i, "cabo-delgado"],
  [/^gaza$/i, "gaza"],
  [/inhambane/i, "inhambane"],
  [/manica/i, "manica"],
  [/^maputo$/i, "maputo"],
  [/nampula/i, "nampula"],
  [/niassa/i, "niassa"],
  [/sofala/i, "sofala"],
  [/tete/i, "tete"],
  [/zambézia|zambezia/i, "zambezia"],
];

function provinceIdFromWiki(name) {
  for (const [re, id] of PROVINCE_ALIASES) {
    if (re.test(name.trim())) return id;
  }
  return null;
}

function normalizeDistrictName(name) {
  return name
    .replace(/\(distrito\)/gi, "")
    .replace(/Distrito (?:Urbano|Municipal) de /gi, "")
    .replace(/Cidade de /gi, "")
    .replace(/\s*\(antigo[^)]*\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function adminPostLabel(shortName) {
  const n = shortName.trim();
  if (/^posto administrativo/i.test(n)) return n;
  return `Posto Administrativo de ${n}`;
}

function parseAdminPostsTable(wikitext) {
  let provName = null;
  let distName = null;
  const byKey = new Map();

  const addPost = (postShort) => {
    const pid = provinceIdFromWiki(provName ?? "");
    if (!pid || !distName || !postShort) return;
    const dSlug = slug(normalizeDistrictName(distName));
    const key = `${pid}::${dSlug}`;
    const label = adminPostLabel(postShort);
    if (!byKey.has(key)) byKey.set(key, []);
    const arr = byKey.get(key);
    if (!arr.some((p) => p.name === label)) {
      arr.push({ id: slug(label), name: label });
    }
  };

  for (const line of wikitext.split("\n")) {
    const t = line.trim();
    if (!t.startsWith("|") || t.startsWith("|}") || t.includes("Província !!")) continue;
    if (t === "|-") continue;

    const raw = t.replace(/^\|/, "").replace(/\|$/, "");
    const cells = raw.split("||").map(cleanCell).filter(Boolean);
    if (cells.length === 0) continue;

    if (cells.length >= 3) {
      provName = cells[0];
      distName = cells[1];
      addPost(cells[2]);
    } else if (cells.length === 2) {
      if (provinceIdFromWiki(cells[0])) {
        provName = cells[0];
        distName = cells[1];
      } else {
        distName = cells[0];
        addPost(cells[1]);
      }
    } else if (cells.length === 1) {
      addPost(cells[0]);
    }
  }

  return byKey;
}

function parseBulletSections(wikitext) {
  const sections = {};
  const parts = wikitext.split(/\n==+([^=]+)==+\n/);
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    if (/Ver também|Referências/i.test(title)) continue;
    let body = parts[i + 1] ?? "";
    body = body.split(/\nEm 14 de Dezembro/)[0];
    body = body.split(/\n==/)[0];
    const items = [...body.matchAll(/\*\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g)].map((m) => {
      let name = (m[2] || m[1]).trim();
      name = name.replace(/\s*\(distrito\)/gi, "");
      name = name.replace(/\s*\(cidade\)/gi, "");
      name = name.replace(/\s*\(Moçambique\)/gi, "");
      name = name.replace(/\s*\(município\)/gi, "");
      name = name.replace(/\s+/g, " ").replace(/\s+e$/i, "").trim();
      return name;
    });
    if (items.length) sections[title] = items;
  }
  return sections;
}

const PROVINCE_META = [
  { wikiKey: /Cabo Delgado/, id: "cabo-delgado", name: "Cabo Delgado" },
  { wikiKey: /Gaza/, id: "gaza", name: "Gaza" },
  { wikiKey: /Inhambane/, id: "inhambane", name: "Inhambane" },
  { wikiKey: /Manica/, id: "manica", name: "Manica" },
  { wikiKey: /Maputo \(província\)|Maputo \(prov/, id: "maputo", name: "Maputo Província" },
  { wikiKey: /Nampula/, id: "nampula", name: "Nampula" },
  { wikiKey: /Niassa/, id: "niassa", name: "Niassa" },
  { wikiKey: /Sofala/, id: "sofala", name: "Sofala" },
  { wikiKey: /Tete/, id: "tete", name: "Tete" },
  { wikiKey: /Zambézia/, id: "zambezia", name: "Zambézia" },
];

const MUNICIPALITY_DISTRICT_OVERRIDE = {
  chocue: "chokwe",
  macia: "manjacaze",
  "praia-do-bilene": "bilene",
  quissico: "zavala",
  catandica: "gondola",
  chitima: "cahora-bassa",
  "matola-rio": "boane",
  insaca: "mecanhelas",
  nhamayabue: "changara",
  metangula: "lago",
  maputo: "kampfumo",
};

function matchMunicipalityToDistrictId(munName, districtIds) {
  const s = slug(munName);
  if (MUNICIPALITY_DISTRICT_OVERRIDE[s]) return MUNICIPALITY_DISTRICT_OVERRIDE[s];
  if (districtIds.includes(s)) return s;
  const partial = districtIds.find(
    (d) => s.startsWith(d) || d.startsWith(s) || s.includes(d) || d.includes(s),
  );
  return partial ?? null;
}

function sedePost(districtName) {
  return adminPostLabel(`${districtName} (Sede)`);
}

function buildDistrict(name, municipalityNames, adminPostsFromWiki) {
  const id = slug(name);
  const municipalities = municipalityNames.map((n) => ({
    id: slug(n),
    name: n,
  }));

  let adminPosts = [...(adminPostsFromWiki ?? [])];
  if (id === "matola") {
    for (const extra of MATOLA_EXTRA_ADMIN_POSTS) {
      const label = adminPostLabel(extra);
      if (!adminPosts.some((p) => p.name === label)) {
        adminPosts.push({ id: slug(label), name: label });
      }
    }
    const matolaSede = adminPostLabel("Matola (Sede)");
    if (!adminPosts.some((p) => p.name === matolaSede)) {
      adminPosts.unshift({ id: slug(matolaSede), name: matolaSede });
    }
  }

  if (adminPosts.length === 0) {
    const label = sedePost(name);
    adminPosts = [{ id: slug(label), name: label }];
  }

  adminPosts.sort((a, b) => a.name.localeCompare(b.name, "pt"));

  return { id, name, municipalities, adminPosts };
}

function emitProvince(province) {
  const districts = province.districts
    .map((d) => {
      const muns = d.municipalities
        .map((m) => `      { id: "${m.id}", name: ${JSON.stringify(m.name)} },`)
        .join("\n");
      const posts = d.adminPosts
        .map((p) => `      { id: "${p.id}", name: ${JSON.stringify(p.name)} },`)
        .join("\n");
      return `    {
      id: "${d.id}",
      name: ${JSON.stringify(d.name)},
      municipalities: [
${muns}
      ],
      adminPosts: [
${posts}
      ],
    }`;
    })
    .join(",\n");
  return `  {
    id: "${province.id}",
    name: ${JSON.stringify(province.name)},
    districts: [
${districts}
    ],
  }`;
}

async function main() {
  const [distWt, munWt, postsWt] = await Promise.all([
    fetchWikitext("Distritos_de_Moçambique_por_província"),
    fetchWikitext("Lista_de_municípios_de_Moçambique_por_província"),
    fetchWikitext("Lista_de_postos_administrativos_de_Moçambique"),
  ]);

  const distSections = parseBulletSections(distWt);
  const munSections = parseBulletSections(munWt);
  const postsByKey = parseAdminPostsTable(postsWt);

  const maputoCidadeDistricts = [
    "KaMpfumo",
    "Nlhamankulu",
    "KaMaxaquene",
    "KaMavota",
    "KaMubukwana",
    "KaTembe",
    "KaNyaka",
  ];

  const provinces = [];

  for (const meta of PROVINCE_META) {
    const distKey = Object.keys(distSections).find((k) => meta.wikiKey.test(k));
    const munKey = Object.keys(munSections).find((k) => meta.wikiKey.test(k));
    const districtNames = distKey ? distSections[distKey] : [];
    const municipalityNames = munKey ? munSections[munKey] : [];

    const districtMap = new Map();
    for (const name of districtNames) {
      const key = `${meta.id}::${slug(name)}`;
      districtMap.set(slug(name), buildDistrict(name, [], postsByKey.get(key)));
    }

    const districtIds = [...districtMap.keys()];
    for (const munName of municipalityNames) {
      const targetId = matchMunicipalityToDistrictId(munName, districtIds);
      if (targetId && districtMap.has(targetId)) {
        const d = districtMap.get(targetId);
        if (!d.municipalities.some((m) => slug(m.name) === slug(munName))) {
          d.municipalities.push({ id: slug(munName), name: munName });
        }
      }
    }

    provinces.push({
      id: meta.id,
      name: meta.name,
      districts: [...districtMap.values()].sort((a, b) => a.name.localeCompare(b.name, "pt")),
    });
  }

  const maputoCidade = {
    id: "maputo-cidade",
    name: "Maputo Cidade",
    districts: maputoCidadeDistricts.map((name) => {
      const key = `maputo-cidade::${slug(name)}`;
      return buildDistrict(name, name === "KaMpfumo" ? ["Maputo"] : [], postsByKey.get(key));
    }),
  };

  const maputoProvincia = provinces.find((p) => p.id === "maputo");
  const rest = provinces.filter((p) => p.id !== "maputo");
  provinces.length = 0;
  provinces.push(maputoCidade);
  if (maputoProvincia) provinces.push(maputoProvincia);
  provinces.push(...rest);

  const header = `/** Gerado por scripts/generate-mozambique-locations.mjs — fonte: Wikipedia (PT) / INE */
export type AdminPost = {
  id: string;
  name: string;
};

export type Municipality = {
  id: string;
  name: string;
};

export type District = {
  id: string;
  name: string;
  municipalities: Municipality[];
  adminPosts: AdminPost[];
};

export type Province = {
  id: string;
  name: string;
  districts: District[];
};

export const OTHER_LOCALITY_LABEL = "Outro local de operação";

export const MOZ_PROVINCES: Province[] = [
`;

  const footer = `];

export function findProvince(id: string) {
  return MOZ_PROVINCES.find((p) => p.id === id);
}

export function findDistrict(provinceId: string, districtId: string) {
  return findProvince(provinceId)?.districts.find((d) => d.id === districtId);
}

export function findMunicipality(
  provinceId: string,
  districtId: string,
  municipalityId: string,
) {
  return findDistrict(provinceId, districtId)?.municipalities.find((m) => m.id === municipalityId);
}

export function resolveMunicipalityName(
  provinceId: string,
  districtId: string,
  municipalityId: string,
  otherLocality: string,
): string | null {
  const fromList = municipalityId
    ? findMunicipality(provinceId, districtId, municipalityId)?.name
    : null;
  if (fromList) return fromList;
  const trimmed = otherLocality.trim();
  return trimmed || null;
}

export function findAdminPost(provinceId: string, districtId: string, postId: string) {
  return findDistrict(provinceId, districtId)?.adminPosts.find((p) => p.id === postId);
}

export function formatMemberLocation(member: {
  province?: string;
  district?: string;
  municipality?: string;
  adminPost?: string;
  praca?: string;
  zoneId?: string;
}): string {
  const parts = [
    member.praca,
    member.adminPost,
    member.municipality,
    member.district,
    member.province,
  ].filter(Boolean);
  if (parts.length > 0) return parts.join(", ");
  return member.zoneId ?? "—";
}
`;

  const body = provinces.map(emitProvince).join(",\n");
  fs.writeFileSync(OUT, header + body + footer, "utf8");

  const totalDistricts = provinces.reduce((n, p) => n + p.districts.length, 0);
  const totalMun = provinces.reduce(
    (n, p) => n + p.districts.reduce((m, d) => m + d.municipalities.length, 0),
    0,
  );
  const totalPosts = provinces.reduce(
    (n, p) => n + p.districts.reduce((m, d) => m + d.adminPosts.length, 0),
    0,
  );
  const matola = provinces.find((p) => p.id === "maputo")?.districts.find((d) => d.id === "matola");
  console.log(`Written ${OUT}`);
  console.log(
    `Provinces: ${provinces.length}, Districts: ${totalDistricts}, Municipalities: ${totalMun}, Admin posts: ${totalPosts}`,
  );
  console.log("Matola posts:", matola?.adminPosts.map((p) => p.name).join("; "));
  console.log("Matola municipality:", matola?.municipalities.map((m) => m.name).join("; "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
