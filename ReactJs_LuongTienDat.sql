CREATE DATABASE ReactJs_LuongTienDat

USE ReactJs_LuongTienDat

CREATE TABLE LoaiTaiKhoans(
    MaLoaitaikhoan INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenLoai NVARCHAR(50),
    MoTa NVARCHAR(250)
);

CREATE TABLE TaiKhoans(
    MaTaiKhoan INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenTaiKhoan NVARCHAR(50) UNIQUE,
    MatKhau NVARCHAR(50),
    Email NVARCHAR(150)
);

CREATE TABLE ChiTietTaiKhoans(
    MaChitietTaiKhoan INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade,
	MaLoaitaikhoan INT foreign key (MaLoaitaikhoan) references LoaiTaiKhoans(MaLoaitaikhoan) on delete cascade on update cascade,
    HoTen NVARCHAR(50),
    DiaChi NVARCHAR(250),
    SoDienThoai NVARCHAR(11),
    AnhDaiDien NVARCHAR(MAX)
);

CREATE TABLE DanhMucs(
    MaDanhMuc INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenDanhMuc NVARCHAR(50),
    NoiDung NVARCHAR(MAX)
);

CREATE TABLE ThongTinMu(
    MaSanPham INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaDanhMuc INT foreign key (MaDanhMuc) references DanhMucs(MaDanhMuc) on delete cascade on update cascade,
    TenSanPham NVARCHAR(150),
    AnhDaiDien NVARCHAR(MAX),
    Gia DECIMAL(18, 0) DEFAULT 0,
    GiaGiam DECIMAL(18, 0) DEFAULT 0,
    SoLuong INT DEFAULT 0,
	MauSac nvarchar(100),
    TrangThai BIT DEFAULT 0,
    LuotXem INT DEFAULT 0,
	LuotBan INT DEFAULT 0,
	DanhGia FLOAT DEFAULT 0,
	XuatXu nvarchar(50),
	MoTa NVARCHAR(MAX) ,
    ChiTiet NVARCHAR(MAX)
);


CREATE TABLE HoaDons(
    MaHoaDon INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    NgayTao DATETIME,
    TongGia DECIMAL(18, 0),
    TenKH NVARCHAR(50),
    Diachi NVARCHAR(250),
    Email NVARCHAR(50),
    SDT NVARCHAR(50),
    DiaChiGiaoHang NVARCHAR(350),
	TrangThai nvarchar(50),
	MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade
);
ALTER TABLE HoaDons
ADD CONSTRAINT DF_HoaDons_NgayTao DEFAULT GETDATE() FOR NgayTao;

CREATE TABLE ChiTietHoaDons(
    MaChiTietHoaDon INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaHoaDon INT foreign key (MaHoaDon) references HoaDons(MaHoaDon) on delete cascade on update cascade,
    MaSanPham INT foreign key (MaSanPham) references ThongTinMu(MaSanPham) on delete cascade on update cascade,
    SoLuong INT,
	DonGia DECIMAL(18, 0),
    TongGia DECIMAL(18, 0)
);

CREATE TABLE NhaPhanPhois(
    MaNhaPhanPhoi INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    TenNhaPhanPhoi NVARCHAR(250),
    DiaChi NVARCHAR(MAX),
    SoDienThoai NVARCHAR(50),
    LinkWeb nvarchar(max),
    MoTa NVARCHAR(MAX)
);


CREATE TABLE HoaDonNhaps(
	MaHoaDon INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaNhaPhanPhoi INT foreign key (MaNhaPhanPhoi) references NhaPhanPhois(MaNhaPhanPhoi) on delete cascade on update cascade,
    NgayTao DATETIME,
    KieuThanhToan NVARCHAR(MAX),
	TongTien DECIMAL(18, 0),
    MaTaiKhoan INT foreign key (MaTaiKhoan) references TaiKhoans(MaTaiKhoan) on delete cascade on update cascade
);
ALTER TABLE HoaDonNhaps
ADD CONSTRAINT DF_HoaDonNhaps_NgayTao DEFAULT GETDATE() FOR NgayTao;


