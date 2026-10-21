/**
 * Monta links de WhatsApp (wa.me) com mensagem pré-preenchida.
 * Gerado no build: os botões já saem com o link certo no HTML,
 * mesmo para quem está com JavaScript desligado e para robôs de busca.
 */

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 12 || digits.length > 13) {
    throw new Error(
      `Número de WhatsApp inválido: "${phone}". Use o formato 55 + DDD + número (ex.: 5571999430604).`,
    );
  }
  return digits;
}

export function buildWhatsAppLink(phone: string, message?: string): string {
  const base = `https://wa.me/${normalizePhone(phone)}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Formata 5571999430604 como +55 71 99943-0604 para exibição. */
export function formatPhoneForDisplay(phone: string): string {
  const d = normalizePhone(phone);
  const country = d.slice(0, 2);
  const area = d.slice(2, 4);
  const local = d.slice(4);
  const split = local.length - 4;
  return `+${country} ${area} ${local.slice(0, split)}-${local.slice(split)}`;
}
