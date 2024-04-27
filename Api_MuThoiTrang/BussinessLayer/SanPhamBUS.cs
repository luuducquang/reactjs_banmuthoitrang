using BussinessLayer.Interfaces;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class SanPhamBUS : ISanPhamBUS
    {
        public ISanPhamResponsitory _res;

        public SanPhamBUS(ISanPhamResponsitory sanPhamResponsitory)
        {
            _res = sanPhamResponsitory;
        }

        public List<SanPhamModel> Getallsanpham()
        {
            return _res.Getallsanpham();
        }

        public SanPhamModel Getbyid(int id)
        {
            return _res.Getbyid(id);
        }
        public bool Create(SanPhamModel model)
        {
            return _res.Create(model);
        }

        public bool Update(SanPhamModel model)
        {
            return _res.Update(model);
        }
        public bool Delete(int MaSanPham)
        {
            return _res.Delete(MaSanPham);
        }
        public List<SanPhamModel> Search(int pageIndex, int pageSize, out long total, string TenSanPham, string TenDanhMuc,  Decimal GiaMin, Decimal GiaMax, string XuatXu)
        {
            return _res.Search(pageIndex, pageSize, out total, TenSanPham, TenDanhMuc, GiaMin, GiaMax, XuatXu);
        }
    }
}
