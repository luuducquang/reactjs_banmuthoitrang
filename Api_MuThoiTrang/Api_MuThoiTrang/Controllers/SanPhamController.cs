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
    public class SanPhamController : ControllerBase
    {
        private ISanPhamBUS _sanPhamBUS;

        public SanPhamController(ISanPhamBUS sanPhamBUS)
        {
            _sanPhamBUS = sanPhamBUS;
        }

        [AllowAnonymous]
        [Route("get-allsanpham")]
        [HttpGet]
        public IEnumerable<SanPhamModel> GetDataAll()
        {
            return _sanPhamBUS.Getallsanpham();
        }

        

        [AllowAnonymous]
        [Route("getbyid-sanpham/{id}")]
        [HttpGet]
        public SanPhamModel GetByID(int id)
        {
            return _sanPhamBUS.Getbyid(id);
        }

        

        [Route("create-sanpham")]
        [HttpPost]
        public SanPhamModel CreateSanpham([FromBody] SanPhamModel model)
        {
            _sanPhamBUS.Create(model);
            return model;
        }

        [Route("update-sanpham")]
        [HttpPut]
        public SanPhamModel UpdateSanpham([FromBody] SanPhamModel model)
        {
            _sanPhamBUS.Update(model);
            return model;
        }

        [Route("delete-sanpham")]
        [HttpDelete]
        public bool DeleteSanPham([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _sanPhamBUS.Delete(id);
            }
            return true;
        }

    }
}
