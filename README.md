# Gerenciador de Tarefas

O Gerenciador de Tarefas é uma plataforma desenvolvida para o controle e organização de atividades diárias. O sistema foi criado pensando na facilidade e eficácia, proporcionando uma experiência de usuário otimizada e funcionalidades essenciais para o gerenciamento de tarefas.

Características Principais:
Criação de Tarefas: Os usuários podem registrar tarefas, colocando apenas um nome. Isso permite que cada tarefa seja ajustada às necessidades individuais, garantindo que nenhuma atividade seja esquecida ou negligenciada.

Edição de Tarefas: A flexibilidade é essencial. Caso haja alguma mudança de planos ou ajustes a serem feitos, os usuários podem facilmente editar qualquer informação associada a uma tarefa existente.

Exclusão de Tarefas: Concluiu uma tarefa ou decidiu que ela não é mais relevante? É possível excluir tarefas conforme necessário, mantendo a lista atualizada e livre de desordem.

Segurança na Autenticação: Graças à implementação do JWT (JSON Web Token), cada usuário tem sua própria sessão segura, garantindo que suas tarefas sejam privadas e protegidas de acessos não autorizados.

## 🛠️ Tecnologias Utilizadas

- Backend:
  - [NestJS](https://nestjs.com/)
  - [@nestjs/passport](https://github.com/nestjs/passport) - Autenticação JWT
  - [Swagger](https://swagger.io/) - Documentação e testes de API
  - [Prisma](https://www.prisma.io/) - ORM para conexão com banco de dados
  - [PostgreSQL](https://www.postgresql.org/) - Banco de dados

- Frontend:
  - [Next.js](https://nextjs.org/)
  - [next-auth](https://next-auth.js.org/) - Autenticação JWT
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

## 🚀 Instalação e Uso

### Pré-requisitos

- Docker
- Docker Compose

### Configuração e Inicialização

Com o terminal na pasta root do projeto, construa e inicie os containers:
```bash
docker compose up
```

O backend estará rodando em `http://localhost:3001`, o frontend em `http://localhost:3000`, e o banco de dados PostgreSQL estará disponível na porta `5432`.

Para parar os containers, use:

```bash
docker compose down
```

### Persistência dos Dados

Os dados do PostgreSQL são persistentes graças ao volume `postgres_data`. Isso garante que mesmo ao parar ou remover o container, seus dados estarão seguros.


## 📖 Documentação da backend

Para acessar a documentação da API via Swagger, navegue para `http://localhost:3001/api`.