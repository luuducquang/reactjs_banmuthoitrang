using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IHoaDonNhapResponsitory
    {
        List<HoaDonNhapModelTWO> GetAllHoaDonNhap();
        List<ChiTietHoaDonNhapModelTWO> Getbyids(int MaHoaDon);
        bool Create(HoaDonNhapModel model);
        bool Update(HoaDonNhapModel model);
        bool Delete(int MaHoaDon);

    }
}
