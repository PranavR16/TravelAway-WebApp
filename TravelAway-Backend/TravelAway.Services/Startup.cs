using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TravelAway.Services.Services;

namespace TravelAway.Services
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        public IConfiguration Configuration { get; }
        readonly string AllowSpecificOrigins = "AllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configure JWT settings from appsettings.json
            var jwtSettings = Configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["Secret"];
            var tokenExpirationInMinutes = jwtSettings.GetValue<int>("ExpirationInMinutes");

            services.AddScoped<AuthenticationService>();

            // Configure JWT authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // Set to true in production
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey)),
                    ValidateIssuer = false, // Set to true in production
                    ValidateAudience = false // Set to true in production
                };
            });

            services.AddCors();
            services.AddControllers();
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TravelAway API V1");
                    c.RoutePrefix = ""; // 👈 This makes Swagger load at "/"
                });
            }
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

//using System;
//using Microsoft.AspNetCore.Builder;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.HttpsPolicy;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using Microsoft.Extensions.Logging;

//namespace Infosys.TravelAway.Services
//{
//    public class Startup
//    {
//        public Startup(IConfiguration configuration)
//        {
//            Configuration = configuration;
//        }

//        public IConfiguration Configuration { get; }

//        // CORS Policy Name
//        readonly string AllowSpecificOrigins = "AllowSpecificOrigins";

//        // This method gets called by the runtime. Use this method to add services to the container.
//        public void ConfigureServices(IServiceCollection services)
//        {
//            // Add CORS service with a specific policy
//            services.AddCors(options =>
//            {
//                options.AddPolicy(AllowSpecificOrigins, builder =>
//                {
//                    builder.WithOrigins("http://localhost:4200") // Add your Angular app's origin here
//                           .AllowAnyMethod()
//                           .AllowAnyHeader();
//                });
//            });

//            services.AddControllers();
//        }

//        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        {
//            if (env.IsDevelopment())
//            {
//                app.UseDeveloperExceptionPage();
//            }
//            else
//            {
//                app.UseExceptionHandler("/Home/Error");
//                app.UseHsts();
//            }

//            // Use CORS with the specific policy
//            app.UseCors(AllowSpecificOrigins);

//            // Redirect HTTP to HTTPS for production environments
//            app.UseHttpsRedirection();

//            app.UseRouting();

//            app.UseAuthorization();

//            app.UseEndpoints(endpoints =>
//            {
//                endpoints.MapControllers();
//            });
//        }
//    }
//}
