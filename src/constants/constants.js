import moment from 'moment';

export const GlobalConstants = {
    //API_BASE_URL: "https://localhost:44375/api/POS",
    API_BASE_URL: "http://164.52.216.130/restaurants/api/POS",
    ACCESS_TOKEN_NAME: 'login_access_token',
    EXPIRY_DATE_NAME: 'ExpiryDate',
    REFRESH_TOKEN_NAME: 'RefreshToken',
    FORGOT_PASSWORD_LINK: "http://164.52.216.130/auth/reset-password",
    Limit: 10
}

export const SuccessMessages = {
    Login: "Login successful. Redirecting to home page",
    Register: "Registration successful. Redirecting to login page",
    ForogtPassword: "An email has been sent to your registered email id to reset your password",
    ResetPassword: "Your password has been successfully reset. Please login with new password. Redirecting to login page",
    ProfileUpdated: "Your profile has been successfully updated",
    ProfilePicUpdated: "Your profile pic has been successfully updated",
    CategorySaved: "Category has been successfully saved",
    CategoryUpdated: "Category has been successfully updated",
    CategoryDeleted: "Category has been successfully deleted",
    SubCategorySaved: "Sub category has been successfully saved",
    SubCategoryUpdated: "Sub category has been successfully updated",
    SubCategoryDeleted: "Sub category has been successfully deleted",
    MenuSaved: "Menu item has been successfully saved",
    MenuPicUpdated: "Menu item pic has been successfully updated",
    MenuUpdated: "Menu item has been successfully updated",
    MenuDeleted: "Menu item has been successfully deleted",
    ItemAdded: "Item Added",
    OrderCompleted: "Order has been completed successfully",
    OrderVoided: "Order has been cleared successfully",
    CustomerRegistered: "Customer has been registered successfully",
    DayOpened: "Restaurant is open for the day now",
    DayClosed: "Restaurant is close for the day now",
    BillSettled: "Bill has been successfully settled"
}

export const ErrorMessages = {
    NetworkError: "Unable to connect to server. Please check network connectivity",
    EmailPwdError: "Email or password is incorrect",
    EmailNoExist: "Email does not exists",
    EmailIdNoExist: "Email id you have entered is incorrect",
    CommonError: "Unable to process your request. Please try after some time",
    NameRequired: "Please enter name",
    EmailPwdRequired: "Please enter email and password",
    EmailRequired: "Please enter email",
    PasswordRequired: "Please enter password",
    ConfirmPasswordRequired: "Please enter confirm password",
    MobileRequired: "Please enter mobile number",
    PwdConfirmPwd: "Confirm password must be same as password",
    AcceptTerms: "Please accept our terms and condition",
    ValidName: "Please enter a valid name",
    ValidAlphanumeric: "Please enter a valid value",
    ValidAlphabets: "Please enter a valid value",
    ValidEmail: "Please enter a valid email",
    ValidMobileNumber: "Please enter a valid mobile Number",
    DigitsOnly: "Please enter digits only",
    ValidPassword: "Please enter a valid password. Please check password policy for details",
    ValidTableRange: "Number of tables must be in between 1 and 50",
    ValidZipCode: "Zip code must be 5 or 6 digits long",
    ValidWebsiteUrl: "Please enter a valid website url",
    CategoryRequired: "Please enter category name",
    CategorySelectionRequired: "Please select category",
    SubCategoryRequired: "Please enter sub category name",
    SubCategorySelectionRequired: "Please select sub category",
    ItemCodeRequired: "Please enter item code",
    MenuNameRequired: "Please enter menu name",
    TablePriceRequired: "Please enter table price",
    TakeAwayPriceRequired: "Please enter take away price",
    DeliveryPriceRequired: "Please enter delivery price",
    GSTRequired: "Please enter applicable GST",
    DescriptionRequired: "Please enter description",
    ValidPrice: "Price must be greater than 0",
    ValidGST: "Please enter a valid GST value",
    SelectCustomer: "Please select customer",
    QuantityRequired: "Quantity",
    ValidQuantity: "Not valid",
    CoverRequired: "Please enter cover value",
    ValidDigits: "Value must be greater than 0",
    NotOpenned: "Can not close restaurant without opening for the day",
    AlreadyOpened: "Restaurant is already opened",
    AlreadyClosed: "Restaurant is already closed",
    UnsettledBills: "Can not close restaurant. Please settle unsettled bills",
    PreviousOpened: "Can not open restaurant, due to previous day's unsettled bills",
    PaymentModeRequired: "Please select Payment Mode",
    TransactionRequired: "Please enter transaction number",
    AmountRequired: "Please enter amount",
    ValidAmount: "Amount must be greater than 0",
    NotSettled: "Unable to settle bill",
    AddPayment: "Please add payment details",
    AmountCheck: "Settlement amount can not be less than bill amount",
    CheckValidMenuItem: "Please select valid menu item"
}

