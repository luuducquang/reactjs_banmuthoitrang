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
    public partial class HoaDonNhapResponsitory : IHoaDonNhapResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public HoaDonNhapResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<HoaDonNhapModelTWO> GetAllHoaDonNhap()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "getallhoadonnhap");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<HoaDonNhapModelTWO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ChiTietHoaDonNhapModelTWO> Getbyids(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getbyidchitiethoadonnhap",
                     "@MaHoaDon", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ChiTietHoaDonNhapModelTWO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public bool Create(HoaDonNhapModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_hoadon_nhap",
                    "@MaNhaPhanPhoi", model.MaNhaPhanPhoi,
                    "@KieuThanhToan", model.KieuThanhToan,
                    "@TongTien", model.TongTien,
                    "@MaTaiKhoan", model.MaTaiKhoan,
                    "@list_json_chitiethoadonnhap", model.list_json_chitiethoadonnhap != null ? MessageConvert.SerializeObject(model.list_json_chitiethoadonnhap) : null);
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

        public bool Update(HoaDonNhapModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_hoadon_nhap",
                    "@MaHoaDon",model.MaHoaDon,
                    "@MaNhaPhanPhoi", model.MaNhaPhanPhoi,
                    "@KieuThanhToan", model.KieuThanhToan,
                    "@TongTien", model.TongTien,
                    "@list_json_chitiethoadonnhap", model.list_json_chitiethoadonnhap != null ? MessageConvert.SerializeObject(model.list_json_chitiethoadonnhap) : null);
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

        public bool Delete(int MaHoaDon)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_delete_hoadon_nhap",
                    "@MaHoaDon", MaHoaDon);
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
