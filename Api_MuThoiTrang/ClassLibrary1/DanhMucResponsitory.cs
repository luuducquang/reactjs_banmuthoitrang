using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;

namespace DataAccessLayer
{
    public partial class DanhMucResponsitory : IDanhMucResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public DanhMucResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<DanhMucModel> GetAllDanhmucs()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_danhmuc");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<DanhMucModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(DanhMucModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_them_danhmuc",
                "@TenDanhMuc", model.TenDanhMuc,
                "@NoiDung", model.NoiDung);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(DanhMucModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_sua_danhmuc"
                    , "@MaDanhMuc", model.MaDanhMuc,
                "@TenDanhMuc", model.TenDanhMuc,
                "@NoiDung", model.NoiDung);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(int madanhmuc )
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_danhmuc"
                    , "@MaDanhMuc", madanhmuc);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
