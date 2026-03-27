# streaks (tests)

## 📌 Propósito

Validar comportamento da página de streaks, check-in e criação de desafio.

---

## 📂 Arquivos e Responsabilidades

* [StreaksPage.test.jsx](StreaksPage.test.jsx)

---

## 🔧 Cenários de Teste Principais

* Renderização de streaks e status.
* Exibição de progresso e melhor sequência.
* Disponibilidade de botão check-in para streak ativo.
* Chamada de `streaksApi.checkIn` e feedback de sucesso/erro.
* Estado vazio sem streaks.
* Abertura/fechamento do modal de criação.
* Validação de título obrigatório.
* Chamada de `streaksApi.create` com payload correto.
* Ocultação de check-in em streak `COMPLETED`.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/pages/streaks/StreaksPage.test.jsx
```

---

## 🔗 Dependências

* [../../../pages/streaks/README.md](../../../pages/streaks/README.md)

---

## ⚠️ Regras e Convenções

* Mudanças em regras de check-in e status exigem atualização desta suíte.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/pages/streaks

---
