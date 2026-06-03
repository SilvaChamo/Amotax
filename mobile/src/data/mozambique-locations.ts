/** Gerado por scripts/generate-mozambique-locations.mjs — fonte: Wikipedia (PT) / INE */
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
  {
    id: "maputo-cidade",
    name: "Maputo Cidade",
    districts: [
    {
      id: "kampfumo",
      name: "KaMpfumo",
      municipalities: [
      { id: "maputo", name: "Maputo" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-kampfumo-sede", name: "Posto Administrativo de KaMpfumo (Sede)" },
      ],
    },
    {
      id: "nlhamankulu",
      name: "Nlhamankulu",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-nlhamankulu-sede", name: "Posto Administrativo de Nlhamankulu (Sede)" },
      ],
    },
    {
      id: "kamaxaquene",
      name: "KaMaxaquene",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-kamaxaquene-sede", name: "Posto Administrativo de KaMaxaquene (Sede)" },
      ],
    },
    {
      id: "kamavota",
      name: "KaMavota",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-kamavota-sede", name: "Posto Administrativo de KaMavota (Sede)" },
      ],
    },
    {
      id: "kamubukwana",
      name: "KaMubukwana",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-kamubukwana-sede", name: "Posto Administrativo de KaMubukwana (Sede)" },
      ],
    },
    {
      id: "katembe",
      name: "KaTembe",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-katembe-sede", name: "Posto Administrativo de KaTembe (Sede)" },
      ],
    },
    {
      id: "kanyaka",
      name: "KaNyaka",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-kanyaka-sede", name: "Posto Administrativo de KaNyaka (Sede)" },
      ],
    }
    ],
  },
  {
    id: "maputo",
    name: "Maputo Província",
    districts: [
    {
      id: "boane",
      name: "Boane",
      municipalities: [
      { id: "boane", name: "Boane" },
      { id: "matola-rio", name: "Matola-Rio" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-boane", name: "Posto Administrativo de Boane" },
      { id: "posto-administrativo-de-matola-rio", name: "Posto Administrativo de Matola-Rio" },
      ],
    },
    {
      id: "magude",
      name: "Magude",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-magude", name: "Posto Administrativo de Magude" },
      { id: "posto-administrativo-de-mahel", name: "Posto Administrativo de Mahel" },
      { id: "posto-administrativo-de-mapulanguene", name: "Posto Administrativo de Mapulanguene" },
      { id: "posto-administrativo-de-motaze", name: "Posto Administrativo de Motaze" },
      { id: "posto-administrativo-de-panjane", name: "Posto Administrativo de Panjane" },
      ],
    },
    {
      id: "manhica",
      name: "Manhiça",
      municipalities: [
      { id: "manhica", name: "Manhiça" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-3-de-fevereiro", name: "Posto Administrativo de 3 de Fevereiro" },
      { id: "posto-administrativo-de-calanga", name: "Posto Administrativo de Calanga" },
      { id: "posto-administrativo-de-ilha-josina-machel", name: "Posto Administrativo de Ilha Josina Machel" },
      { id: "posto-administrativo-de-maluana", name: "Posto Administrativo de Maluana" },
      { id: "posto-administrativo-de-manhica", name: "Posto Administrativo de Manhiça" },
      { id: "posto-administrativo-de-xinavane", name: "Posto Administrativo de Xinavane" },
      ],
    },
    {
      id: "marracuene",
      name: "Marracuene",
      municipalities: [
      { id: "marracuene", name: "Marracuene" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-machubo", name: "Posto Administrativo de Machubo" },
      { id: "posto-administrativo-de-marracuene", name: "Posto Administrativo de Marracuene" },
      ],
    },
    {
      id: "matola",
      name: "Matola",
      municipalities: [
      { id: "matola", name: "Matola" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-belo-horizonte", name: "Posto Administrativo de Belo Horizonte" },
      { id: "posto-administrativo-de-infulene", name: "Posto Administrativo de Infulene" },
      { id: "posto-administrativo-de-liberdade", name: "Posto Administrativo de Liberdade" },
      { id: "posto-administrativo-de-machava", name: "Posto Administrativo de Machava" },
      { id: "posto-administrativo-de-matola-sede", name: "Posto Administrativo de Matola (Sede)" },
      { id: "posto-administrativo-de-matola-cidade", name: "Posto Administrativo de Matola Cidade" },
      { id: "posto-administrativo-de-zimpeto", name: "Posto Administrativo de Zimpeto" },
      ],
    },
    {
      id: "matutuine",
      name: "Matutuíne",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-catembe", name: "Posto Administrativo de Catembe" },
      { id: "posto-administrativo-de-catuane", name: "Posto Administrativo de Catuane" },
      { id: "posto-administrativo-de-machangulo", name: "Posto Administrativo de Machangulo" },
      { id: "posto-administrativo-de-missevene", name: "Posto Administrativo de Missevene" },
      { id: "posto-administrativo-de-zitundo", name: "Posto Administrativo de Zitundo" },
      ],
    },
    {
      id: "moamba",
      name: "Moamba",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-moamba", name: "Posto Administrativo de Moamba" },
      { id: "posto-administrativo-de-pessene", name: "Posto Administrativo de Pessene" },
      { id: "posto-administrativo-de-ressano-garcia", name: "Posto Administrativo de Ressano Garcia" },
      { id: "posto-administrativo-de-sabie", name: "Posto Administrativo de Sabie" },
      ],
    },
    {
      id: "namaacha",
      name: "Namaacha",
      municipalities: [
      { id: "namaacha", name: "Namaacha" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-changalane", name: "Posto Administrativo de Changalane" },
      { id: "posto-administrativo-de-namaacha", name: "Posto Administrativo de Namaacha" },
      ],
    }
    ],
  },
  {
    id: "cabo-delgado",
    name: "Cabo Delgado",
    districts: [
    {
      id: "ancuabe",
      name: "Ancuabe",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-ancuabe", name: "Posto Administrativo de Ancuabe" },
      { id: "posto-administrativo-de-metoro", name: "Posto Administrativo de Metoro" },
      { id: "posto-administrativo-de-meza", name: "Posto Administrativo de Meza" },
      ],
    },
    {
      id: "balama",
      name: "Balama",
      municipalities: [
      { id: "balama", name: "Balama" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-balama", name: "Posto Administrativo de Balama" },
      { id: "posto-administrativo-de-impiri", name: "Posto Administrativo de Impiri" },
      { id: "posto-administrativo-de-kuekue", name: "Posto Administrativo de Kuékué" },
      { id: "posto-administrativo-de-mavala", name: "Posto Administrativo de Mavala" },
      ],
    },
    {
      id: "chiure",
      name: "Chiúre",
      municipalities: [
      { id: "chiure", name: "Chiúre" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chiure", name: "Posto Administrativo de Chiúre" },
      { id: "posto-administrativo-de-chiure-velho", name: "Posto Administrativo de Chiúre Velho" },
      { id: "posto-administrativo-de-katapua", name: "Posto Administrativo de Katapua" },
      { id: "posto-administrativo-de-mazeze", name: "Posto Administrativo de Mazeze" },
      { id: "posto-administrativo-de-namogelia", name: "Posto Administrativo de Namogelia" },
      { id: "posto-administrativo-de-ocua", name: "Posto Administrativo de Ocua" },
      ],
    },
    {
      id: "ibo",
      name: "Ibo",
      municipalities: [
      { id: "ibo", name: "Ibo" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-ibo", name: "Posto Administrativo de Ibo" },
      { id: "posto-administrativo-de-quirimba", name: "Posto Administrativo de Quirimba" },
      ],
    },
    {
      id: "macomia",
      name: "Macomia",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chai", name: "Posto Administrativo de Chai" },
      { id: "posto-administrativo-de-macomia", name: "Posto Administrativo de Macomia" },
      { id: "posto-administrativo-de-mucojo", name: "Posto Administrativo de Mucojo" },
      { id: "posto-administrativo-de-quiterajo", name: "Posto Administrativo de Quiterajo" },
      ],
    },
    {
      id: "mecufi",
      name: "Mecúfi",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mecufi", name: "Posto Administrativo de Mecúfi" },
      { id: "posto-administrativo-de-murrebue", name: "Posto Administrativo de Murrebue" },
      ],
    },
    {
      id: "meluco",
      name: "Meluco",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-meluco", name: "Posto Administrativo de Meluco" },
      { id: "posto-administrativo-de-muaguide", name: "Posto Administrativo de Muaguide" },
      ],
    },
    {
      id: "metuge",
      name: "Metuge",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-metuge-sede", name: "Posto Administrativo de Metuge (Sede)" },
      ],
    },
    {
      id: "mocimboa-da-praia",
      name: "Mocímboa da Praia",
      municipalities: [
      { id: "mocimboa-da-praia", name: "Mocímboa da Praia" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-diaca", name: "Posto Administrativo de Diaca" },
      { id: "posto-administrativo-de-mbau", name: "Posto Administrativo de Mbau" },
      { id: "posto-administrativo-de-mocimboa-da-praia", name: "Posto Administrativo de Mocímboa da Praia" },
      ],
    },
    {
      id: "montepuez",
      name: "Montepuez",
      municipalities: [
      { id: "montepuez", name: "Montepuez" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-de-montepuez", name: "Posto Administrativo de Cidade de Montepuez" },
      { id: "posto-administrativo-de-mapupulo", name: "Posto Administrativo de Mapupulo" },
      { id: "posto-administrativo-de-mirate", name: "Posto Administrativo de Mirate" },
      { id: "posto-administrativo-de-nairoto", name: "Posto Administrativo de Nairoto" },
      { id: "posto-administrativo-de-namanhumbir", name: "Posto Administrativo de Namanhumbir" },
      ],
    },
    {
      id: "mueda",
      name: "Mueda",
      municipalities: [
      { id: "mueda", name: "Mueda" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-ilc-chapa-chapa-mueda-chapa-mocambique", name: "Posto Administrativo de {{ilc|Chapa|Chapa (Mueda)|Chapa (Moçambique)}}" },
      { id: "posto-administrativo-de-imbuho", name: "Posto Administrativo de Imbuho" },
      { id: "posto-administrativo-de-mueda", name: "Posto Administrativo de Mueda" },
      { id: "posto-administrativo-de-n-gapa", name: "Posto Administrativo de N'Gapa" },
      { id: "posto-administrativo-de-negomano", name: "Posto Administrativo de Negomano" },
      ],
    },
    {
      id: "muidumbe",
      name: "Muidumbe",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chitunda", name: "Posto Administrativo de Chitunda" },
      { id: "posto-administrativo-de-miteda", name: "Posto Administrativo de Miteda" },
      { id: "posto-administrativo-de-muidumbe", name: "Posto Administrativo de Muidumbe" },
      ],
    },
    {
      id: "namuno",
      name: "Namuno",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-hucula", name: "Posto Administrativo de Hucula" },
      { id: "posto-administrativo-de-luli", name: "Posto Administrativo de Luli" },
      { id: "posto-administrativo-de-machoca", name: "Posto Administrativo de Machoca" },
      { id: "posto-administrativo-de-meloco", name: "Posto Administrativo de Meloco" },
      { id: "posto-administrativo-de-namuno", name: "Posto Administrativo de Namuno" },
      { id: "posto-administrativo-de-ncumpe", name: "Posto Administrativo de Ncumpe" },
      ],
    },
    {
      id: "nangade",
      name: "Nangade",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-nangade", name: "Posto Administrativo de Nangade" },
      { id: "posto-administrativo-de-ntamba", name: "Posto Administrativo de Ntamba" },
      ],
    },
    {
      id: "palma",
      name: "Palma",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-olumbe", name: "Posto Administrativo de Olumbe" },
      { id: "posto-administrativo-de-palma", name: "Posto Administrativo de Palma" },
      { id: "posto-administrativo-de-pundanhar", name: "Posto Administrativo de Pundanhar" },
      { id: "posto-administrativo-de-quionga", name: "Posto Administrativo de Quionga" },
      ],
    },
    {
      id: "pemba",
      name: "Pemba",
      municipalities: [
      { id: "pemba", name: "Pemba" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-pemba-sede", name: "Posto Administrativo de Pemba (Sede)" },
      ],
    },
    {
      id: "quissanga",
      name: "Quissanga",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-bilibiza", name: "Posto Administrativo de Bilibiza" },
      { id: "posto-administrativo-de-mahate", name: "Posto Administrativo de Mahate" },
      { id: "posto-administrativo-de-quissanga", name: "Posto Administrativo de Quissanga" },
      ],
    }
    ],
  },
  {
    id: "gaza",
    name: "Gaza",
    districts: [
    {
      id: "bilene",
      name: "Bilene",
      municipalities: [
      { id: "praia-do-bilene", name: "Praia do Bilene" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-bilene-sede", name: "Posto Administrativo de Bilene (Sede)" },
      ],
    },
    {
      id: "chibuto",
      name: "Chibuto",
      municipalities: [
      { id: "chibuto", name: "Chibuto" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-alto-changane", name: "Posto Administrativo de Alto Changane" },
      { id: "posto-administrativo-de-chaimite", name: "Posto Administrativo de Chaimite" },
      { id: "posto-administrativo-de-changanine", name: "Posto Administrativo de Changanine" },
      { id: "posto-administrativo-de-cidade-de-chibuto", name: "Posto Administrativo de Cidade de Chibuto" },
      { id: "posto-administrativo-de-godide", name: "Posto Administrativo de Godide" },
      { id: "posto-administrativo-de-malehice", name: "Posto Administrativo de Malehice" },
      ],
    },
    {
      id: "chicualacuala",
      name: "Chicualacuala",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chicualacuala", name: "Posto Administrativo de Chicualacuala" },
      { id: "posto-administrativo-de-mapai", name: "Posto Administrativo de Mapai" },
      { id: "posto-administrativo-de-pafuri", name: "Posto Administrativo de Pafuri" },
      ],
    },
    {
      id: "chigubo",
      name: "Chigubo",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chigubo", name: "Posto Administrativo de Chigubo" },
      { id: "posto-administrativo-de-ndindiza", name: "Posto Administrativo de Ndindiza" },
      ],
    },
    {
      id: "chokwe",
      name: "Chókwè",
      municipalities: [
      { id: "chocue", name: "Chócue" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-chokwe", name: "Posto Administrativo de Cidade Chókwè" },
      { id: "posto-administrativo-de-lionde", name: "Posto Administrativo de Lionde" },
      { id: "posto-administrativo-de-macarretane", name: "Posto Administrativo de Macarretane" },
      { id: "posto-administrativo-de-xilembene", name: "Posto Administrativo de Xilembene" },
      ],
    },
    {
      id: "chongoene",
      name: "Chongoene",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chongoene-sede", name: "Posto Administrativo de Chongoene (Sede)" },
      ],
    },
    {
      id: "guija",
      name: "Guijá",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-canicado", name: "Posto Administrativo de Caniçado" },
      { id: "posto-administrativo-de-chivonguene", name: "Posto Administrativo de Chivonguene" },
      { id: "posto-administrativo-de-mubanguene", name: "Posto Administrativo de Mubanguene" },
      { id: "posto-administrativo-de-nalazi", name: "Posto Administrativo de Nalazi" },
      ],
    },
    {
      id: "limpopo",
      name: "Limpopo",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-limpopo-sede", name: "Posto Administrativo de Limpopo (Sede)" },
      ],
    },
    {
      id: "mabalane",
      name: "Mabalane",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-combomune", name: "Posto Administrativo de Combomune" },
      { id: "posto-administrativo-de-mabalane", name: "Posto Administrativo de Mabalane" },
      { id: "posto-administrativo-de-ntlavane", name: "Posto Administrativo de Ntlavane" },
      ],
    },
    {
      id: "manjacaze",
      name: "Manjacaze",
      municipalities: [
      { id: "macia", name: "Macia" },
      { id: "manjacaze", name: "Manjacaze" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chalala", name: "Posto Administrativo de Chalala" },
      { id: "posto-administrativo-de-chibonzane", name: "Posto Administrativo de Chibonzane" },
      { id: "posto-administrativo-de-chidenguele", name: "Posto Administrativo de Chidenguele" },
      { id: "posto-administrativo-de-macuacua", name: "Posto Administrativo de Macuacua" },
      { id: "posto-administrativo-de-mandlacaze", name: "Posto Administrativo de Mandlacaze" },
      { id: "posto-administrativo-de-mazucane", name: "Posto Administrativo de Mazucane" },
      { id: "posto-administrativo-de-nguzene", name: "Posto Administrativo de Nguzene" },
      ],
    },
    {
      id: "mapai",
      name: "Mapai",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mapai-sede", name: "Posto Administrativo de Mapai (Sede)" },
      ],
    },
    {
      id: "massangena",
      name: "Massangena",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-massangena", name: "Posto Administrativo de Massangena" },
      { id: "posto-administrativo-de-muvue", name: "Posto Administrativo de Muvue" },
      ],
    },
    {
      id: "massingir",
      name: "Massingir",
      municipalities: [
      { id: "massingir", name: "Massingir" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-massingir", name: "Posto Administrativo de Massingir" },
      { id: "posto-administrativo-de-mavodze", name: "Posto Administrativo de Mavodze" },
      { id: "posto-administrativo-de-zulo", name: "Posto Administrativo de Zulo" },
      ],
    },
    {
      id: "xai-xai",
      name: "Xai-Xai",
      municipalities: [
      { id: "xai-xai", name: "Xai-Xai" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chicumbane", name: "Posto Administrativo de Chicumbane" },
      { id: "posto-administrativo-de-chongoene", name: "Posto Administrativo de Chongoene" },
      { id: "posto-administrativo-de-zonguene", name: "Posto Administrativo de Zonguene" },
      ],
    }
    ],
  },
  {
    id: "inhambane",
    name: "Inhambane",
    districts: [
    {
      id: "funhalouro",
      name: "Funhalouro",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-funhalouro", name: "Posto Administrativo de Funhalouro" },
      { id: "posto-administrativo-de-tome", name: "Posto Administrativo de Tome" },
      ],
    },
    {
      id: "govuro",
      name: "Govuro",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-nova-mambone", name: "Posto Administrativo de Nova Mambone" },
      { id: "posto-administrativo-de-save", name: "Posto Administrativo de Save" },
      ],
    },
    {
      id: "homoine",
      name: "Homoíne",
      municipalities: [
      { id: "homoine", name: "Homoíne" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-homoine", name: "Posto Administrativo de Homoíne" },
      { id: "posto-administrativo-de-pembe", name: "Posto Administrativo de Pembe" },
      ],
    },
    {
      id: "inhambane",
      name: "Inhambane",
      municipalities: [
      { id: "inhambane", name: "Inhambane" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-inhambane-sede", name: "Posto Administrativo de Inhambane (Sede)" },
      ],
    },
    {
      id: "inharrime",
      name: "Inharrime",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-inharrime", name: "Posto Administrativo de Inharrime" },
      { id: "posto-administrativo-de-mucumbi", name: "Posto Administrativo de Mucumbi" },
      ],
    },
    {
      id: "inhassoro",
      name: "Inhassoro",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-bazaruto", name: "Posto Administrativo de Bazaruto" },
      { id: "posto-administrativo-de-inhassoro", name: "Posto Administrativo de Inhassoro" },
      ],
    },
    {
      id: "jangamo",
      name: "Jangamo",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-cumbana", name: "Posto Administrativo de Cumbana" },
      { id: "posto-administrativo-de-jangamo", name: "Posto Administrativo de Jangamo" },
      ],
    },
    {
      id: "mabote",
      name: "Mabote",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mabote", name: "Posto Administrativo de Mabote" },
      { id: "posto-administrativo-de-zimane", name: "Posto Administrativo de Zimane" },
      { id: "posto-administrativo-de-zinave", name: "Posto Administrativo de Zinave" },
      ],
    },
    {
      id: "massinga",
      name: "Massinga",
      municipalities: [
      { id: "massinga", name: "Massinga" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chicomo", name: "Posto Administrativo de Chicomo" },
      { id: "posto-administrativo-de-massinga", name: "Posto Administrativo de Massinga" },
      ],
    },
    {
      id: "maxixe",
      name: "Maxixe",
      municipalities: [
      { id: "maxixe", name: "Maxixe" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-maxixe-sede", name: "Posto Administrativo de Maxixe (Sede)" },
      ],
    },
    {
      id: "morrumbene",
      name: "Morrumbene",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-morrumbene", name: "Posto Administrativo de Morrumbene" },
      { id: "posto-administrativo-de-mucodoene", name: "Posto Administrativo de Mucodoene" },
      ],
    },
    {
      id: "panda",
      name: "Panda",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mawayela", name: "Posto Administrativo de Mawayela" },
      { id: "posto-administrativo-de-panda", name: "Posto Administrativo de Panda" },
      { id: "posto-administrativo-de-urrene", name: "Posto Administrativo de Urrene" },
      ],
    },
    {
      id: "vilanculos",
      name: "Vilanculos",
      municipalities: [
      { id: "vilanculos", name: "Vilanculos" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-mapinhane", name: "Posto Administrativo de Mapinhane" },
      { id: "posto-administrativo-de-vilanculos", name: "Posto Administrativo de Vilanculos" },
      ],
    },
    {
      id: "zavala",
      name: "Zavala",
      municipalities: [
      { id: "quissico", name: "Quissico" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-quissico", name: "Posto Administrativo de Quissico" },
      { id: "posto-administrativo-de-zandamela", name: "Posto Administrativo de Zandamela" },
      ],
    }
    ],
  },
  {
    id: "manica",
    name: "Manica",
    districts: [
    {
      id: "barue",
      name: "Bárue",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-catandica", name: "Posto Administrativo de Catandica" },
      { id: "posto-administrativo-de-choa", name: "Posto Administrativo de Choa" },
      { id: "posto-administrativo-de-nhampassa", name: "Posto Administrativo de Nhampassa" },
      ],
    },
    {
      id: "chimoio",
      name: "Chimoio",
      municipalities: [
      { id: "chimoio", name: "Chimoio" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chimoio-sede", name: "Posto Administrativo de Chimoio (Sede)" },
      ],
    },
    {
      id: "gondola",
      name: "Gondola",
      municipalities: [
      { id: "catandica", name: "Catandica" },
      { id: "gondola", name: "Gondola" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-amatongas", name: "Posto Administrativo de Amatongas" },
      { id: "posto-administrativo-de-cafumpe", name: "Posto Administrativo de Cafumpe" },
      { id: "posto-administrativo-de-gondola", name: "Posto Administrativo de Gondola" },
      { id: "posto-administrativo-de-inchope", name: "Posto Administrativo de Inchope" },
      ],
    },
    {
      id: "guro",
      name: "Guro",
      municipalities: [
      { id: "guro", name: "Guro" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-guro", name: "Posto Administrativo de Guro" },
      { id: "posto-administrativo-de-mandie", name: "Posto Administrativo de Mandie" },
      { id: "posto-administrativo-de-mungari", name: "Posto Administrativo de Mungari" },
      { id: "posto-administrativo-de-nhamassonge", name: "Posto Administrativo de Nhamassonge" },
      ],
    },
    {
      id: "macate",
      name: "Macate",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-ilc-macate-macate-vila-macate-mocambique", name: "Posto Administrativo de {{ilc|Macate|Macate (vila)|Macate (Moçambique)}}" },
      { id: "posto-administrativo-de-zembe", name: "Posto Administrativo de Zembe" },
      ],
    },
    {
      id: "machaze",
      name: "Machaze",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-machaze", name: "Posto Administrativo de Machaze" },
      { id: "posto-administrativo-de-save", name: "Posto Administrativo de Save" },
      ],
    },
    {
      id: "macossa",
      name: "Macossa",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-macossa", name: "Posto Administrativo de Macossa" },
      { id: "posto-administrativo-de-nguawala", name: "Posto Administrativo de Nguawala" },
      { id: "posto-administrativo-de-nhamangua", name: "Posto Administrativo de Nhamangua" },
      ],
    },
    {
      id: "manica",
      name: "Manica",
      municipalities: [
      { id: "manica", name: "Manica" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-de-manica", name: "Posto Administrativo de Cidade de Manica" },
      { id: "posto-administrativo-de-machipanda", name: "Posto Administrativo de Machipanda" },
      { id: "posto-administrativo-de-mavonde", name: "Posto Administrativo de Mavonde" },
      { id: "posto-administrativo-de-messica", name: "Posto Administrativo de Messica" },
      ],
    },
    {
      id: "mossurize",
      name: "Mossurize",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chiurairue", name: "Posto Administrativo de Chiurairue" },
      { id: "posto-administrativo-de-dacata", name: "Posto Administrativo de Dacata" },
      { id: "posto-administrativo-de-espungabera", name: "Posto Administrativo de Espungabera" },
      ],
    },
    {
      id: "sussundenga",
      name: "Sussundenga",
      municipalities: [
      { id: "sussundenga", name: "Sussundenga" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-dombe", name: "Posto Administrativo de Dombe" },
      { id: "posto-administrativo-de-muhoa", name: "Posto Administrativo de Muhoa" },
      { id: "posto-administrativo-de-rotanda", name: "Posto Administrativo de Rotanda" },
      { id: "posto-administrativo-de-sussundenga", name: "Posto Administrativo de Sussundenga" },
      ],
    },
    {
      id: "tambara",
      name: "Tambara",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-buzua", name: "Posto Administrativo de Buzua" },
      { id: "posto-administrativo-de-nhacafula", name: "Posto Administrativo de Nhacafula" },
      { id: "posto-administrativo-de-nhacolo", name: "Posto Administrativo de Nhacolo" },
      ],
    },
    {
      id: "vanduzi",
      name: "Vanduzi",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-matsinho", name: "Posto Administrativo de Matsinho" },
      { id: "posto-administrativo-de-vanduzi", name: "Posto Administrativo de Vanduzi" },
      ],
    }
    ],
  },
  {
    id: "nampula",
    name: "Nampula",
    districts: [
    {
      id: "angoche",
      name: "Angoche",
      municipalities: [
      { id: "angoche", name: "Angoche" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-aube", name: "Posto Administrativo de Aube" },
      { id: "posto-administrativo-de-boila-nametoria", name: "Posto Administrativo de Boila - Nametoria" },
      { id: "posto-administrativo-de-cidade-de-angoche", name: "Posto Administrativo de Cidade de Angoche" },
      { id: "posto-administrativo-de-namaponda", name: "Posto Administrativo de Namaponda" },
      ],
    },
    {
      id: "erati",
      name: "Eráti",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-alua", name: "Posto Administrativo de Alua" },
      { id: "posto-administrativo-de-namapa", name: "Posto Administrativo de Namapa" },
      { id: "posto-administrativo-de-namiroa", name: "Posto Administrativo de Namiroa" },
      ],
    },
    {
      id: "ilha-de-mocambique",
      name: "Ilha de Moçambique",
      municipalities: [
      { id: "ilha-de-mocambique", name: "Ilha de Moçambique" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-ilha-de-mocambique", name: "Posto Administrativo de Cidade Ilha de Mocambique" },
      { id: "posto-administrativo-de-lumbo", name: "Posto Administrativo de Lumbo" },
      ],
    },
    {
      id: "lalaua",
      name: "Lalaua",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-lalaua", name: "Posto Administrativo de Lalaua" },
      { id: "posto-administrativo-de-meti", name: "Posto Administrativo de Meti" },
      ],
    },
    {
      id: "larde",
      name: "Larde",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-larde-sede", name: "Posto Administrativo de Larde (Sede)" },
      ],
    },
    {
      id: "liupo",
      name: "Liúpo",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-liupo-sede", name: "Posto Administrativo de Liúpo (Sede)" },
      ],
    },
    {
      id: "malema",
      name: "Malema",
      municipalities: [
      { id: "malema", name: "Malema" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chihulo", name: "Posto Administrativo de Chihulo" },
      { id: "posto-administrativo-de-malema", name: "Posto Administrativo de Malema" },
      { id: "posto-administrativo-de-mutuali", name: "Posto Administrativo de Mutuali" },
      ],
    },
    {
      id: "meconta",
      name: "Meconta",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-7-de-abril", name: "Posto Administrativo de 7 de Abril" },
      { id: "posto-administrativo-de-corrane", name: "Posto Administrativo de Corrane" },
      { id: "posto-administrativo-de-meconta", name: "Posto Administrativo de Meconta" },
      { id: "posto-administrativo-de-namialo", name: "Posto Administrativo de Namialo" },
      ],
    },
    {
      id: "mecuburi",
      name: "Mecubúri",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mecuburi", name: "Posto Administrativo de Mecubúri" },
      { id: "posto-administrativo-de-milhana", name: "Posto Administrativo de Milhana" },
      { id: "posto-administrativo-de-muite", name: "Posto Administrativo de Muite" },
      { id: "posto-administrativo-de-namina", name: "Posto Administrativo de Namina" },
      ],
    },
    {
      id: "memba",
      name: "Memba",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chipene", name: "Posto Administrativo de Chipene" },
      { id: "posto-administrativo-de-lurio", name: "Posto Administrativo de Lurio" },
      { id: "posto-administrativo-de-mazue", name: "Posto Administrativo de Mazue" },
      { id: "posto-administrativo-de-memba", name: "Posto Administrativo de Memba" },
      ],
    },
    {
      id: "mogincual",
      name: "Mogincual",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chunga", name: "Posto Administrativo de Chunga" },
      { id: "posto-administrativo-de-liupo", name: "Posto Administrativo de Liupo" },
      { id: "posto-administrativo-de-mongicuala", name: "Posto Administrativo de Mongicuala" },
      { id: "posto-administrativo-de-quinga", name: "Posto Administrativo de Quinga" },
      { id: "posto-administrativo-de-quixaxe", name: "Posto Administrativo de Quixaxe" },
      ],
    },
    {
      id: "mogovolas",
      name: "Mogovolas",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-calipo", name: "Posto Administrativo de Calipo" },
      { id: "posto-administrativo-de-ilute", name: "Posto Administrativo de Ilute" },
      { id: "posto-administrativo-de-muatua", name: "Posto Administrativo de Muatua" },
      { id: "posto-administrativo-de-nametil", name: "Posto Administrativo de Nametil" },
      { id: "posto-administrativo-de-nanhupo", name: "Posto Administrativo de Nanhupo" },
      ],
    },
    {
      id: "moma",
      name: "Moma",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chalaua", name: "Posto Administrativo de Chalaua" },
      { id: "posto-administrativo-de-larde", name: "Posto Administrativo de Larde" },
      { id: "posto-administrativo-de-macone", name: "Posto Administrativo de Macone" },
      { id: "posto-administrativo-de-mucuali", name: "Posto Administrativo de Mucuali" },
      ],
    },
    {
      id: "monapo",
      name: "Monapo",
      municipalities: [
      { id: "monapo", name: "Monapo" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-itoculo", name: "Posto Administrativo de Itoculo" },
      { id: "posto-administrativo-de-monapo", name: "Posto Administrativo de Monapo" },
      { id: "posto-administrativo-de-netia", name: "Posto Administrativo de Netia" },
      ],
    },
    {
      id: "mossuril",
      name: "Mossuril",
      municipalities: [
      { id: "mossuril", name: "Mossuril" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-lunga", name: "Posto Administrativo de Lunga" },
      { id: "posto-administrativo-de-matibane", name: "Posto Administrativo de Matibane" },
      { id: "posto-administrativo-de-mossuril", name: "Posto Administrativo de Mossuril" },
      ],
    },
    {
      id: "muecate",
      name: "Muecate",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-imala", name: "Posto Administrativo de Imala" },
      { id: "posto-administrativo-de-muculuone", name: "Posto Administrativo de Muculuone" },
      { id: "posto-administrativo-de-muecate", name: "Posto Administrativo de Muecate" },
      ],
    },
    {
      id: "murrupula",
      name: "Murrupula",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chinga", name: "Posto Administrativo de Chinga" },
      { id: "posto-administrativo-de-murrupula", name: "Posto Administrativo de Murrupula" },
      { id: "posto-administrativo-de-nehessine", name: "Posto Administrativo de Nehessine" },
      ],
    },
    {
      id: "nacala-porto",
      name: "Nacala Porto",
      municipalities: [
      { id: "nacala-porto", name: "Nacala Porto" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-urbano-maiaia", name: "Posto Administrativo de Urbano Maiaia" },
      { id: "posto-administrativo-de-urbano-muanona", name: "Posto Administrativo de Urbano Muanona" },
      { id: "posto-administrativo-de-urbano-mutiva", name: "Posto Administrativo de Urbano Mutiva" },
      ],
    },
    {
      id: "nacala-a-velha",
      name: "Nacala-a-Velha",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-covo", name: "Posto Administrativo de Covo" },
      { id: "posto-administrativo-de-nacala-a-velha", name: "Posto Administrativo de Nacala-a-Velha" },
      ],
    },
    {
      id: "nacaroa",
      name: "Nacarôa",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-intete", name: "Posto Administrativo de Intete" },
      { id: "posto-administrativo-de-nacaroa", name: "Posto Administrativo de Nacarôa" },
      { id: "posto-administrativo-de-saua-saua", name: "Posto Administrativo de Saua-Saua" },
      ],
    },
    {
      id: "nampula",
      name: "Nampula",
      municipalities: [
      { id: "nampula", name: "Nampula" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-muatala", name: "Posto Administrativo de Muatala" },
      { id: "posto-administrativo-de-muhala", name: "Posto Administrativo de Muhala" },
      { id: "posto-administrativo-de-namikopo", name: "Posto Administrativo de Namikopo" },
      { id: "posto-administrativo-de-napipine", name: "Posto Administrativo de Napipine" },
      { id: "posto-administrativo-de-natikire", name: "Posto Administrativo de Natikire" },
      { id: "posto-administrativo-de-urbano-central", name: "Posto Administrativo de Urbano Central" },
      ],
    },
    {
      id: "rapale",
      name: "Rapale",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-anchilo", name: "Posto Administrativo de Anchilo" },
      { id: "posto-administrativo-de-mutivaze", name: "Posto Administrativo de Mutivaze" },
      { id: "posto-administrativo-de-namaita", name: "Posto Administrativo de Namaita" },
      { id: "posto-administrativo-de-rapale", name: "Posto Administrativo de Rapale" },
      ],
    },
    {
      id: "ribaue",
      name: "Ribaué",
      municipalities: [
      { id: "ribaue", name: "Ribaué" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-iapala", name: "Posto Administrativo de Iapala" },
      { id: "posto-administrativo-de-kunle", name: "Posto Administrativo de Kunle" },
      { id: "posto-administrativo-de-ribaue", name: "Posto Administrativo de Ribaué" },
      ],
    }
    ],
  },
  {
    id: "niassa",
    name: "Niassa",
    districts: [
    {
      id: "chimbonila",
      name: "Chimbonila",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chimbonila-sede", name: "Posto Administrativo de Chimbonila (Sede)" },
      ],
    },
    {
      id: "cuamba",
      name: "Cuamba",
      municipalities: [
      { id: "cuamba", name: "Cuamba" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-de-cuamba", name: "Posto Administrativo de Cidade de Cuamba" },
      { id: "posto-administrativo-de-etatara", name: "Posto Administrativo de Etatara" },
      { id: "posto-administrativo-de-lurio", name: "Posto Administrativo de Lurio" },
      ],
    },
    {
      id: "lago",
      name: "Lago",
      municipalities: [
      { id: "metangula", name: "Metangula" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chimbonila", name: "Posto Administrativo de Chimbonila" },
      { id: "posto-administrativo-de-cobue", name: "Posto Administrativo de Cobue" },
      { id: "posto-administrativo-de-lichinga", name: "Posto Administrativo de Lichinga" },
      { id: "posto-administrativo-de-lione", name: "Posto Administrativo de Lione" },
      { id: "posto-administrativo-de-lunho", name: "Posto Administrativo de Lunho" },
      { id: "posto-administrativo-de-maniamba", name: "Posto Administrativo de Maniamba" },
      { id: "posto-administrativo-de-meponda", name: "Posto Administrativo de Meponda" },
      { id: "posto-administrativo-de-metangula", name: "Posto Administrativo de Metangula" },
      { id: "posto-administrativo-de-niassa", name: "Posto Administrativo de Niassa" },
      ],
    },
    {
      id: "lichinga",
      name: "Lichinga",
      municipalities: [
      { id: "lichinga", name: "Lichinga" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-lichinga-sede", name: "Posto Administrativo de Lichinga (Sede)" },
      ],
    },
    {
      id: "majune",
      name: "Majune",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-majune", name: "Posto Administrativo de Majune" },
      { id: "posto-administrativo-de-muaquia", name: "Posto Administrativo de Muaquia" },
      { id: "posto-administrativo-de-nairrubi", name: "Posto Administrativo de Nairrubi" },
      ],
    },
    {
      id: "mandimba",
      name: "Mandimba",
      municipalities: [
      { id: "mandimba", name: "Mandimba" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-mandimba", name: "Posto Administrativo de Mandimba" },
      { id: "posto-administrativo-de-mitande", name: "Posto Administrativo de Mitande" },
      ],
    },
    {
      id: "marrupa",
      name: "Marrupa",
      municipalities: [
      { id: "marrupa", name: "Marrupa" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-marangira", name: "Posto Administrativo de Marangira" },
      { id: "posto-administrativo-de-marrupa", name: "Posto Administrativo de Marrupa" },
      { id: "posto-administrativo-de-nungo", name: "Posto Administrativo de Nungo" },
      ],
    },
    {
      id: "maua",
      name: "Maúa",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-maiaca", name: "Posto Administrativo de Maiaca" },
      { id: "posto-administrativo-de-maua", name: "Posto Administrativo de Maua" },
      ],
    },
    {
      id: "mavago",
      name: "Mavago",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-m-sawize", name: "Posto Administrativo de M'Sawize" },
      { id: "posto-administrativo-de-mavago", name: "Posto Administrativo de Mavago" },
      ],
    },
    {
      id: "mecanhelas",
      name: "Mecanhelas",
      municipalities: [
      { id: "insaca", name: "Insaca" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chiuta", name: "Posto Administrativo de Chiuta" },
      { id: "posto-administrativo-de-mecanhelas", name: "Posto Administrativo de Mecanhelas" },
      ],
    },
    {
      id: "mecula",
      name: "Mecula",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-matondovela", name: "Posto Administrativo de Matondovela" },
      { id: "posto-administrativo-de-mecula", name: "Posto Administrativo de Mecula" },
      ],
    },
    {
      id: "metarica",
      name: "Metarica",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-metarica", name: "Posto Administrativo de Metarica" },
      { id: "posto-administrativo-de-mucumua", name: "Posto Administrativo de Mucumua" },
      ],
    },
    {
      id: "muembe",
      name: "Muembe",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chiconono", name: "Posto Administrativo de Chiconono" },
      { id: "posto-administrativo-de-muembe", name: "Posto Administrativo de Muembe" },
      ],
    },
    {
      id: "n-gauma",
      name: "N'gauma",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-itepela", name: "Posto Administrativo de Itepela" },
      { id: "posto-administrativo-de-massangulo", name: "Posto Administrativo de Massangulo" },
      ],
    },
    {
      id: "nipepe",
      name: "Nipepe",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-muipite", name: "Posto Administrativo de Muipite" },
      { id: "posto-administrativo-de-nipepe", name: "Posto Administrativo de Nipepe" },
      ],
    },
    {
      id: "sanga",
      name: "Sanga",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-lussimbeze", name: "Posto Administrativo de Lussimbeze" },
      { id: "posto-administrativo-de-macaloge", name: "Posto Administrativo de Macaloge" },
      { id: "posto-administrativo-de-matchedje", name: "Posto Administrativo de Matchedje" },
      { id: "posto-administrativo-de-sanga", name: "Posto Administrativo de Sanga" },
      ],
    }
    ],
  },
  {
    id: "sofala",
    name: "Sofala",
    districts: [
    {
      id: "beira",
      name: "Beira",
      municipalities: [
      { id: "beira", name: "Beira" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-urbano-1-central", name: "Posto Administrativo de Urbano 1 - Central" },
      { id: "posto-administrativo-de-urbano-2-munhava", name: "Posto Administrativo de Urbano 2 - Munhava" },
      { id: "posto-administrativo-de-urbano-3-inhamizua", name: "Posto Administrativo de Urbano 3 - Inhamizua" },
      { id: "posto-administrativo-de-urbano-4-manga-loforte", name: "Posto Administrativo de Urbano 4 - Manga Loforte" },
      { id: "posto-administrativo-de-urbano-5-nhangau", name: "Posto Administrativo de Urbano 5 - Nhangau" },
      ],
    },
    {
      id: "buzi",
      name: "Búzi",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-buzi", name: "Posto Administrativo de Búzi" },
      { id: "posto-administrativo-de-estaquinha", name: "Posto Administrativo de Estaquinha" },
      { id: "posto-administrativo-de-nova-sofala", name: "Posto Administrativo de Nova-Sofala" },
      ],
    },
    {
      id: "caia",
      name: "Caia",
      municipalities: [
      { id: "caia", name: "Caia" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-caia", name: "Posto Administrativo de Caia" },
      { id: "posto-administrativo-de-murraca", name: "Posto Administrativo de Murraça" },
      { id: "posto-administrativo-de-sena", name: "Posto Administrativo de Sena" },
      ],
    },
    {
      id: "chemba",
      name: "Chemba",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chemba", name: "Posto Administrativo de Chemba" },
      { id: "posto-administrativo-de-chiramba", name: "Posto Administrativo de Chiramba" },
      { id: "posto-administrativo-de-mulima", name: "Posto Administrativo de Mulima" },
      ],
    },
    {
      id: "cheringoma",
      name: "Cheringoma",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-inhaminga", name: "Posto Administrativo de Inhaminga" },
      { id: "posto-administrativo-de-inhamitanga", name: "Posto Administrativo de Inhamitanga" },
      ],
    },
    {
      id: "chibabava",
      name: "Chibabava",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chibabava", name: "Posto Administrativo de Chibabava" },
      { id: "posto-administrativo-de-goonda", name: "Posto Administrativo de Goonda" },
      { id: "posto-administrativo-de-muxungue", name: "Posto Administrativo de Muxungue" },
      ],
    },
    {
      id: "dondo",
      name: "Dondo",
      municipalities: [
      { id: "dondo", name: "Dondo" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-de-dondo", name: "Posto Administrativo de Cidade de Dondo" },
      { id: "posto-administrativo-de-mafambisse", name: "Posto Administrativo de Mafambisse" },
      ],
    },
    {
      id: "gorongosa",
      name: "Gorongosa",
      municipalities: [
      { id: "gorongosa", name: "Gorongosa" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-gorongosa", name: "Posto Administrativo de Gorongosa" },
      { id: "posto-administrativo-de-nhamadzi", name: "Posto Administrativo de Nhamadzi" },
      { id: "posto-administrativo-de-vanduzi", name: "Posto Administrativo de Vanduzi" },
      ],
    },
    {
      id: "machanga",
      name: "Machanga",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-divinhe", name: "Posto Administrativo de Divinhe" },
      { id: "posto-administrativo-de-machanga", name: "Posto Administrativo de Machanga" },
      ],
    },
    {
      id: "maringue",
      name: "Maringué",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-canxixe", name: "Posto Administrativo de Canxixe" },
      { id: "posto-administrativo-de-maringue", name: "Posto Administrativo de Maringué" },
      { id: "posto-administrativo-de-subui", name: "Posto Administrativo de Subui" },
      ],
    },
    {
      id: "marromeu",
      name: "Marromeu",
      municipalities: [
      { id: "marromeu", name: "Marromeu" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chupanga", name: "Posto Administrativo de Chupanga" },
      { id: "posto-administrativo-de-marromeu", name: "Posto Administrativo de Marromeu" },
      ],
    },
    {
      id: "muanza",
      name: "Muanza",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-galinha", name: "Posto Administrativo de Galinha" },
      { id: "posto-administrativo-de-muanza", name: "Posto Administrativo de Muanza" },
      ],
    },
    {
      id: "nhamatanda",
      name: "Nhamatanda",
      municipalities: [
      { id: "nhamatanda", name: "Nhamatanda" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-nhamatanda", name: "Posto Administrativo de Nhamatanda" },
      { id: "posto-administrativo-de-tica", name: "Posto Administrativo de Tica" },
      ],
    }
    ],
  },
  {
    id: "tete",
    name: "Tete",
    districts: [
    {
      id: "angonia",
      name: "Angónia",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-domue", name: "Posto Administrativo de Domue" },
      { id: "posto-administrativo-de-ulongoe", name: "Posto Administrativo de Ulongoe" },
      ],
    },
    {
      id: "cahora-bassa",
      name: "Cahora-Bassa",
      municipalities: [
      { id: "chitima", name: "Chitima" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chitholo", name: "Posto Administrativo de Chitholo" },
      { id: "posto-administrativo-de-chitima", name: "Posto Administrativo de Chitima" },
      { id: "posto-administrativo-de-songo", name: "Posto Administrativo de Songo" },
      ],
    },
    {
      id: "changara",
      name: "Changara",
      municipalities: [
      { id: "nhamayabue", name: "Nhamayabué" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chioco", name: "Posto Administrativo de Chioco" },
      { id: "posto-administrativo-de-luenha", name: "Posto Administrativo de Luenha" },
      { id: "posto-administrativo-de-mavara", name: "Posto Administrativo de Mavara" },
      ],
    },
    {
      id: "chifunde",
      name: "Chifunde",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chifunde", name: "Posto Administrativo de Chifunde" },
      { id: "posto-administrativo-de-mualadzi", name: "Posto Administrativo de Mualadzi" },
      { id: "posto-administrativo-de-n-sadzo", name: "Posto Administrativo de N'Sadzo" },
      ],
    },
    {
      id: "chiuta",
      name: "Chiuta",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-kazula", name: "Posto Administrativo de Kazula" },
      { id: "posto-administrativo-de-mange", name: "Posto Administrativo de Mange" },
      ],
    },
    {
      id: "doa",
      name: "Dôa",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-doa-sede", name: "Posto Administrativo de Dôa (Sede)" },
      ],
    },
    {
      id: "macanga",
      name: "Macanga",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chidzolomondo", name: "Posto Administrativo de Chidzolomondo" },
      { id: "posto-administrativo-de-furancungo", name: "Posto Administrativo de Furancungo" },
      ],
    },
    {
      id: "magoe",
      name: "Magoé",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chinthopo", name: "Posto Administrativo de Chinthopo" },
      { id: "posto-administrativo-de-mpheende", name: "Posto Administrativo de Mpheende" },
      { id: "posto-administrativo-de-mukumbura", name: "Posto Administrativo de Mukumbura" },
      ],
    },
    {
      id: "marara",
      name: "Marara",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-marara-sede", name: "Posto Administrativo de Marara (Sede)" },
      ],
    },
    {
      id: "maravia",
      name: "Marávia",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chepera", name: "Posto Administrativo de Chepera" },
      { id: "posto-administrativo-de-chiputo", name: "Posto Administrativo de Chiputo" },
      { id: "posto-administrativo-de-fingoe", name: "Posto Administrativo de Fingoe" },
      { id: "posto-administrativo-de-molowera", name: "Posto Administrativo de Molowera" },
      ],
    },
    {
      id: "moatize",
      name: "Moatize",
      municipalities: [
      { id: "moatize", name: "Moatize" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-kambulatsitsi", name: "Posto Administrativo de Kambulatsitsi" },
      { id: "posto-administrativo-de-moatize", name: "Posto Administrativo de Moatize" },
      { id: "posto-administrativo-de-zombue", name: "Posto Administrativo de Zombue" },
      ],
    },
    {
      id: "mutarara",
      name: "Mutarara",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chare", name: "Posto Administrativo de Chare" },
      { id: "posto-administrativo-de-doa", name: "Posto Administrativo de Doa" },
      { id: "posto-administrativo-de-inhangoma", name: "Posto Administrativo de Inhangoma" },
      { id: "posto-administrativo-de-nhamayabue", name: "Posto Administrativo de Nhamayabué" },
      ],
    },
    {
      id: "tete",
      name: "Tete",
      municipalities: [
      { id: "tete", name: "Tete" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-tete-sede", name: "Posto Administrativo de Tete (Sede)" },
      ],
    },
    {
      id: "tsangano",
      name: "Tsangano",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-ntengo-wambalame", name: "Posto Administrativo de Ntengo-Wambalame" },
      { id: "posto-administrativo-de-tsangano", name: "Posto Administrativo de Tsangano" },
      ],
    },
    {
      id: "zumbo",
      name: "Zumbo",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-muze", name: "Posto Administrativo de Muze" },
      { id: "posto-administrativo-de-zambue", name: "Posto Administrativo de Zambue" },
      { id: "posto-administrativo-de-zumbo", name: "Posto Administrativo de Zumbo" },
      ],
    }
    ],
  },
  {
    id: "zambezia",
    name: "Zambézia",
    districts: [
    {
      id: "alto-molocue",
      name: "Alto Molócue",
      municipalities: [
      { id: "alto-molocue", name: "Alto Molócue" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-alto-molocue", name: "Posto Administrativo de Alto Molócue" },
      { id: "posto-administrativo-de-nauela", name: "Posto Administrativo de Nauela" },
      ],
    },
    {
      id: "chinde",
      name: "Chinde",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-chinde-sede", name: "Posto Administrativo de Chinde - Sede" },
      { id: "posto-administrativo-de-luabo", name: "Posto Administrativo de Luabo" },
      { id: "posto-administrativo-de-micaune", name: "Posto Administrativo de Micaune" },
      ],
    },
    {
      id: "derre",
      name: "Derre",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-derre-sede", name: "Posto Administrativo de Derre (Sede)" },
      ],
    },
    {
      id: "gile",
      name: "Gilé",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-alto-ligonha", name: "Posto Administrativo de Alto Ligonha" },
      { id: "posto-administrativo-de-gile", name: "Posto Administrativo de Gilé" },
      ],
    },
    {
      id: "gurue",
      name: "Gurué",
      municipalities: [
      { id: "gurue", name: "Gurué" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-de-gurue", name: "Posto Administrativo de Cidade de Gurué" },
      { id: "posto-administrativo-de-lioma", name: "Posto Administrativo de Lioma" },
      { id: "posto-administrativo-de-nepuagiua", name: "Posto Administrativo de Nepuagiua" },
      ],
    },
    {
      id: "ile",
      name: "Ile",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-ile", name: "Posto Administrativo de Ile" },
      { id: "posto-administrativo-de-mulevala", name: "Posto Administrativo de Mulevala" },
      { id: "posto-administrativo-de-socone", name: "Posto Administrativo de Socone" },
      ],
    },
    {
      id: "inhassunge",
      name: "Inhassunge",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-gonhane", name: "Posto Administrativo de Gonhane" },
      { id: "posto-administrativo-de-mucupia", name: "Posto Administrativo de Mucupia" },
      ],
    },
    {
      id: "luabo",
      name: "Luabo",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-luabo-sede", name: "Posto Administrativo de Luabo (Sede)" },
      ],
    },
    {
      id: "lugela",
      name: "Lugela",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-lugela", name: "Posto Administrativo de Lugela" },
      { id: "posto-administrativo-de-muabanama", name: "Posto Administrativo de Muabanama" },
      { id: "posto-administrativo-de-munhamade", name: "Posto Administrativo de Munhamade" },
      { id: "posto-administrativo-de-tacuane", name: "Posto Administrativo de Tacuane" },
      ],
    },
    {
      id: "maganja-da-costa",
      name: "Maganja da Costa",
      municipalities: [
      { id: "maganja-da-costa", name: "Maganja da Costa" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-bojone", name: "Posto Administrativo de Bojone" },
      { id: "posto-administrativo-de-maganja-da-costa", name: "Posto Administrativo de Maganja da Costa" },
      { id: "posto-administrativo-de-mocubela", name: "Posto Administrativo de Mocubela" },
      { id: "posto-administrativo-de-nante", name: "Posto Administrativo de Nante" },
      ],
    },
    {
      id: "milange",
      name: "Milange",
      municipalities: [
      { id: "milange", name: "Milange" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-majaua", name: "Posto Administrativo de Majaua" },
      { id: "posto-administrativo-de-milange", name: "Posto Administrativo de Milange" },
      { id: "posto-administrativo-de-molumbo", name: "Posto Administrativo de Molumbo" },
      { id: "posto-administrativo-de-mongue", name: "Posto Administrativo de Mongue" },
      ],
    },
    {
      id: "mocuba",
      name: "Mocuba",
      municipalities: [
      { id: "mocuba", name: "Mocuba" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-cidade-de-mocuba", name: "Posto Administrativo de Cidade de Mocuba" },
      { id: "posto-administrativo-de-mugeba", name: "Posto Administrativo de Mugeba" },
      { id: "posto-administrativo-de-namajavira", name: "Posto Administrativo de Namajavira" },
      ],
    },
    {
      id: "mocubela",
      name: "Mocubela",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mocubela-sede", name: "Posto Administrativo de Mocubela (Sede)" },
      ],
    },
    {
      id: "molumbo",
      name: "Molumbo",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-molumbo-sede", name: "Posto Administrativo de Molumbo (Sede)" },
      ],
    },
    {
      id: "mopeia",
      name: "Mopeia",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-campo", name: "Posto Administrativo de Campo" },
      { id: "posto-administrativo-de-mopeia", name: "Posto Administrativo de Mopeia" },
      ],
    },
    {
      id: "morrumbala",
      name: "Morrumbala",
      municipalities: [
      { id: "morrumbala", name: "Morrumbala" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-chire", name: "Posto Administrativo de Chire" },
      { id: "posto-administrativo-de-derre", name: "Posto Administrativo de Derre" },
      { id: "posto-administrativo-de-megaza", name: "Posto Administrativo de Megaza" },
      { id: "posto-administrativo-de-morrumbala", name: "Posto Administrativo de Morrumbala" },
      ],
    },
    {
      id: "mulevala",
      name: "Mulevala",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mulevala-sede", name: "Posto Administrativo de Mulevala (Sede)" },
      ],
    },
    {
      id: "namacurra",
      name: "Namacurra",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mucuse", name: "Posto Administrativo de Mucuse" },
      { id: "posto-administrativo-de-namacurra", name: "Posto Administrativo de Namacurra" },
      ],
    },
    {
      id: "namarroi",
      name: "Namarroi",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-namarroi", name: "Posto Administrativo de Namarroi" },
      { id: "posto-administrativo-de-regone", name: "Posto Administrativo de Regone" },
      ],
    },
    {
      id: "nicoadala",
      name: "Nicoadala",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-maquival", name: "Posto Administrativo de Maquival" },
      { id: "posto-administrativo-de-nicoadala", name: "Posto Administrativo de Nicoadala" },
      ],
    },
    {
      id: "pebane",
      name: "Pebane",
      municipalities: [

      ],
      adminPosts: [
      { id: "posto-administrativo-de-mulela-mualama", name: "Posto Administrativo de Mulela Mualama" },
      { id: "posto-administrativo-de-naburi", name: "Posto Administrativo de Naburi" },
      { id: "posto-administrativo-de-pebane", name: "Posto Administrativo de Pebane" },
      ],
    },
    {
      id: "quelimane",
      name: "Quelimane",
      municipalities: [
      { id: "quelimane", name: "Quelimane" },
      ],
      adminPosts: [
      { id: "posto-administrativo-de-quelimane-sede", name: "Posto Administrativo de Quelimane (Sede)" },
      ],
    }
    ],
  }];

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
