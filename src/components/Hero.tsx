import "../styles/components.css";
import { Button } from '@mui/base/Button';
import LoginModal from "./LoginModal"
import { useState } from "react"


const Hero: React.FC<{}> = () => {
    const [modalToggle, setModalToggle] = useState(false)
    console.log("comp rendered")

    const handleLogin = () => {
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
                <Button 
                    className="hero--button"
                    onClick={handleLogin}
                >Login</Button>
                {modalToggle && (
                    <LoginModal />
                )}
            </div>
        </header>
    )
}

export default Hero;