export const AlertTypes = {
    Success: "success",
    Info: "info",
    Warning: "warning",
    Danger: "danger"
}

export const ImageTypes = {
    ProfilePic: "ProfilePics",
    MenuPic: "MenuPics"
}

export const CategoryDefaults = {
    pageNo: 1,
    sortBy: "Id",
    order: "desc",
    searchValue: "",
    isAddCategoryActive: false
}

export const SubCategoryDefaults = {
    pageNo: 1,
    sortBy: "Id",
    order: "desc",
    searchValue: "",
    isAddSubCategoryActive: false
}

export const AddSubCategoryDefaults = {
    id: 0,
    categoryId: 0,
    category: "",
    subCategory: "",
    buttonText: "Save",
    errorMessages: {}
}

export const MenuDefaults = {
    pageNo: 1,
    sortBy: "Id",
    order: "desc",
    searchValue: "",
    editMenu: {}
}

export const AddMenuDefaults = {
    id: 0,
    categoryId: 0,
    subCategoryId: 0,
    itemCode: "",
    name: "",
    tablePrice: 0,
    takeAwayPrice: 0,
    deliveryPrice: 0,
    description: "",
    gst: 0,
    isVeg: true,
    isDiscountApplicable: false,
    menuPic: "",
    buttonText: "Save",
    errorMessages: {}
}

export const TablesDefaults = {
    billId: 0,
    tableNumber: 0,
    orderType: "Dine-in",
    showCover: false,
    showSettleBill: false,
    isOpenForDayActive: false
}

export const AddCoverDefaults = {
    billId: 0,
    cover: "",
    tableNumber: 0,
    errorMessages: {}
}

export const AutoCompleteDefaults = {
    itemId: undefined,
    searchItem: "",
    quantity: undefined,
    price: 0.00,
    filteredMenu: [],
    suggestionBoxClass: "autoCompleteItemBox",
    errorMessages: {}
}

export const MostOrderedDefaults = {
    subCategoryId: 0
}

export const OrdersDefault = {
    billId: 0,
    discount: "",
    discountAmount: 0,
    netAmount: 0,
    buttonText: "Print KOT"
}

export const CustomerSummaryDefault = {
    mobileNumber: "",
    errorMessages: {}
}

export const AddCustomerDefault = {
    id: 0,
    name: "",
    email: "",
    mobileNumber: "",
    phoneNumber: "",
    address: "",
    city: "",
    states: "",
    zipCode: "",
    errorMessages: {}
}

export const BillSettlementDefaults = {
    billId: 0,
    vendorId: 0,
    vendor: "",
    paymentModeId: 0,
    paymentMode: "",
    transactionNumber: "",
    amount: 0,
    tenderedAmount: 0.00,
    remainingAmount: 0.00,
    returnToCustomer: 0.00,
    errorMessages: {},
    paymentDetails: []
}
export const SettledBillsDefaults = {
    pageNo: 1,
    sortBy: "BillDate",
    order: "asc",
    billDate: moment(new Date()).format('YYYY-MM-DD'),
    billId: 0,
    showSettleBill: false
}

export const Months = [
    {
        "name": "January",
        "value": 1
    },
    {
        "name": "February",
        "value": 2
    },
    {
        "name": "March",
        "value": 3
    },
    {
        "name": "April",
        "value": 4
    },
    {
        "name": "May",
        "value": 5
    },
    {
        "name": "June",
        "value": 6
    },
    {
        "name": "July",
        "value": 7
    },
    {
        "name": "August",
        "value": 8
    },
    {
        "name": "September",
        "value": 9
    },
    {
        "name": "October",
        "value": 10
    },
    {
        "name": "November",
        "value": 11
    },
    {
        "name": "December",
        "value": 12
    }
]

export const Years = () => {
    const year = [];
    for (let i = new Date().getFullYear(); i >= 2021; i--) {
        year.push({
            "text": i,
            "value": i
        });
    }
    ;
    return year;
};


export const DailySaleReportDefaults = {
    pageNo: 1,
    sortBy: "Id",
    order: "desc",
    searchValue: "",
    month: (new Date().getMonth() + 1),
    year: new Date().getFullYear()
}