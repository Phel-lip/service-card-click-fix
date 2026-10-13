import hero from "@/assets/angelica-hero.jpg";
import loiros from "@/assets/svc-loiros.jpg";
import mechas from "@/assets/svc-mechas.jpg";
import iluminados from "@/assets/svc-iluminados.jpg";
import corteFranja from "@/assets/svc-corte-franja.jpg";
import coloracao from "@/assets/svc-coloracao.jpg";
import penteado from "@/assets/svc-penteado.jpg";
import maquiagem from "@/assets/svc-maquiagem.jpg";
import makeCachos from "@/assets/svc-make-cachos.jpg";

// Single source of truth for salon details (verified on the official Instagram profile).
export const SALON = {
  name: "Angélica Costa",
  tagline: "Salão de beleza",
  city: "Maceió · AL",
  whatsapp: "5582996009639",
  whatsappLabel: "(82) 99600-9639",
  instagram: "https://www.instagram.com/angelicaconceitoembeleza/",
  instagramHandle: "@angelicaconceitoembeleza",
  heroImg: hero,
};

const IG = "https://www.instagram.com/angelicaconceitoembeleza";

export type Category = "Loiros & mechas" | "Coloração" | "Cortes" | "Penteado & make";

export type Service = {
  id: string;
  title: string;
  category: Category;
  copy: string;
  cta: string;
  img: string;
  pros: string[];
  source: string;
  alt: string;
};

const PRO = ["Angélica Costa"];

export const SERVICES: Service[] = [
  { id: "loiros", title: "Loiros", category: "Loiros & mechas", copy: "Luz, brilho e um loiro apaixonante, com ondas suaves na finalização.", cta: "Solicitar loiro", img: loiros, alt: "Cliente com loiro claro e ondas suaves no salão da Angélica Costa", pros: PRO, source: `${IG}/p/Dd6OQTzlYoS/` },
  { id: "mechas", title: "Mechas", category: "Loiros & mechas", copy: "Loiro poderoso, leve e cheio de brilho, com mechas que iluminam todo o comprimento.", cta: "Solicitar mechas", img: mechas, alt: "Cabelo longo com mechas loiras e ondas, publicado pela Angélica Costa", pros: PRO, source: `${IG}/p/DdUY8SBD0ZT/` },
  { id: "iluminados", title: "Iluminados", category: "Loiros & mechas", copy: "Pontos de luz que valorizam o rosto e deixam o loiro com movimento e naturalidade.", cta: "Solicitar iluminado", img: iluminados, alt: "Cliente sorrindo com cabelo loiro iluminado e ondulado", pros: PRO, source: `${IG}/p/DdUYT3LDyNv/` },
  { id: "coloracao", title: "Coloração", category: "Coloração", copy: "Do loiro ao moreno, com elegância: profundidade de volta aos fios e um novo ar ao visual.", cta: "Solicitar coloração", img: coloracao, alt: "Transformação do loiro para o moreno com camadas, feita pela Angélica Costa", pros: PRO, source: `${IG}/reel/Dd6Nwdixmh0/` },
  { id: "corte", title: "Corte feminino", category: "Cortes", copy: "Corte na altura do queixo com franja, finalizado com mais luz e brilho no loiro.", cta: "Solicitar corte", img: corteFranja, alt: "Corte chanel com franja em cabelo loiro iluminado", pros: PRO, source: `${IG}/reel/DdZ-meqxetJ/` },
  { id: "penteado", title: "Penteados", category: "Penteado & make", copy: "Penteado preso com cachos delicados emoldurando o rosto, combinado com a maquiagem.", cta: "Solicitar penteado", img: penteado, alt: "Penteado preso com cachos laterais e maquiagem completa", pros: PRO, source: `${IG}/reel/DeZaAriRyVk/` },
  { id: "maquiagem", title: "Maquiagem", category: "Penteado & make", copy: "Maquiagem que realça a beleza natural, com pele iluminada e olhar marcado.", cta: "Solicitar maquiagem", img: maquiagem, alt: "Cliente com maquiagem de olhos esfumados e penteado preso", pros: PRO, source: `${IG}/reel/DecSTxVRxPb/` },
  { id: "make-cachos", title: "Make & cachos", category: "Penteado & make", copy: "Maquiagem completa com os cachos naturais valorizados — aquele resultado que a gente ama.", cta: "Solicitar make", img: makeCachos, alt: "Cliente de cabelo cacheado com maquiagem completa no salão", pros: PRO, source: `${IG}/reel/DeZYUMgR44G/` },
];

export const CATEGORIES: ("Todos" | Category)[] = ["Todos", "Loiros & mechas", "Coloração", "Cortes", "Penteado & make"];
export const MARQUEE_ITEMS = ["LOIROS", "MECHAS", "ILUMINADOS", "COLORAÇÃO", "CORTE FEMININO", "PENTEADOS", "MAQUIAGEM"];
// Opening hours are not publicly verified, so periods are generic preferences.
export const PERIODS = ["Manhã", "Tarde", "Fim da tarde"];
export const NO_PREF = "Sem preferência";

export function fmtDate(d: string) {
  if (!d) return "A combinar";
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

export function todayLocal(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function buildWhatsAppUrl(o: { service: string; pro: string; date: string; period: string; notes: string }) {
  const lines = [
    `Olá, Angélica! Gostaria de solicitar um horário:`,
    ``,
    `• Serviço: ${o.service}`,
    `• Profissional: ${o.pro || NO_PREF}`,
    `• Data preferida: ${fmtDate(o.date)}`,
    `• Período preferido: ${o.period || "A combinar"}`,
    ...(o.notes.trim() ? [`• Observação: ${o.notes.trim()}`] : []),
    ``,
    `Aguardo a confirmação da disponibilidade.`,
  ];
  return `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
