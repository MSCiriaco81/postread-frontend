# test

## 📌 Propósito

Conter configuração complementar de testes do frontend fora da árvore `__tests__`.

---

## 📂 Arquivos e Responsabilidades

* [setup.js](setup.js) → inicialização simplificada do MSW para execução de testes.

---

## 🔧 Funções / Métodos Principais

* `beforeAll(() => server.listen(...))`
* `afterEach(() => server.resetHandlers())`
* `afterAll(() => server.close())`

---

## ▶️ Exemplos de Uso

```js
import './test/setup'
```

---

## 🔗 Dependências

* [../__tests__/mocks/server.js](../__tests__/mocks/server.js)
* [../__tests__/README.md](../__tests__/README.md)

---

## ⚠️ Regras e Convenções

* Ajustes em setup de testes devem manter compatibilidade com MSW e Vitest.

---

## 🧠 Observações

* Escopo documentado: src/test
* O setup principal atualmente está em [../__tests__/setup.js](../__tests__/setup.js).

---
