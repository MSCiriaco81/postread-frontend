# hooks (tests)

## 📌 Propósito

Validar hooks compartilhados de autenticação e carregamento de dados.

---

## 📂 Arquivos e Responsabilidades

* [useAuth.test.jsx](useAuth.test.jsx)
* [useFetch.test.js](useFetch.test.js)

---

## 🔧 Cenários de Teste Principais

### useAuth.test.jsx

* Estado inicial não autenticado.
* Hidratação de usuário via `localStorage`.
* `login` e `register` persistem token/usuário e autenticam contexto.
* Propagação de erro em `login` inválido.
* `logout` limpa sessão e reseta estado.
* Erro ao usar `useAuth` fora de `AuthProvider`.

### useFetch.test.js

* Estado inicial (`loading`, `data`, `error`).
* Resolução de dados com sucesso.
* Captura de erro por `message` e por `response.data.detail`.
* `refetch` reexecuta função.
* Reexecução ao mudar dependências.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/hooks/useAuth.test.jsx
npx vitest run src/__tests__/hooks/useFetch.test.js
```

---

## 🔗 Dependências

* [../../hooks/README.md](../../hooks/README.md)
* [../utils.jsx](../utils.jsx)

---

## ⚠️ Regras e Convenções

* Alterações de contrato em hooks compartilhados exigem atualização da suíte.
* Testes de hook devem validar também cenários de erro.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/hooks

---
