import type { Locale } from './i18n.js';

export const translations: Record<Locale, Record<string, string>> = {
  es: {
    'app.name': 'Finap',
    'nav.functions': 'Funciones',
    'nav.budgets': 'Presupuestos',
    'landing.hero.headline': 'Tu dinero, en orden.',
    'landing.hero.subtitle':
      'Finap reúne saldo, gastos e ingresos en un solo lugar, para que siempre sepas dónde estás.',
    'landing.hero.cta': 'Empezar',
    'landing.hero.secondary': 'Ver cómo funciona',
    'landing.features.title': 'Funciones',
    'landing.feature.dashboard.title': 'Dashboard',
    'landing.feature.dashboard.description':
      'Tu saldo, ingresos y gastos en una sola vista.',
    'landing.feature.movements.title': 'Movimientos',
    'landing.feature.movements.description':
      'Cada transacción, ordenada y filtrable.',
    'landing.feature.budgets.title': 'Presupuestos',
    'landing.feature.budgets.description':
      'Límites por categoría con progreso visible.',
    'landing.highlight.title': 'Presupuestos que se mantienen solos',
    'landing.highlight.body':
      'Define límites por categoría y Finap te muestra el progreso, para que nunca te pases.',
    'landing.highlight.cta': 'Empezar',
    'landing.footer': '© 2026 Finap — Gestor de finanzas personales.',
    'theme.toggle.toDark': 'Cambiar a tema oscuro',
    'theme.toggle.toLight': 'Cambiar a tema claro',
    'language.toggle': 'Idioma',
    'assistant.title': 'Asistente IA',
    'assistant.placeholder': 'Pregunta sobre tus finanzas...',
    'assistant.send': 'Enviar',
    'assistant.typing': 'Escribiendo…',
    'assistant.error': 'No se pudo obtener respuesta. Inténtalo de nuevo.',
    'assistant.quick.spend': '¿En qué gasté más este mes?',
    'assistant.quick.debt': '¿Cuánto debo?',
    'offline.message': 'Sin conexión — mostrando datos guardados',
    'offline.sync': 'Sincronizar',
    'update.message': 'Nueva versión disponible',
    'update.apply': 'Actualizar',
  },
  en: {
    'app.name': 'Finap',
    'nav.functions': 'Features',
    'nav.budgets': 'Budgets',
    'landing.hero.headline': 'Your money, in order.',
    'landing.hero.subtitle':
      'Finap brings your balance, expenses and income together, so you always know where you stand.',
    'landing.hero.cta': 'Get started',
    'landing.hero.secondary': 'See how it works',
    'landing.features.title': 'Features',
    'landing.feature.dashboard.title': 'Dashboard',
    'landing.feature.dashboard.description':
      'Your balance, income and expenses in a single view.',
    'landing.feature.movements.title': 'Transactions',
    'landing.feature.movements.description':
      'Every transaction, sorted and filterable.',
    'landing.feature.budgets.title': 'Budgets',
    'landing.feature.budgets.description':
      'Per-category limits with visible progress.',
    'landing.highlight.title': 'Budgets that keep themselves',
    'landing.highlight.body':
      'Set per-category limits and Finap shows your progress, so you never overspend.',
    'landing.highlight.cta': 'Get started',
    'landing.footer': '© 2026 Finap — Personal finance manager.',
    'theme.toggle.toDark': 'Switch to dark theme',
    'theme.toggle.toLight': 'Switch to light theme',
    'language.toggle': 'Language',
    'assistant.title': 'AI Assistant',
    'assistant.placeholder': 'Ask about your finances...',
    'assistant.send': 'Send',
    'assistant.typing': 'Typing…',
    'assistant.error': 'Could not get an answer. Please try again.',
    'assistant.quick.spend': 'Where did I spend the most this month?',
    'assistant.quick.debt': 'How much do I owe?',
    'offline.message': 'Offline — showing saved data',
    'offline.sync': 'Sync',
    'update.message': 'New version available',
    'update.apply': 'Update',
  },
};
