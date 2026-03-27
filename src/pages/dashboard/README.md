# dashboard

## 📌 Propósito

Exibir visão consolidada do usuário autenticado: métricas de leitura, feed social e leituras recentes.

---

## 📂 Arquivos e Responsabilidades

* [DashboardPage.jsx](DashboardPage.jsx) → tela principal após autenticação.

---

## 🔧 Funções / Métodos Principais

### DashboardPage()

* Carrega dados com `useFetch`:
  * `feedApi.list(0, 10)`
  * `readingApi.list(0, 5)`
  * `streaksApi.list()`
* Calcula:
  * `totalMinutes`
  * `totalPages`
  * `activeStreaks`
* Renderiza seções de feed e leituras com fallback vazio e skeleton.

### StatCard({ icon, label, value, loading })

* Cartão de métrica com suporte a estado de loading.

### ReadingRow({ entry })

* Linha de leitura recente com data, minutos, páginas e rating.

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/dashboard" element={<DashboardPage />} />
```

---

## 🔗 Dependências

* [../../api/README.md](../../api/README.md)
* [../../hooks/useAuth.jsx](../../hooks/useAuth.jsx)
* [../../hooks/useFetch.js](../../hooks/useFetch.js)
* [../../components/feed/FeedItem.jsx](../../components/feed/FeedItem.jsx)

---

## ⚠️ Regras e Convenções

* Cálculos agregados devem usar fallback seguro para listas vazias.
* Estrutura visual deve manter separação entre métricas e timeline.

---

## 🧠 Observações

* Escopo documentado: src/pages/dashboard
* No estado atual, leituras recentes exibem `bookId` como identificador principal.

---
