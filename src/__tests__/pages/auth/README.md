# auth (tests)

## 📌 Propósito

Validar as páginas públicas de login e registro.

---

## 📂 Arquivos e Responsabilidades

* [LoginPage.test.jsx](LoginPage.test.jsx)
* [RegisterPage.test.jsx](RegisterPage.test.jsx)

---

## 🔧 Cenários de Teste Principais

### LoginPage.test.jsx

* Renderização de campos e links.
* Validação de obrigatoriedade.
* Chamada de login com payload correto.
* Navegação para dashboard no sucesso.
* Exibição de erro detalhado e fallback.
* Limpeza de erro ao editar campos.

### RegisterPage.test.jsx

* Renderização de campos e links.
* Validação de username e senha mínimos.
* Chamada de register com payload correto.
* Navegação para dashboard no sucesso.
* Exibição de erro em conflito (ex.: email duplicado).

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/pages/auth/LoginPage.test.jsx
npx vitest run src/__tests__/pages/auth/RegisterPage.test.jsx
```

---

## 🔗 Dependências

* [../../../pages/auth/README.md](../../../pages/auth/README.md)

---

## ⚠️ Regras e Convenções

* Toda mudança de validação de formulário deve atualizar os testes correspondentes.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/pages/auth

---
