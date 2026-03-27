# feed

## 📌 Propósito

Renderizar itens do feed social de leitura com texto contextual por tipo de evento.

---

## 📂 Arquivos e Responsabilidades

* [FeedItem.jsx](FeedItem.jsx) → componente de apresentação de um evento do feed.

---

## 🔧 Funções / Métodos Principais

### FeedItem({ event })

* Usa `TYPE_MAP` para associar `eventType` a:
  * ícone
  * cor
  * texto contextual
* Calcula tempo relativo com `formatDistanceToNow` (`date-fns`, locale `ptBR`).
* Fallback para tipo desconhecido com ícone `TrendingUp`.

---

## ▶️ Exemplos de Uso

```jsx
<FeedItem event={event} />
```

---

## 🔗 Dependências

* [../ui/README.md](../ui/README.md)
* [../../pages/dashboard/DashboardPage.jsx](../../pages/dashboard/DashboardPage.jsx)

---

## ⚠️ Regras e Convenções

* Novos tipos de evento devem ser adicionados em `TYPE_MAP`.
* O texto exibido deve depender apenas de `event` e `payload`.

---

## 🧠 Observações

* Escopo documentado: src/components/feed
* `actorUserId` é exibido como identificação principal do autor do evento.

---
