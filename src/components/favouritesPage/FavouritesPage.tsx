import "../../styles/components.css";
import Header from "./Header";
import FavouritesNavbar from "./FavouritesNavbar";
import FavouritesDashboard from "./FavouritesDashboard";

const FavouritesPage: React.FC = () => {

 return (
   <>
    <Header />
    <FavouritesNavbar />
    <FavouritesDashboard />
   </>
 )   
};

export default FavouritesPage;