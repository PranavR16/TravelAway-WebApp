using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using TravelAway.BL; // Required for Where clause

namespace TravelAway.Services.Services
{
    public class AuthenticationService
    {
        private readonly string _secretKey;
        private readonly int _tokenExpirationInMinutes;
        AdminBL adminBL;

        public AuthenticationService(IConfiguration configuration)
        {
            _secretKey = configuration.GetSection("JwtSettings")["Secret"];
            _tokenExpirationInMinutes = configuration.GetValue<int>("JwtSettings:ExpirationInMinutes");
            adminBL = new AdminBL();
        }
        public bool AuthenticateCustomer(string username, string password, out int userId, out string userRole)
        {
            string emailId = username;
            int roleValue = 0; // To store the role value from AdminBL

            try
            {
                roleValue = adminBL.ValidateLoginCustomer(emailId, password);
            }
            catch (Exception)
            {
                userId = 0;
                userRole = null;
                return false; // Authentication failed due to an error
            }

            if (roleValue > 0) // Assuming a positive integer indicates a valid user ID
            {
                userId = roleValue;

                // Determine the user role based on the roleValue or potentially another source
                // This is a placeholder - replace with your actual role determination logic
                if (roleValue == 1) // Example: Assuming ID 1 is an admin
                {
                    userRole = "Customer";
                }
                else
                {
                    userRole = "Employee"; // Default role
                }
                return true; // Authentication successful
            }
            else
            {
                userId = 0;
                userRole = null;
                return false; // Authentication failed
            }
        }

        public bool AuthenticateEmployee(string username, string password, out int userId, out string userRole)
        {
            string emailId = username;
            int roleValue = 0; // To store the role value from AdminBL

            try
            {
                roleValue = adminBL.ValidateLoginEmployee(emailId, password);
            }
            catch (Exception)
            {
                userId = 0;
                userRole = null;
                return false; // Authentication failed due to an error
            }

            if (roleValue > 0) // Assuming a positive integer indicates a valid user ID
            {
                userId = roleValue;

                // Determine the user role based on the roleValue or potentially another source
                // This is a placeholder - replace with your actual role determination logic
                if (roleValue == 1) // Example: Assuming ID 1 is an admin
                {
                    userRole = "Customer";
                }
                else
                {
                    userRole = "Employee"; // Default role
                }
                return true; // Authentication successful
            }
            else
            {
                userId = 0;
                userRole = null;
                return false; // Authentication failed
            }
        }
        // Method to generate the JWT token
        public string GenerateJwtToken(int userId, string username, string role = null)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ClaimTypes.Name, username),
                    role != null ? new Claim(ClaimTypes.Role, role) : null
                }.Where(claim => claim != null)), // Filter out null claims
                Expires = DateTime.UtcNow.AddMinutes(_tokenExpirationInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
