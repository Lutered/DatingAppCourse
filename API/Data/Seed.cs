using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if(await userManager.Users.AnyAsync()) return;
            const string password = "Pa$$w0rd";

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};
        
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            var roles = new List<AppRole>()
            {
                new AppRole{ Name = "Member"},
                new AppRole{ Name = "Admin"},
                new AppRole{ Name = "Moderator"}
            };

            foreach(var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        
            foreach(var user in users)
            {
                user.UserName = user.UserName.ToLower();

                await userManager.CreateAsync(user, password);
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser()
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, password);
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }
    }
}