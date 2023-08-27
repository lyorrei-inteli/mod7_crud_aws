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

## 🔍 Por que Essas Tecnologias?

- **NestJS**: Este é um framework de back-end progressivo para construção de aplicações eficientes, confiáveis e escaláveis em Node.js. Sua arquitetura modular, baseada em decorators, oferece uma estrutura coerente e extensível que é fácil de manter.

- **@nestjs/passport e next-auth**: A autenticação é uma parte vital de qualquer aplicação moderna. NestJS Passport e next-auth oferecem estratégias de autenticação flexíveis, incluindo JWT, o que ajuda a garantir que os dados dos usuários permaneçam seguros.

- **Swagger**: Uma ferramenta essencial para a criação de documentação API auto-gerada. Ela permite que os desenvolvedores e consumidores da API interajam com a API sem qualquer implementação lógica, ajudando a entender e testar endpoints.

- **Prisma**: Um ORM moderno que facilita a conexão com bancos de dados. Sua abordagem tipo-safe e auto-generated elimina uma grande quantidade de código boilerplate e possíveis erros, tornando a interação com o banco de dados mais intuitiva e segura.

- **PostgreSQL**: Um poderoso sistema de banco de dados relacional de código aberto com mais de 30 anos de desenvolvimento ativo. É conhecido por sua confiabilidade, robustez e desempenho.

- **Next.js**: Uma estrutura React que fornece recursos como Server Side Rendering (SSR) e Static Site Generation (SSG), garantindo desempenho, SEO e otimização de carregamento de páginas.

- **Tailwind CSS**: Este framework CSS utilitário fornece uma abordagem mais eficiente e modular para estilizar aplicações, permitindo designs responsivos com menos código customizado.

## 📚 Estrutura do Banco de Dados

A aplicação utiliza o Prisma, um ORM (Object-Relational Mapping) moderno, para definir e interagir com a estrutura do banco de dados. Abaixo, você encontrará uma descrição detalhada das configurações e modelos definidos no esquema do Prisma:

### Modelos:

1. **User**:
    - **id**: Um identificador único para cada usuário, gerado automaticamente usando UUID.
    - **email**: Endereço de email do usuário. É único, o que significa que não podem existir dois usuários com o mesmo email.
    - **password**: Senha do usuário armazenada.
    - **name**: Nome do usuário.
    - **todos**: Uma relação que indica todas as tarefas (todos) associadas a um usuário.
    - **roles**: Define os papéis associados a um usuário. Por padrão, um usuário tem o papel de `USER`.
    - **createdAt**: A data e a hora em que o registro do usuário foi criado.

2. **Role (Enum)**:
    - Enumeração que define os possíveis papéis no sistema: `USER` e `ADMIN`.

3. **Todo**:
    - **id**: Um identificador único para cada tarefa, gerado automaticamente usando UUID.
    - **title**: Título ou descrição da tarefa.
    - **completed**: Um booleano que indica se a tarefa foi concluída. Por padrão, é `false`.
    - **user**: Uma relação que associa a tarefa a um usuário específico.
    - **userId**: Chave estrangeira que refere-se ao ID do usuário associado a essa tarefa.
    - **createdAt**: A data e a hora em que a tarefa foi criada.

## 📂 Estrutura de Pastas

O projeto está dividido em duas partes principais: o backend, que utiliza NestJS, e o frontend, que é baseado no Next.js. Abaixo está uma visão geral da organização e estrutura das pastas do projeto:

```
📦 Todo project
 ┣ 📂 backend               # Pasta raiz do backend (NestJS)
 ┃ ┣ 📂 prisma              # Modelo do banco de dados e migrações
 ┃ ┣ 📂 src                 # Código-fonte do backend
 ┃ ┗ 📜 main.ts             # Ponto de entrada da aplicação NestJS
 ┣ 📂 frontend              # Pasta raiz do frontend (Next.js)
 ┃ ┣ 📂 src                 # Código-fonte do frontend
 ┃ ┣ ┣ 📂 components        # Componentes reutilizáveis da UI
 ┃ ┣ ┣ 📂 app               # Páginas e rotas da aplicação Next.js
 ┃ ┣ ┣ 📂 assets            # Arquivos como imagens
 ┃ ┣ ┣ 📂 config            # Arquivos com funções utils ou de configuração
 ┗ 📜 README.md             # Descrição e documentação do projeto
```

### Backend (NestJS):

Localizado na pasta `backend`, o código do NestJS gerencia a lógica do servidor, as conexões com o banco de dados e a API que alimenta o frontend.

### Frontend (Next.js):

A pasta `frontend` contém a aplicação Next.js. Esta parte do projeto é responsável pela interface do usuário e interação. Dentro desta pasta, os componentes reutilizáveis estão em `components`, enquanto as definições das rotas e suas respectivas lógicas de renderização são encontradas em `app`. A pasta `public` armazena arquivos estáticos que podem ser acessados diretamente pelo navegador, como imagens e ícones.

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

### Docker hub images 
#### Backend
Link para a imagem do backend: <a href="https://hub.docker.com/repository/docker/lyorrei/todo-platform-backend">Clique aqui</a>

Link completo para o backend: https://hub.docker.com/repository/docker/lyorrei/todo-platform-backend

#### Frontend
Link para a imagem do frontend: <a href="https://hub.docker.com/repository/docker/lyorrei/todo-platform-frontend">Clique aqui</a>

Link completo para o frontend: https://hub.docker.com/repository/docker/lyorrei/todo-platform-frontend

#### Banco de dados (PostgreSQL)
Foi utilizada a imagem oficial do PostgreSQL, disponível no Docker Hub.



### Persistência dos Dados

Os dados do PostgreSQL são persistentes graças ao volume `postgres_data`. Isso garante que mesmo ao parar ou remover o container, seus dados estarão seguros.


## 📖 Documentação da backend

Para acessar a documentação da API via Swagger, navegue para `http://localhost:3001/api`.