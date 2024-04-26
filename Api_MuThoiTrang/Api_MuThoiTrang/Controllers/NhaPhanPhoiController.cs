using BussinessLayer;
using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    //[Authorize(Roles = "1,8")]
    [Route("api/[controller]")]
    [ApiController]
    public class NhaPhanPhoiController : ControllerBase
    {
        private INhaPhanPhoiBUS _nhaPhanPhoiBUS;

        public NhaPhanPhoiController(INhaPhanPhoiBUS nhaPhanPhoiBUS)
        {
            _nhaPhanPhoiBUS = nhaPhanPhoiBUS;
        }

        [AllowAnonymous]
        [Route("get-all-nhaphanphoi")]
        [HttpGet]
        public IEnumerable<NhaPhanPhoiModel> GetDataAll()
        {
            return _nhaPhanPhoiBUS.GetNhaPhanPhois();
        }

        [Route("create-nhaphanphoi")]
        [HttpPost]
        public bool Create(NhaPhanPhoiModel model)
        {
            return _nhaPhanPhoiBUS.Create(model);
        }

        [Route("update-nhaphanphoi")]
        [HttpPut]
        public bool Update(NhaPhanPhoiModel model)
        {
            return _nhaPhanPhoiBUS.Update(model);
        }

        [Route("delete-nhaphanphoi")]
        [HttpDelete]
        public bool Delete([FromBody] List<int> formdata)
        {
            foreach (int id in formdata)
            {
                _nhaPhanPhoiBUS.Delete(id);
            }
            return true;
        }

        
    }
}
