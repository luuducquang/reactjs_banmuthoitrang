using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class TaiKhoanModel
    {
        public int MaTaiKhoan {  get; set; }
        public string TenTaiKhoan { get; set; }
        public string MatKhau { get; set; }
        public string Email { get; set; }
        public List<ChiTietTaiKhoanModel> list_json_chitiet_taikhoan { get; set; }
    }

}
