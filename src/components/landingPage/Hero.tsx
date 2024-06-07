import "../../styles/components.css";
import Login from "./Login";

const Hero: React.FC<{}> = () => {


    return (
        <>
            <div className="hero">
                <img 
                    className="hero--logo" 
                    src="../../src/assets/icons/logolight.png"
                    alt="Podify logo"
                />
                <h1 className="hero--tagline">Discover, Listen, Connect</h1>
                <Login />
            </div>
        </>
    )
}

export default Hero;