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
    public class HoaDonNhapController : ControllerBase
    {
        private IHoaDonNhapBUS _hoaDonNhapBUS;

        public HoaDonNhapController(IHoaDonNhapBUS hoaDonNhapBUS)
        {
            _hoaDonNhapBUS = hoaDonNhapBUS;
        }

        [Route("get_all_hoadonnhap")]
        [HttpGet]
        public IActionResult Getallhoadonnhap()
        {
            return Ok(_hoaDonNhapBUS.GetAllHoaDonNhap());
        }

        [AllowAnonymous]
        [Route("getbyid-mahoadon-chitiethoadonnhap/{id}")]
        [HttpGet]
        public List<ChiTietHoaDonNhapModelTWO> GetByID(int id)
        {
            return _hoaDonNhapBUS.Getbyids(id);
        }

        [Route("create-hoadonnhap")]
        [HttpPost]
        public HoaDonNhapModel CreateHoaDon([FromBody] HoaDonNhapModel model)
        {
            _hoaDonNhapBUS.Create(model);
            return model;
        }

        [Route("update-hoadonnhap")]
        [HttpPut]
        public HoaDonNhapModel UpdateHoaDon([FromBody] HoaDonNhapModel model)
        {
            _hoaDonNhapBUS.Update(model);
            return model;
        }

        [Route("delete-hoadonnhap")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _hoaDonNhapBUS.Delete(id);
            }
            return true;
        }

    }
}
