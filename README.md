# PostRead Frontend

Interface web da plataforma PostRead, uma rede social para leitores que combina registro de leitura, interação social e gamificação por consistência (streaks).

O frontend consome a API do backend e transforma os dados da plataforma em uma experiência de uso clara, dinâmica e orientada a progresso.

## Sobre o Projeto

O PostRead Frontend foi construído para entregar uma experiência moderna de SPA focada em:

- Leitura confortável e identidade editorial
- Navegação simples entre fluxos principais
- Feedback visual para ações importantes
- Engajamento por progresso e interação social

Conceitualmente, a aplicação mistura:

- Rede social para leitores
- Gamificação por consistência diária
- Acompanhamento de progresso de leitura

## Objetivo

Permitir que o usuário consiga, em um único fluxo:

- Criar conta e autenticar-se
- Registrar sessões de leitura
- Acompanhar progresso pessoal
- Visualizar e participar de streaks
- Explorar livros
- Interagir com amigos
- Acompanhar atividades no feed social

## Papel do Frontend

Camada visual e de experiência do produto, responsável por:

- Consumir endpoints REST do backend
- Gerenciar sessão/autenticação no cliente
- Controlar navegação pública e protegida
- Renderizar páginas por domínio (auth, books, reading, streaks, social, profile, dashboard)
- Exibir dados e estados (loading, erro, sucesso)

## Funcionalidades Principais

### Autenticação

- Tela de login
- Tela de cadastro
- Persistência de sessão via `localStorage`
- Guards de rota para acesso autenticado

### Leituras

- Registro de leitura em modal
- Histórico de leituras
- Remoção de entradas

### Streaks

- Listagem de desafios
- Check-in de leitura
- Criação de streak com meta e participantes

### Livros

- Busca paginada
- Cadastro de novo livro
- Exibição em cards com metadados

### Social

- Lista de amigos
- Solicitações pendentes
- Envio, aceite e rejeição de amizade

### Dashboard e Feed

- Visão consolidada de métricas pessoais
- Leituras recentes
- Feed social de atividades

## Experiência e Identidade Visual

A interface adota linguagem editorial com foco em sofisticação e conforto visual.

Fontes utilizadas:

- Playfair Display
- DM Sans
- DM Mono

Paleta e tipografia são centralizadas em tokens CSS em [src/index.css](src/index.css), combinando tons quentes, tipografia serif/sans e utilitários de animação.

## Arquitetura e Estrutura

Estrutura modular atual:

- [src/api](src/api) → cliente Axios e módulos por domínio
- [src/hooks](src/hooks) → hooks reutilizáveis (`useAuth`, `useFetch`)
- [src/routes](src/routes) → guards de navegação
- [src/components](src/components) → UI, layout e feed
- [src/pages](src/pages) → páginas da aplicação
- [src/__tests__](src/__tests__) → suíte de testes frontend
- [public](public) → assets estáticos

Documentação interna detalhada:

- [src/README.md](src/README.md)
- [src/api/README.md](src/api/README.md)
- [src/hooks/README.md](src/hooks/README.md)
- [src/routes/README.md](src/routes/README.md)
- [src/components/README.md](src/components/README.md)
- [src/pages/README.md](src/pages/README.md)
- [src/__tests__/README.md](src/__tests__/README.md)

## Rotas da Aplicação

Rotas públicas:

- `/login`
- `/register`

Rotas protegidas:

- `/dashboard`
- `/books`
- `/readings`
- `/streaks`
- `/friends`
- `/profile`

Referência: [src/App.jsx](src/App.jsx).

## Integração com o Backend

Fluxo atual de integração:

- Cliente HTTP com `baseURL` `/api/v1` em [src/api/client.js](src/api/client.js)
- Proxy do Vite para backend local em [vite.config.js](vite.config.js):
	- `/api` → `http://localhost:8080`
- JWT enviado automaticamente via interceptor de request
- Em `401`, sessão local é limpa e usuário redirecionado para `/login`

## Tecnologias Utilizadas

- React 18
- React Router DOM 6
- Vite 5
- JavaScript (ES Modules)
- Axios
- CSS Modules + CSS global com design tokens
- Lucide React
- date-fns

Ferramentas de qualidade e testes:

- Vitest
- Testing Library
- MSW
- ESLint

Referência de dependências: [package.json](package.json).

## Como Executar

Pré-requisitos:

- Node.js 18+
- Backend PostRead em execução (porta 8080)

Instalação e execução:

```bash
npm install
npm run dev
```

Aplicação local:

- `http://localhost:5173`

Scripts principais:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm test`
- `npm run test:watch`
- `npm run test:coverage`

## Testes

A suíte cobre:

- Camada de API e interceptors
- Hooks compartilhados
- Componentes de UI e feed
- Páginas principais
- Guards de rota

Infra de testes:

- Setup global em [src/__tests__/setup.js](src/__tests__/setup.js)
- Handlers MSW em [src/__tests__/mocks/handlers.js](src/__tests__/mocks/handlers.js)

## Escalabilidade e Evolução

Base pronta para evoluções como:

- Fluxos sociais mais ricos
- Perfil avançado
- Desafios em grupo mais complexos
- Notificações em tempo real
- Melhorias de experiência mobile
- Temas visuais adicionais

## Diferencial

O diferencial do frontend do PostRead está em converter dados de leitura em uma experiência social e motivadora, unindo:

- Leitura
- Comunidade
- Progresso
- Gamificação

## Resultado Esperado

Com o frontend atual, o usuário deve conseguir:

- Navegar com facilidade entre os módulos
- Registrar leituras sem fricção
- Entender rapidamente o próprio progresso
- Sentir contexto social via feed e amizades
- Manter motivação por streaks e metas

## Observações Técnicas

- O atalho de sidebar para `/readings/new` existe em [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx), mas essa rota não está declarada em [src/App.jsx](src/App.jsx) no estado atual.
