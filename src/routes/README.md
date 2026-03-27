# routes

## 📌 Propósito

Aplicar regras de acesso nas rotas do frontend com base no estado de autenticação do usuário.

---

## 📂 Arquivos e Responsabilidades

* [Guards.jsx](Guards.jsx) → Guards de rota para páginas protegidas e páginas exclusivas de visitante.

---

## 🔧 Funções / Métodos Principais

### ProtectedRoute()

**Descrição:**
Permite acesso somente para usuários autenticados.

**Comportamento:**
* Se `isAuth === true`, renderiza `<Outlet />`.
* Se `isAuth === false`, redireciona para `/login`.

### PublicOnlyRoute()

**Descrição:**
Permite acesso somente para usuários não autenticados.

**Comportamento:**
* Se `isAuth === false`, renderiza `<Outlet />`.
* Se `isAuth === true`, redireciona para `/dashboard`.

---

## ▶️ Exemplos de Uso

```jsx
<Route element={<PublicOnlyRoute />}>
  <Route path="/login" element={<LoginPage />} />
</Route>

<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardPage />} />
</Route>
```

---

## 🔗 Dependências

* [Guards.jsx](Guards.jsx)
* [../hooks/useAuth.jsx](../hooks/useAuth.jsx)
* [../hooks/README.md](../hooks/README.md)

---

## ⚠️ Regras e Convenções

* Não duplicar checagem de autenticação em cada página.
* Mudanças de regra de acesso devem ser centralizadas neste módulo.

---

## 🧠 Observações

* Escopo documentado: src/routes
* O fluxo de autenticação depende de `isAuth` fornecido por `AuthProvider`.

---
