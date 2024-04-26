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
    public class HoaDonController : ControllerBase
    {
        private IHoaDonBUS _hoaDonBUS;

        public HoaDonController(IHoaDonBUS hoaDonBUS)
        {
            _hoaDonBUS = hoaDonBUS;
        }

        [Route("get_all_hoadon")]
        [HttpGet]
        public IActionResult GetAllHoaDon()
        {
            return Ok(_hoaDonBUS.GetAllHoaDon());
        }

        [Route("getbyid-mahoadon-chitiethoadon/{id}")]
        [HttpGet]
        public List<ChiTietHoaDonModelTWO> GetByID(int id)
        {
            return _hoaDonBUS.Getbyids(id);
        }

        [Route("create-hoadon")]
        [HttpPost]
        public HoaDonModel CreateHoaDon([FromBody] HoaDonModel model)
        {
            _hoaDonBUS.Create(model);
            return model;
        }


        [Route("update-hoadon")]
        [HttpPut]
        public HoaDonModel UpdateHoaDon([FromBody] HoaDonModel model)
        {
            _hoaDonBUS.Update(model);
            return model;
        }

        [Route("delete-hoadon")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _hoaDonBUS.Delete(id);
            }
            return true;
        }
    }
}
