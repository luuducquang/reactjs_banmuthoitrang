using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ChiTietTaiKhoanModel
    {
        public int MaChitietTaiKhoan {  get; set; } 
        public int MaTaiKhoan {  get; set; }
        public int MaLoaitaikhoan { get; set; }
        public string HoTen {  get; set; }
        public string DiaChi {  get; set; }
        public string SoDienThoai {  get; set; }
        public string AnhDaiDien {  get; set; }
        public int status {  get; set; }
    }

    public class ChiTietTaiKhoanModelTWO
    {
        public int MaChitietTaiKhoan { get; set; }
        public int MaTaiKhoan { get; set; }
        public int MaLoaitaikhoan { get; set; }
        public string TenLoai { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string SoDienThoai { get; set; }
        public string AnhDaiDien { get; set; }
        public int status { get; set; }
    }

}
