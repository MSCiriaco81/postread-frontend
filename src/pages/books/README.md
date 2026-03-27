# books

## 📌 Propósito

Permitir busca paginada de livros e criação de novos itens de catálogo pelo frontend.

---

## 📂 Arquivos e Responsabilidades

* [BooksPage.jsx](BooksPage.jsx) → listagem, busca e modal de adição de livro.

---

## 🔧 Funções / Métodos Principais

### BooksPage()

* Mantém estados de busca (`query`, `submitted`) e controle de modal.
* Usa `useFetch(() => booksApi.search(submitted, 0, 20), [submitted])`.
* Aciona busca por Enter ou clique no botão.

### AddBookModal({ onClose })

* Controla formulário local de criação de livro.
* `submit(e)` valida título/autor e chama `booksApi.create(...)`.
* Ao sucesso, exibe toast e fecha modal com `onClose()`.

### BookCard({ book }) / BookSkeleton()

* Componentes de apresentação para resultado e loading.

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/books" element={<BooksPage />} />
```

---

## 🔗 Dependências

* [../../api/index.js](../../api/index.js)
* [../../hooks/useFetch.js](../../hooks/useFetch.js)
* [../../components/ui/Toast.jsx](../../components/ui/Toast.jsx)

---

## ⚠️ Regras e Convenções

* Criação de livro exige `title` e `author` no frontend.
* Conversões numéricas (`pageCount`) devem ser feitas antes do envio.

---

## 🧠 Observações

* Escopo documentado: src/pages/books
* A busca padrão consulta os livros com `q` vazio quando nenhuma query foi submetida.

---
