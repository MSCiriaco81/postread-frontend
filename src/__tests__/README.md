# __tests__

## 📌 Propósito

Centralizar a suíte automatizada do frontend (Vitest + Testing Library + MSW), validando componentes, hooks, páginas, guards de rota e contratos de API.

---

## 📂 Arquivos e Responsabilidades

* [setup.js](setup.js) → configuração global de testes (jest-dom, MSW, mocks globais).
* [utils.jsx](utils.jsx) → utilitários de renderização com providers e contexto autenticado.
* [routes.Guards.test.jsx](routes.Guards.test.jsx) → testes de proteção/redirecionamento de rotas.
* [api/README.md](api/README.md) → testes da camada de API e interceptors.
* [components/README.md](components/README.md) → testes de componentes de UI e feed.
* [hooks/README.md](hooks/README.md) → testes dos hooks compartilhados.
* [pages/README.md](pages/README.md) → testes das telas principais.
* [mocks/README.md](mocks/README.md) → fixtures e handlers MSW.

---

## 🔧 Funções / Métodos Principais

### setup.js

* Inicializa servidor MSW (`beforeAll`).
* Faz reset de handlers e cleanup por teste (`afterEach`).
* Encerra MSW (`afterAll`).
* Mocka CSS Modules e ícones `lucide-react` para ambiente jsdom.

### utils.jsx

* `renderWithProviders(ui, options)`
* `renderAuthenticated(ui, options)`

### routes.Guards.test.jsx

* Valida comportamento de `ProtectedRoute` e `PublicOnlyRoute` com/sem autenticação.

---

## ▶️ Exemplos de Uso

```bash
# Rodar toda a suíte frontend
npm test

# Rodar um arquivo específico
npx vitest run src/__tests__/routes.Guards.test.jsx
```

---

## 🔗 Dependências

* [../api/README.md](../api/README.md)
* [../hooks/README.md](../hooks/README.md)
* [../routes/README.md](../routes/README.md)
* [mocks/README.md](mocks/README.md)

---

## ⚠️ Regras e Convenções

* Novos comportamentos de tela devem incluir testes de sucesso e erro.
* Preferir `renderWithProviders`/`renderAuthenticated` para manter contexto consistente.
* Evitar dependência real de rede: usar handlers MSW.

---

## 🧠 Observações

* Escopo documentado: src/__tests__
* Esta documentação usa os arquivos atuais da pasta como fonte de verdade.

---
