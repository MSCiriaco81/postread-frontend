# auth

## 📌 Propósito

Implementar as telas públicas de autenticação (login e registro) com validação de formulário e integração com `useAuth`.

---

## 📂 Arquivos e Responsabilidades

* [LoginPage.jsx](LoginPage.jsx) → autenticação de usuário existente.
* [RegisterPage.jsx](RegisterPage.jsx) → criação de conta.

---

## 🔧 Funções / Métodos Principais

### LoginPage()

* `validate()` valida obrigatoriedade de email e senha.
* `handleSubmit(e)` executa `login(email, password)` e navega para `/dashboard`.
* Em erro, exibe toast com `detail` da API ou fallback.

### RegisterPage()

* `set(field)` atualiza campo e limpa erro local.
* `validate()` valida username mínimo (3), senha mínima (8) e email obrigatório.
* `handleSubmit(ev)` executa `register(...)` e navega para `/dashboard`.

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
```

---

## 🔗 Dependências

* [../../hooks/useAuth.jsx](../../hooks/useAuth.jsx)
* [../../components/ui/Toast.jsx](../../components/ui/Toast.jsx)
* [../../components/ui/Input.jsx](../../components/ui/Input.jsx)
* [../../components/ui/Button.jsx](../../components/ui/Button.jsx)

---

## ⚠️ Regras e Convenções

* Fluxo de auth deve continuar centralizado em `useAuth`.
* Mensagens de erro devem priorizar `response.data.detail` quando disponível.

---

## 🧠 Observações

* Escopo documentado: src/pages/auth
* As páginas têm redirecionamento automático via `PublicOnlyRoute` quando o usuário já está autenticado.

---
