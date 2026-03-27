# api (tests)

## 📌 Propósito

Validar contratos da camada de API frontend e comportamento dos interceptors HTTP.

---

## 📂 Arquivos e Responsabilidades

* [api.test.js](api.test.js) → valida respostas e contratos dos módulos `authApi`, `booksApi`, `readingApi`, `socialApi`, `streaksApi`, `feedApi`.
* [client.test.js](client.test.js) → valida interceptors JWT e exports esperados do módulo de API.

---

## 🔧 Cenários de Teste Principais

### api.test.js

* `authApi.login` retorna token e dados de usuário.
* `authApi.register` retorna usuário criado.
* `booksApi.search/getById/create` retornam dados esperados.
* `readingApi.list/log/range/remove` funcionam conforme contrato.
* `socialApi.getFriends/getPending/sendRequest/acceptRequest` retornam payloads esperados.
* `streaksApi.list/create/checkIn` retornam dados de streak/activity.
* `feedApi.list` retorna página de eventos.

### client.test.js

* Request interceptor não adiciona `Authorization` sem token.
* Request interceptor adiciona `Bearer token` quando há token.
* Response interceptor em `401` limpa sessão e redireciona para `/login`.
* Verifica exports dos módulos de API (`authApi`, `booksApi`, `readingApi`, `socialApi`, `streaksApi`, `feedApi`).

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/api/api.test.js
npx vitest run src/__tests__/api/client.test.js
```

---

## 🔗 Dependências

* [../mocks/README.md](../mocks/README.md)
* [../../api/README.md](../../api/README.md)

---

## ⚠️ Regras e Convenções

* Mudanças em endpoints/client devem atualizar esta suíte no mesmo PR.
* Contratos de retorno devem refletir o comportamento do backend atual.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/api
* Os testes usam MSW para simular respostas HTTP.

---
