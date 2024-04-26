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
    public partial class ChiTietTaiKhoanBUS : IChiTietTaiKhoanBUS
    {
        private IChiTietTaiKhoanResponsitory _res;

        public ChiTietTaiKhoanBUS(IChiTietTaiKhoanResponsitory chiTietTaiKhoanResponsitory)
        {
            _res = chiTietTaiKhoanResponsitory;
        }

        public bool Update(ChiTietTaiKhoanModel model)
        {
            return _res.Update(model);
        }

    }
}
