import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileComp from "../../components/Profile/Profile";
import { ErrorMessages, SuccessMessages, ImageTypes } from "../../constants/apiConstants";
import { updateUserProfile, updateUserProfilePic } from "../../redux-store/actions/profile";
import {
    doesHaveValue,
    isDigitsOnly,
    isValidAlphabets,
    isValidAlphaNumeric,
    isValidMobileNumber,
    isValidTableRange,
    isValidWebsiteUrl,
    isValidZipCode
} from "../../utils/functions";

const Profile = (props) => {
    const [state, setState] = useState({
        id: 0,
        restaurantName: "",
        noOfTables: 0,
        dayOpenTime: "",
        email: "",
        mobileNumber: "",
        phoneNumber: "",
        website: "",
        GSTIN: "",
        address: "",
        city: "",
        states: "",
        zipCode: "",
        profilePic: "",
        createdDate: "",
        subscriptionStatus: "",
        startDate: "",
        endDate: "",
        dueDate: "",
        paymentStatus: false,
        errorMessages: {}
    });

    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.profile);

    const inputProfilePic = useRef(null);

    const setUserDetails = () => {
        setState(prevState => ({
            ...prevState,
            id: userDetails.id,
            restaurantName: userDetails.name,
            noOfTables: userDetails.noOfTables,
            dayOpenTime: getOpenDate(userDetails.dayOpenTime),
            email: userDetails.emailID,
            mobileNumber: userDetails.mobileNumber,
            phoneNumber: userDetails.phoneNumber,
            website: userDetails.website,
            GSTIN: userDetails.gstin,
            address: userDetails.address,
            city: userDetails.city,
            states: userDetails.state,
            zipCode: userDetails.zipCode,
            profilePic: userDetails.profilePic,
            createdDate: userDetails.createdDate,
            subscriptionStatus: userDetails.subscriptionStatus,
            startDate: userDetails.startDate,
            endDate: userDetails.endDate,
            dueDate: userDetails.dueDate,
            paymentStatus: userDetails.paymentStatus
        }));
    }

    useEffect(() => {
        setUserDetails();
    }, [userDetails]);

    const getDate = (date) => {
        var register = new Date(date);

        var day = register.getDate();
        var month = register.getMonth() + 1;
        var year = register.getFullYear();

        var formatedDate = day + "/" + month + "/" + year;
        return formatedDate;
    }

    const getOpenDate = (dayOpenTime) => {
        var time = dayOpenTime.split(':');
        var hour = time[0];
        var minutes = time[1];

        if(hour.length < 2) {
            hour = "0" + hour;
        }

        if(minutes.length < 2) {
            minutes = "0" + minutes;
        }

        var formatTime = hour + ":" + minutes + ":00";
        return formatTime;
    }

    const onChange = (e) => {
        const { id, value } = e.target;
        const finalErrorMessages = validate(id, value);

        setState(prevState => ({
            ...prevState,
            [id]: value,
            errorMessages: {
                ...prevState.errorMessages,
                [id]: finalErrorMessages[id]
            }
        }));
    }

    const validate = (id, value) => {
        const finalErrorMessages = {}

        const noOfTables = id && id === "noOfTables" ? value : state.noOfTables;
        const dayOpenTime = id && id === "dayOpenTime" ? value : state.dayOpenTime;
        const phoneNumber = id && id === "phoneNumber" ? value : state.phoneNumber;
        const website = id && id === "website" ? value : state.website;
        const GSTIN = id && id === "GSTIN" ? value : state.GSTIN;
        const address = id && id === "address" ? value : state.address;
        const city = id && id === "city" ? value : state.city;
        const states = id && id === "states" ? value : state.states;
        const zipCode = id && id === "zipCode" ? value : state.zipCode;

        if (!isDigitsOnly(noOfTables)) {
            finalErrorMessages.noOfTables = ErrorMessages.DigitsOnly;
        }
        else if (!isValidTableRange(noOfTables)) {
            finalErrorMessages.noOfTables = ErrorMessages.ValidTableRange;
        }

        if (doesHaveValue(phoneNumber)) {
            if (!isDigitsOnly(phoneNumber)) {
                finalErrorMessages.phoneNumber = ErrorMessages.DigitsOnly;
            }
            else if (!isValidMobileNumber(phoneNumber)) {
                finalErrorMessages.phoneNumber = ErrorMessages.ValidMobileNumber;
            }
        }

        if (doesHaveValue(website)) {
            if (!isValidWebsiteUrl(website)) {
                finalErrorMessages.website = ErrorMessages.ValidWebsiteUrl;
            }
        }

        if (doesHaveValue(GSTIN)) {
            if (!isValidAlphaNumeric(GSTIN)) {
                finalErrorMessages.GSTIN = ErrorMessages.ValidAlphanumeric;
            }
        }

        if (doesHaveValue(address)) {
            if (!isValidAlphaNumeric(address)) {
                finalErrorMessages.address = ErrorMessages.ValidAlphanumeric;
            }
        }

        if (doesHaveValue(city)) {
            if (!isValidAlphabets(city)) {
                finalErrorMessages.city = ErrorMessages.ValidAlphabets;
            }
        }

        if (doesHaveValue(states)) {
            if (!isValidAlphabets(states)) {
                finalErrorMessages.states = ErrorMessages.ValidAlphabets;
            }
        }

        if (doesHaveValue(zipCode)) {
            if (!isValidAlphaNumeric(zipCode)) {
                finalErrorMessages.zipCode = ErrorMessages.DigitsOnly;
            }
            else if (!isValidZipCode(zipCode)) {
                finalErrorMessages.zipCode = ErrorMessages.ValidZipCode;
            }
        }

        return finalErrorMessages;
    }

    const onSubmitClick = (e) => {
        e.preventDefault();
        const finalErrorMessages = validate();

        if (Object.keys(finalErrorMessages).length === 0) {
            const payload = {
                CollectionName: "Restaurants",
                Restaurants: {
                    "Id": parseInt(state.id),
                    "Name": state.restaurantName,
                    "NoOfTables": parseInt(state.noOfTables),
                    "DayOpenTimes": state.dayOpenTime,
                    "PhoneNumber": state.phoneNumber,
                    "Website": state.website,
                    "GSTIN": state.GSTIN,
                    "Address": state.address,
                    "City": state.city,
                    "State": state.states,
                    "ZipCode": state.zipCode
                }
            };

            const successMessage = SuccessMessages.ProfileUpdated;

            dispatch(updateUserProfile({
                params: payload,
                successMessage,
                dispatch
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                errorMessages: finalErrorMessages
            }));
        }
    }

    const onEditProfilePic = () => {
        inputProfilePic.current.click();
    }

    const onProfilePicSelect = () => {
        const file = inputProfilePic.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const base64Image = reader.result;

            const payload = {
                "AWSImages": {
                    "ImageType": ImageTypes.ProfilePic,
                    "Image": base64Image.split(",")[1]
                }
            };
            
            const successMessage = SuccessMessages.ProfilePicUpdated;

            dispatch(updateUserProfilePic({
                params: payload,
                successMessage,
                dispatch
            }));
        }
    }

    return (
        <ProfileComp
            restaurantName={state.restaurantName}
            noOfTables={state.noOfTables}
            dayOpenTime={state.dayOpenTime}
            email={state.email}
            mobileNumber={state.mobileNumber}
            phoneNumber={state.phoneNumber}
            website={state.website}
            GSTIN={state.GSTIN}
            address={state.address}
            city={state.city}
            states={state.states}
            zipCode={state.zipCode}
            profilePic={state.profilePic}
            createdDate={state.createdDate}
            subscriptionStatus={state.subscriptionStatus}
            startDate={state.startDate}
            endDate={state.endDate}
            dueDate={state.dueDate}
            paymentStatus={state.paymentStatus}
            errorMessages={state.errorMessages}
            onChange={onChange}
            getDate={getDate}
            onSubmitClick={onSubmitClick}
            inputProfilePic={inputProfilePic}
            onEditProfilePic={onEditProfilePic}
            onProfilePicSelect={onProfilePicSelect}
        />
    );
};

export default Profile;