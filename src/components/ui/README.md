# ui

## 📌 Propósito

Fornecer blocos de interface reutilizáveis e consistentes para formulários, ações, placeholders e notificações.

---

## 📂 Arquivos e Responsabilidades

* [Button.jsx](Button.jsx) → botão reutilizável com variantes, tamanhos e estado de loading.
* [Input.jsx](Input.jsx) → campo de entrada com label, hint e erro; inclui `Textarea`.
* [Card.jsx](Card.jsx) → container visual reutilizável com opção de hover.
* [Skeleton.jsx](Skeleton.jsx) → placeholders de carregamento; inclui `SkeletonText`.
* [Toast.jsx](Toast.jsx) → provider + hook para notificações temporárias (`success`, `error`, `info`).

---

## 🔧 Funções / Métodos Principais

* `Button({ variant, size, loading, as })`
* `Input({ label, error, hint })`
* `Textarea({ label, error, hint })`
* `Card({ hover })`
* `Skeleton({ width, height, circle })`
* `SkeletonText({ lines })`
* `ToastProvider({ children })`
* `useToast()`

---

## ▶️ Exemplos de Uso

```jsx
const toast = useToast()

<Button loading={saving} onClick={save}>Salvar</Button>
<Input label="Email" error={errors.email} />
<Card hover>Conteúdo</Card>
```

---

## 🔗 Dependências

* [../../hooks/README.md](../../hooks/README.md)
* [../../pages/README.md](../../pages/README.md)

---

## ⚠️ Regras e Convenções

* Componentes devem permanecer agnósticos de domínio.
* Mensagens de erro/hint são responsabilidade de quem consome o componente.
* `useToast` deve ser usado apenas dentro de `ToastProvider`.

---

## 🧠 Observações

* Escopo documentado: src/components/ui
* Toast remove mensagens automaticamente após 4 segundos.

---
