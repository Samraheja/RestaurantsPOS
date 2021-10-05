import { combineReducers } from "redux";
import login from "./login";
import alert from "./alert";
import profile from "./profile";
import category from "./category";
import modal from "./modal";
import subCategory from "./subCategory";
import menu from "./menu";
import tables from "./tables";
import mostOrdered from "./mostOrdered";
import order from "./order";
import customer from "./customer";
import settleBill from "./settleBill";

export default combineReducers({
    login,
    alert,
    profile,
    category,
    modal,
    subCategory,
    menu,
    tables,
    mostOrdered,
    order,
    customer,
    settleBill
});