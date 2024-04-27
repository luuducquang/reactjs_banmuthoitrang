app.controller("OrderCtrl", function ($scope, $http) {

    document.title = 'Đặt hàng'

    $scope.customer = customerLocalStorage
    $scope.productList = localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []

    $http({
        method: 'GET',
        headers: { "Authorization": 'Bearer ' + customerLocalStorage.token },
        url: current_url + '/api-user/TaiKhoan/getbyid-taikhoan-chitiettaikhoan/' + customerLocalStorage.mataikhoan,
    }).then(function (response) {
        $scope.listTaiKhoanDetail=response.data
        $scope.nameCustomer = $scope.listTaiKhoanDetail[0].hoTen
        $scope.telCustomer = $scope.listTaiKhoanDetail[0].soDienThoai
        $scope.emailCustomer = $scope.listTaiKhoanDetail[0].email
        $scope.AdressDetailCustomer = $scope.listTaiKhoanDetail[0].diaChi
    }).catch(function (error) {
        console.error('Lỗi:', error);
    });

    const host = "https://provinces.open-api.vn/api/";

    function callAPI(api, callback) {
        fetch(api)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    callAPI(host,  function (data) {
        renderData(data, "province");
        printResult();
    })

    function renderData(array, select) {
        let row = ' <option selected disabled value="">Vui lòng chọn</option>';
        array.forEach(function (element) {
            row += `<option value="${element.code}">${element.name}</option>`;
        });
        document.querySelector("#" + select).innerHTML = row;
    }

    document.querySelector("#province").addEventListener("change", function () {
        const provinceValue = this.value;
            callAPI(host + "p/" + provinceValue + "?depth=2", function (data) {
            renderData(data.districts, "district");
            printResult();
        });
    });

    document.querySelector("#district").addEventListener("change", function () {
        const districtValue = this.value;
        callAPI(host + "d/" + districtValue + "?depth=2", function (data) {
            renderData(data.wards, "ward");
            printResult();
        });
    });

    document.querySelector("#ward").addEventListener("change", function () {
        printResult();
    });

    
    function printResult() {
        const provinceText = document.querySelector("#province option:checked").textContent;
        const districtText = document.querySelector("#district option:checked").textContent;
        const wardText = document.querySelector("#ward option:checked").textContent;

        if (provinceText && districtText && wardText) {
            let result = provinceText + " | " + districtText + " | " + wardText;
            $scope.addressCus = result
        }
    }   

    
    var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []

    var ids = $scope.productList.map(function(item){
        return item.id
    })
    
    var newlistCart = listProduct.filter(function(item){
        return ids.indexOf(item.id) === -1;
    })
    
    function ShopAmount(){
        var shopvalue = document.querySelector(".shopping .shop")
        var listProduct =  localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : []
        x = `<span class="value-cart">${listProduct.length}</span>` 
        shopvalue.innerHTML = x
        
    }
    
    

    $scope.orderNow = function(){
        $scope.productListbuy = localStorage.getItem("listProductBuy") ? JSON.parse(localStorage.getItem("listProductBuy")) : []
        $scope.JsonProductList = $scope.productListbuy.map(function(value) {
            return {
                MaSanPham: value.id,
                SoLuong: value.amount,
                DonGia: value.price,
                TongGia: Number(value.price)*Number(value.amount)
            };
        });

        if(document.querySelector("#province option:checked").textContent==="Vui lòng chọn"||document.querySelector("#province option:checked").textContent===null||
        document.querySelector("#district option:checked").textContent==="Vui lòng chọn"||document.querySelector("#district option:checked").textContent===null||
         document.querySelector("#ward option:checked").textContent==="Vui lòng chọn"||document.querySelector("#ward option:checked").textContent===null){
             console.log(document.querySelector("#province option:checked").textContent);
             console.log(document.querySelector("#district option:checked").textContent);
             console.log(document.querySelector("#ward option:checked").textContent);
             alert('Vui lòng điền đủ thông tin')
            return
        }
        if(confirm("Bạn có chắc chắn đặt hàng không !")){
            $http({
                method: 'POST',
                data: {
                    TrangThai: 'Đang xử lý',
                    NgayTao: gmt7ISODate,
                    TongGia: totalProduct,
                    TenKH: $scope.nameCustomer,
                    DiaChi: $scope.addressCus,
                    Email: $scope.emailCustomer,
                    SDT: $scope.telCustomer,
                    DiaChiGiaoHang: $scope.AdressDetailCustomer,
                    MaTaiKhoan: customerLocalStorage.mataikhoan,
                    list_json_chitiet_hoadon:$scope.JsonProductList
                },
                url: current_url + '/api-user/HoaDon/create-hoadon',
                headers: {'Content-Type': 'application/json',"Authorization": 'Bearer ' + customerLocalStorage.token }
            }).then(function (response) {  
                alert('Đặt hàng thành công')
                window.location.href = '#!/'
                localStorage.setItem('listProductBuy',[])
                localStorage.setItem('productList',JSON.stringify(newlistCart))
                ShopAmount()
            }).catch(function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            });
        }
    }
})