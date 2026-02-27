using Microsoft.AspNetCore.Mvc;
using TravelAway.DAL.Models;
using TravelAway.Services.Services;

namespace TravelAway.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthenticationService _authenticationService;
        public AuthController(AuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("customer/login")]
        public IActionResult CustomerLogin([FromBody] Customer model) // You might have a specific CustomerLoginRequest model
        {
            // Call a method in your AuthenticationService to authenticate the customer
            if (_authenticationService.AuthenticateCustomer(model.EmailId, model.UserPassword, out int customerId, out string customerRole))
            {
                var token = _authenticationService.GenerateJwtToken(customerId, model.EmailId, customerRole);
                return Ok(new { Token = token });
            }
            return Unauthorized(new { Message = "Invalid customer username or password" });
        }
        [HttpPost("employee/login")]
        public IActionResult EmployeeLogin([FromBody] Employee model) // You might have a specific EmployeeLoginRequest model
        {
            // Call a method in your AuthenticationService to authenticate the employee
            if (_authenticationService.AuthenticateEmployee(model.EmailId, model.Password, out int employeeId, out string employeeRole))
            {
                var token = _authenticationService.GenerateJwtToken(employeeId, model.EmailId, employeeRole);
                return Ok(new { Token = token });
            }
            return Unauthorized(new { Message = "Invalid employee username or password" });
        }
    }
}
