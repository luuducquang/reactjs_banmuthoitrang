import OnlyChildren from "../layouts/OnlyChildren";
import Account from "../pages/Account";
import BillSell from "../pages/BillSell";
import Category from "../pages/Category";
import Distributor from "../pages/Distributor";
import ImportBill from "../pages/ImportBill";
import Login from "../pages/Login";
import Product from "../pages/Product";
import TypeAccount from "../pages/TypeAccount";

interface RouteItem {
    path?: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any> | null;
}

const publicRoutes: RouteItem[] = [
    { path: "/login", component: Login, layout: OnlyChildren },
];

const privateRoutes: RouteItem[] = [
    { path: "/", component: Product },
    { path: "/hoadonban", component: BillSell },
    { path: "/hoadonnhap", component: ImportBill },
    { path: "/danhmuc", component: Category },
    { path: "/nhaphanphoi", component: Distributor },
    { path: "/loaitaikhoan", component: TypeAccount },
    { path: "/taikhoan", component: Account },
];

export { publicRoutes, privateRoutes };
