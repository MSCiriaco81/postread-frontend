# reading

## 📌 Propósito

Gerenciar histórico de leituras do usuário: listagem, cadastro de nova leitura e remoção de entradas.

---

## 📂 Arquivos e Responsabilidades

* [ReadingPage.jsx](ReadingPage.jsx) → tela de leituras e modal de registro.

---

## 🔧 Funções / Métodos Principais

### ReadingPage()

* Busca leituras com `readingApi.list(0, 30)`.
* `handleDelete(id)` confirma e remove leitura via `readingApi.remove(id)`.
* Exibe estado vazio quando não há entradas.

### LogReadingModal({ onClose })

* Formulário de registro de leitura.
* `searchBooks(q)` consulta `booksApi.search(q)` com mínimo de 2 caracteres.
* `submit(e)` envia payload normalizado para `readingApi.log(...)`.

### Chip({ label }) / Field({ ...props })

* Blocos auxiliares para layout e exibição de métricas.

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/readings" element={<ReadingPage />} />
```

---

## 🔗 Dependências

* [../../api/index.js](../../api/index.js)
* [../../hooks/useFetch.js](../../hooks/useFetch.js)
* [../../components/ui/Toast.jsx](../../components/ui/Toast.jsx)

---

## ⚠️ Regras e Convenções

* Registro exige seleção prévia de `bookId`.
* Valores numéricos devem ser convertidos para `Number` antes do envio.
* Remoção deve continuar protegida por confirmação do usuário.

---

## 🧠 Observações

* Escopo documentado: src/pages/reading
* O modal permite preencher minutos, páginas, rating, notas e data de leitura.

---
