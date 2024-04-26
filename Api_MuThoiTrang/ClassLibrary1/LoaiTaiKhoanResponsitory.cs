using DataAccessLayer.Helper;
using DataAccessLayer.Helper.Interfaces;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial class LoaiTaiKhoanResponsitory : ILoaiTaiKhoanResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public LoaiTaiKhoanResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }


        public List<LoaiTaiKhoanModel> GettAllLoaiTaiKhoan()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_get_all_loaitaikhoan");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<LoaiTaiKhoanModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(LoaiTaiKhoanModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_them_loaitaikhoan",
                "@TenLoai", model.TenLoai,
                "@MoTa",model.MoTa);
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

        public bool Update(LoaiTaiKhoanModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_sua_loaitaikhoan",
                    "@MaLoaitaikhoan", model.MaLoaitaikhoan,
                "@TenLoai", model.TenLoai,
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

        public bool Delete(int maloaitaikhoan)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_xoa_loaitaikhoan",
                    "@MaLoaitaikhoan", maloaitaikhoan);
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
