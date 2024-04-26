using BussinessLayer.Interfaces;
using Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Model;

namespace Api.BanHang.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserBusiness _userBusiness;
        public UserController(IUserBusiness userBusiness)
        {
            _userBusiness = userBusiness;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] AuthenticateModel model)
        {
            var user = _userBusiness.Login(model.Username, model.Password);
            if (user == null)
                return BadRequest(new { message = "Tài khoản hoặc mật khẩu không đúng!" });
            return Ok(new {mataikhoan = user.MaTaiKhoan, taikhoan = user.TenTaiKhoan, email = user.Email, hoten = user.HoTen, sodienthoai = user.SoDienThoai , anhdaidien = user.AnhDaiDien,user.MaLoaitaikhoan, token = user.token });
        }
    }
}
