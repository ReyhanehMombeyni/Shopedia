import { NavLink } from "react-router-dom";

const Link = ({ address, text }) => {
  return <NavLink to={address} className={({isActive}) => isActive ? "text-[#F06908]" : "text-black"}>{text}</NavLink>;
};

export default Link;
