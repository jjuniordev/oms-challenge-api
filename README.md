# 🛒 Sistema de Gerenciamento de Pedidos (OMS Challenge)

Um sistema completo de gerenciamento de pedidos com arquitetura moderna, desenvolvido com .NET 8 e React 19.

## 📋 Sobre o Projeto

O OMS (Order Management System) é uma aplicação full-stack que oferece uma solução completa para gerenciamento de pedidos, composta por:

- **API REST** em .NET 8 com Entity Framework Core
- **Interface Web** moderna em React 19 com Tailwind CSS
- **Worker Service** para processamento assíncrono
- **Banco de dados PostgreSQL** para persistência
- **Containerização** completa com Docker

### 🎯 Funcionalidades

- ✅ **CRUD completo** de pedidos
- ✅ **Interface responsiva** para desktop e mobile
- ✅ **Modais customizados** seguindo design system
- ✅ **Navegação intuitiva** com breadcrumbs
- ✅ **Processamento assíncrono** de pedidos
- ✅ **API documentada** com Swagger
- ✅ **Containerização** para fácil deploy

## 🛠️ Stack Tecnológica

### Backend (.NET)
- **.NET 8** - Framework principal
- **ASP.NET Core Web API** - API REST
- **Entity Framework Core** - ORM
- **PostgreSQL** - Banco de dados
- **Worker Service** - Processamento background

### Frontend (React)
- **React 19** - Library principal
- **React Router DOM** - Roteamento SPA
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP
- **Responsive Design** - Mobile-first approach
- **Custom Design System** - UI consistente

### DevOps & Infraestrutura
- **Docker & Docker Compose** - Containerização
- **PostgreSQL** - Banco de dados
- **Service Bus** - Comunicação assíncrona

## 📁 Estrutura do Projeto

```
oms-challenge/
├── src/                          # Backend (.NET)
│   ├── Api/                      # 🌐 API REST
│   │   ├── Controllers/          # Controladores da API
│   │   ├── Program.cs           # Configuração da API
│   │   └── Dockerfile           # Container da API
│   ├── Core/                     # 📊 Domínio e Modelos
│   │   └── Order.cs             # Entidade Pedido
│   ├── Data/                     # 🗄️ Acesso a Dados
│   │   ├── AppDbContext.cs      # Contexto EF Core
│   │   └── Migrations/          # Migrações do banco
│   └── Worker/                   # ⚙️ Processamento Background
│       ├── Worker.cs            # Serviço worker
│       └── Dockerfile           # Container do worker
├── frontend/                     # 🎨 Interface Web (React)
│   ├── public/                   # Arquivos estáticos
│   │   └── logo-tmb.png         # Logo da aplicação
│   ├── src/
│   │   ├── components/          # 🧩 Componentes reutilizáveis
│   │   │   ├── Header.jsx       # Cabeçalho com navegação
│   │   │   ├── Footer.jsx       # Rodapé fixo
│   │   │   ├── Modal.jsx        # Sistema de modais
│   │   │   ├── ConfirmModal.jsx # Modal de confirmação
│   │   │   ├── AlertModal.jsx   # Modal de alertas
│   │   │   ├── CreateOrderForm.jsx # Formulário de criação
│   │   │   └── OrderList.jsx    # Listagem de pedidos
│   │   ├── pages/               # 📄 Páginas da aplicação
│   │   │   ├── HomePage.jsx     # Página principal
│   │   │   ├── OrderDetailPage.jsx # Detalhes do pedido
│   │   │   └── EditOrderPage.jsx # Edição de pedido
│   │   ├── services/            # 🔌 Integração com API
│   │   │   └── api.js          # Cliente HTTP
│   │   └── App.js              # Componente raiz
│   ├── tailwind.config.js       # ⚙️ Configuração Tailwind
│   └── package.json            # Dependências NPM
├── docker-compose.yml            # 🐳 Orquestração containers
└── README.md                    # 📖 Documentação
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 18+](https://nodejs.org/) e npm
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (opcional, para desenvolvimento)

### 🐳 Execução Completa com Docker (Recomendado)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/jjuniordev/oms-challenge-api.git
   cd oms-challenge
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   # Crie um arquivo .env na raiz do projeto
   cat > .env << EOF
   POSTGRES_USER=oms_user
   POSTGRES_PASSWORD=oms_password_2025
   POSTGRES_DB=oms_database
   SERVICEBUS_CONNECTION_STRING=your_servicebus_connection
   EOF
   ```

