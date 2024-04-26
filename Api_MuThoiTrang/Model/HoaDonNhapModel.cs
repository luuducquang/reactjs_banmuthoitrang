using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class HoaDonNhapModel
    {
        public int MaHoaDon {  get; set; }
        public int MaNhaPhanPhoi {  get; set; }
        public DateTime? NgayTao {  get; set; }
        public string KieuThanhToan {  get; set; }
        public int MaTaiKhoan {  get; set; }
        public Decimal TongTien {  get; set; }

        public List<ChiTietHoaDonNhapModel> list_json_chitiethoadonnhap {  get; set; }
    }

    public class HoaDonNhapModelTWO
    {
        public int MaHoaDon { get; set; }
        public int MaNhaPhanPhoi { get; set; }
        public string TenNhaPhanPhoi { get; set; }
        public DateTime NgayTao { get; set; }
        public string KieuThanhToan { get; set; }
        public Decimal TongTien { get; set; }
        public int MaTaiKhoan { get; set; }
        public string TenTaiKhoan { get; set; }
    }
}
