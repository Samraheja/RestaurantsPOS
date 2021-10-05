import React from 'react';
import { Input } from 'reactstrap';

const SelectComp = (props) => {
    return (
        <>
            {
                <select
                    id={props.id}
                    className={props.className}
                    onChange={props.onChange}
                    disabled={props.disabled ?? false}
                >
                    {props.showDefault && <option value="">Select</option>}
                    {
                        props.options.map((option, key) => <option
                            value={option.value}
                            selected={props.value === option.value ? true : false}
                        >
                            {option.text}
                        </option>)
                    }
                </select>
            }
            {
                props.error &&
                <div className="w-100 pl-3">
                    <span className="text-red error">
                        {props.error}
                    </span>
                </div>
            }
        </>
    );
}

export default SelectComp;