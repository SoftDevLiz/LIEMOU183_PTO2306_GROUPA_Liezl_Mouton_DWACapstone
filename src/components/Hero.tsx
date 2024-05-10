import "../styles/components.css";
import { Button } from '@mui/base/Button';


export default function Hero() {
    return (
        <header className="heroContainer">
            <img className="heroLogo" src="./src/assets/logodark.png" />
            <h1 className="tagline">Discover, Listen, Connect</h1>
            <Button className="loginBtn">Login</Button>
        </header>
    )
}