3. **Execute com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. **Acesse as aplicações:**
   - 🌐 **API Backend:** http://localhost:8080
   - 🎨 **Frontend React:** http://localhost:3000 (execute separadamente)

### 💻 Execução para Desenvolvimento

#### Backend (.NET)

1. **Configure o banco PostgreSQL:**
   ```bash
   docker run --name postgres-oms \
     -e POSTGRES_USER=oms_user \
     -e POSTGRES_PASSWORD=oms_password_2025 \
     -e POSTGRES_DB=oms_database \
     -p 5432:5432 -d postgres
   ```

2. **Execute a API:**
   ```bash
   cd src/Api
   dotnet restore
   dotnet ef database update
   dotnet run
   ```

3. **Execute o Worker (opcional):**
   ```bash
   cd src/Worker
   dotnet run
   ```

#### Frontend (React)

1. **Instale as dependências:**
   ```bash
   cd frontend
   npm install
   ```

2. **Execute em modo desenvolvimento:**
   ```bash
   npm start
   ```

3. **Acesse:** http://localhost:3000

### 🏗️ Build para Produção

#### Frontend
```bash
cd frontend
npm run build
# Os arquivos de produção estarão em frontend/build/
```

#### Backend
```bash
cd src/Api
dotnet publish -c Release -o ./publish
```

## 📚 API Documentation

### 🔗 Endpoints Principais

#### Pedidos (Orders)

| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| `GET` | `/orders` | Lista todos os pedidos | - |
| `GET` | `/orders/{id}` | Busca pedido por ID | - |
| `POST` | `/orders` | Cria novo pedido | `OrderCreateRequest` |
| `PUT` | `/orders/{id}` | Atualiza pedido | `OrderUpdateRequest` |
| `DELETE` | `/orders/{id}` | Exclui pedido | - |

#### 📝 Exemplo de Criação de Pedido
```http
POST /orders
Content-Type: application/json

{
  "customerName": "Maria Silva",
  "product": "Notebook Gamer",
  "price": 2599.99
}
```

#### 📄 Exemplo de Resposta
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "customerName": "Maria Silva",
  "product": "Notebook Gamer",
  "price": 2599.99,
  "status": "Pendente",
  "creationDate": "2025-08-14T10:30:00Z"
}
```

### 🧪 Testando a API

#### Com cURL
```bash
# 📋 Listar todos os pedidos
curl -X GET http://localhost:8080/orders

# ➕ Criar novo pedido
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "João Santos",
    "product": "Smartphone",
    "price": 1299.99
  }'

# 🔍 Buscar pedido específico
curl -X GET http://localhost:8080/orders/{id}

# ✏️ Atualizar pedido
curl -X PUT http://localhost:8080/orders/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "João Santos Silva",
    "product": "Smartphone Pro",
    "price": 1499.99
  }'

# 🗑️ Excluir pedido
curl -X DELETE http://localhost:8080/orders/{id}
```

#### 🧪 Testando via Frontend
Acesse **http://localhost:3000** para interface web completa com todas as funcionalidades.

## 🎨 Frontend - Sistema de Design

### 🎯 Design System Implementado

O frontend segue um design system moderno e responsivo baseado nas cores corporativas da TMB:

#### 🎨 Paleta de Cores
- **Azul Principal:** `#66baff` - Botões primários e destaques
- **Azul Claro:** `#13B5C7` - Links e elementos secundários
- **Cinza Neutro:** `#F7F7F7` - Backgrounds e seções
- **Branco:** `#FFFFFF` - Fundos principais
- **Preto:** `#000000` - Textos e títulos

