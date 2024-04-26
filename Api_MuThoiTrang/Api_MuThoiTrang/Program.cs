using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Helper;
using BussinessLayer.Interfaces;
using BussinessLayer;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using DataAccessLayer;
using Model;
using System.Text;
using Model;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(option =>
{
    option.AddPolicy("MyCors", build =>
    {
        build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddTransient<ITaiKhoanBUS, TaiKhoanBUS>();
builder.Services.AddTransient<ILoaiTaiKhoanBUS, LoaiTaiKhoanBUS>();
builder.Services.AddTransient<IChiTietTaiKhoanBUS, ChiTietTaiKhoanBUS>();
builder.Services.AddTransient<IDanhMucBUS, DanhMucBUS>();
builder.Services.AddTransient<INhaPhanPhoiBUS, NhaPhanPhoiBUS>();
builder.Services.AddTransient<ISanPhamBUS, SanPhamBUS>();
builder.Services.AddTransient<IHoaDonBUS, HoaDonBUS>();
builder.Services.AddTransient<IHoaDonNhapBUS, HoaDonNhapBUS>();
builder.Services.AddTransient<IUserBusiness, UserBusiness>();
builder.Services.AddTransient<ITaiKhoanResponsitory, TaiKhoanResponsitory>();
builder.Services.AddTransient<ILoaiTaiKhoanResponsitory, LoaiTaiKhoanResponsitory>();
builder.Services.AddTransient<IChiTietTaiKhoanResponsitory, ChiTietTaiKhoanResponsitory>();
builder.Services.AddTransient<IDanhMucResponsitory, DanhMucResponsitory>();
builder.Services.AddTransient<INhaPhanPhoiResponsitory, NhaPhanPhoiResponsitory>();
builder.Services.AddTransient<ISanPhamResponsitory, SanPhamResponsitory>();
builder.Services.AddTransient<IHoaDonResponsitory, HoaDonResponsitory>();
builder.Services.AddTransient<IHoaDonNhapResponsitory, HoaDonNhapResponsitory>();
builder.Services.AddTransient<IUserRepository, UserRepository>();


// configure strongly typed settings objects
IConfiguration configuration = builder.Configuration;
var appSettingsSection = configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);

// configure jwt authentication
var appSettings = appSettingsSection.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyCors");

//app.UseCors(x => x
//    .AllowAnyOrigin()
//    .AllowAnyMethod()
//    .AllowAnyHeader());
//app.UseRouting();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


