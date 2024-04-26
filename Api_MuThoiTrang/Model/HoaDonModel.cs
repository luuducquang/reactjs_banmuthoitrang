using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class HoaDonModel
    {
        public int MaHoaDon {  get; set; }
        public string TrangThai {  get; set; }
        public DateTime NgayTao {  get; set; }
        public Decimal TongGia {  get; set; }
        public string TenKH {  get; set; }
        public string Diachi {  get; set; }
        public string Email {  get; set; }
        public string SDT {  get; set; }
        public string DiaChiGiaoHang {  get; set; }
        public int MaTaiKhoan {  get; set; }

        public List<ChiTietHoaDonModel> list_json_chitiet_hoadon { get; set; }
    }

    public class HoaDonModelTWO
    {
        public int MaHoaDon { get; set; }
        public string TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public Decimal TongGia { get; set; }
        public string TenKH { get; set; }
        public string Diachi { get; set; }
        public string Email { get; set; }
        public string SDT { get; set; }
        public string DiaChiGiaoHang { get; set; }
        public int MaTaiKhoan { get; set; }
        public string TenTaiKhoan { get; set; }

    }
}
