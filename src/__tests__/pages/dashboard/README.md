# dashboard (tests)

## 📌 Propósito

Validar composição da home autenticada e cálculo de métricas exibidas.

---

## 📂 Arquivos e Responsabilidades

* [DashboardPage.test.jsx](DashboardPage.test.jsx)

---

## 🔧 Cenários de Teste Principais

* Saudação com username autenticado.
* Exibição de subtítulo e seções principais.
* Cálculo e render de minutos/páginas totais.
* Contagem de streaks ativos.
* Render de feed e leituras recentes.
* Estados vazios para feed e leituras.
* Cálculos com listas vazias e múltiplas leituras.

---

## ▶️ Exemplos de Uso

```bash
npx vitest run src/__tests__/pages/dashboard/DashboardPage.test.jsx
```

---

## 🔗 Dependências

* [../../../pages/dashboard/README.md](../../../pages/dashboard/README.md)

---

## ⚠️ Regras e Convenções

* Mudanças nos cálculos de métricas devem atualizar asserts numéricos desta suíte.

---

## 🧠 Observações

* Escopo documentado: src/__tests__/pages/dashboard

---
