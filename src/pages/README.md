# pages

## 📌 Propósito

Conter as telas de domínio da aplicação, responsáveis por orquestrar hooks, APIs e componentes visuais.

---

## 📂 Arquivos e Responsabilidades

* [auth/README.md](auth/README.md) → login e registro.
* [dashboard/README.md](dashboard/README.md) → visão geral com métricas, feed e leituras recentes.
* [books/README.md](books/README.md) → busca e criação de livros.
* [reading/README.md](reading/README.md) → listagem, registro e remoção de leituras.
* [social/README.md](social/README.md) → amizades e solicitações.
* [streaks/README.md](streaks/README.md) → desafios e check-in.
* [profile/README.md](profile/README.md) → visualização e edição de perfil.

---

## 🔧 Funções / Métodos Principais

* Cada página exporta um componente principal (`*Page`) usado nas rotas de `App.jsx`.
* A camada de página integra:
  * hooks (`useAuth`, `useFetch`, `useToast`)
  * módulos de API (`src/api`)
  * componentes reutilizáveis (`src/components`)

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/books" element={<BooksPage />} />
<Route path="/readings" element={<ReadingPage />} />
```

---

## 🔗 Dependências

* [../api/README.md](../api/README.md)
* [../hooks/README.md](../hooks/README.md)
* [../components/README.md](../components/README.md)

---

## ⚠️ Regras e Convenções

* Regras HTTP e endpoints permanecem em `src/api`.
* Estados de loading/erro devem ser tratados explicitamente na tela.
* Operações mutáveis devem sinalizar feedback ao usuário via toast.

---

## 🧠 Observações

* Escopo documentado: src/pages
* As rotas protegidas atualmente são: `/dashboard`, `/books`, `/readings`, `/streaks`, `/friends`, `/profile`.

---
