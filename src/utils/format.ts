import { getCurrency } from '../state/session.js';
import { getLocale, t } from '../i18n/i18n.js';

export function formatCurrency(
  value: number,
  currency: string = getCurrency(),
  locale: string = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(
  value: number,
  locale: string = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function formatDate(
  iso: string,
  locale: string = getLocale(),
): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatRelativeDate(
  iso: string,
  locale: string = getLocale(),
  now: Date = new Date(),
): string {
  const date = new Date(`${iso}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return t('date.today');
  if (diffDays === 1) return t('date.yesterday');
  return formatDate(iso, locale);
}
