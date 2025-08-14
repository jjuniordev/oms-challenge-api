using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Data;
using OrderManagementSystem.Core;

namespace OrderManagementSystem.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
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

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(Guid id, [FromBody] OrderUpdateModel model)
    {
        var orderFromDb = await _context.Orders.FindAsync(id);
        if (orderFromDb == null)
        {
            return NotFound();
        }

        orderFromDb.CustomerName = model.CustomerName;
        orderFromDb.Product = model.Product;
        orderFromDb.Price = model.Price;

        _context.Orders.Update(orderFromDb);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(Guid id)
    {
        var orderFromDb = await _context.Orders.FindAsync(id);
        if (orderFromDb == null)
        {
            return NotFound();
        }

        _context.Orders.Remove(orderFromDb);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

public class OrderCreateModel
{
    public string CustomerName { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public decimal Price { get; set; } = 0;
}

public class OrderUpdateModel
{
    public string CustomerName { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public decimal Price { get; set; } = 0;
}