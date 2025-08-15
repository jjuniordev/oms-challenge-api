using System.Text;
using System.Text.Json;
using Azure.Messaging.ServiceBus;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.Core;

namespace OrderManagementSystem.Worker;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly ServiceBusProcessor _processor;
    private readonly IDbContextFactory<AppDbContext> _dbContextFactory;
    private readonly HttpClient _httpClient;

    public Worker(ILogger<Worker> logger, ServiceBusClient serviceBusClient, IConfiguration configuration, IDbContextFactory<AppDbContext> dbContextFactory)
    {
        _logger = logger;
        _dbContextFactory = dbContextFactory;
        var queueName = configuration["ServiceBus:QueueName"];
        _processor = serviceBusClient.CreateProcessor(queueName, new ServiceBusProcessorOptions());
        _httpClient = new HttpClient { BaseAddress = new Uri("http://api:8080") };
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Worker iniciado e ouvindo a fila...");

        _processor.ProcessMessageAsync += MessageHandler;

        _processor.ProcessErrorAsync += ErrorHandler;

        await _processor.StartProcessingAsync(stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }

        _logger.LogInformation("Worker finalizando...");
        await _processor.StopProcessingAsync(stoppingToken);
    }

    private async Task MessageHandler(ProcessMessageEventArgs args)
    {
        string body = args.Message.Body.ToString();
        _logger.LogInformation("Mensagem recebida: {body}", body);

        try
        {
            var order = JsonSerializer.Deserialize<Order>(body);

            if (order != null)
            {
                await using var dbContext = await _dbContextFactory.CreateDbContextAsync();

                var orderFromDb = await dbContext.Orders.FindAsync(order.Id);

                if (orderFromDb != null)
                {
                    orderFromDb.Status = "Processando";
                    await dbContext.SaveChangesAsync();
                    _logger.LogInformation("Pedido {OrderId} atualizado para 'Processando'", orderFromDb.Id);
                    await NotifyStatusChange(orderFromDb);

                    await Task.Delay(5000);

                    orderFromDb.Status = "Finalizado";
                    await dbContext.SaveChangesAsync();
                    _logger.LogInformation("Pedido {OrderId} atualizado para 'Finalizado'", orderFromDb.Id);
                    await NotifyStatusChange(orderFromDb);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao processar a mensagem.");
        }
        finally
        {
            await args.CompleteMessageAsync(args.Message);
        }
    }

    private async Task NotifyStatusChange(Order order)
    {
        try
        {
            var jsonContent = JsonSerializer.Serialize(order);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            await _httpClient.PostAsync("/api/notifications/status-changed", content);
            _logger.LogInformation("Notificação de mudança de status enviada para a API para o pedido {OrderId}", order.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Falha ao enviar notificação de status para a API");
        }
    }

    private Task ErrorHandler(ProcessErrorEventArgs args)
    {
        _logger.LogError(args.Exception, "Erro no handler do Service Bus");
        return Task.CompletedTask;
    }
}