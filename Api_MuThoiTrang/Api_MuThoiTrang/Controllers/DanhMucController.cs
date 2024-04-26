using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using Model;

namespace API_MYPHAM.Controllers
{
    //[Authorize(Roles = "1,8")]
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private IDanhMucBUS _danhMucBUS;

        public DanhMucController(IDanhMucBUS danhMuc)
        {
            _danhMucBUS = danhMuc;
        }

        [AllowAnonymous]
        [Route("get-all-danhmuc")]
        [HttpGet]
        public IEnumerable<DanhMucModel> GetDataAll()
        {
            return _danhMucBUS.GetAllDanhmucs();
        }

        [Route("create-danhmuc")]
        [HttpPost]
        public IActionResult Create(DanhMucModel model)
        {
            return Ok(_danhMucBUS.Create(model));
        }

        [Route("update-danhmuc")]
        [HttpPut]
        public IActionResult Update(DanhMucModel model)
        {
            return Ok(_danhMucBUS.Update(model));
        }

        [Route("delete-danhmuc")]
        [HttpDelete]
        public bool Delete([FromBody] List<int>formdata)
        {
            foreach (int id in formdata)
            {
                _danhMucBUS.Delete(id);
            }
            return true;
        }


    }
}
