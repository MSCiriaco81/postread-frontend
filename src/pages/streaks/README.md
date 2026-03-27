# streaks

## 📌 Propósito

Gerenciar desafios de consistência de leitura: listagem de streaks, check-in diário e criação de novos desafios.

---

## 📂 Arquivos e Responsabilidades

* [StreaksPage.jsx](StreaksPage.jsx) → listagem de streaks e modal de criação.

---

## 🔧 Funções / Métodos Principais

### StreaksPage()

* Carrega streaks com `streaksApi.list()`.
* `handleCheckIn(id)` executa `streaksApi.checkIn(id, 30)`.
* Mostra estado vazio quando não há streaks.

### StreakCard({ streak, onCheckIn })

* Calcula percentual de progresso e status visual.
* Exibe botão de check-in apenas quando `status === 'ACTIVE'`.

### CreateStreakModal({ onClose })

* Carrega amigos via `socialApi.getFriends()`.
* `submit(e)` valida título e envia `streaksApi.create(...)`.
* Permite montar `participantIds` por campo textual e chips de amigos.

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/streaks" element={<StreaksPage />} />
```

---

## 🔗 Dependências

* [../../api/index.js](../../api/index.js)
* [../../hooks/useFetch.js](../../hooks/useFetch.js)
* [../../components/ui/Toast.jsx](../../components/ui/Toast.jsx)

---

## ⚠️ Regras e Convenções

* Criação de streak exige título e `goalValue` numérico.
* Check-in deve ser habilitado somente para streaks ativos.

---

## 🧠 Observações

* Escopo documentado: src/pages/streaks
* Tipos de meta suportados: `CONSECUTIVE_DAYS`, `TOTAL_MINUTES`, `TOTAL_PAGES`.

---
