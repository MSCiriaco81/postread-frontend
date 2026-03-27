# books (tests)

## 📌 Propósito

Validar comportamento da página de livros (busca e criação).

---

## 📂 Arquivos e Responsabilidades

* [BooksPage.test.jsx](BooksPage.test.jsx)

---

## 🔧 Cenários de Teste Principais

* Renderização de título e cards de livro.
* Exibição de autores e resultados.
* Busca por Enter e botão Buscar.
* Mensagem de nenhum resultado.
* Abertura/fechamento do modal de adição.
* Chamada de `booksApi.create` ao salvar novo livro.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/pages/books/BooksPage.test.jsx
```

---

## 🔗 Dependências

* [../../../pages/books/README.md](../../../pages/books/README.md)

---

## ⚠️ Regras e Convenções

* Mudanças no modal de criação devem manter cobertura de validação e submit.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/pages/books

---