CREATE TABLE ChiTietHoaDonNhaps(
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    MaHoaDon INT foreign key (MaHoaDon) references HoaDonNhaps(MaHoaDon) on delete cascade on update cascade,
    MaSanPham INT foreign key (MaSanPham) references ThongTinMu(MaSanPham) on delete cascade on update cascade,
    SoLuong INT,
    GiaNhap DECIMAL(18, 0),
    TongGia DECIMAL(18, 0)
);


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_loaitaikhoan
as
begin
	select*from LoaiTaiKhoans
	order by MaLoaitaikhoan
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_loaitaikhoan(@TenLoai nvarchar(50),@MoTa nvarchar(250))
as
begin
	insert into LoaiTaiKhoans(TenLoai,MoTa)
	values(@TenLoai,@MoTa)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_loaitaikhoan(@MaLoaitaikhoan int,@TenLoai nvarchar(50),@MoTa nvarchar(250))
as
begin
	update LoaiTaiKhoans
	set TenLoai = @TenLoai, MoTa=@MoTa
	where MaLoaitaikhoan = @MaLoaitaikhoan
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_loaitaikhoan(@MaLoaitaikhoan int)
as
begin
	delete from LoaiTaiKhoans
	where MaLoaitaikhoan = @MaLoaitaikhoan
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getalltaikhoan
as
begin
	select*from TaiKhoans
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getallusername
as
begin	
	select TenTaiKhoan
	from TaiKhoans
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getbyidchitiettaikhoan(@MaTaiKhoan int)
as
begin
	select h.*,c.TenLoai
	from ChiTietTaiKhoans h
	inner join LoaiTaiKhoans c on h.MaLoaitaikhoan=c.MaLoaitaikhoan
	where MaTaiKhoan =@MaTaiKhoan
end
-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getbyidchitiettaikhoancustomer(@MaTaiKhoan int)
as
begin
	select h.*,c.TenLoai,tk.Email,tk.TenTaiKhoan,tk.MatKhau
	from ChiTietTaiKhoans h
	inner join LoaiTaiKhoans c on h.MaLoaitaikhoan=c.MaLoaitaikhoan
	inner join TaiKhoans tk on tk.MaTaiKhoan = h.MaTaiKhoan
	where tk.MaTaiKhoan =@MaTaiKhoan
