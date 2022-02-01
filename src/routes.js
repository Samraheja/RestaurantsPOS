import Login from "./container/Login/Login";
import Profile from "./container/Profile/Profile";
import Register from "./container/Register/Register";
import ForgotPassword from "./container/ForgotPassword/ForgotPassword";
import ResetPassword from "./container/ResetPassword/ResetPassword";
import Category from "./container/Category/Category";
import SubCategory from "./container/SubCategory/SubCategory";
import Menu from "./container/Menu/Menu";
import AddMenu from "./container/Menu/AddMenu";
import Tables from "./container/Tables/Tables";
import Order from "./container/Order/Order";
import SettledBills from "./container/SettleBill/SettledBills";
import DailySaleReport from "./container/Reports/DailySaleReport";

var routes = [
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth",
    },
    {
        path: "/forgot-password",
        name: "Forgot Password",
        icon: "ni ni-single-02 text-yellow",
        component: ForgotPassword,
        layout: "/auth",
    },
    {
        path: "/reset-password",
        name: "Reset Password",
        icon: "ni ni-single-02 text-yellow",
        component: ResetPassword,
        layout: "/auth",
    },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 icon-color",
        component: Profile,
        layout: "/admin",
    },
    {
        path: "/tables",
        name: "Tables",
        icon: "fas fa-th icon-color",
        component: Tables,
        layout: "/admin"
    },
    {
        path: "/settledbills",
        name: "Settled Bills",
        icon: "fas fa-list-alt icon-color",
        component: SettledBills,
        layout: "/admin",
    },
    {
        path: "/category",
        name: "Categories",
        icon: "fas fa-list-alt icon-color",
        component: Category,
        layout: "/admin",
    },
    {
        path: "/subcategory",
        name: "Sub Categories",
        icon: "fas fa-code-branch icon-color",
        component: SubCategory,
        layout: "/admin",
    },
    {
        path: "/menu",
        name: "Menu",
        icon: "fas fa-utensils icon-color",
        component: Menu,
        layout: "/admin",
    },
    {
        path: "/addmenu",
        name: "Add Menu",
        isMenuItem: false,
        icon: "fas fa-utensils icon-color",
        component: AddMenu,
        layout: "/admin"
    },
    {
        path: "/order",
        name: "Order",
        icon: "fas fa-list icon-color",
        component: Order,
        isMenuItem: false,
        layout: "/admin"
    },
    {
        path: "/dailysalereport",
        name: "Daily Sale Report",
        icon: "fas fa-list-alt icon-color",
        component: DailySaleReport,
        layout: "/admin",
    },
];
export default routes;
