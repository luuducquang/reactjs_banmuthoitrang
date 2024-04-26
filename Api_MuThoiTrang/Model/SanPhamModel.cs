using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class SanPhamModel
    {
        public int MaSanPham { get; set; }
        public int MaDanhMuc { get; set; }
        public string? TenDanhMuc { get; set; }
        public string TenSanPham { get; set; }
        public string AnhDaiDien { get; set; }
        public Decimal Gia { get; set; }
        public Decimal GiaGiam { get; set; }
        public int SoLuong { get; set; }
        public bool TrangThai { get; set; }
        public int? LuotXem { get; set; }
        public int? LuotBan { get; set; }
        public int? DanhGia { get; set; }
        public string MauSac { get; set; }
        public string XuatXu { get; set; }
        public string MoTa { get; set; }
        public string ChiTiet { get; set; }

    }
}
