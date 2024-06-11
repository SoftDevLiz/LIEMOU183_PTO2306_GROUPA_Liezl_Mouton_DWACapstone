import { useState, useEffect } from "react";
import supabase from "../../supabaseConfig";
import "../../styles/components.css";

const ShareButton: React.FC<{}> = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const userId = user.id;
            setUserId(userId);
        }
    }
    fetchUser();
    }, []); 

    const copyShareableLink = () => {
        navigator.clipboard.writeText(`https://main--podifyproject.netlify.app/favourites/${userId}`).then(() => {
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
