using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IHoaDonResponsitory
    {
        List<HoaDonModelTWO> GetAllHoaDon();
        List<ChiTietHoaDonModelTWO> Getbyids(int MaHoaDon);
        List<HoaDonModel> Getbytaikhoan(int MaTaiKhoan);
        bool Create(HoaDonModel model);
        bool Update(HoaDonModel model);
        bool Delete(int MaHoaDon);

    }
}
