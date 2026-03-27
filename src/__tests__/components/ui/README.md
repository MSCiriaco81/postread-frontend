# ui (tests)

## 📌 Propósito

Validar componentes base de interface e feedback visual.

---

## 📂 Arquivos e Responsabilidades

* [Button.test.jsx](Button.test.jsx)
* [Input.test.jsx](Input.test.jsx)
* [Card.Skeleton.test.jsx](Card.Skeleton.test.jsx)
* [Toast.test.jsx](Toast.test.jsx)

---

## 🔧 Cenários de Teste Principais

### Button.test.jsx

* Renderização de texto.
* Disparo de `onClick`.
* Bloqueio com `loading` e `disabled`.
* Renderização como link (`as="a"`).
* Preservação de props (`type`, `className`).

### Input.test.jsx

* Render de label, error e hint.
* Prioridade de erro sobre hint.
* Evento `onChange`.
* Valor controlado e placeholder.
* Cobertura de `Textarea`.

### Card.Skeleton.test.jsx

* Renderização de conteúdo em `Card`.
* Propagação de atributos extras.
* `Skeleton` com estilos e `aria-hidden`.
* `SkeletonText` com número de linhas configurável.

### Toast.test.jsx

* Exibição de toasts `success`, `error`, `info`.
* Auto-remoção após timeout.
* Erro ao usar `useToast` fora do provider.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/components/ui/Button.test.jsx
npx vitest run src/__tests__/components/ui/Toast.test.jsx
```

---

## 🔗 Dependências

* [../../../components/ui/README.md](../../../components/ui/README.md)

---

## ⚠️ Regras e Convenções

* Testes devem cobrir tanto render quanto interação.
* Ao alterar contratos de props, atualizar os testes do componente.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/components/ui

---
