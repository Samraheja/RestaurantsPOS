import React from "react";
import "./Loader.css";
import Loading from "../../../assets/img/theme/Loading2.gif";

const Loader = (props) => {

    return (
        <div className="Loader">
            <img
                src={Loading}
                className="imgLoading"
                alt="Loading"
            />
        </div>
    );
};

export default Loader;