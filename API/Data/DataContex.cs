using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserLike>()
            .HasKey(k => new {k.SourceUserId, k.TargetUserId});

        builder.Entity<UserLike>()
           .HasOne(s => s.SourceUser)
           .WithMany(l => l.LikedUsers)
           .HasForeignKey(k => k.SourceUserId)
           .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserLike>()
           .HasOne(s => s.TargetUser)
           .WithMany(l => l.LikedByUsers)
           .HasForeignKey(k => k.TargetUserId)
           .OnDelete(DeleteBehavior.Cascade);
    }
}
