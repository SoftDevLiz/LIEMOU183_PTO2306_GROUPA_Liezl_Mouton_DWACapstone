import "../styles/components.css";
import { useState } from "react";

const Login: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
        <button className="hero--button" onClick={toggleModal}>Login</button>
        {isOpen && (
        <div className="modal--box">
            <div className="modal--content">
                <button className="modal--exit" onClick={toggleModal}></button>
                <h1 className="modal--header">Welcome back!</h1>
                <form className="login--form">
                    <input placeholder="Email"></input>
                    <input placeholder="Password"></input>
                    <input type="submit"></input>
                </form>
            </div>
        </div>
        )}
        </>
    )
}

export default Login;