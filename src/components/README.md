# components

## 📌 Propósito

Agrupar componentes reutilizáveis de UI, layout e visualização de feed usados pelas páginas do PostRead.

---

## 📂 Arquivos e Responsabilidades

* [ui/README.md](ui/README.md) → componentes base (`Button`, `Input`, `Card`, `Skeleton`, `Toast`).
* [layout/README.md](layout/README.md) → estrutura de navegação e shell da aplicação.
* [feed/README.md](feed/README.md) → componente de item de feed social.

---

## 🔧 Funções / Métodos Principais

* `AppLayout()` organiza sidebar + outlet de rotas.
* `Sidebar()` renderiza navegação, usuário logado e ação de logout.
* `FeedItem({ event })` renderiza eventos de feed com mapeamento por tipo.
* Componentes de `ui` padronizam interações, estados de loading, erro e feedback.

---

## ▶️ Exemplos de Uso

```jsx
import Button from './ui/Button'
import Card from './ui/Card'

<Card>
  <Button>Salvar</Button>
</Card>
```

---

## 🔗 Dependências

* [../hooks/README.md](../hooks/README.md)
* [../api/README.md](../api/README.md)
* [../pages/README.md](../pages/README.md)

---

## ⚠️ Regras e Convenções

* Componentes de domínio não devem consumir API diretamente.
* Regras de autenticação/roteamento devem ficar em hooks/routes.
* Estilos locais devem usar CSS Modules por componente.

---

## 🧠 Observações

* Escopo documentado: src/components
* Esta documentação usa os arquivos atuais da pasta como fonte de verdade.

---
