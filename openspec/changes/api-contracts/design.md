# Design

## Context

Ver `proposal.md`. Este change documenta los contratos de API que el backend debe implementar. Los datos de ejemplo se derivan de los mockups (`$24,580.00` balance; categorías Vivienda 40%, Alimentación 25%, Transporte 15%, Ocio 12%, Otros 8%; deudas Préstamo auto/personal/estudio; movimientos Salario, Renta, Mercado Central, Uber, Netflix).

## Convenciones

- **Base URL**: `/api/v1`.
- **Auth**: `Authorization: Bearer <token>` (excepto login).
- **Fechas**: ISO 8601 (`2025-05-12` para fechas, `2025-05-12T10:00:00Z` para timestamps).
- **Moneda**: importes como número decimal con 2 decimales; `currency` ISO 4217 (`USD`, `COP`).
- **Paginación**: `page` (1-based), `pageSize`; respuesta `{ items, total, page, pageSize }`.
- **Errores**: `{ error: { code, message, details? } }` con códigos HTTP estándar.
- **Signo**: `amount` siempre positivo; el `type` determina ingreso/gasto/deuda.

## Endpoints

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/login` | Iniciar sesión; devuelve token + usuario |
| POST | `/auth/logout` | Cerrar sesión |
| GET | `/auth/session` | Sesión actual (valida token) |

### Usuario y cuentas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/me` | Perfil del usuario |
| GET | `/accounts` | Cuentas y saldo total |

### Movimientos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/transactions` | Listado con filtros y paginación |
| POST | `/transactions` | Crear movimiento (gasto/ingreso/deuda) |
| PATCH | `/transactions/:id` | Editar movimiento |
| DELETE | `/transactions/:id` | Eliminar movimiento |

Parámetros de `GET /transactions`: `type`, `categoryId`, `from`, `to`, `search`, `page`, `pageSize`.

### Categorías

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/categories` | Listar categorías |
| POST | `/categories` | Crear categoría |
| PATCH | `/categories/:id` | Editar categoría |
| DELETE | `/categories/:id` | Eliminar categoría |

### Presupuestos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/budgets?month=YYYY-MM` | Presupuestos del mes |
| POST | `/budgets` | Crear presupuesto |
| PATCH | `/budgets/:id` | Editar presupuesto |
| DELETE | `/budgets/:id` | Eliminar presupuesto |

### Deudas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/debts` | Listar deudas con progreso |
| POST | `/debts` | Crear deuda |
| PATCH | `/debts/:id` | Editar deuda |
| DELETE | `/debts/:id` | Eliminar deuda |

### Análisis

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/analysis/summary?from&to` | Resumen del periodo |
| GET | `/analysis/by-category?from&to&type` | Desglose por categoría |

### Dashboard

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/dashboard?month=YYYY-MM` | Resumen compuesto para la home |

### Asistente IA

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/assistant/ask` | Enviar pregunta; devuelve respuesta |

## Tipos TypeScript

```ts
export type TransactionType = 'income' | 'expense' | 'debt';
export type Currency = 'USD' | 'COP' | 'EUR';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  currency: Currency;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: Currency;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  month: string;
  limit: number;
  spent: number;
}

export interface Debt {
  id: string;
  name: string;
  total: number;
  paid: number;
  dueDate?: string;
}

export interface CategoryBreakdown {
  categoryId: string;
  name: string;
  color: string;
  amount: number;
  percentage: number;
}

export interface AnalysisSummary {
  income: number;
  expense: number;
  debt: number;
  balance: number;
  trend: number;
  categories: CategoryBreakdown[];
}

export interface DashboardSummary {
  balance: number;
  income: number;
  expense: number;
  trend: number;
  categories: CategoryBreakdown[];
  debts: Debt[];
  recentTransactions: Transaction[];
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface ApiError {
  error: { code: string; message: string; details?: unknown };
}

export interface AssistantAnswer {
  answer: string;
}
```

## Ejemplos de payload

**POST `/auth/login`**
```json
// request
{ "email": "marcos@finap.app", "password": "••••••••" }
// response 200
{ "token": "eyJhbGciOi...", "user": { "id": "u_1", "name": "Marcos García", "email": "marcos@finap.app", "currency": "USD" } }
```

**GET `/dashboard?month=2025-05`**
```json
{
  "balance": 24580.0,
  "income": 6200.0,
  "expense": 3480.0,
  "trend": 12.5,
  "categories": [
    { "categoryId": "c_vivienda", "name": "Vivienda", "color": "#EB001B", "amount": 1392.0, "percentage": 40 },
    { "categoryId": "c_alim", "name": "Alimentación", "color": "#F79E1B", "amount": 870.0, "percentage": 25 }
  ],
  "debts": [
    { "id": "d_auto", "name": "Préstamo auto", "total": 2800.0, "paid": 1820.0 },
    { "id": "d_personal", "name": "Préstamo personal", "total": 640.0, "paid": 576.0 }
  ],
  "recentTransactions": [
    { "id": "t_1", "type": "income", "amount": 2800.0, "categoryId": "c_nomina", "date": "2025-05-12", "note": "Salario" },
    { "id": "t_2", "type": "expense", "amount": 980.0, "categoryId": "c_vivienda", "date": "2025-05-12", "note": "Renta" }
  ]
}
```

**POST `/transactions`**
```json
// request
{ "type": "expense", "amount": 86.4, "categoryId": "c_alim", "date": "2025-05-11", "note": "Mercado Central" }
// response 201
{ "id": "t_3", "type": "expense", "amount": 86.4, "categoryId": "c_alim", "date": "2025-05-11", "note": "Mercado Central" }
```

**POST `/assistant/ask`**
```json
// request
{ "question": "¿En qué gasté más este mes?" }
// response 200
{ "answer": "Vivienda (40%). Te quedan $1,240." }
```

## Goals / Non-Goals

**Goals**: definir con precisión lo que el frontend necesita del backend.
**Non-Goals**: no se modelan tablas ni base de datos; no se implementa el backend.

## Risks / Trade-offs

- **[Riesgo] Contratos que cambien** → Versionado `/api/v1` y tipos centralizados en `src/services/types.ts`.
- **[Trade-off] `/dashboard` compuesto** → Se propone un endpoint agregado para evitar N llamadas; el backend puede implementarlo o el frontend componerlo.