#### 📱 Características UX/UI
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Navegação Intuitiva** - Header sticky com breadcrumbs
- ✅ **Modais Customizados** - Substituindo alerts nativos
- ✅ **Tipografia Moderna** - Fonte Montserrat
- ✅ **Transições Suaves** - Micro-interações fluidas
- ✅ **Estados Visuais** - Hover, focus e loading states

### 🧩 Componentes Principais

| Componente | Descrição | Funcionalidades |
|------------|-----------|-----------------|
| `Header` | Navegação principal | Logo, breadcrumbs, menu mobile |
| `Footer` | Rodapé informativo | Logo TMB, status sistema, links |
| `Modal` | Sistema de modais | Base para confirmações e alertas |
| `CreateOrderForm` | Formulário de criação | Validação, responsividade |
| `OrderList` | Listagem de pedidos | Tabela responsiva, ações inline |
| `ConfirmModal` | Modal de confirmação | Substituição do `window.confirm` |
| `AlertModal` | Modal de alertas | Substituição do `window.alert` |

## 🗄️ Banco de Dados

### PostgreSQL Schema

#### Tabela: `Orders`
| Campo | Tipo | Constraints | Descrição |
|-------|------|-------------|-----------|
| `Id` | `UUID` | `PRIMARY KEY` | Identificador único |
| `CustomerName` | `VARCHAR(255)` | `NOT NULL` | Nome do cliente |
| `Product` | `VARCHAR(255)` | `NOT NULL` | Nome do produto |
| `Price` | `DECIMAL(18,2)` | `NOT NULL` | Preço do produto |
| `Status` | `VARCHAR(50)` | `DEFAULT 'Pendente'` | Status do pedido |
| `CreationDate` | `TIMESTAMP` | `DEFAULT NOW()` | Data de criação |

### 🔐 Configurações de Conexão

#### Ambiente de Desenvolvimento
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=oms_database;Username=oms_user;Password=oms_password_2025"
  }
}
```

#### Ambiente Docker
```yaml
environment:
  - ConnectionStrings__DefaultConnection=Host=postgres_db;Port=5432;Database=${POSTGRES_DB};Username=${POSTGRES_USER};Password=${POSTGRES_PASSWORD}
```

## 🔧 Configuração e Variáveis de Ambiente

### 📋 Variáveis Necessárias

Crie um arquivo `.env` na raiz do projeto:

```bash
# Configurações do PostgreSQL
POSTGRES_USER=oms_user
POSTGRES_PASSWORD=oms_password_2025
POSTGRES_DB=oms_database

# Configuração do Service Bus (opcional)
SERVICEBUS_CONNECTION_STRING=your_servicebus_connection_string
```

### ⚙️ Configurações da API (.NET)

#### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=oms_database;Username=oms_user;Password=oms_password_2025"
  },
  "ServiceBus": {
    "ConnectionString": "your_servicebus_connection_string",
    "QueueName": "order-queue"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### 🎨 Configurações do Frontend

#### Tailwind CSS (tailwind.config.js)
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#66baff',
          light: '#13B5C7',
        },
        neutral: {
          light: '#F7F7F7',
          white: '#FFFFFF',
          black: '#000000',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 🐳 Docker Compose Services

```yaml
services:
  api:          # API .NET na porta 8080
  worker:       # Worker service para background jobs
  postgres_db:  # Banco PostgreSQL na porta 5432
```

## 🧪 Testes e Qualidade

### 🔍 Testando Localmente

```bash
# Backend - Testes da API
cd src/Api
dotnet test

# Frontend - Testes React
cd frontend
npm test

