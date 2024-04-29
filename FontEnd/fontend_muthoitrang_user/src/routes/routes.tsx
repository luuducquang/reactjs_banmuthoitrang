import config from "../config";
import OnlyLayout from "../layouts/OnlyLayout";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import ChangePassword from "../pages/ChangePassword";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import Invoice from "../pages/Invoice";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Registry from "../pages/Registry";
import Search from "../pages/Search";

interface RouteItem {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any> | null;
}

const publicRoutes: RouteItem[] = [
    { path: config.routes.cart, component: Cart },
    { path: config.routes.order, component: Order },
    { path: config.routes.home, component: Home },
    { path: config.routes.category, component: Category },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.search, component: Search },
    { path: config.routes.invoice, component: Invoice },
    { path: config.routes.changepassword, component: ChangePassword },
    { path: config.routes.login, component: Login, layout: OnlyLayout },
    { path: config.routes.registry, component: Registry, layout: OnlyLayout },
];

const privateRoutes: RouteItem[] = [];

export { publicRoutes, privateRoutes };
