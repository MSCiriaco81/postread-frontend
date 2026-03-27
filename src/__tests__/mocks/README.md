# mocks

## 📌 Propósito

Definir infraestrutura de mock HTTP para testes frontend usando MSW.

---

## 📂 Arquivos e Responsabilidades

* [handlers.js](handlers.js) → fixtures e handlers para endpoints `/api/v1/*`.
* [server.js](server.js) → configuração do servidor MSW com `setupServer(...handlers)`.

---

## 🔧 Funções / Métodos Principais

### handlers.js

* Exporta fixtures (`mockUser`, `mockProfile`, `mockBook`, `mockReading`, `mockStreak`, `mockFriendship`, `mockFriend`, `mockFeedEvent`).
* Exporta `handlers` cobrindo auth, users, books, readings, social, streaks e feed.

### server.js

* Exporta `server` usado pelo setup global de testes.

---

## ▶️ Exemplos de Uso

```js
import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 🔗 Dependências

* [../setup.js](../setup.js)
* [../api/README.md](../api/README.md)

---

## ⚠️ Regras e Convenções

* Novos endpoints consumidos no frontend devem ganhar handler correspondente.
* Fixtures devem permanecer pequenas e representativas dos contratos reais.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/mocks

---
