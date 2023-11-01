import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../Contexts/UserContext';
import './style.css';
import './mobile-style.css';
import { NavList, NavSearch } from './components';
import NavUserLink from './components/NavUserLink';

export default function Nav(props) {
  const { userState } = useContext(UserContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <div className="header-icon-logo">
        <Link to="/" className="main-nav__logo brand-name">StreamGood</Link> 
      </div>

      <div className="navigation-menu navigation-menu-center">
        <NavList 
          userAuth={userState.isAuth}
          isNavExpanded={true}
          setIsNavExpanded={setIsNavExpanded}
        />
      </div>
      
      <div className="navigation-menu navigation-menu-right">
        <NavUserLink
          userAuth={userState.isAuth}
          isNavExpanded={isNavExpanded}
          setIsNavExpanded={setIsNavExpanded}
          username={userState.user.username}
        />
        <NavSearch />
      </div>
    </nav>
  );
}
  