end
-------------------------------------------------------------------------------------------------------------------------------
create proc sp_create_taikhoan(
@TenTaiKhoan nvarchar(50),
@MatKhau nvarchar(50),
@Email nvarchar(150),
@list_json_chitiet_taikhoan NVARCHAR(MAX)
)
as
BEGIN
		DECLARE @MaTaiKhoan INT;
		DECLARE @MaLoaiTaiKhoan INT;
		DECLARE @USER int
		Set @USER = (SELECT COUNT(TenTaiKhoan) from TaiKhoans where TenTaiKhoan =@TenTaiKhoan)
        if(@USER=0)
		BEGIN
			INSERT INTO TaiKhoans
					(TenTaiKhoan, 
					 MatKhau, 
					 Email               
					)
					VALUES
					(@TenTaiKhoan, 
					 @MatKhau, 
					 @Email
					);

					SET @MaTaiKhoan = (SELECT SCOPE_IDENTITY());
					IF(@list_json_chitiet_taikhoan IS NOT NULL)
						BEGIN
							INSERT INTO ChiTietTaiKhoans
							 (MaTaiKhoan,
							 MaLoaitaikhoan,
							 HoTen,
							 DiaChi,
							 SoDienThoai,
							 AnhDaiDien)
						SELECT	@MaTaiKhoan,
								JSON_VALUE(y.value, '$.maLoaitaikhoan') ,
								JSON_VALUE(y.value, '$.hoTen') ,
								JSON_VALUE(y.value, '$.diaChi') ,
								JSON_VALUE(y.value, '$.soDienThoai') ,
								JSON_VALUE(y.value, '$.anhDaiDien') 
						FROM OPENJSON(@list_json_chitiet_taikhoan) AS y;
						END;
			END


        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_update_taikhoan(
@MaTaiKhoan int,
@MatKhau nvarchar(50),
@Email nvarchar(150),
@list_json_chitiet_taikhoan NVARCHAR(MAX)
)
as
BEGIN
		BEGIN
			Update TaiKhoans
			Set Email =@Email, MatKhau =@MatKhau
			WHERE MaTaiKhoan = @MaTaiKhoan
					IF(@list_json_chitiet_taikhoan IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.maChitietTaiKhoan') as maChitietTaiKhoan,
								JSON_VALUE(p.value, '$.maTaiKhoan') as maTaiKhoan,
								JSON_VALUE(p.value, '$.maLoaitaikhoan') as maLoaitaikhoan,
								JSON_VALUE(p.value, '$.hoTen') as hoTen,
								JSON_VALUE(p.value, '$.diaChi') as diaChi, 
								JSON_VALUE(p.value, '$.soDienThoai') as soDienThoai,
								JSON_VALUE(p.value, '$.anhDaiDien') as anhDaiDien,
								JSON_VALUE(p.value, '$.status') as status
								INTO #Result
							FROM OPENJSON(@list_json_chitiet_taikhoan) AS p;

							--insert status =1
							Insert into ChiTietTaiKhoans(MaTaiKhoan,MaLoaitaikhoan,HoTen,DiaChi,SoDienThoai,AnhDaiDien)
							select @MaTaiKhoan,
									#Result.maLoaitaikhoan,
									#Result.hoTen,
									#Result.diaChi,
									#Result.soDienThoai,
									#Result.anhDaiDien
							from #Result
							where #Result.status = 1

							--update status =2 
							Update ChiTietTaiKhoans
							set MaLoaitaikhoan= #Result.maLoaitaikhoan,
								HoTen = #Result.hoTen,
								DiaChi = #Result.diaChi,
								SoDienThoai = #Result.soDienThoai,
								AnhDaiDien = #Result.anhDaiDien
							from #Result
							where ChiTietTaiKhoans.MaChitietTaiKhoan=#Result.maChitietTaiKhoan and #Result.status = '2'

							--delete status =3
							delete c 
							from ChiTietTaiKhoans c
							inner join #Result r on c.maChitietTaiKhoan = r.maChitietTaiKhoan
							where r.status = '3'
							drop table #Result

						END;
			END


        SELECT '';
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_doimk_taikhoan(@TenTaiKhoan nvarchar(50),@MatKhau nvarchar(50))
as
begin
	update TaiKhoans
	set MatKhau = @MatKhau
	where TenTaiKhoan = @TenTaiKhoan
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_taikhoan(@MaTaiKhoan int)
as
begin
	delete from TaiKhoans
	where MaTaiKhoan = @MaTaiKhoan
end
-------------------------------------------------------------------------------------------------------------------------------
create PROCEDURE sp_login(@taikhoan nvarchar(50), @matkhau nvarchar(50))
AS
    BEGIN
      SELECT  *
      FROM TaiKhoans t 
	  inner join ChiTietTaiKhoans c on c.MaTaiKhoan = t.MaTaiKhoan
	  inner join LoaiTaiKhoans l on l.MaLoaitaikhoan = c.MaLoaitaikhoan
      where TenTaiKhoan= @taikhoan and MatKhau = @matkhau;
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_danhmuc
as
begin
	select * from DanhMucs
end


-------------------------------------------------------------------------------------------------------------------------------
Create proc sp_them_danhmuc(
@TenDanhMuc nvarchar(250),@NoiDung nvarchar(MAX))
as
begin
	insert into DanhMucs(TenDanhMuc,NoiDung)
	values(@TenDanhMuc,@NoiDung)
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_danhmuc(@MaDanhMuc int,
@TenDanhMuc nvarchar(250) ,@NoiDung nvarchar(MAX))
as
begin
	update DanhMucs
	set TenDanhMuc = @TenDanhMuc, NoiDung = @NoiDung
	where MaDanhMuc = @MaDanhMuc
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_danhmuc(@Madanhmuc int)
as
begin
	delete from DanhMucs
	where MaDanhMuc = @Madanhmuc
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_nhaphanphoi
as
begin
	select*from NhaPhanPhois
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_them_nhaphanphoi(@TenNhaPhanPhoi nvarchar(250), @DiaChi nvarchar(max), @SoDienThoai nvarchar(50),
@LinkWeb nvarchar(max),@MoTa nvarchar(max))
as
begin
	insert into NhaPhanPhois(TenNhaPhanPhoi,DiaChi,SoDienThoai,LinkWeb,MoTa)
	values(@TenNhaPhanPhoi,@DiaChi,@SoDienThoai,@LinkWeb,@MoTa)
end


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_sua_nhaphanphoi(@MaNhaPhanPhoi int,@TenNhaPhanPhoi nvarchar(250), @DiaChi nvarchar(max), @SoDienThoai nvarchar(50),
@LinkWeb nvarchar(max),@MoTa nvarchar(max))
as
begin
	update NhaPhanPhois
	set TenNhaPhanPhoi = @TenNhaPhanPhoi, DiaChi =@DiaChi,SoDienThoai =@SoDienThoai,LinkWeb=@LinkWeb, MoTa = @MoTa
	where MaNhaPhanPhoi = @MaNhaPhanPhoi
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_nhaphanphoi(@MaNhaPhanPhoi int)
as
begin
	delete from NhaPhanPhois
	where MaNhaPhanPhoi = @MaNhaPhanPhoi
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc sp_getallsanpham
as
begin
	select *,dm.TenDanhMuc
	from ThongTinMu as m inner join  DanhMucs dm on dm.MaDanhMuc=m.MaDanhMuc
	order by m.MaDanhMuc desc
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_sanpham_id(@MaSanPham int)
as
begin
	Select s.MaSanPham,
							  dm.MaDanhMuc,
							  dm.TenDanhMuc,
							  s.TenSanPham,
							  s.AnhDaiDien,
							  s.Gia,
							  s.GiaGiam,
							  s.SoLuong,
							  s.MauSac,
							  s.TrangThai,
							  s.LuotXem,
							  s.LuotBan,
							  s.DanhGia,
							  s.XuatXu,
							  s.MoTa,
							  s.ChiTiet
                        FROM ThongTinMu AS s
						inner join DanhMucs dm on dm.MaDanhMuc = s.MaDanhMuc
	where s.MaSanPham = @MaSanPham
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_create_sanpham(
@MaDanhMuc int,
@TenSanPham nvarchar(150),
@AnhDaiDien nvarchar(150),
@Gia decimal(18, 0),
@GiaGiam decimal(18, 0),
@SoLuong int,
@MauSac nvarchar(100),
@TrangThai bit,
@XuatXu nvarchar(50),
@MoTa nvarchar(max),
@ChiTiet nvarchar(max)
)
as
BEGIN
		DECLARE @MaSanPham INT;
		BEGIN
			INSERT INTO ThongTinMu
					(MaDanhMuc,  
					 TenSanPham,
					 AnhDaiDien,
					 Gia,
					 GiaGiam,
					 SoLuong,
					 MauSac,
					 TrangThai,
					 XuatXu,
					 MoTa,
					 ChiTiet
					)
					VALUES
					(@MaDanhMuc, 
					 @TenSanPham,
					 @AnhDaiDien,
					 @Gia,
					 @GiaGiam,
					 @SoLuong,
					 @MauSac,
					 @TrangThai,
					 @XuatXu,
					 @MoTa,
					 @ChiTiet
					);
			END
        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_update_sanpham(
@MaSanPham int,
@MaDanhMuc int,
@TenSanPham nvarchar(150),
@AnhDaiDien nvarchar(150),
@Gia decimal(18, 0),
@GiaGiam decimal(18, 0),
@SoLuong int,
@MauSac nvarchar(100),
@TrangThai bit,
@XuatXu nvarchar(50),
@MoTa nvarchar(max),
@ChiTiet nvarchar(max)
)
as
BEGIN
		update ThongTinMu
		set MaDanhMuc = @MaDanhMuc,
			TenSanPham = @TenSanPham,
			AnhDaiDien = @AnhDaiDien,
			Gia = @Gia,
			GiaGiam = @GiaGiam,
			SoLuong = @SoLuong,
			MauSac = @MauSac,
			TrangThai = @TrangThai,
			XuatXu = @XuatXu,
			MoTa = @MoTa,
			ChiTiet = @ChiTiet
		where MaSanPham =@MaSanPham
		
        SELECT '';
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_xoa_sanpham(@MaSanPham int)
as
begin
	delete from ThongTinMu
	where MaSanPham = @MaSanPham
end

alter proc sp_getallhoadon
as
begin
	select hd.* ,ct.TenTaiKhoan
	from HoaDons hd inner join
	TaiKhoans ct on hd.MaTaiKhoan = ct.MaTaiKhoan
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getbyidchitiethoadon(@MaHoaDon int)
as
begin
	select h.MaHoaDon,
			c.MaChiTietHoaDon,
							  c.MaSanPham,
                              s.TenSanPham,
							  c.SoLuong,
							  c.DonGia,
							  c.TongGia,
							  s.AnhDaiDien
                        FROM HoaDons AS h
						inner join ChiTietHoaDons c on c.MaHoaDon = h.MaHoaDon
						inner join ThongTinMu s on s.MaSanPham = c.MaSanPham
	where h.MaHoaDon = @MaHoaDon
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_get_all_hoadon
as
begin
	select* from HoaDons
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_create_hoadon(
@TrangThai nvarchar(50),
@TongGia decimal(18,0),
@TenKH nvarchar(50),
@Diachi nvarchar(250),
@Email nvarchar(50),
@SDT nvarchar(50),
@DiaChiGiaoHang nvarchar(350),
@MaTaiKhoan int,
@list_json_chitiet_hoadon NVARCHAR(MAX)
)
as
BEGIN
		DECLARE @MaHoaDon INT;
		BEGIN
			INSERT INTO HoaDons
					(TrangThai,
					TongGia ,
					TenKH ,
					Diachi ,
					Email ,
					SDT ,
					DiaChiGiaoHang,
					MaTaiKhoan
					)
					VALUES
					(@TrangThai,
					@TongGia ,
					@TenKH ,
					@Diachi ,
					@Email ,
					@SDT ,
					@DiaChiGiaoHang,
					@MaTaiKhoan
					);

					SET @MaHoaDon = (SELECT SCOPE_IDENTITY());
					IF(@list_json_chitiet_hoadon IS NOT NULL)

						BEGIN
							DECLARE @Result1 TABLE
							(
								MaSanPham INT,
								SoLuong INT,
								DonGia DECIMAL(18, 0),
								TongGia DECIMAL(18, 0)
							);

							INSERT INTO @Result1
							(
								MaSanPham,
								SoLuong,
								DonGia,
								TongGia
							)
							SELECT
								JSON_VALUE(y.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(y.value, '$.soLuong') as SoLuong,
								JSON_VALUE(y.value, '$.donGia') as DonGia,
								JSON_VALUE(y.value, '$.tongGia') as TongGia
							FROM OPENJSON(@list_json_chitiet_hoadon) AS y;

							Insert into ChiTietHoaDons(
										 MaHoaDon,
										 MaSanPham,
										 SoLuong,
										 DonGia,
										 TongGia)
							select @MaHoaDon,
									MaSanPham,
									SoLuong,
									DonGia,
									TongGia
							from @Result1

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong - r.SoLuong,
								sp.LuotBan = sp.LuotBan + r.SoLuong
							FROM ThongTinMu sp
							JOIN @Result1 r ON sp.MaSanPham = r.MaSanPham;

						END;
			END


        SELECT '';
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_update_hoadon(
@MaHoaDon int,
@TrangThai nvarchar(50),
@TongGia decimal(18,0),
@TenKH nvarchar(50),
@Diachi nvarchar(250),
@Email nvarchar(50),
@SDT nvarchar(50),
@DiaChiGiaoHang nvarchar(350),
@list_json_chitiet_hoadon NVARCHAR(MAX)
)
as
BEGIN
		update HoaDons
		set TrangThai = @TrangThai,
			TongGia = @TongGia ,
			TenKH = @TenKH,
			Diachi = @Diachi,
			Email = @Email,
			SDT = @SDT,
			DiaChiGiaoHang = @DiaChiGiaoHang
					
		where MaHoaDon =@MaHoaDon
		
					IF(@list_json_chitiet_hoadon IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.maChiTietHoaDon') as maChiTietHoaDon,
								JSON_VALUE(p.value, '$.maHoaDon') as MaHoaDon, 
								JSON_VALUE(p.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(p.value, '$.soLuong') as soLuong,
								JSON_VALUE(p.value, '$.soLuongTon') as SoLuongTon,
								JSON_VALUE(p.value, '$.donGia') as donGia,
								JSON_VALUE(p.value, '$.tongGia')as tongGia,
								JSON_VALUE(p.value, '$.status') as status
								INTO #Result
							FROM OPENJSON(@list_json_chitiet_hoadon) AS p;

							--insert status =1
							Insert into ChiTietHoaDons(MaHoaDon,MaSanPham,SoLuong,DonGia,TongGia)
							select @MaHoaDon,
									#Result.maSanPham,
									#Result.soLuong,
									#Result.donGia,
									#Result.tongGia
							from #Result
							where #Result.Status = 1

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong - r.SoLuongTon,
								sp.LuotBan = sp.LuotBan + r.SoLuongTon
							FROM ThongTinMu sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 1;

							--update status =2 
							Update ChiTietHoaDons
							set MaSanPham= #Result.MaSanPham,
								SoLuong = #Result.soLuong,
								DonGia = #Result.donGia,
								TongGia = #Result.tongGia
							from #Result
							where ChiTietHoaDons.MaChiTietHoaDon=#Result.maChiTietHoaDon and #Result.status = '2'

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong - r.SoLuongTon,
								sp.LuotBan = sp.LuotBan + r.SoLuongTon
							FROM ThongTinMu sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 2;

							--delete status =3
							delete c 
							from ChiTietHoaDons c
							inner join #Result r on c.maChiTietHoaDon = r.maChiTietHoaDon
							where r.status = '3'

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuongTon,
								sp.LuotBan = sp.LuotBan - r.SoLuongTon
							FROM ThongTinMu sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 3;

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuongTon,
								sp.LuotBan = sp.LuotBan - r.SoLuongTon
							FROM ThongTinMu sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 4;

							drop table #Result

						END;
			


        SELECT '';
    END;

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_delete_hoadon(@MaHoaDon int)
as
begin
	delete from HoaDons
	where MaHoaDon = @MaHoaDon
end

-------------------------------------------------------------------------------------------------------------------------------
alter proc getallhoadonnhap
as
begin
	select hd.* ,ct.TenTaiKhoan,npp.TenNhaPhanPhoi
	from HoaDonNhaps hd inner join
	TaiKhoans ct on hd.MaTaiKhoan = ct.MaTaiKhoan
	inner join NhaPhanPhois npp on hd.MaNhaPhanPhoi= npp.MaNhaPhanPhoi
end
-------------------------------------------------------------------------------------------------------------------------------
create proc sp_getbyidchitiethoadonnhap(@MaHoaDon int)
as
begin
	select c.Id,
			 h.MaHoaDon,
							  c.MaSanPham,
                              s.TenSanPham,
							  c.SoLuong,	
							  c.GiaNhap,
							  c.TongGia,
							  s.AnhDaiDien
                        FROM HoaDonNhaps AS h
						inner join ChiTietHoaDonNhaps c on c.MaHoaDon = h.MaHoaDon
						inner join ThongTinMu s on s.MaSanPham = c.MaSanPham
	where h.MaHoaDon = @MaHoaDon
end

-------------------------------------------------------------------------------------------------------------------------------
create proc sp_create_hoadon_nhap(
@MaNhaPhanPhoi int,
@KieuThanhToan nvarchar(MAX),
@TongTien DECIMAL(18, 0),
@MaTaiKhoan int,
@list_json_chitiethoadonnhap NVARCHAR(MAX)
)
as
BEGIN
		DECLARE @MaHoaDon INT;
		BEGIN
			INSERT INTO HoaDonNhaps
					(MaNhaPhanPhoi,
					KieuThanhToan ,
					TongTien,
					MaTaiKhoan
					)
					VALUES
					(@MaNhaPhanPhoi,
					@KieuThanhToan ,
					@TongTien,
					@MaTaiKhoan
					);

					SET @MaHoaDon = (SELECT SCOPE_IDENTITY());
					IF(@list_json_chitiethoadonnhap IS NOT NULL)
						BEGIN
							DECLARE @Result TABLE
							(
								MaSanPham INT,
								SoLuong INT,
								GiaNhap DECIMAL(18, 0),
								TongGia DECIMAL(18, 0)
							);

							INSERT INTO @Result
							(
								MaSanPham,
								SoLuong,
								GiaNhap,
								TongGia
							)
							SELECT
								JSON_VALUE(y.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(y.value, '$.soLuong') as SoLuong,
								JSON_VALUE(y.value, '$.giaNhap') as GiaNhap,
								JSON_VALUE(y.value, '$.tongGia') as TongGia
							FROM OPENJSON(@list_json_chitiethoadonnhap) AS y;

							Insert into ChiTietHoaDonNhaps(
										 MaHoaDon,
										 MaSanPham,
										 SoLuong,
										 GiaNhap,
										 TongGia)
							select @MaHoaDon,
									MaSanPham,
									SoLuong,
									GiaNhap,
									TongGia
							from @Result

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuong, sp.Gia = r.GiaNhap + ( r.GiaNhap * 0.5),sp.GiaGiam = r.GiaNhap + ( r.GiaNhap * 0.3)
							FROM ThongTinMu sp
							JOIN @Result r ON sp.MaSanPham = r.MaSanPham;

						END;
			END


        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_update_hoadon_nhap(
@MaHoaDon int,
@MaNhaPhanPhoi int,
@KieuThanhToan nvarchar(MAX),
@TongTien DECIMAL(18, 0),
@list_json_chitiethoadonnhap NVARCHAR(MAX)
)
as
BEGIN
		update HoaDonNhaps
		set MaNhaPhanPhoi = @MaNhaPhanPhoi,
			KieuThanhToan = @KieuThanhToan ,
			TongTien = @TongTien
					
		where MaHoaDon =@MaHoaDon
		
					IF(@list_json_chitiethoadonnhap IS NOT NULL)
						BEGIN
							SELECT JSON_VALUE(p.value, '$.id') as Id,
								JSON_VALUE(p.value, '$.maHoaDon') as MaHoaDon, 
								JSON_VALUE(p.value, '$.maSanPham') as MaSanPham,
								JSON_VALUE(p.value, '$.soLuong') as SoLuong,
								JSON_VALUE(p.value, '$.soLuongTon') as SoLuongTon,
								JSON_VALUE(p.value, '$.giaNhap') as GiaNhap,
								JSON_VALUE(p.value, '$.tongGia') as TongGia,
								JSON_VALUE(p.value, '$.status') as status
								INTO #Result
							FROM OPENJSON(@list_json_chitiethoadonnhap) AS p;

							--insert status =1
							Insert into ChiTietHoaDonNhaps(
										 MaHoaDon,
										 MaSanPham,
										 SoLuong,
										 GiaNhap,
										 TongGia)
							select @MaHoaDon,
									#Result.MaSanPham,
									#Result.SoLuong,
									#Result.GiaNhap,
									#Result.TongGia
							from #Result
							where #Result.Status = 1

							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuong,
								sp.Gia = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.5)),
								sp.GiaGiam = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.3))
							FROM ThongTinMu sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 1;


							--update status =2 
							Update ChiTietHoaDonNhaps
							set MaSanPham= #Result.MaSanPham,
								SoLuong = #Result.SoLuong,
								GiaNhap = #Result.GiaNhap,
								TongGia = #Result.TongGia
							from #Result
							where ChiTietHoaDonNhaps.Id=#Result.Id and #Result.status = 2

							
							UPDATE sp
							SET sp.SoLuong = sp.SoLuong + r.SoLuongTon,sp.Gia = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.5)),
										sp.GiaGiam = (CAST(r.GiaNhap AS DECIMAL) + (CAST(r.GiaNhap AS DECIMAL) * 0.3))
							FROM ThongTinMu sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 2;

							--delete status =3
							delete c 
							from ChiTietHoaDonNhaps c
							inner join #Result r on c.Id = r.Id
							where r.status = 3

							UPDATE sp
							SET sp.SoLuong =(CAST (sp.SoLuong AS INT) - (CAST(r.SoLuong AS INT)))
							FROM ThongTinMu sp
							JOIN #Result r ON sp.MaSanPham = r.MaSanPham
							WHERE r.Status = 3;

							drop table #Result

						END;
			


        SELECT '';
    END;


-------------------------------------------------------------------------------------------------------------------------------
create proc sp_delete_hoadon_nhap(@MaHoaDon int)
as
begin
	delete from HoaDonNhaps
	where MaHoaDon = @MaHoaDon
end