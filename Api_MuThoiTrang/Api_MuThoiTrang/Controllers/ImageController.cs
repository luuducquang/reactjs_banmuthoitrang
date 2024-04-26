using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_MYPHAM_ADMIN.Controllers
{
    //[Authorize(Roles = "1,8")]
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private string _path;

        public ImageController(IConfiguration configuration)
        {
            _path = configuration["AppSettings:PATH"];
        }

        [NonAction]
        public string CreatePathFile(string RelativePathFileName)
        {
            try
            {
                string serverRootPathFolder = _path;
                string fullPathFile = $@"{serverRootPathFolder}\{RelativePathFileName}";
                string fullPathFolder = System.IO.Path.GetDirectoryName(fullPathFile);
                if (!Directory.Exists(fullPathFolder))
                    Directory.CreateDirectory(fullPathFolder);
                return fullPathFile;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [Route("upload")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    string filePath = $"/{file.FileName}";
                    var fullPath = CreatePathFile(filePath);
                    using (var fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    return Ok(new { filePath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Không tìm thây");
            }
        }

        [Route("upload-multi")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            try
            {
                if (files.Count > 0)
                {
                    var uploadedFiles = new List<string>();
                    foreach (var file in files)
                    {
                        if (file.Length > 0)
                        {
                            string filePath = $"/{file.FileName}";
                            var fullPath = CreatePathFile(filePath);
                            using (var fileStream = new FileStream(fullPath, FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                            }
                            uploadedFiles.Add(filePath);
                        }
                    }

                    return Ok(new { files = uploadedFiles});
                }
                else
                {
                    return BadRequest("Không tìm thây");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi");
            }
        }

    }
}
