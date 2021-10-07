import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import routes from "../routes.js";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import Sidebar from "../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux-store/actions/login";
import { getDailySaleDetails, getUserProfile, updateDayOpenCloseStatus } from "../redux-store/actions/profile";
import { openCloseDay } from "../redux-store/actions/openCloseDay";
import ShowAlert from "../components/AppComponents/Alerts/ShowAlert";
import Loader from "../components/AppComponents/Loader/Loader";
import { ErrorMessages, SuccessMessages } from "../constants/apiConstants.jsx";
import { addAlert } from "../redux-store/actions/alert.js";

const Admin = (props) => {
  const dispatch = useDispatch();

  const { userDetails, saleDetails } = useSelector(state => state.profile);
  const { alertType, message } = useSelector(state => state.alert);
  const { isLoading } = useSelector(state => state.profile);

  useEffect(() => {
    const payload = {
      CollectionName: "Restaurants"
    }

    dispatch(getUserProfile({
      params: payload,
      dispatch
    }));

    const payloadSale = {
      CollectionName: "DailySales"
    }

    dispatch(getDailySaleDetails({
      params: payloadSale,
      dispatch
    }));
  }, []);

  const openOrCloseDay = (operation) => {
    const payload = {
      "CollectionName": "DailyOpening",
      "Operation": operation
    }

    const successMessage = operation == "Open" ? SuccessMessages.DayOpened : SuccessMessages.DayClosed;

    const onSuccess = (response) => {
      const result = response.data;
      var alertType = "Danger";
      var message = "";

      if (result === 1) {
        alertType = "Success";
        message = successMessage;

        const status = operation == "Open" ? true : false;

        dispatch(updateDayOpenCloseStatus({
          status
        }));
      }
      else if (result === 0) {
        message = ErrorMessages.CommonError;
      }
      else if (result === -1) {
        message = ErrorMessages.NotOpenned;
      }
      else if (result === -2) {
        message = ErrorMessages.AlreadyOpened;
      }
      else if (result === -3) {
        message = ErrorMessages.AlreadyClosed;
      }
      else if (result === -4) {
        message = ErrorMessages.UnsettledBills;
      }

      dispatch(addAlert({
        alertType,
        message
      }));

      props.history.push("/admin/tables")
    };

    dispatch(openCloseDay({
      params: payload,
      onSuccess,
      dispatch
    }));
  }

  const Logout = () => {
    const onSuccess = (response) => {
      props.history.push('/auth/login');
    }

    dispatch(logoutUser({
      onSuccess,
      dispatch
    }));
  }

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const Loading = (isLoading || Object.keys(userDetails).length === 0)

  if (Loading) {
    return <Loader />
  }
  else {
    return (
      <>
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/Logo.png").default,
            imgAlt: "...",
            profilePic: userDetails.profilePic
          }}
        />
        <div className="main-content">
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            Logout={Logout}
            profilePic={userDetails.profilePic}
            name={userDetails.name}
            openOrCloseDay={openOrCloseDay}
            daySale={saleDetails.daySale}
            unsettled={saleDetails.unsettledAmount}
          />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>

        {
          message &&
          alertType &&
          <ShowAlert
            message={message}
            alertType={alertType}
          />
        }
      </>
    )
  }
};

export default Admin;
