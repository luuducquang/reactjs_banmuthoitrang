using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;

namespace DataAccessLayer
{
    public partial class NhaPhanPhoiResponsitory : INhaPhanPhoiResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public NhaPhanPhoiResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<NhaPhanPhoiModel> GetNhaPhanPhois()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_nhaphanphoi");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<NhaPhanPhoiModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(NhaPhanPhoiModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_them_nhaphanphoi",
                "@TenNhaPhanPhoi", model.TenNhaPhanPhoi,
                "@DiaChi", model.DiaChi,
                "@SoDienThoai", model.SoDienThoai,
                "@LinkWeb", model.LinkWeb,
                "@MoTa", model.MoTa);
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

        public bool Update(NhaPhanPhoiModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_sua_nhaphanphoi",
                    "@MaNhaPhanPhoi", model.MaNhaPhanPhoi,
                "@TenNhaPhanPhoi", model.TenNhaPhanPhoi,
                "@DiaChi", model.DiaChi,
                "@SoDienThoai", model.SoDienThoai,
                "@LinkWeb", model.LinkWeb,
                "@MoTa", model.MoTa);
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

        public bool Delete(int manhaphanphoi)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_nhaphanphoi"
                    , "@MaNhaPhanPhoi", manhaphanphoi);
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

        public List<NhaPhanPhoiModel> Search(int pageIndex, int pageSize, out long total, string TenNhaPhanPhoi, string DiaChi, string SDT)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_nhaphanphoi_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@TenNhaPhanPhoi", TenNhaPhanPhoi,
                    "@DiaChi", DiaChi,
                    "@SoDienThoai", SDT);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<NhaPhanPhoiModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
