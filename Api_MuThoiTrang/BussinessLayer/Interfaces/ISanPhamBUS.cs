﻿using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Interfaces
{
    public partial interface ISanPhamBUS
    {
        List<SanPhamModel> Getallsanpham();
        SanPhamModel Getbyid(int id);
        public bool Create(SanPhamModel model);
        public bool Update(SanPhamModel model);
        public bool Delete(int MaSanPham);

    }
}