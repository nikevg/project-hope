using System;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using AspNetCore.Identity.Mongo;
using ProjectHope.Data.Settings;
using ProjectHope.Data.Repositories.Templates;
using ProjectHope.Services.Templates;
using ProjectHope.Services.Mapper.Profiles;
using ProjectHope.Services.Settings;
using ProjectHope.Services.Users;
using ProjectHope.Data.Models.Users;

namespace ProjectHope
{
  public class Startup
  {
    private IConfiguration Configuration { get; }
    private IWebHostEnvironment Environment { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
      Configuration = configuration;
      Environment = environment;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<DatabaseSettings>(Configuration.GetSection(nameof(DatabaseSettings)));
      services.AddSingleton<IDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);

      services.Configure<AuthenticationSettings>(Configuration.GetSection(nameof(AuthenticationSettings)));
      services.AddSingleton<IAuthenticationSettings>(sp => sp.GetRequiredService<IOptions<AuthenticationSettings>>().Value);

      #region Identity MongoDB

      var dSettingsSection = Configuration.GetSection(nameof(DatabaseSettings));

      services.AddIdentityMongoDbProvider<User, Role>(identityOptions =>
      {
        identityOptions.Password.RequiredLength = 6;
        identityOptions.Password.RequireLowercase = false;
        identityOptions.Password.RequireUppercase = false;
        identityOptions.Password.RequireNonAlphanumeric = false;
        identityOptions.Password.RequireDigit = false;
      }, mongoIdentityOptions =>
      {
        mongoIdentityOptions.ConnectionString =
          $"{dSettingsSection[nameof(DatabaseSettings.ConnectionString)]}/{dSettingsSection[nameof(DatabaseSettings.DatabaseName)]}";
      });

      #endregion

      #region Jwt Authentication

      var aSettingsSection = Configuration.GetSection(nameof(AuthenticationSettings));

      JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

      services
        .AddAuthentication(options =>
        {
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
          options.RequireHttpsMetadata = !Environment.IsDevelopment();
          options.SaveToken = true;
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidIssuer = aSettingsSection[nameof(AuthenticationSettings.Issuer)],
            ValidAudience = aSettingsSection[nameof(AuthenticationSettings.Issuer)],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(aSettingsSection[nameof(AuthenticationSettings.Key)])),
            ClockSkew = TimeSpan.Zero
          };
        });

      #endregion

      services.AddAutoMapper(typeof(TemplateProfile));

      services
        .AddScoped<ITemplatesRepository, TemplatesRepository>()
        .AddScoped<ITemplatesService, TemplatesService>()
        .AddScoped<IUsersService, UsersService>();

      services
        .AddControllers()
        .AddJsonOptions(options =>
        {
          options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, false));
        });

      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "wwwroot/dist";
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app)
    {
      if (Environment.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseHsts();
        app.UseHttpsRedirection();
        app.UseSpaStaticFiles();
      }

      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      app.UseSpa(spa =>
      {
        if (Environment.IsDevelopment())
        {
          spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
        }
      });
    }
  }
}
