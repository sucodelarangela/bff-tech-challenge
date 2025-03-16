BFF Tech Challenge (Backend For Frontend)

Este projeto é um Backend For Frontend (BFF) que consome uma API e disponibiliza os dados para uma aplicação microfrontend React + TypeScript (Tech Challeng FIAP).

## Estrutura do Projeto

```
bff-api/
├── src/
│   ├── config/        - Configurações da aplicação
│   ├── controllers/   - Controladores da API
│   ├── services/      - Serviços para consumo da API
│   ├── types/         - Definições de tipos TypeScript
│   ├── middleware/    - Middlewares Express
│   ├── index.ts       - Ponto de entrada da aplicação
│   └── routes.ts      - Rotas da API
├── .env               - Variáveis de ambiente
├── .gitignore         - Arquivos ignorados pelo Git
├── package.json       - Dependências e scripts
├── tsconfig.json      - Configuração do TypeScript
└── README.md          - Documentação do projeto
```

## Requisitos

- Node.js >= 16.x
- npm ou yarn

<!--
## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/sucodelarangela/bff-tech-challenge.git
cd api-bff
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente copiando o arquivo `.env.example` para `.env` e ajustando os valores:
```bash
cp .env.example .env
```

## Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

## Build e Produção

Para compilar o projeto:

```bash
npm run build
# ou
yarn build
```

Para iniciar em produção:

```bash
npm start
# ou
yarn start
```

## Integrando com React

Para utilizar este BFF em sua aplicação React + TypeScript:

1. Configure o URL do BFF em seu cliente React (por exemplo, em um arquivo `.env`):
```
REACT_APP_API_URL=http://localhost:3001/api
```

2. Crie um serviço para consumir o BFF:

```typescript
// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
```

3. Utilize o serviço em seus componentes:

```typescript
import { useEffect, useState } from 'react';
import api from './api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get('/users');
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários.</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```
-->

## Documentação da API

### Endpoints

#### Usuários

- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Obtém um usuário específico
- `POST /api/users` - Cria um novo usuário
- `PUT /api/users/:id` - Atualiza um usuário existente
- `DELETE /api/users/:id` - Remove um usuário

#### Produtos

- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Obtém um produto específico

<!--
## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
-->

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
