# 🔐 Node Auth API

Esta é uma API de autenticação desenvolvida com **Node.js** e **TypeScript**, focada em boas práticas de arquitetura, segurança e escalabilidade. O projeto foi construído seguindo princípios **SOLID**.



# 🚀 Tecnologias Utilizadas

* **Node.js** (v22+)
* **TypeScript**
* **Express**
* **Prisma ORM**
* **PostgreSQL**
* **Argon2**
* **JWT (JSON Web Token)**

# 🛡️ Elementos de Segurança

* **Criptografia com Argon2id:** Utilização do algoritmo para criação de hash de senha.
* **Pepper Secret:** Adição de uma camada extra de segurança na criação dos hashs via variáveis de ambiente, além do salt padrão.
* **Middleware de Autenticação:** Proteção de rotas sensíveis via validação de token JWT.

# 🏗️ Arquitetura do Projeto

O projeto utiliza uma estrutura modular, facilitando a manutenção:

```text
src/
├── config/          # Configurações globais (Banco de dados, etc)
├── middlewares/     # Middlewares Express (Autenticação, Erros)
├── modules/         # Módulos de domínio da aplicação
│   └── auth/        # Módulo de Autenticação e Usuários
│       ├── controllers/
│       ├── repositories/
│       ├── entities/
│       └── services/
├── routes/          # Definição de rotas da API
└── server.ts        # Ponto de entrada da aplicação

# 📌 Funcionalidades Atuais

* `POST /auth/register` - Criação de novos usuários.
* `POST /auth/login` - Autenticação e geração de token JWT.
* `GET /auth/me` - Recuperação de dados do perfil logado.
* `PATCH /auth/me` - Atualização de dados (Nome, Email, Senha).
* `DELETE /auth/me` - Exclusão de conta.

# 🛣️ Funcionalidades Futuras

Os próximos passos de desenvolvimento são:

- [ ] **Dockerização:** Configuração de containers para a API, Postgres e Redis.
- [ ] **Refresh Tokens:** Implementação de Access e Refresh Tokens para maior segurança.
- [ ] **Redis Cache:** Uso de Redis para Blacklist de tokens e Rate Limiting.
- [ ] **Recuperação de Senha:** Fluxo de esqueci minha senha com envio de e-mail.
- [ ] **Testes Automatizados:** Implementação de testes unitários e de integração com Jest/Supertest.
- [ ] **Documentação:** Swagger/OpenAPI para documentar os endpoints.

# 🔧 Como rodar o projeto (Desenvolvimento)

1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Configure o arquivo `.env` seguindo o `.env.example`.
4. Rode as migrações do Prisma: `npx prisma migrate dev`.
5. Inicie o servidor: `npm run dev`.