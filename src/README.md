# src

## 📌 Propósito

Conter o núcleo da aplicação frontend em React: inicialização, roteamento, estado global de autenticação, integração com API e estrutura de páginas/componentes.

---

## 📂 Arquivos e Responsabilidades

* [main.jsx](main.jsx) → Ponto de entrada da aplicação no DOM.
* [App.jsx](App.jsx) → Composição raiz com providers, rotas públicas e protegidas.
* [api/README.md](api/README.md) → Cliente HTTP e contratos de acesso ao backend.
* [hooks/README.md](hooks/README.md) → Hooks compartilhados de autenticação e carregamento.
* [routes/README.md](routes/README.md) → Guards de navegação (proteção e redirecionamento por autenticação).
* [components/](components/) → Componentes reutilizáveis de UI e layout.
* [pages/](pages/) → Páginas de features (auth, dashboard, books, reading, social, streaks, profile).
* [test/](test/) e [__tests__/](__tests__/) → Configuração e suíte de testes frontend.

---

## 🔧 Funções / Métodos Principais

### main.jsx

* `ReactDOM.createRoot(...).render(...)` → Inicializa o app com `React.StrictMode`.

### App.jsx

* `App()` → Monta `BrowserRouter`, `AuthProvider`, `ToastProvider` e define as rotas da aplicação.
* Rotas públicas: `/login`, `/register` com `PublicOnlyRoute`.
* Rotas protegidas: `/dashboard`, `/books`, `/readings`, `/streaks`, `/friends`, `/profile` com `ProtectedRoute` + `AppLayout`.

---

## ▶️ Exemplos de Uso

```jsx
// Entrada da aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## 🔗 Dependências

* [main.jsx](main.jsx)
* [App.jsx](App.jsx)
* [api/README.md](api/README.md)
* [hooks/README.md](hooks/README.md)
* [routes/README.md](routes/README.md)

---

## ⚠️ Regras e Convenções

* Manter separação clara entre UI, regra de interface e integração HTTP.
* Centralizar chamadas de backend em `src/api`.
* Evitar lógica de autorização espalhada em páginas; usar guards e `useAuth`.

---

## 🧠 Observações

* Escopo documentado: src
* Esta documentação usa os arquivos atuais da pasta como fonte de verdade.

---
