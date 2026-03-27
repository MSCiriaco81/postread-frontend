# social

## 📌 Propósito

Concentrar fluxo social de amizades: envio de solicitação, aceite/rejeição e listagem de amigos.

---

## 📂 Arquivos e Responsabilidades

* [FriendsPage.jsx](FriendsPage.jsx) → tela de gestão de amizades.

---

## 🔧 Funções / Métodos Principais

### FriendsPage()

* Carrega:
  * `socialApi.getFriends()`
  * `socialApi.getPending()`
* `sendRequest()` envia solicitação para o ID informado.
* `accept(id)` aceita solicitação e recarrega amigos + pendentes.
* `reject(id)` rejeita solicitação e recarrega pendentes.

### FriendCard({ friend }) / FriendSkeleton()

* Componentes auxiliares para card de amigo e loading.

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/friends" element={<FriendsPage />} />
```

---

## 🔗 Dependências

* [../../api/index.js](../../api/index.js)
* [../../hooks/useFetch.js](../../hooks/useFetch.js)
* [../../components/ui/Toast.jsx](../../components/ui/Toast.jsx)

---

## ⚠️ Regras e Convenções

* IDs de usuário para solicitação devem ser tratados com `trim()`.
* Após aceitar/rejeitar, os dados da UI devem ser recarregados.
* Erros de API devem priorizar `response.data.detail` quando disponível.

---

## 🧠 Observações

* Escopo documentado: src/pages/social
* A seção de pendentes só é exibida quando há dados ou carregamento ativo.

---
