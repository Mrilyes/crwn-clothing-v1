// for 
import { Fragment } from "react";

// link same as encre tag
import { Outlet , Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/083 crown.svg";

import './navigation.styles.scss'

const Navigation = () => {
    return (
        
      <Fragment>

        <div className="navigation">

            <Link className="logo-container" to='/'>
                <CrwnLogo/>
            </Link>

            <div className="nav-links-container">
                <Link className="nav-links" to='/shop'>
                    SHOP
                </Link>
            </div>

        </div>

        <Outlet/>

      </Fragment>
    );
  };

  export default Navigation;