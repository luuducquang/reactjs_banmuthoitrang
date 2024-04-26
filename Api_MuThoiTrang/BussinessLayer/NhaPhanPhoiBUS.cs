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
    public partial class NhaPhanPhoiBUS : INhaPhanPhoiBUS
    {
        private INhaPhanPhoiResponsitory _res;
        public NhaPhanPhoiBUS(INhaPhanPhoiResponsitory res)
        {
            _res = res;
        }

        public List<NhaPhanPhoiModel> GetNhaPhanPhois()
        {
            return _res.GetNhaPhanPhois();
        }

        public bool Create(NhaPhanPhoiModel model)
        {
            return _res.Create(model);
        }

        public bool Update(NhaPhanPhoiModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int manhaphanphoi)
        {
            return _res.Delete(manhaphanphoi);
        }

    }
}
