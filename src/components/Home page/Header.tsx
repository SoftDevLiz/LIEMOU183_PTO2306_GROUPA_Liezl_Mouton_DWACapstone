import "../styles/components.css"

const Header: React.FC<{}> = () => {
    return (
        <header className="loggedIn--header">
            <img src="./src/assets/logodark.png"  />
            <button className="user--account"></button>
        </header>
    )
}

export default Header;