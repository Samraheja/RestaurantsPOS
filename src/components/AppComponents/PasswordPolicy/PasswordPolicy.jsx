import React, { useState } from 'react';
import "./PasswordPolicy.css";
import {
    Tooltip
} from "reactstrap";

const PasswordPolicy = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div className="text-muted font-italic">
            <small>
                Password policy:{" "}
                <span className="text-success font-weight-700 pointer">
                    <span id="PasswordPolicy">Check here</span>
                </span>
                <Tooltip placement="right" isOpen={tooltipOpen} target="PasswordPolicy" toggle={toggle}>
                    Your password must:
                    <ul>
                        <li>
                            be minimum 8 character long.
                      </li>
                        <li>
                            have at least one uppercase letter.
                      </li>
                        <li>
                            have at least one lowercase letter.
                      </li>
                        <li>
                            have at least one special character.
                      </li>
                        <li>
                            have at least one number.
                      </li>
                    </ul>
                </Tooltip>
            </small>
        </div>
    );
}

export default PasswordPolicy;