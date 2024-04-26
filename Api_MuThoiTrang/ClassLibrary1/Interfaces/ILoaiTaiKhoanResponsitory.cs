using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ILoaiTaiKhoanResponsitory
    {
        List<LoaiTaiKhoanModel> GettAllLoaiTaiKhoan();

        public bool Create(LoaiTaiKhoanModel model);
        public bool Update(LoaiTaiKhoanModel model);
        public bool Delete(int maloaitaikhoan);
    }
}
