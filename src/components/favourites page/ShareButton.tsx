import React, { useState } from "react";
import "../../styles/components.css";

const ShareButton: React.FC<{}> = () => {
    const [showPopup, setShowPopup] = useState(false);

    const copyShareableLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 1000);
        });
    };

    return (
        <>
            <button className="share--button" onClick={copyShareableLink}></button>
            {showPopup && (
                <div className="popup">Link copied</div>
            )}
        </>
    );
};

export default ShareButton;
