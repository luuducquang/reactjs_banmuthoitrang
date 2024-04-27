app.controller("InformationCtrl", function ($scope, $http) {
    if(!customerLocalStorage){
        window.location.href = './login.html'
    }

    document.title = 'Thông tin cá nhân'

    $http({
        method: 'GET',
        headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
        url: current_url + '/api-user/TaiKhoan/getbyid-taikhoan-chitiettaikhoan/' + customerLocalStorage.mataikhoan,
    }).then(function (response) {
        $scope.listTaiKhoanDetail=response.data
        console.log($scope.listTaiKhoanDetail);
        $scope.hoten = $scope.listTaiKhoanDetail[0].hoTen
        $scope.sodienthoai = $scope.listTaiKhoanDetail[0].soDienThoai
        $scope.email = $scope.listTaiKhoanDetail[0].email
        $scope.diachi = $scope.listTaiKhoanDetail[0].diaChi
    }).catch(function (error) {
        console.error('Lỗi:', error);
    });


    $scope.edit = function(){
        var file = document.getElementById('avatar-upload').files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            $http({
                method: 'POST',
                headers: {
                    "Authorization": 'Bearer ' + customerLocalStorage.token,
                    'Content-Type': undefined
                },
                data: formData,
                url: current_url + '/api-user/Image/upload',
            }).then(function (res) {
                $scope.Image = res.data.filePath;
                // preview.src = "../img"+ $scope.Image
                if(confirm("Bạn có muốn cập nhật thông tin tài khoản không !")){
                    $http({
                        method: 'PUT',
                        data: {
                            MaTaiKhoan:$scope.listTaiKhoanDetail[0].maTaiKhoan,
                            TenTaiKhoan: $scope.listTaiKhoanDetail[0].tenTaiKhoan,
                            MatKhau: $scope.listTaiKhoanDetail[0].matKhau,
                            Email: $scope.email,
                            list_json_chitiet_taikhoan:[{
                                MaChitietTaiKhoan: $scope.listTaiKhoanDetail[0].maChitietTaiKhoan,
                                MaLoaitaikhoan: $scope.listTaiKhoanDetail[0].maLoaitaikhoan,
                                AnhDaiDien: "../img"+$scope.Image,
                                HoTen:$scope.hoten,
                                DiaChi:$scope.diachi,
                                SoDienThoai:$scope.sodienthoai,
                                status:2
                            }]
                        },
                        url: current_url + '/api-user/TaiKhoan/update-taikhoan',
                        headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
                    }).then(function (response) {  
                        alert('Cập nhật thành công')
                    }).catch(function (error) {
                        console.error('Lỗi khi cập nhật sản phẩm:', error);
                    });
                }
            });
        }
        else{
            if(confirm("Bạn có muốn cập nhật thông tin tài khoản không !")){
                $http({
                    method: 'PUT',
                    data: {
                        MaTaiKhoan:$scope.listTaiKhoanDetail[0].maTaiKhoan,
                        TenTaiKhoan: $scope.listTaiKhoanDetail[0].tenTaiKhoan,
                        MatKhau: $scope.listTaiKhoanDetail[0].matKhau,
                        Email: $scope.email,
                        list_json_chitiet_taikhoan:[{
                            MaChitietTaiKhoan: $scope.listTaiKhoanDetail[0].maChitietTaiKhoan,
                            MaLoaitaikhoan: $scope.listTaiKhoanDetail[0].maLoaitaikhoan,
                            AnhDaiDien: $scope.listTaiKhoanDetail[0].anhDaiDien,
                            HoTen:$scope.hoten,
                            DiaChi:$scope.diachi,
                            SoDienThoai:$scope.sodienthoai,
                            status:2
                        }]
                    },
                    url: current_url + '/api-user/TaiKhoan/update-taikhoan',
                    headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
                }).then(function (response) {  
                    alert('Cập nhật thành công')
                }).catch(function (error) {
                    console.error('Lỗi khi cập nhật sản phẩm:', error);
                });
            }
        }
    }
})