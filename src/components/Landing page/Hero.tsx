import "../../styles/components.css";
import Login from "./Login";

const Hero: React.FC<{}> = () => {


    return (
        <header>
            <div className="hero">
                <img 
                    className="hero--logo" 
                    src="./src/assets/logodark.png" 
                    alt="Podify logo"
                />
                <h1 className="hero--tagline">Discover, Listen, Connect</h1>
                <Login />
            </div>
        </header>
    )
}

export default Hero;