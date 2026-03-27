# reading (tests)

## 📌 Propósito

Validar fluxo completo da página de leituras: listagem, modal, busca de livro, cadastro e remoção.

---

## 📂 Arquivos e Responsabilidades

* [ReadingPage.test.jsx](ReadingPage.test.jsx)

---

## 🔧 Cenários de Teste Principais

* Render de título, entradas, data, notas e métricas.
* Estado vazio sem leituras.
* Abertura/fechamento do modal.
* Busca de livros e seleção de sugestão.
* Validação de livro obrigatório no submit.
* Chamada de `readingApi.log` com payload correto.
* Toast de sucesso no cadastro.
* Remoção com confirmação e bloqueio ao cancelar `confirm`.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/pages/reading/ReadingPage.test.jsx
```

---

## 🔗 Dependências

* [../../../pages/reading/README.md](../../../pages/reading/README.md)

---

## ⚠️ Regras e Convenções

* Alterações no modal de leitura devem manter cobertura de validação + submit + remoção.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/pages/reading

---
