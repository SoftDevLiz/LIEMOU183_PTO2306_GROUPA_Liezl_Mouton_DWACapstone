import "../../styles/components.css";
import Login from "./Login";

const Hero: React.FC<{}> = () => {


    return (
        <>
            <div className="hero">
                <img 
                    className="hero--logo" 
                    src="https://66633fd0d8028b00a07a1e45--podifyproject.netlify.app/src/assets/Podlogowhite.png"
                    alt="Podify logo"
                />
                <h1 className="hero--tagline">Discover, Listen, Connect</h1>
                <Login />
            </div>
        </>
    )
}

export default Hero;