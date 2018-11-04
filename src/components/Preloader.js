import React from 'react';

const Preloader = (props) => {
    let classNames = '';
    if(props.hide){
        classNames = "loaderCover hideLoader";
    }
    else{
        classNames = "loaderCover";
    }
    return (
        <div className={classNames}>
            <div className="loader">
                Wait...
                <span></span>
            </div>
        </div>
    )
}

export default Preloader;