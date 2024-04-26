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
    public partial class HoaDonResponsitory : IHoaDonResponsitory
    {
        private IDatabaseHelper _dbHelper;

        public List<HoaDonModelTWO> GetAllHoaDon()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getallhoadon");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<HoaDonModelTWO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public HoaDonResponsitory(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<ChiTietHoaDonModelTWO> Getbyids(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_getbyidchitiethoadon",
                     "@MaHoaDon", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ChiTietHoaDonModelTWO>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(HoaDonModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_create_hoadon",
                    "@TrangThai", model.TrangThai,
                    "@TongGia", model.TongGia,
                    "@TenKH", model.TenKH,
                    "@Diachi", model.Diachi,    
                    "@Email", model.Email,
                    "@SDT", model.SDT,
                    "@DiaChiGiaoHang", model.DiaChiGiaoHang,
                    "@MaTaiKhoan", model.MaTaiKhoan,
                    "@list_json_chitiet_hoadon", model.list_json_chitiet_hoadon != null ? MessageConvert.SerializeObject(model.list_json_chitiet_hoadon) : null);
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

        public bool Update(HoaDonModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_update_hoadon",
                    "@MaHoaDon", model.MaHoaDon,
                    "@TrangThai", model.TrangThai,
                    "@TongGia", model.TongGia,
                    "@TenKH", model.TenKH,
                    "@Diachi", model.Diachi,
                    "@Email", model.Email,
                    "@SDT", model.SDT,
                    "@DiaChiGiaoHang", model.DiaChiGiaoHang,
                    "@list_json_chitiet_hoadon", model.list_json_chitiet_hoadon != null ? MessageConvert.SerializeObject(model.list_json_chitiet_hoadon) : null);
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
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_delete_hoadon",
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
