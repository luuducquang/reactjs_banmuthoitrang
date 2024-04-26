using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class LoaiTaiKhoanBUS : ILoaiTaiKhoanBUS
    {
        private ILoaiTaiKhoanResponsitory _res;
        public LoaiTaiKhoanBUS(ILoaiTaiKhoanResponsitory res)
        {
            _res = res;
        }

        public List<LoaiTaiKhoanModel> GettAllLoaiTaiKhoan()
        {
            return _res.GettAllLoaiTaiKhoan();
        }

        public bool Create(LoaiTaiKhoanModel model)
        {
            return _res.Create(model);
        }

        public bool Update(LoaiTaiKhoanModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int maloaitaikhoan)
        {
            return _res.Delete(maloaitaikhoan);
        }
    }
}
