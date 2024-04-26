using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IDanhMucResponsitory
    {
        List<DanhMucModel> GetAllDanhmucs();

        public bool Create(DanhMucModel model);
        public bool Update(DanhMucModel model);
        public bool Delete(int madanhmuc);


    }
}
