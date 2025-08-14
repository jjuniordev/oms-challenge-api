FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY OrderManagementSystem.sln .

COPY src/Core/OrderManagementSystem.Core.csproj ./src/Core/
COPY src/Data/OrderManagementSystem.Data.csproj ./src/Data/
COPY src/Api/OrderManagementSystem.Api.csproj ./src/Api/
COPY src/Worker/OrderManagementSystem.Worker.csproj ./src/Worker/

RUN dotnet restore "OrderManagementSystem.sln"

COPY src/ ./src/

WORKDIR "/app/src/Worker"
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/runtime:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "OrderManagementSystem.Worker.dll"]