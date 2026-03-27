# layout

## 📌 Propósito

Definir o shell visual da aplicação autenticada e a navegação principal entre módulos.

---

## 📂 Arquivos e Responsabilidades

* [AppLayout.jsx](AppLayout.jsx) → composição com sidebar fixa e área principal (`Outlet`).
* [Sidebar.jsx](Sidebar.jsx) → links de navegação, dados do usuário e ação de logout.

---

## 🔧 Funções / Métodos Principais

### AppLayout()

* Renderiza `<Sidebar />` e `<Outlet />` para as rotas protegidas.

### Sidebar()

* Usa `useAuth()` para obter `user` e `logout`.
* Usa `useNavigate()` para redirecionar para `/login` após `handleLogout()`.
* Mapeia links via constante `NAV` para dashboard, books, readings, streaks, friends e profile.

---

## ▶️ Exemplos de Uso

```jsx
<Route element={<ProtectedRoute />}>
  <Route element={<AppLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
</Route>
```

---

## 🔗 Dependências

* [../../hooks/useAuth.jsx](../../hooks/useAuth.jsx)
* [../../routes/README.md](../../routes/README.md)

---

## ⚠️ Regras e Convenções

* Novas rotas protegidas devem ser refletidas na navegação quando apropriado.
* Ação de logout deve permanecer centralizada em `useAuth`.

---

## 🧠 Observações

* Escopo documentado: src/components/layout
* O link `/readings/new` aparece no atalho lateral, mesmo sem rota dedicada em `App.jsx` no estado atual.

---
