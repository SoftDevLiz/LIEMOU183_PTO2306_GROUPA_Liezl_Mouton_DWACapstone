import "../styles/components.css";
import LoginModal from "./LoginModal"
import { useState } from "react"


const Hero: React.FC<{}> = () => {
    const [modalToggle, setModalToggle] = useState(false)
    console.log("comp rendered")

    const openModal = () => {
        setModalToggle(true);
    }

    return (
        <header>
            <div className="hero">
                <img 
                    className="hero--logo" 
                    src="./src/assets/logodark.png" 
                    alt="Podify logo"
                />
                <h1 className="hero--tagline">Discover, Listen, Connect</h1>
                <button 
                    className="hero--button"
                    onClick={openModal}
                >Login</button>
                {modalToggle && (
                    <LoginModal />
                )}
            </div>
        </header>
    )
}

export default Hero;