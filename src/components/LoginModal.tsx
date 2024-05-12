import "../styles/components.css";

const LoginModal: React.FC<{}> = () => {
    return (
        <div className="modal--box">
            <div className="modal--content">
                <h1 className="modal--header">Welcome back!</h1>
                <form className="login--form">
                    <input placeholder="Email"></input>
                    <input placeholder="Password"></input>
                    <input type="submit"></input>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;