# components (tests)

## 📌 Propósito

Cobrir comportamento de componentes reutilizáveis e do item de feed.

---

## 📂 Arquivos e Responsabilidades

* [ui/README.md](ui/README.md) → testes de `Button`, `Input`, `Card`, `Skeleton` e `Toast`.
* [feed/README.md](feed/README.md) → testes de `FeedItem`.

---

## 🔧 Funções / Métodos Principais

* Validação de renderização condicional, interação de usuário e estados de acessibilidade.
* Verificação de mensagens por tipo de evento no feed.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/components/ui
npx vitest run src/__tests__/components/feed
```

---

## 🔗 Dependências

* [../../components/README.md](../../components/README.md)
* [../README.md](../README.md)

---

## ⚠️ Regras e Convenções

* Mudança em componente compartilhado deve incluir atualização de testes correspondentes.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/components

---
