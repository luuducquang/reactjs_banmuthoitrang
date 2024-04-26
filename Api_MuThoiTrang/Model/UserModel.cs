using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class UserModel
    {
        public int MaTaiKhoan { get; set; }
        public string TenTaiKhoan { get; set; }
        public string MatKhau { get; set; }
        public string Email { get; set; }
        public string token { get; set; }
        public string HoTen { get; set; }
        public string SoDienThoai { get; set; }
        public string AnhDaiDien { get; set; }
        public int MaLoaitaikhoan { get; set; }
    }
}