# Verificar build de produção
npm run build
```

### 📊 Verificação de Saúde

```bash
# Verificar se a API está respondendo
curl http://localhost:8080/orders

# Testar criação de pedido
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Teste","product":"Produto Teste","price":99.99}'
```

### 🐛 Logs e Debugging

```bash
# Logs do Docker Compose
docker-compose logs -f

# Logs específicos de um serviço
docker-compose logs -f api
docker-compose logs -f postgres_db

# Acessar container para debug
docker exec -it oms_api bash
docker exec -it oms_postgres psql -U oms_user -d oms_database
```

## 🛠️ Desenvolvimento

### 📝 Comandos Úteis

#### Backend (.NET)
```bash
# 📦 Restaurar dependências
dotnet restore

# 🔨 Compilar projeto
dotnet build

# 🧪 Executar testes
dotnet test

# 🏃‍♂️ Executar com hot reload
dotnet watch run --project src/Api

# 📊 Criar nova migração
dotnet ef migrations add NomeDaMigracao --project src/Api

# 🗄️ Aplicar migrações
dotnet ef database update --project src/Api

# 🧹 Limpar build
dotnet clean
```

#### Frontend (React)
```bash
# 📦 Instalar dependências
npm install

# 🏃‍♂️ Executar em desenvolvimento
npm start

# 🔨 Build para produção
npm run build

# 🧪 Executar testes
npm test

# 🧹 Limpar node_modules
rm -rf node_modules && npm install

# 📊 Analisar bundle
npm run build && npx serve -s build
```

#### Docker
```bash
# 🚀 Subir todos os serviços
docker-compose up -d

# 🔨 Rebuild e subir
docker-compose up --build

# 📊 Ver logs em tempo real
docker-compose logs -f

# 🧹 Limpar containers e volumes
docker-compose down -v

# 🔍 Verificar status dos serviços
docker-compose ps
```

### 🏗️ Arquitetura e Padrões

#### Backend (.NET)
- **Clean Architecture** - Separação de responsabilidades
- **Repository Pattern** - Abstração de acesso a dados
- **Dependency Injection** - Inversão de controle nativa
- **Entity Framework Core** - Code-first approach
- **API Versionning** - Suporte a versionamento
- **Worker Service** - Processamento background

#### Frontend (React)
- **Component-Based Architecture** - Componentes reutilizáveis
- **Custom Hooks** - Lógica compartilhada
- **Context API** - Gerenciamento de estado global
- **React Router** - Roteamento SPA
- **Responsive Design** - Mobile-first approach
- **Design System** - UI/UX consistente

## 🚀 Deploy e Produção

### 🌐 Deploy com Docker

```bash
# Build para produção
docker-compose -f docker-compose.prod.yml up --build -d

# Configurar proxy reverso (nginx)
# Certificados SSL (Let's Encrypt)
# Monitoramento e logs
```

### ☁️ Deploy em Cloud

#### Azure
- **Azure Container Instances** - Para containers
- **Azure Database for PostgreSQL** - Banco gerenciado
- **Azure Service Bus** - Messaging

#### AWS
- **ECS/EKS** - Orquestração de containers
- **RDS PostgreSQL** - Banco gerenciado
- **SQS** - Messaging service

## 📈 Próximos Passos

### 🎯 Melhorias Planejadas

- [ ] **Autenticação e Autorização** (JWT)
- [ ] **Paginação** na listagem de pedidos
- [ ] **Filtros e Busca** avançada
- [ ] **Notificações em tempo real** (SignalR)
- [ ] **Testes unitários** e integração
- [ ] **CI/CD Pipeline** automatizado
- [ ] **Monitoramento** e métricas
- [ ] **Cache** com Redis
- [ ] **Rate Limiting** na API
- [ ] **Audit Log** de alterações

### 🤝 Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch feature** (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Junior Nascimento** - [GitHub](https://github.com/jjuniordev)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Made with ❤️ by [Junior Nascimento](https://github.com/jjuniordev)

</div>

