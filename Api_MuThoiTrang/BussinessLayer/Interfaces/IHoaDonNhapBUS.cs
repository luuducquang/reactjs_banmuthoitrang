using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IHoaDonNhapBUS
    {
        List<HoaDonNhapModelTWO> GetAllHoaDonNhap();
        List<ChiTietHoaDonNhapModelTWO> Getbyids(int MaHoaDon);
        public bool Create(HoaDonNhapModel model);
        public bool Update(HoaDonNhapModel model); 
        bool Delete(int MaHoaDon);

    }
}
