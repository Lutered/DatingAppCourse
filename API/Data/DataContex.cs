using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data;
public class DataContext : IdentityDbContext<AppUser, AppRole, int,
    IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
    IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }
     public DbSet<Group> Groups { get; set; }
      public DbSet<Connection> Connections { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>()
            .HasMany(u => u.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(u => u.UserId)
            .IsRequired();

          builder.Entity<AppRole>()
            .HasMany(u => u.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(u => u.RoleId)
            .IsRequired();

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

          builder.Entity<Message>()
           .HasOne(s => s.Recipient)
           .WithMany(l => l.MessagesReceived)
           .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Message>()
           .HasOne(s => s.Sender)
           .WithMany(l => l.MessagesSent)
           .OnDelete(DeleteBehavior.Restrict);
    }
}
