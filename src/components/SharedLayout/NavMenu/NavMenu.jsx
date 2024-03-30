import React from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import { NavMenuList, NavigationLink } from "./NavMenu.styled";

const NavMenu = () => {
  return (
    <div>
      <NavMenuList>
        <li>
          <NavigationLink to={"/home"}>Home</NavigationLink>
        </li>
        <li>
          <NavigationLink to={"/teachers"}>Teachers</NavigationLink>
        </li>
        <li>
          <NavigationLink to={"/favorites"}>Favorites</NavigationLink>
        </li>
        <li>
          <ColorPicker />
        </li>
      </NavMenuList>
    </div>
  );
};

export default NavMenu;
