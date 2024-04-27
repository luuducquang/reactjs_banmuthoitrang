app.controller("InvoiceCtrl", function ($scope, $http) {
    if(!customerLocalStorage){
        window.location.href = './login.html'
    }

    document.title = 'Đơn hàng của tôi'
      
    $(".nonBill").hide()
    $http({
        method: 'GET',
        headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
        url: current_url + '/api-user/HoaDon/getbytaikhoan-mahoadon-chitiethoadon/' + customerLocalStorage.mataikhoan,
    }).then(function (response) {
        if(response.data.length===0){
            $(".nonBill").show()
        }
        else{
            $scope.listHoaDonBanDetail=response.data
            $(".nonBill").hide()
        }
    }).catch(function (error) {
        console.error('Lỗi:', error);
    });

    $('.invoiceDetail').hide()
    clickDetail = function(){
        $('.invoiceDetail').toggle()
    }
    $(".invoiceContent").click(function(event) {
        event.stopPropagation();
    });
    
    $(".invoiceDetail").click(function() {
        $(".invoiceDetail").hide();
    });

    $scope.clickDetail = function(x){
        $http({
            method: 'GET',
            headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
            url: current_url + '/api-user/HoaDon/getbyid-mahoadon-chitiethoadon/' + x.maHoaDon,
        }).then(function (response) {
            $scope.listchitiet=response.data
            $scope.listHDBDetailDelete = $scope.listchitiet.map(function(value){
                return {MaChiTietHoaDon: value.maChiTietHoaDon,
                    MaSanPham: value.maSanPham,
                    SoLuongTon: value.soLuong,
                    Status:4}
            })
        }).catch(function (error) {
            console.error('Lỗi:', error);
        });
        
        if(x.trangThai==="Đang giao hàng"){
            $('.confirmOrder').show()
        }
        if(x.trangThai!="Đang giao hàng"){
            $('.confirmOrder').hide()
        }
        if(x.trangThai==="Đang xử lý"){
            $('.cancelOrder').show()
        }
        if(x.trangThai!="Đang xử lý"){
            $('.cancelOrder').hide()
        }
        if(x.trangThai==="Đã giao hàng"){
            $('.returnOrder').show()
            $('.ChangeOrder').show()
            $('.successOrder').show()
        }
        if(x.trangThai!="Đã giao hàng"){
            $('.returnOrder').hide()
            $('.ChangeOrder').hide()
            $('.successOrder').hide()
        }

        $scope.cancelOrder=function(){
            if(confirm('Bạn có muốn huỷ đơn hàng không?')){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:x.maHoaDon,
                        TrangThai: 'Huỷ đơn',
                        NgayTao: x.ngayTao,
                        TongGia: x.tongGia,
                        TenKH: x.tenKH,
                        DiaChi: x.diachi,
                        Email: x.email,
                        SDT: x.sdt,
                        DiaChiGiaoHang: x.diaChiGiaoHang,
                        list_json_chitiet_hoadon:$scope.listHDBDetailDelete
                    },
                    url: current_url + '/api-user/HoaDon/update-hoadon',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
                }).then(function (response) {  
                    window.location.reload()
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }

        $scope.confirmOrder=function(){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:x.maHoaDon,
                        TrangThai: 'Đã giao hàng',
                        NgayTao: x.ngayTao,
                        TongGia: x.tongGia,
                        TenKH: x.tenKH,
                        DiaChi: x.diachi,
                        Email: x.email,
                        SDT: x.sdt,
                        DiaChiGiaoHang: x.diaChiGiaoHang,
                        list_json_chitiet_hoadon:[{
                            MaChiTietHoaDon: 0,
                            MaSanPham: 0,
                            SoLuong: 0,
                            TongGia: 0,
                            status:0
                        }]
                    },
                    url: current_url + '/api-user/HoaDon/update-hoadon',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
                }).then(function (response) {  
                    alert("Xác nhận đơn hàng thành công")
                    window.location.reload()
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
        }

        $scope.ChangeOrder=function(){
            if(confirm("Bạn có muốn yêu cầu đổi hàng không")){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:x.maHoaDon,
                        TrangThai: 'Đổi hàng',
                        NgayTao: x.ngayTao,
                        TongGia: x.tongGia,
                        TenKH: x.tenKH,
                        DiaChi: x.diachi,
                        Email: x.email,
                        SDT: x.sdt,
                        DiaChiGiaoHang: x.diaChiGiaoHang,
                        list_json_chitiet_hoadon:[{
                            MaChiTietHoaDon: 0,
                            MaSanPham: 0,
                            SoLuong: 0,
                            TongGia: 0,
                            status:0
                        }]
                    },
                    url: current_url + '/api-user/HoaDon/update-hoadon',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
                }).then(function (response) {  
                    alert("Đã gửi yêu cầu đổi hàng")
                    window.location.reload()
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }

        }
        $scope.returnOrder=function(){
            if(confirm("Bạn có muốn yêu cầu trả hàng không")){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:x.maHoaDon,
                        TrangThai: 'Trả hàng',
                        NgayTao: x.ngayTao,
                        TongGia: x.tongGia,
                        TenKH: x.tenKH,
                        DiaChi: x.diachi,
                        Email: x.email,
                        SDT: x.sdt,
                        DiaChiGiaoHang: x.diaChiGiaoHang,
                        list_json_chitiet_hoadon:$scope.listHDBDetailDelete
                    },
                    url: current_url + '/api-user/HoaDon/update-hoadon',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
                }).then(function (response) {  
                    alert("Đã gửi yêu cầu trả hàng")
                    window.location.reload()
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            }
        }

        $scope.successOrder=function(){
                $http({
                    method: 'PUT',
                    data: {
                        MaHoaDon:x.maHoaDon,
                        TrangThai: 'Hoàn tất',
                        NgayTao: x.ngayTao,
                        TongGia: x.tongGia,
                        TenKH: x.tenKH,
                        DiaChi: x.diachi,
                        Email: x.email,
                        SDT: x.sdt,
                        DiaChiGiaoHang: x.diaChiGiaoHang,
                        list_json_chitiet_hoadon:[{
                            MaChiTietHoaDon: 0,
                            MaSanPham: 0,
                            SoLuong: 0,
                            TongGia: 0,
                            status:0
                        }]
                    },
                    url: current_url + '/api-user/HoaDon/update-hoadon',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
                }).then(function (response) {  
                    alert("Đã hoàn tất việc mua hàng, cảm ơn quý khách")
                    window.location.reload()
                }).catch(function (error) {
                    console.error('Lỗi khi sửa sản phẩm:', error);
                });
            
        }
    }

    $scope.gohome=function(){
        window.location='#!/'
    }

})