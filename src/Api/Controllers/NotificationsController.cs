using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OrderManagementSystem.Api.Hubs;
using OrderManagementSystem.Core;

namespace OrderManagementSystem.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationsController(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("status-changed")]
    public async Task<IActionResult> PostStatusChanged([FromBody] Order updatedOrder)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveOrderStatusUpdate", updatedOrder);
        return Ok();
    }
}