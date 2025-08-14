using Azure.Messaging.ServiceBus;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.Core;
using System.Text.Json;

namespace OrderManagementSystem.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ServiceBusClient _serviceBusClient;
    private readonly IConfiguration _configuration;

    public OrdersController(AppDbContext context, ServiceBusClient serviceBusClient, IConfiguration configuration)
    {
        _context = context;
        _serviceBusClient = serviceBusClient;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _context.Orders.ToListAsync();
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(Guid id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderCreateModel model)
    {
        var order = new Order
        {
            Id = Guid.NewGuid(),
            CustomerName = model.CustomerName,
            Product = model.Product,
            Price = model.Price,
            Status = "Pendente",
            CreationDate = DateTime.UtcNow
        };

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        try
        {
            string queueName = _configuration["ServiceBus:QueueName"];

            ServiceBusSender sender = _serviceBusClient.CreateSender(queueName);

            string messageBody = JsonSerializer.Serialize(order);
            
            ServiceBusMessage message = new ServiceBusMessage(messageBody);

            await sender.SendMessageAsync(message);

            await sender.DisposeAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro ao enviar mensagem para o Service Bus: {ex.Message}");
        }

        return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
    }
}

public class OrderCreateModel
{
    public string CustomerName { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public decimal Price { get; set; } = 0;
}