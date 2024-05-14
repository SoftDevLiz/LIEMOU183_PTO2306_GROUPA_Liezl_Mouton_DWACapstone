import "../styles/components.css";
import { useState } from "react";
import supabase from "../utils/supabaseConfig";

const Login: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleLogin = async (email: string) => {
        try {
            const response = await supabase.auth.signInWithOtp({
                email: email
            });

            if (response.error) {
                console.error('Error signing in:', response.error.message);
            } else {
                console.log('User signed in successfully:', response.data);
            }
        } catch (error: any) {
            console.error('Error signing in:', error.message);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.currentTarget.email as HTMLInputElement).value;
        handleLogin(email);
    }

    return (
        <>
            <button className="hero--button" onClick={toggleModal}>Login</button>
            {isOpen && (
                <div className="modal--box">
                    <div className="modal--content">
                        <button className="modal--exit" onClick={toggleModal}></button>
                        <h1 className="modal--header">Welcome back!</h1>
                        <form className="login--form" onSubmit={handleSubmit}>
                            <input name="email" placeholder="Email"></input>
                            <input type="submit"></input>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login;
