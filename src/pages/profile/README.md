# profile

## 📌 Propósito

Exibir dados do usuário autenticado e permitir atualização de bio/foto de perfil.

---

## 📂 Arquivos e Responsabilidades

* [ProfilePage.jsx](ProfilePage.jsx) → visualização e edição de perfil.

---

## 🔧 Funções / Métodos Principais

### ProfilePage()

* Carrega perfil com `usersApi.me()`.
* `startEdit()` inicializa campos locais (`bio`, `photoUrl`) com os dados atuais.
* `save()` envia atualização via `usersApi.updateProfile(...)`, exibe toast e recarrega perfil.
* Exibe skeleton enquanto `loading`.

### ProfileSkeleton()

* Placeholder visual para carregamento inicial da página.

---

## ▶️ Exemplos de Uso

```jsx
<Route path="/profile" element={<ProfilePage />} />
```

---

## 🔗 Dependências

* [../../api/index.js](../../api/index.js)
* [../../hooks/useAuth.jsx](../../hooks/useAuth.jsx)
* [../../hooks/useFetch.js](../../hooks/useFetch.js)
* [../../components/ui/Toast.jsx](../../components/ui/Toast.jsx)

---

## ⚠️ Regras e Convenções

* Campos vazios de edição são enviados como `undefined` para evitar sobrescrita indevida.
* Feedback visual de erro/sucesso deve permanecer explícito para o usuário.

---

## 🧠 Observações

* Escopo documentado: src/pages/profile
* Quando não há `profilePicture`, a UI usa a inicial do username como avatar.

---
