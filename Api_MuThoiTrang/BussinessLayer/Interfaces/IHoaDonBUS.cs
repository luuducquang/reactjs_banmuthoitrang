using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface IHoaDonBUS
    {
        List<HoaDonModelTWO> GetAllHoaDon();
        List<ChiTietHoaDonModelTWO> Getbyids(int MaHoaDon);
        public bool Create(HoaDonModel model);
        public bool Update(HoaDonModel model);
        bool Delete(int MaHoaDon);

    }
}
