using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ISanPhamResponsitory
    {
        List<SanPhamModel> Getallsanpham();
        SanPhamModel  Getbyid(int id);
        bool Create(SanPhamModel model);

        bool Update(SanPhamModel model);
        bool Delete(int MaSanPham);
        public List<SanPhamModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc, Decimal GiaMin, Decimal GiaMax, string XuatXu);
    }
}
