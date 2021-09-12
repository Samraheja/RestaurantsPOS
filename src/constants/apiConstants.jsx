export const GlobalConstants = {
    API_BASE_URL: "https://localhost:5000/api/POS",
    ACCESS_TOKEN_NAME: 'login_access_token',
    EXPIRY_DATE_NAME: 'ExpiryDate',
    REFRESH_TOKEN_NAME: 'RefreshToken',
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
    CustomerRegistered: "Customer has been registered successfully"
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
    ValidDigits: "Value must be greater than 0"
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
    searchValue: ""
}

export const SubCategoryDefaults = {
    pageNo: 1,
    sortBy: "Id",
    order: "desc",
    searchValue: ""
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
    name: "",
    tablePrice: 0,
    takeAwayPrice: 0,
    deliveryPrice: 0,
    description: "",
    gst: 0,
    isVeg: true,
    menuPic: "",
    buttonText: "Save",
    errorMessages: {}
}

export const AddCoverDefaults = {
    billId: 0,
    cover: "",
    tableNumber: 0,
    errorMessages: {}
}

export const AutoCompleteDefaults = {
    itemId: 0,
    searchItem: "",
    quantity: "",
    price: 0.00,
    filteredMenu: [],
    suggestionBoxClass: "autoCompleteItemBox",
    errorMessages: {}
}

export const OrdersDefault = {
    billId: 0,
    discount: "",
    discountAmount: 0,
    netAmount: 0,
    paymentMode: "Cash"
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