import react from "react";

const ImageComp = (props) => {
    return (
        <div>
            <div>
                
            </div>
            <img
                id={props.id}
                src={props.src}
                alt=""
            />
        </div>
    );
};

export default ImageComp;