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
    public partial class DanhMucBUS : IDanhMucBUS
    {
        private IDanhMucResponsitory _res;
        public DanhMucBUS(IDanhMucResponsitory res)
        {
            _res = res;
        }

        public List<DanhMucModel> GetAllDanhmucs()
        {
            return _res.GetAllDanhmucs();
        }


        public bool Create(DanhMucModel model)
        {
            return _res.Create(model);
        }

        public bool Update(DanhMucModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int madanhmuc)
        {
            return _res.Delete(madanhmuc);
        }

    }
}
