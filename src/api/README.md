# api

## 📌 Propósito

Centralizar a comunicação HTTP com o backend PostRead, encapsulando autenticação, interceptors e funções por domínio de negócio.

---

## 📂 Arquivos e Responsabilidades

* [client.js](client.js) → Instância Axios com `baseURL`, header JSON e interceptors de request/response.
* [index.js](index.js) → APIs por contexto (`authApi`, `usersApi`, `booksApi`, `readingApi`, `socialApi`, `streaksApi`, `feedApi`).

---

## 🔧 Funções / Métodos Principais

### client.js

* `api.interceptors.request.use(...)` → Anexa JWT (`postread_token`) no header `Authorization`.
* `api.interceptors.response.use(...)` → Em `401`, limpa sessão local e redireciona para `/login`.

### index.js

* `authApi.register(data)` e `authApi.login(data)`
* `usersApi.me()`, `usersApi.getById(id)`, `usersApi.getByUsername(name)`, `usersApi.updateProfile(data)`
* `booksApi.search(q, page, size)`, `booksApi.getById(id)`, `booksApi.create(data)`
* `readingApi.log(data)`, `readingApi.list(page, size)`, `readingApi.range(from, to)`, `readingApi.remove(id)`
* `socialApi.sendRequest(receiverId)`, `socialApi.acceptRequest(id)`, `socialApi.rejectRequest(id)`, `socialApi.getFriends()`, `socialApi.getPending()`
* `streaksApi.create(data)`, `streaksApi.list()`, `streaksApi.getById(id)`, `streaksApi.checkIn(id, minutesRead)`
* `feedApi.list(page, size)`

---

## ▶️ Exemplos de Uso

```js
import { booksApi } from '../api'

const page = await booksApi.search('hobbit', 0, 20)
```

```js
import { readingApi } from '../api'

await readingApi.log({ bookId: 'book-123', minutesRead: 30 })
```

---

## 🔗 Dependências

* [client.js](client.js)
* [index.js](index.js)
* [../hooks/README.md](../hooks/README.md)

---

## ⚠️ Regras e Convenções

* Toda chamada ao backend deve passar por esta pasta.
* Não duplicar endpoint em múltiplos componentes/páginas.
* Manter tratamento de `401` centralizado no interceptor de resposta.

---

## 🧠 Observações

* Escopo documentado: src/api
* `baseURL` atual: `/api/v1`.
* Tokens e sessão são persistidos em `localStorage`.

---
