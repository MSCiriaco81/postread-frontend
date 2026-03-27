# social (tests)

## 📌 Propósito

Validar fluxos de amizades na página social.

---

## 📂 Arquivos e Responsabilidades

* [FriendsPage.test.jsx](FriendsPage.test.jsx)

---

## 🔧 Cenários de Teste Principais

* Renderização de seções e lista de amigos.
* Exibição de solicitações pendentes e badge de contagem.
* Envio de solicitação por botão e por Enter.
* Limpeza de campo após envio.
* Tratamento de erro em envio com mensagem detalhada.
* Aceite e rejeição de solicitações.
* Mensagem de estado vazio sem amigos.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/pages/social/FriendsPage.test.jsx
```

---

## 🔗 Dependências

* [../../../pages/social/README.md](../../../pages/social/README.md)

---

## ⚠️ Regras e Convenções

* Alterações em fluxo de amizade devem manter cobertura de sucesso, erro e estado vazio.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/pages/social

---
