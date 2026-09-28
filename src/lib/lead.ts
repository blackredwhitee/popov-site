/** Открыть модалку заявки с любой страницы (ТЗ: событие open-lead). */
export const openLead = () => window.dispatchEvent(new Event("open-lead"));
