using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    //[Authorize(Roles = "1,8")]
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietTaiKhoanController : ControllerBase
    {
        private IChiTietTaiKhoanBUS _chiTietTaiKhoanBUS;

        public ChiTietTaiKhoanController(IChiTietTaiKhoanBUS chiTietTaiKhoanBUS)
        {
            _chiTietTaiKhoanBUS = chiTietTaiKhoanBUS;
        }

        [Route("sua-chitiettaikhoan")]
        [HttpPut]
        public ChiTietTaiKhoanModel Update([FromBody] ChiTietTaiKhoanModel model)
        {
            _chiTietTaiKhoanBUS.Update(model);
            return model;
        }

    }
}
