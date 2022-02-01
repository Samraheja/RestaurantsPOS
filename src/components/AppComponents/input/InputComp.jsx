import React from 'react';
import {Input} from 'reactstrap';

const InputComp = (props) => {
    const {
        type, error, min, checked, max,
        maxLength, onKeyPress, autoFocus, id, value, onChange, className, disabled, placeholder
    } = props;
    return (
        <>
            {
                (type !== "checkbox" && type !== "number") ?
                    <Input
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        className={className}
                        onChange={onChange}
                        disabled={disabled}
                        onKeyPress={onKeyPress}
                        autoFocus={autoFocus}
                    />
                    :
                    (type === "number" ?
                        <Input
                            type={type}
                            id={id}
                            placeholder={placeholder}
                            min={min}
                            max={max}
                            maxLength={maxLength}
                            value={value}
                            className={className}
                            onChange={onChange}
                            disabled={disabled}
                            onKeyPress={onKeyPress}
                            autoFocus={autoFocus}
                        />
                        :
                        <Input
                            type={type}
                            id={id}
                            className={className}
                            placeholder={placeholder}
                            checked={checked}
                            onChange={onChange}
                            onKeyPress={onKeyPress}
                            autoFocus={autoFocus}
                        />)
            }
            {error &&
            <div className="w-100 pl-3">
                    <span className="text-red error">
                        {error}
                    </span>
            </div>
            }
        </>
    );
}
InputComp.defaultProps = {
    min: 0,
    maxLength: 18,
    max: 1000000000000,
    autoFocus: false,
    onKeyPress: () => {
    },
    disabled: false
}
export default InputComp;