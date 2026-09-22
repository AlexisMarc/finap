import type { Locale } from './i18n.js';

export const translations: Record<Locale, Record<string, string>> = {
  es: {
    'app.name': 'Finap',

    // Comunes
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.saving': 'Guardando…',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.retry': 'Reintentar',
    'common.confirm': 'Confirmar',
    'common.saveError': 'No se pudo guardar',
    'common.deleteError': 'No se pudo eliminar',
    'common.loading': 'Cargando…',

    // Nav / landing
    'nav.functions': 'Funciones',
    'nav.budgets': 'Presupuestos',
    'nav.login': 'Iniciar sesión',
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

    // Tema / idioma
    'theme.toggle.toDark': 'Cambiar a tema oscuro',
    'theme.toggle.toLight': 'Cambiar a tema claro',
    'language.toggle': 'Idioma',

    // Fechas
    'date.today': 'Hoy',
    'date.yesterday': 'Ayer',

    // Shell
    'shell.nav.home': 'Inicio',
    'shell.nav.analysis': 'Análisis',
    'shell.nav.debts': 'Deudas',
    'shell.nav.movements': 'Movimientos',
    'shell.nav.settings': 'Ajustes',
    'shell.greeting': 'Hola',
    'shell.search': 'Buscar...',
    'shell.add': 'Agregar',
    'shell.addTitle': 'Nuevo registro',
    'shell.primaryNav': 'Principal',
    'userMenu.logout': 'Cerrar sesión',

    // Dashboard
    'dashboard.balance': 'Balance total',
    'dashboard.income': 'Ingresos',
    'dashboard.expense': 'Gastos',
    'dashboard.debt': 'Deudas',
    'dashboard.vsLastMonth': 'vs. mes pasado',
    'dashboard.byCategory': 'Gastos por categoría',
    'dashboard.thisMonth': 'Este mes',
    'dashboard.pending': 'pendiente',
    'dashboard.totalPending': 'Total pendiente',
    'dashboard.recent': 'Últimos movimientos',
    'dashboard.seeAll': 'Ver todos →',

    // Movimientos
    'movements.title': 'Movimientos',
    'movements.filter.all': 'Todos',
    'movements.filter.expense': 'Gasto',
    'movements.filter.income': 'Ingreso',
    'movements.filter.debt': 'Deuda',
    'movements.filter.category': 'Categoría',
    'movements.filter.from': 'Desde',
    'movements.filter.to': 'Hasta',
    'movements.filter.search': 'Buscar',
    'movements.empty': 'No hay movimientos que cumplan los filtros.',
    'movements.clear': 'Limpiar filtros',
    'movements.loadMore': 'Cargar más',
    'movements.error': 'No se pudieron cargar los movimientos',

    // Transacciones
    'transactions.newTitle': 'Nuevo registro',
    'transactions.editTitle': 'Editar movimiento',
    'transactions.type.expense': 'Gasto',
    'transactions.type.income': 'Ingreso',
    'transactions.type.debt': 'Deuda',
    'transactions.amount': 'Importe',
    'transactions.category': 'Categoría',
    'transactions.date': 'Fecha',
    'transactions.note': 'Nota (opcional)',
    'transactions.notePlaceholder': 'Añade una descripción...',
    'transactions.error.amount': 'Introduce un importe válido',
    'transactions.error.category': 'Selecciona una categoría',
    'transactions.error.date': 'Selecciona una fecha',
    'transactions.saveError': 'No se pudo guardar',
    'transactions.deleteTitle': 'Eliminar movimiento',
    'transactions.deleteMessage':
      '¿Seguro que quieres eliminar este movimiento? Esta acción no se puede deshacer.',

    // Categorías
    'categories.title': 'Categorías',
    'categories.new': 'Nueva categoría',
    'categories.editTitle': 'Editar categoría',
    'categories.name': 'Nombre',
    'categories.color': 'Color',
    'categories.icon': 'Icono',
    'categories.error.name': 'El nombre es obligatorio',
    'categories.loadError': 'No se pudieron cargar las categorías',
    'categories.deleteTitle': 'Eliminar categoría',
    'categories.deleteMessage':
      'Si la categoría tiene movimientos asociados, quedarán sin categoría. ¿Continuar?',

    // Presupuestos
    'budgets.title': 'Presupuestos',
    'budgets.new': 'Definir presupuesto',
    'budgets.limit': 'Límite mensual',
    'budgets.over': 'Excedido',
    'budgets.error.category': 'Selecciona una categoría',
    'budgets.error.limit': 'Introduce un límite válido',
    'budgets.loadError': 'No se pudieron cargar los presupuestos',

    // Análisis
    'analysis.title': 'Análisis',
    'analysis.period.month': 'Mes',
    'analysis.period.quarter': 'Trimestre',
    'analysis.period.year': 'Año',
    'analysis.balance': 'Balance',
    'analysis.income': 'Ingresos',
    'analysis.expense': 'Gastos',
    'analysis.debt': 'Deudas',
    'analysis.evolution': 'Evolución',
    'analysis.byCategory': 'Gastos por categoría',
    'analysis.error': 'No se pudo cargar el análisis',

    // Deudas
    'debts.title': 'Deudas',
    'debts.new': 'Nueva deuda',
    'debts.editTitle': 'Editar deuda',
    'debts.pending': 'pendiente',
    'debts.paid': 'Pagada',
    'debts.due': 'Vence',
    'debts.pay': 'Registrar pago',
    'debts.payTitle': 'Registrar pago',
    'debts.payAmount': 'Importe del pago',
    'debts.name': 'Nombre',
    'debts.total': 'Importe total',
    'debts.paidAmount': 'Importe pagado',
    'debts.dueDate': 'Fecha límite (opcional)',
    'debts.error.name': 'El nombre es obligatorio',
    'debts.error.total': 'Introduce un importe válido',
    'debts.error.pay': 'Introduce un importe válido',
    'debts.loadError': 'No se pudieron cargar las deudas',
    'debts.deleteTitle': 'Eliminar deuda',
    'debts.deleteMessage': '¿Seguro que quieres eliminar esta deuda?',

    // Ajustes
    'settings.title': 'Ajustes',
    'settings.profile': 'Perfil',
    'settings.preferences': 'Preferencias',
    'settings.data': 'Datos',
    'settings.session': 'Sesión',
    'settings.theme': 'Tema',
    'settings.language': 'Idioma',
    'settings.currency': 'Moneda',
    'settings.categories': 'Categorías',
    'settings.budgets': 'Presupuestos',

    // Login
    'login.subtitle': 'Inicia sesión para gestionar tus finanzas.',
    'login.email': 'Email',
    'login.password': 'Contraseña',
    'login.submit': 'Entrar',
    'login.submitting': 'Entrando…',
    'login.error.emailRequired': 'El email es obligatorio',
    'login.error.emailInvalid': 'Introduce un email válido',
    'login.error.passwordRequired': 'La contraseña es obligatoria',
    'login.error.generic': 'No se pudo iniciar sesión',

    // Asistente
    'assistant.title': 'Asistente IA',
    'assistant.placeholder': 'Pregunta sobre tus finanzas...',
    'assistant.send': 'Enviar',
    'assistant.typing': 'Escribiendo…',
    'assistant.error': 'No se pudo obtener respuesta. Inténtalo de nuevo.',
    'assistant.quick.spend': '¿En qué gasté más este mes?',
    'assistant.quick.debt': '¿Cuánto debo?',

    // Offline / PWA
    'offline.message': 'Sin conexión — mostrando datos guardados',
    'offline.sync': 'Sincronizar',
    'update.message': 'Nueva versión disponible',
    'update.apply': 'Actualizar',
  },
  en: {
    'app.name': 'Finap',

    // Common
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.saving': 'Saving…',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.retry': 'Retry',
    'common.confirm': 'Confirm',
    'common.saveError': 'Could not save',
    'common.deleteError': 'Could not delete',
    'common.loading': 'Loading…',

    // Nav / landing
    'nav.functions': 'Features',
    'nav.budgets': 'Budgets',
    'nav.login': 'Sign in',
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

    // Theme / language
    'theme.toggle.toDark': 'Switch to dark theme',
    'theme.toggle.toLight': 'Switch to light theme',
    'language.toggle': 'Language',

    // Dates
    'date.today': 'Today',
    'date.yesterday': 'Yesterday',

    // Shell
    'shell.nav.home': 'Home',
    'shell.nav.analysis': 'Analysis',
    'shell.nav.debts': 'Debts',
    'shell.nav.movements': 'Transactions',
    'shell.nav.settings': 'Settings',
    'shell.greeting': 'Hi',
    'shell.search': 'Search...',
    'shell.add': 'Add',
    'shell.addTitle': 'New entry',
    'shell.primaryNav': 'Main',
    'userMenu.logout': 'Sign out',

    // Dashboard
    'dashboard.balance': 'Total balance',
    'dashboard.income': 'Income',
    'dashboard.expense': 'Expenses',
    'dashboard.debt': 'Debts',
    'dashboard.vsLastMonth': 'vs. last month',
    'dashboard.byCategory': 'Spending by category',
    'dashboard.thisMonth': 'This month',
    'dashboard.pending': 'pending',
    'dashboard.totalPending': 'Total pending',
    'dashboard.recent': 'Recent transactions',
    'dashboard.seeAll': 'See all →',

    // Movements
    'movements.title': 'Transactions',
    'movements.filter.all': 'All',
    'movements.filter.expense': 'Expense',
    'movements.filter.income': 'Income',
    'movements.filter.debt': 'Debt',
    'movements.filter.category': 'Category',
    'movements.filter.from': 'From',
    'movements.filter.to': 'To',
    'movements.filter.search': 'Search',
    'movements.empty': 'No transactions match the filters.',
    'movements.clear': 'Clear filters',
    'movements.loadMore': 'Load more',
    'movements.error': 'Could not load transactions',

    // Transactions
    'transactions.newTitle': 'New entry',
    'transactions.editTitle': 'Edit transaction',
    'transactions.type.expense': 'Expense',
    'transactions.type.income': 'Income',
    'transactions.type.debt': 'Debt',
    'transactions.amount': 'Amount',
    'transactions.category': 'Category',
    'transactions.date': 'Date',
    'transactions.note': 'Note (optional)',
    'transactions.notePlaceholder': 'Add a description...',
    'transactions.error.amount': 'Enter a valid amount',
    'transactions.error.category': 'Select a category',
    'transactions.error.date': 'Select a date',
    'transactions.saveError': 'Could not save',
    'transactions.deleteTitle': 'Delete transaction',
    'transactions.deleteMessage':
      'Delete this transaction? This action cannot be undone.',

    // Categories
    'categories.title': 'Categories',
    'categories.new': 'New category',
    'categories.editTitle': 'Edit category',
    'categories.name': 'Name',
    'categories.color': 'Color',
    'categories.icon': 'Icon',
    'categories.error.name': 'Name is required',
    'categories.loadError': 'Could not load categories',
    'categories.deleteTitle': 'Delete category',
    'categories.deleteMessage':
      'If the category has transactions, they will be left without a category. Continue?',

    // Budgets
    'budgets.title': 'Budgets',
    'budgets.new': 'Set budget',
    'budgets.limit': 'Monthly limit',
    'budgets.over': 'Over budget',
    'budgets.error.category': 'Select a category',
    'budgets.error.limit': 'Enter a valid limit',
    'budgets.loadError': 'Could not load budgets',

    // Analysis
    'analysis.title': 'Analysis',
    'analysis.period.month': 'Month',
    'analysis.period.quarter': 'Quarter',
    'analysis.period.year': 'Year',
    'analysis.balance': 'Balance',
    'analysis.income': 'Income',
    'analysis.expense': 'Expenses',
    'analysis.debt': 'Debts',
    'analysis.evolution': 'Trend',
    'analysis.byCategory': 'Spending by category',
    'analysis.error': 'Could not load the analysis',

    // Debts
    'debts.title': 'Debts',
    'debts.new': 'New debt',
    'debts.editTitle': 'Edit debt',
    'debts.pending': 'pending',
    'debts.paid': 'Paid',
    'debts.due': 'Due',
    'debts.pay': 'Register payment',
    'debts.payTitle': 'Register payment',
    'debts.payAmount': 'Payment amount',
    'debts.name': 'Name',
    'debts.total': 'Total amount',
    'debts.paidAmount': 'Amount paid',
    'debts.dueDate': 'Due date (optional)',
    'debts.error.name': 'Name is required',
    'debts.error.total': 'Enter a valid amount',
    'debts.error.pay': 'Enter a valid amount',
    'debts.loadError': 'Could not load debts',
    'debts.deleteTitle': 'Delete debt',
    'debts.deleteMessage': 'Delete this debt?',

    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.preferences': 'Preferences',
    'settings.data': 'Data',
    'settings.session': 'Session',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.currency': 'Currency',
    'settings.categories': 'Categories',
    'settings.budgets': 'Budgets',

    // Login
    'login.subtitle': 'Sign in to manage your finances.',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Sign in',
    'login.submitting': 'Signing in…',
    'login.error.emailRequired': 'Email is required',
    'login.error.emailInvalid': 'Enter a valid email',
    'login.error.passwordRequired': 'Password is required',
    'login.error.generic': 'Could not sign in',

    // Assistant
    'assistant.title': 'AI Assistant',
    'assistant.placeholder': 'Ask about your finances...',
    'assistant.send': 'Send',
    'assistant.typing': 'Typing…',
    'assistant.error': 'Could not get an answer. Please try again.',
    'assistant.quick.spend': 'Where did I spend the most this month?',
    'assistant.quick.debt': 'How much do I owe?',

    // Offline / PWA
    'offline.message': 'Offline — showing saved data',
    'offline.sync': 'Sync',
    'update.message': 'New version available',
    'update.apply': 'Update',
  },
};
