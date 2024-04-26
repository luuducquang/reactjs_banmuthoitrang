using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    //[Authorize(Roles = "8")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiTaiKhoanController : ControllerBase
    {
        private ILoaiTaiKhoanBUS _loaiTaiKhoanBUS;
        
        public LoaiTaiKhoanController(ILoaiTaiKhoanBUS loaiTaiKhoanBUS)
        {
            _loaiTaiKhoanBUS = loaiTaiKhoanBUS;
        }

        [Route("get_all_loaitaikhoan")]
        [HttpGet]
        public IActionResult GetallLoaiTaiKhoan()
        {
            return Ok(_loaiTaiKhoanBUS.GettAllLoaiTaiKhoan());
        }

        [Route("create_loaitaikhoan")]
        [HttpPost]
        public IActionResult Create(LoaiTaiKhoanModel model)
        {
            return Ok(_loaiTaiKhoanBUS.Create(model));
        }

        [Route("update_loaitaikhoan")]
        [HttpPut]
        public IActionResult Update(LoaiTaiKhoanModel model)
        {
            return Ok(_loaiTaiKhoanBUS.Update(model));
        }

        [Route("delete_loaitaikhoan")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _loaiTaiKhoanBUS.Delete(id);
            }
            return true;
        }

    }
}
