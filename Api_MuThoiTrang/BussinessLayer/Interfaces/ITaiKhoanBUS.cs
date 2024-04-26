using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface ITaiKhoanBUS
    {
        List<ChiTietTaiKhoanModelTWO> Getbyids(int MaTaiKhoan);
        List<TaiKhoanModel> Getalltaikhoan();
        bool Create(TaiKhoanModel model);
        bool Update(TaiKhoanModel model);
        bool Doimk(DoimkModel model);
        bool Delete(int MaTaiKhoan);

    }
}
