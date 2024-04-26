using BussinessLayer.Interfaces;
using DataAccessLayer;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Diagnostics.SymbolStore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class HoaDonBUS : IHoaDonBUS
    {
        public IHoaDonResponsitory _res;

        public HoaDonBUS(IHoaDonResponsitory IHoaDonResponsitory)
        {
            _res = IHoaDonResponsitory;
        }

        public List<HoaDonModelTWO> GetAllHoaDon()
        {
            return _res.GetAllHoaDon();
        }
        public List<ChiTietHoaDonModelTWO> Getbyids(int id)
        {
            return _res.Getbyids(id);
        }
        public bool Create(HoaDonModel model)
        {
            return _res.Create(model);
        }

        public bool Update(HoaDonModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int MaHoaDon)
        {
            return _res.Delete(MaHoaDon);
        }

    }
}
