import "../../styles/components.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC<{}> = () => {
    const [accountIsOpen, setAccountIsOpen] = useState<boolean>(false)

    const toggleModal = () => {
        setAccountIsOpen(!accountIsOpen)
    }

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <>
        <header className="headerWithBack">
            <button className="headerWithBack--back" onClick={handleBack}></button>
            <button className="headerWithBack--account" onClick={toggleModal}></button>
        </header>
        {accountIsOpen && (
            <div className="user--menu">
                <h1>Favourites Library</h1>
                <h1>Clear history</h1>
            </div>
        )}
        </>

    )
}

export default Header;