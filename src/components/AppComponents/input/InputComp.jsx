import React from 'react';
import { Input } from 'reactstrap';

const InputComp = (props) => {
    return (
        <>
            {
                props.type && props.type !== "checkbox" && props.type !== "number" ?
                    <Input
                        type={props.type}
                        id={props.id}
                        placeholder={props.placeholder}
                        value={props.value}
                        className={props.className}
                        onChange={props.onChange}
                        disabled={props.disabled ?? false}
                    />
                    :
                    props.type === "number" ?
                        <Input
                            type={props.type}
                            id={props.id}
                            placeholder={props.placeholder}
                            min={props.min ?? 0}
                            max={props.max ?? 1000000000000}
                            maxLength={props.maxLength ?? 18}
                            value={props.value}
                            className={props.className}
                            onChange={props.onChange}
                            disabled={props.disabled ?? false}
                        />
                        :
                        <Input
                            type={props.type}
                            id={props.id}
                            className={props.className}
                            placeholder={props.placeholder}
                            checked={props.checked}
                            onChange={props.onChange}
                        />
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

export default InputComp;