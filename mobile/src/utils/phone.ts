export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("258") && digits.length >= 12) return digits;
  if (digits.startsWith("8") && digits.length === 9) return `258${digits}`;
  if (digits.length === 9) return `258${digits}`;
  return digits;
}

export function formatPhoneDisplay(phone: string): string {
  const d = normalizePhone(phone);
  if (d.length === 12 && d.startsWith("258")) {
    return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  }
  return phone;
}

export function isValidMozPhone(phone: string): boolean {
  const d = normalizePhone(phone);
  return /^258[82]\d{8}$/.test(d);
}
