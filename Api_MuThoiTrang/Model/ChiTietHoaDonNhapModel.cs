using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ChiTietHoaDonNhapModel
    {
        public int Id { get; set; }
        public int MaHoaDon { get; set; }
        public int MaSanPham { get; set; }
        public int SoLuong { get; set; }
        public int? SoLuongTon { get; set; }
        public Decimal GiaNhap { get; set; }
        public Decimal TongGia { get; set; }
        public int status { get; set; }
    }

    public class ChiTietHoaDonNhapModelTWO
    {
        public int Id { get; set; }
        public int MaHoaDon { get; set; }
        public string TenSanPham { get; set; }
        public string AnhDaiDien { get; set; }
        public int MaSanPham { get; set; }
        public int SoLuong { get; set; }
        public Decimal GiaNhap { get; set; }
        public Decimal TongGia { get; set; }
        public int status { get; set; }
    }
}
