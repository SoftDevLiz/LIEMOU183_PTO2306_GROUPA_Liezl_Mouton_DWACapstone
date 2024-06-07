import "../../styles/components.css"
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../supabaseConfig";

const Header: React.FC<{}> = () => {
    const [accountIsOpen, setAccountIsOpen] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>("");

    const toggleModal = () => {
        setAccountIsOpen(!accountIsOpen)
    }

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchUser = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            setUserId(user.id);
          }
        }

        fetchUser();

    }, []);

    const clearListeningHistory = async () => {
        const { data, error } = await supabase
        .from('watch_history')
        .delete()
        .eq('user_id', userId); 

        if (error) {
            console.error('Error deleting user history:', error);
        } else {
            console.log('User history cleared:', data);
        }
    }

    return (
        <>
        <header className="headerWithBack">
            <button className="headerWithBack--back" onClick={handleBack}></button>
            <button className="headerWithBack--account" onClick={toggleModal}></button>
        </header>
        {accountIsOpen && (
            <div className="user--menu">
                <Link to={'/favourites'}>Favourites</Link>
                <div className="delete--history--wrapper">
                    <button onClick={clearListeningHistory} className="delete--history--button">Clear listening history</button>
                </div>
            </div>
        )}
        </>

    )
}

export default Header;