import { describe, expect, it } from 'vitest';
import { buildWhatsAppLink, formatPhoneForDisplay, normalizePhone } from '../../src/lib/whatsapp';

describe('normalizePhone', () => {
  it('remove espaços e símbolos', () => {
    expect(normalizePhone('+55 (71) 99943-0604')).toBe('5571999430604');
  });

  it('aceita fixo (12 dígitos) e celular (13 dígitos)', () => {
    expect(normalizePhone('557133334444')).toBe('557133334444');
    expect(normalizePhone('5571999430604')).toBe('5571999430604');
  });

  it('recusa número sem código do país ou DDD', () => {
    expect(() => normalizePhone('99943-0604')).toThrow(/inválido/);
    expect(() => normalizePhone('71999430604')).toThrow(/inválido/);
  });
});

describe('buildWhatsAppLink', () => {
  it('monta o link wa.me com a mensagem codificada', () => {
    const link = buildWhatsAppLink('5571999430604', 'Olá! Quero um orçamento & prazo?');
    expect(link).toBe(
      'https://wa.me/5571999430604?text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento%20%26%20prazo%3F',
    );
    expect(decodeURIComponent(new URL(link).searchParams.get('text') ?? '')).toBe(
      'Olá! Quero um orçamento & prazo?',
    );
  });

  it('omite o parâmetro text quando não há mensagem', () => {
    expect(buildWhatsAppLink('5571999430604')).toBe('https://wa.me/5571999430604');
    expect(buildWhatsAppLink('5571999430604', '   ')).toBe('https://wa.me/5571999430604');
  });
});

describe('formatPhoneForDisplay', () => {
  it('formata celular no padrão brasileiro', () => {
    expect(formatPhoneForDisplay('5571999430604')).toBe('+55 71 99943-0604');
  });

  it('formata fixo no padrão brasileiro', () => {
    expect(formatPhoneForDisplay('557133334444')).toBe('+55 71 3333-4444');
  });
});
