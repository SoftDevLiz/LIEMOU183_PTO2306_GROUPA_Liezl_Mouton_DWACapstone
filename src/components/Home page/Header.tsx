import "../../styles/components.css"
import { useState } from "react";

const Header: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
        <header className="loggedIn--header">
            <img src="./src/assets/logodark.png"  />
            <button className="user--account" onClick={toggleModal}></button>
        </header>
        {isOpen && (
            <div className="user--menu">
                <h1>Favourites Library</h1>
                <h1>Clear history</h1>
            </div>
        )}
        </>

    )
}

export default Header;