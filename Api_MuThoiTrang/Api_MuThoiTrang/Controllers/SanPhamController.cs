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

        [Route("search-sanpham")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenSanPham = "";
                if (formData.Keys.Contains("TenSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["TenSanPham"]))) { TenSanPham = Convert.ToString(formData["TenSanPham"]); }
                string TenDanhMuc = "";
                if (formData.Keys.Contains("TenDanhMuc") && !string.IsNullOrEmpty(Convert.ToString(formData["TenDanhMuc"]))) { TenDanhMuc = Convert.ToString(formData["TenDanhMuc"]); }
                decimal GiaMin = 0;
                if (formData.ContainsKey("GiaMin") && !string.IsNullOrEmpty(formData["GiaMin"].ToString()))
                {
                    if (decimal.TryParse(formData["GiaMin"].ToString(), out decimal giaMinValue))
                    {
                        GiaMin = giaMinValue;
                    }
                }

                decimal GiaMax = 0;
                if (formData.ContainsKey("GiaMax") && !string.IsNullOrEmpty(formData["GiaMax"].ToString()))
                {
                    if (decimal.TryParse(formData["GiaMax"].ToString(), out decimal giaMaxValue))
                    {
                        GiaMax = giaMaxValue;
                    }
                }
                string XuatXu = "";
                if (formData.Keys.Contains("XuatXu") && !string.IsNullOrEmpty(Convert.ToString(formData["XuatXu"]))) { XuatXu = Convert.ToString(formData["XuatXu"]); }
                long total = 0;
                var data = _sanPhamBUS.Search(page, pageSize, out total, TenSanPham, TenDanhMuc, GiaMin, GiaMax, XuatXu);
                return Ok(
                   new
                   {
                       TotalItems = total,
                       Data = data,
                       Page = page,
                       PageSize = pageSize
                   }
                   );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
