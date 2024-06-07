import "../../styles/components.css";
import Login from "./Login";
import logoLight from "../../assets/icons/logolight.png"

const Hero: React.FC<{}> = () => {


    return (
        <>
            <div className="hero">
                <img 
                    className="hero--logo" 
                    src={logoLight}
                    alt="Podify logo"
                />
                <h1 className="hero--tagline">Discover, Listen, Connect</h1>
                <Login />
            </div>
        </>
    )
}

export default Hero;