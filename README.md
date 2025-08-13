# Sistema de Gerenciamento de Pedidos (OMS Challenge)

Este é um sistema de gerenciamento de pedidos desenvolvido em .NET 8 com Entity Framework Core e PostgreSQL.

## 📋 Sobre o Projeto

O sistema permite gerenciar pedidos através de uma API REST, oferecendo funcionalidades para:
- Criar novos pedidos
- Consultar todos os pedidos
- Consultar pedido por ID

## 🛠️ Tecnologias Utilizadas

- **.NET 8** - Framework principal
- **ASP.NET Core Web API** - Para criação da API REST
- **Entity Framework Core** - ORM para acesso a dados
- **PostgreSQL** - Banco de dados
- **Docker & Docker Compose** - Containerização
- **Swagger** - Documentação da API

## 📁 Estrutura do Projeto

```
src/
├── Api/                          # Projeto da API
│   ├── Controllers/              # Controladores da API
│   ├── Data/                     # Contexto do banco de dados
│   ├── Migrations/               # Migrações do EF Core
│   └── Program.cs               # Ponto de entrada da aplicação
├── Core/                        # Projeto com modelos de domínio
│   └── Order.cs                 # Modelo da entidade Order
└── docker-compose.yml           # Configuração do Docker Compose
```

## 🚀 Como Executar

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) (apenas para desenvolvimento local)

### Execução com Docker (Recomendado)

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd oms-challenge
   ```

2. **Execute com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**
   - API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger

### Execução Local (Desenvolvimento)

1. **Configure o PostgreSQL** (ou use Docker apenas para o banco):
   ```bash
   docker run --name postgres-oms -e POSTGRES_USER=meu_usuario -e POSTGRES_PASSWORD=minha_senha_forte -e POSTGRES_DB=oms_database -p 5432:5432 -d postgres
   ```

2. **Restaure as dependências:**
   ```bash
   dotnet restore
   ```

3. **Execute as migrações:**
   ```bash
   cd src/Api
   dotnet ef database update
   ```

4. **Execute a aplicação:**
   ```bash
   dotnet run --project src/Api
   ```

## 📚 Endpoints da API

### Pedidos (Orders)

#### Listar todos os pedidos
```http
GET /orders
```

#### Buscar pedido por ID
```http
GET /orders/{id}
```

#### Criar novo pedido
```http
POST /orders
Content-Type: application/json

{
  "customerName": "Nome do Cliente",
  "product": "Nome do Produto",
  "price": 99.99
}
```

### Exemplo de Resposta
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "customerName": "João Silva",
  "product": "Notebook",
  "price": 2500.00,
  "status": "Pendente",
  "creationDate": "2025-08-13T21:30:00Z"
}
```

## 🗄️ Banco de Dados

O sistema utiliza PostgreSQL com as seguintes configurações padrão:
- **Host:** localhost
- **Porta:** 5432
- **Database:** oms_database
- **Usuário:** meu_usuario
- **Senha:** minha_senha_forte

### Esquema da Tabela Orders

| Campo | Tipo | Descrição |
|-------|------|-----------|
| Id | UUID | Identificador único do pedido |
| CustomerName | VARCHAR | Nome do cliente |
| Product | VARCHAR | Nome do produto |
| Price | DECIMAL | Preço do produto |
| Status | VARCHAR | Status do pedido (padrão: "Pendente") |
| CreationDate | TIMESTAMP | Data de criação do pedido |

## 🔧 Configuração

### Variáveis de Ambiente

- `ConnectionStrings__DefaultConnection`: String de conexão com o banco de dados
- `ASPNETCORE_URLS`: URL onde a aplicação será executada

### Configuração do Docker Compose

O arquivo `docker-compose.yml` já está configurado com:
- Container da API na porta 8080
- Container do PostgreSQL na porta 5432
- Volume persistente para dados do banco

## 🧪 Testando a API

### Usando curl

```bash
# Listar pedidos
curl -X GET http://localhost:8080/orders

# Criar pedido
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Maria Silva",
    "product": "Smartphone",
    "price": 1200.00
  }'

# Buscar pedido por ID
curl -X GET http://localhost:8080/orders/{id}
```

### Usando Swagger UI

Acesse http://localhost:8080/swagger para uma interface interativa da API.

## 📝 Desenvolvimento

### Comandos Úteis

```bash
# Restaurar dependências
dotnet restore

# Compilar projeto
dotnet build

# Executar testes (se houver)
dotnet test

# Criar nova migração
dotnet ef migrations add NomeDaMigracao --project src/Api

# Aplicar migrações
dotnet ef database update --project src/Api
```

