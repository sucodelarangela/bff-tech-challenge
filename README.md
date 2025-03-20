# BFF Tech Challenge (Backend For Frontend)

Este projeto é um Backend For Frontend (BFF) que consome uma API e disponibiliza os dados para uma aplicação microfrontend React + TypeScript (Tech Challeng FIAP).

> **NOTA:**
>
> _O backend da aplicação está hosteado no free tier da plataforma [**Render**](https://render.com/), que pode hibernar o servidor por tempo de inatividade. Nesse caso, pode ocorrer da API devolver um erro com [**Status 504**](https://http.dog/504) nos primeiros acessos._
>
> _Caso isto ocorra, **tente novamente em alguns segundos** enquanto o servidor "acorda"._

## Estrutura do Projeto

```
bff-tech-challenge/
├── src/
│   ├── config/              - Configurações da aplicação
│   ├── controllers/         - Controladores da API
│   ├── middleware/          - Middlewares Express
│   ├── services/            - Serviços para consumo da API
│   ├── types/               - Definições de tipos TypeScript
│   ├── index.ts             - Ponto de entrada da aplicação
│   └── routes.ts            - Rotas da API
├── .env                     - Variáveis de ambiente
├── .gitignore               - Arquivos ignorados pelo Git
├── postman_collection.json  - JSON de collection do Postman
├── LICENSE                  - Arquivo de licença de uso
├── package.json             - Dependências e scripts
├── README.md                - Documentação do projeto
├── tsconfig.json            - Configuração do TypeScript
├── vercel-handler.ts        - Definição de rota para Vercel
└── vercel.json              - Configuração de deploy na Vercel
```

## Requisitos

- Node.js >= 16.x
- npm ou yarn

## Documentação da API

#### Swagger

- No browser: `{{base_url}}/bff/docs` - Abre a documentação no Swagger

#### Health Check

- No browser: `{{base_url}}/health` - Verifica o status da conexão

### Endpoints

#### Usuário

- `POST /bff/login` - Autentica um usuário
- `POST /bff/user/create` - Cria um novo usuário
- `GET /bff/users` - Lista todos os usuários
- `GET /bff/user/:id` - Retorna as informações do usuário

#### Conta

- `GET /bff/account` - Lista detalhes da conta
- `GET /bff/account/:id/statement` - Lista extrato da conta
- `GET /bff/account/:id/last-transactions` - Retorna as últimas transações da conta
- `POST /bff/account/transaction` - Cria uma nova transação
- `DELETE /bff/account/transaction` - Delete uma transação
- `PUT /bff/account/transaction/:transactionId` - Atualiza uma transação

<!--
## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/sucodelarangela/bff-tech-challenge.git
cd api-bff
````

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

-->

## Integrando com React

Para utilizar este BFF em sua aplicação React + TypeScript:

1. Configure o URL do BFF em seu cliente React (por exemplo, em um arquivo `.env`):

```
REACT_APP_API_URL=http://localhost:3001/bff
```

2. Crie um serviço para consumir o BFF:

```typescript
// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
```

3. Utilize o serviço em seus componentes:

```typescript
import { useEffect, useState } from "react";
import api from "./api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/bff/users");
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
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

## Equipe

| <img width="120" src="https://avatars.githubusercontent.com/u/86853033?v=4"> | <img width="120" src="https://avatars.githubusercontent.com/u/167245532?v=4"> | <img width="120" src="https://avatars.githubusercontent.com/u/12201855?v=4"> |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Angela Caldas](https://github.com/sucodelarangela)                          | [Guilherme Afonso](https://github.com/guilhermeafonsogauge)                   | [Paula Macedo](https://github.com/paulamacedof)                              |

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
