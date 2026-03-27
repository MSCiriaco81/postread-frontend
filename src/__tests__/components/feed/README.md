# feed (tests)

## 📌 Propósito

Validar o comportamento de apresentação do componente de item do feed.

---

## 📂 Arquivos e Responsabilidades

* [FeedItem.test.jsx](FeedItem.test.jsx) → cenários de renderização por `eventType`.

---

## 🔧 Cenários de Teste Principais

* Renderiza usuário autor do evento.
* Exibe minutos para `READING_LOGGED`.
* Exibe mensagens para `STREAK_MAINTAINED`, `STREAK_BROKEN` e `FRIENDSHIP_STARTED`.
* Renderiza tempo relativo quando `createdAt` existe.
* Mantém estabilidade com `eventType` desconhecido.
* Mantém estabilidade sem `payload`.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/components/feed/FeedItem.test.jsx
```

---

## 🔗 Dependências

* [../../../components/feed/README.md](../../../components/feed/README.md)

---

## ⚠️ Regras e Convenções

* Sempre adicionar teste ao incluir novo tipo de evento no `TYPE_MAP`.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/components/feed

---
