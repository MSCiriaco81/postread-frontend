# postread-frontend

Frontend do Postread — rede social para leitores.

## Stack

- React 18
- React Router DOM 6
- Vite 5
- CSS Modules
- Axios

## Fontes

- **Playfair Display** — títulos e elementos editoriais
- **DM Sans** — corpo e UI
- **DM Mono** — métricas e dados

## Instalação

```bash
npm install
npm run dev
```

O frontend roda em `http://localhost:5173` e faz proxy de `/api` para `http://localhost:8080` (backend).

## Estrutura

```
src/
├── api/              # Axios client + módulos de serviço por domínio
├── components/
│   ├── ui/           # Button, Input, Card, Skeleton, Toast
│   ├── layout/       # Sidebar, AppLayout
│   └── feed/         # FeedItem
├── hooks/            # useAuth (contexto JWT), useFetch
├── pages/
│   ├── auth/         # Login, Register
│   ├── dashboard/    # Home + feed social
│   ├── books/        # Explorar e adicionar livros
│   ├── reading/      # Histórico e registro de leituras
│   ├── streaks/      # Streaks individuais e em grupo
│   ├── social/       # Amigos e solicitações
│   └── profile/      # Perfil e edição
└── routes/           # Guards de rota (ProtectedRoute, PublicOnlyRoute)
```

## Páginas

| Rota | Página | Descrição |
|---|---|---|
| `/login` | Login | Autenticação com JWT |
| `/register` | Registro | Criação de conta |
| `/dashboard` | Dashboard | Feed + stats + leituras recentes |
| `/books` | Explorar | Busca e adição de livros |
| `/readings` | Leituras | Histórico e registro de sessões |
| `/streaks` | Streaks | Desafios de leitura |
| `/friends` | Amigos | Gerenciar conexões |
| `/profile` | Perfil | Ver e editar perfil |
