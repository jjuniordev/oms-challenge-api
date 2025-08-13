FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY OrderManagementSystem.sln .
COPY src/Api/OrderManagementSystem.Api.csproj ./src/Api/
COPY src/Core/OrderManagementSystem.Core.csproj ./src/Core/

RUN dotnet restore "OrderManagementSystem.sln"

COPY src/ ./src/

WORKDIR "/app/src/Api"
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "OrderManagementSystem.Api.dll"]