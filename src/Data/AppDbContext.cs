using Microsoft.EntityFrameworkCore;
using OrderManagementSystem.Core;

namespace OrderManagementSystem.Data; 

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Order> Orders { get; set; }
}