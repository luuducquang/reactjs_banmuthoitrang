using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface INhaPhanPhoiBUS
    {
        List<NhaPhanPhoiModel> GetNhaPhanPhois();

        public bool Create(NhaPhanPhoiModel model);
        public bool Update(NhaPhanPhoiModel model);
        public bool Delete(int manhaphanphoi);

    }
}
