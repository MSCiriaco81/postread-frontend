# profile (tests)

## 📌 Propósito

Validar renderização e fluxo de edição da página de perfil.

---

## 📂 Arquivos e Responsabilidades

* [ProfilePage.test.jsx](ProfilePage.test.jsx)

---

## 🔧 Cenários de Teste Principais

* Renderização de username, email, bio e ano de cadastro.
* Fallback de avatar por inicial quando não há foto.
* Abertura/fechamento do formulário de edição.
* Pré-preenchimento dos campos com dados atuais.
* Chamada de `usersApi.updateProfile` ao salvar.
* Toast de sucesso/erro.
* Render de imagem quando `profilePicture` existe.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/pages/profile/ProfilePage.test.jsx
```

---

## 🔗 Dependências

* [../../../pages/profile/README.md](../../../pages/profile/README.md)

---

## ⚠️ Regras e Convenções

* Alterações no payload de atualização de perfil devem ser refletidas nos testes.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/pages/profile

---
