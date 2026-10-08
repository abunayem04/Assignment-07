const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === "") return "০";
  const str = typeof num === "number" ? num.toLocaleString("en-US") : num.toString();
  return str.replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function parseBengaliNumber(bengaliStr: string): number {
  if (!bengaliStr) return 0;
  const englishStr = bengaliStr
    .replace(/[০-৯]/g, (digit) => bengaliDigits.indexOf(digit).toString())
    .replace(/,/g, "")
    .replace(/[^0-9.-]/g, "");
  return parseFloat(englishStr) || 0;
}

export function formatUnit(unit: string): string {
  if (!unit) return "প্রতি একক";
  const u = unit.toLowerCase().trim();
  if (u === "kg" || u === "কেজি") return "প্রতি কেজি";
  if (u === "litre" || u === "liter" || u === "l" || u === "লিটার") return "প্রতি লিটার";
  if (u === "dozen" || u === "ডজন") return "প্রতি ডজন";
  if (u === "piece" || u === "pcs" || u === "পিস" || u === "টি") return "প্রতি পিস";
  if (u === "hali" || u === "হালি") return "প্রতি হালি";
  if (u === "gram" || u === "gm" || u === "গ্রাম") return "প্রতি ১০০ গ্রাম";
  return `প্রতি ${unit}`;
}

export function getFormattedDate(): string {
  const now = new Date();
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const day = days[now.getDay()];
  const date = now.getDate().toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
  const month = months[now.getMonth()];
  const year = now.getFullYear().toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
  return `${day}, ${date} ${month}, ${year}`;
}

