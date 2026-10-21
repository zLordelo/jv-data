import { describe, expect, it } from 'vitest';
import { company, faq, hero, nav, process, seo, services, waMessages } from '../../src/data/site';
import { normalizePhone } from '../../src/lib/whatsapp';

/** Regras de conteúdo que protegem SEO e clareza quando alguém editar os textos. */
describe('conteúdo do site', () => {
  it('título cabe no resultado do Google (até 65 caracteres) e cita a marca', () => {
    expect(seo.title.length).toBeLessThanOrEqual(65);
    expect(seo.title).toContain(company.name);
  });

  it('descrição tem entre 120 e 160 caracteres', () => {
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(160);
  });

  it('número de WhatsApp é válido', () => {
    expect(() => normalizePhone(company.whatsapp)).not.toThrow();
  });

  it('cada serviço tem título, explicação, exemplos e mensagem própria no WhatsApp', () => {
    const messages = new Set<string>();
    for (const s of services.items) {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.text.length).toBeGreaterThan(40);
      expect(s.examples.length).toBeGreaterThanOrEqual(2);
      expect(s.message).toMatch(/JV Data/);
      messages.add(s.message);
    }
    expect(messages.size).toBe(services.items.length);
  });

  it('textos são curtos o bastante para leitura fácil (frases de até 35 palavras)', () => {
    const texts = [
      hero.lead,
      ...services.items.map((s) => s.text),
      ...process.steps.map((s) => s.text),
      ...faq.items.map((f) => f.a),
    ];
    for (const text of texts) {
      for (const sentence of text.split(/(?<=[.!?])\s+/)) {
        expect(sentence.split(/\s+/).length, sentence).toBeLessThanOrEqual(35);
      }
    }
  });

  it('menu aponta para âncoras da própria página', () => {
    for (const item of nav) expect(item.href).toMatch(/^#[a-z-]+$/);
  });

  it('mensagens padrão do WhatsApp identificam a origem (site)', () => {
    expect(waMessages.default).toMatch(/site/);
    expect(waMessages.quote).toMatch(/orçamento/);
  });

  it('FAQ tem perguntas únicas terminando com "?"', () => {
    const qs = faq.items.map((i) => i.q);
    expect(new Set(qs).size).toBe(qs.length);
    for (const q of qs) expect(q.endsWith('?')).toBe(true);
  });
});
