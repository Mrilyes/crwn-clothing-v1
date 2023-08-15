// import CategoryItem from './components/category-item/category-item.component';


// outlet is where the code that we want to render should come out from and used inside the component 
import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";

const Home = () => {
  
  return (
    <div>
      <Directory/>
      <Outlet />
    </div>
  );
};

export default Home;