app.controller("ChangepasswordCtrl", function ($scope, $http) {
    if(!customerLocalStorage){
        window.location.href = './login.html'
    }

    document.title = 'Đổi mật khẩu'

    $http({
        method: 'GET',
        headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
        url: current_url + '/api-user/TaiKhoan/getbyid-taikhoan-chitiettaikhoan/' + customerLocalStorage.mataikhoan,
    }).then(function (response) {
        $scope.listTaiKhoanDetail=response.data
    }).catch(function (error) {
        console.error('Lỗi:', error);
    });

    $scope.doimk =function(){
        if($scope.password_old===undefined||$scope.password_new===undefined||$scope.password_new0===undefined){
            alert('Vui lòng điền hết !')
            return
        }
        if($scope.password_old!=$scope.listTaiKhoanDetail[0].matKhau){
            alert('Mật khẩu cũ không đúng !')
            console.log($scope.password_old);
            return
        }
        if(confirm("Bạn có muốn đổi mật khẩu không !")){
            $http({
                method: 'PUT',
                data: {
                    TenTaiKhoan:customerLocalStorage.taikhoan,
                    MatKhau: $scope.password_new
                },
                url: current_url + '/api-user/TaiKhoan/doimk-taikhoan',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
            }).then(function (response) {  
                alert('Cập nhật thành công')
                localStorage.setItem("customer",null)
                window.location.reload()
            }).catch(function (error) {
                console.error('Lỗi khi cập nhật sản phẩm:', error);
            });
        }
    }
})