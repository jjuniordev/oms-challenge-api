using Azure.Messaging.ServiceBus;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.Worker;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext, services) =>
    {
        var configuration = hostContext.Configuration;
        
        var serviceBusConnectionString = configuration["ServiceBus:ConnectionString"];
        services.AddSingleton(new ServiceBusClient(serviceBusConnectionString));

        var dbConnectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContextFactory<AppDbContext>(options =>
            options.UseNpgsql(dbConnectionString, b => b.MigrationsAssembly("OrderManagementSystem.Data")));

        services.AddHostedService<Worker>();
    })
    .Build();

host.Run();