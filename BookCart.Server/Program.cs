using BookCart.Server.Common;
using BookCart.Server.Context;
using BookCart.Server.Services.DataAccess;
using BookCart.Server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookCartDBContext>(opc =>
{
    opc.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Configurar CORS
IConfigurationSection appSettingsSection = builder.Configuration.GetSection("ApplicationSettings");
builder.Services.Configure<ApplicationSettings>(appSettingsSection);

ApplicationSettings? appSettings = appSettingsSection.Get<ApplicationSettings>();
string clientUrl = appSettings!.Client_Url;

string corsReglas = "CorsReglas";

builder.Services.AddCors(op =>
{
    op.AddPolicy(name: corsReglas, builder =>
    {
        //builder.WithOrigins(clientUrl);
        builder.AllowAnyOrigin();
        builder.WithHeaders();
        builder.AllowAnyHeader();
        builder.WithMethods();
        builder.AllowAnyMethod();
    });
});

builder.Services.AddTransient<IBookService, BookService>();
builder.Services.AddTransient<ICartService, CartService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IWishlistService, WishlistService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
app.UseCors(corsReglas);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
