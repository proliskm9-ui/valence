export interface ExtraCase {
  id: string;
  title: string;
  tag: string;
  year: string;
  result: string;
  url?: string;
}

/** 01/02 — Mesti и Zaz, у них свои богатые showcase-компоненты, а не карточки. */
const FEATURED_IDS = new Set(['01', '02']);
/** Старые плейсхолдер-id, которые не должны всплывать нигде на сайте. */
const HIDDEN_IDS = new Set(['03', '04', '05', '06']);

const STORE_KEY = 'valence_crm_store';

/** Кейсы, добавленные через админку (CRM), кроме featured/hidden id. */
export function readExtraCases(): ExtraCase[] {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed.cases)) return [];
    return (parsed.cases as ExtraCase[]).filter(
      (c) => !FEATURED_IDS.has(c.id) && !HIDDEN_IDS.has(c.id),
    );
  } catch {
    return [];
  }
}
