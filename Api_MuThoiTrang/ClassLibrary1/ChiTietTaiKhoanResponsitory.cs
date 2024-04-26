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
    public partial class ChiTietTaiKhoanResponsitory : IChiTietTaiKhoanResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public ChiTietTaiKhoanResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Update(ChiTietTaiKhoanModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_sua_chitiettaikhoan",
                    "@MaChitietTaiKhoan",model.MaChitietTaiKhoan,
                    "@HoTen", model.HoTen,
                    "@DiaChi", model.DiaChi,
                    "@SoDienThoai", model.SoDienThoai,
                    "@AnhDaiDien", model.AnhDaiDien
                    );
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
