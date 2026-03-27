# hooks

## 📌 Propósito

Concentrar hooks reutilizáveis para estado de autenticação e fluxo padrão de carregamento assíncrono de dados.

---

## 📂 Arquivos e Responsabilidades

* [useAuth.jsx](useAuth.jsx) → Contexto global de autenticação, sessão local e ações de login/registro/logout.
* [useFetch.js](useFetch.js) → Hook genérico para execução de função assíncrona com estados de `loading`, `data`, `error` e `refetch`.

---

## 🔧 Funções / Métodos Principais

### useAuth.jsx

* `AuthProvider({ children })` → Provedor do contexto de autenticação.
* `login(email, password)` → Autentica, salva token/usuário e atualiza estado.
* `register(username, email, password)` → Registra, salva token/usuário e atualiza estado.
* `logout()` → Limpa sessão local.
* `useAuth()` → Hook de acesso ao contexto (`user`, `isAuth` e ações).

### useFetch.js

* `useFetch(fetchFn, deps)`
  * Executa `fetchFn` ao montar e ao mudar dependências.
  * Expõe `{ data, loading, error, refetch }`.
  * Mapeia mensagens de erro de resposta HTTP quando disponíveis.

---

## ▶️ Exemplos de Uso

```jsx
const { isAuth, user, logout } = useAuth()
```

```js
const { data, loading, error, refetch } = useFetch(
  () => feedApi.list(0, 20),
  []
)
```

---

## 🔗 Dependências

* [useAuth.jsx](useAuth.jsx)
* [useFetch.js](useFetch.js)
* [../api/README.md](../api/README.md)
* [../routes/README.md](../routes/README.md)

---

## ⚠️ Regras e Convenções

* `useAuth` deve ser usado apenas dentro de `AuthProvider`.
* Persistência de sessão deve permanecer centralizada em `useAuth`.
* Para novas telas com carregamento remoto, preferir `useFetch` para padronizar UX de loading/erro.

---

## 🧠 Observações

* Escopo documentado: src/hooks
* O estado de autenticação é derivado da presença de `user` no contexto.

---
