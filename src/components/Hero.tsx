import "../styles/components.css";
import { Button } from '@mui/base/Button';


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
                <Button className="hero--button">Login</Button>
            </div>
        </header>
    )
}

export default Hero;