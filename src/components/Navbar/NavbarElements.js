import { FaBars } from 'react-icons/fa';
import { NavLink as Link} from "react-router-dom";
import styled from 'styled-components';

export const Nav = styled.nav`
    text-align: center;
    background: orange;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;
export const NavLink = styled(Link)`
    color: white;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
      color: #808080;
    }
    &:hover {
      color: #808080;
    }
`;
export const Title = styled.h1`
    color: white;
    font-size: 25px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    margin-left: -65px;
    margin-bottom: 6px;
`
export const Bars = styled(FaBars) `
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 75%);
      font-size: 1.8rem;
      cursor: pointer;
    }
`;
export const NavMenu = styled.div `
    display: flex;
    align-items: center;
    margin-right: -24px;
    font-weight: bold;
    @media screen and (max-width: 768px) {
      display: none;
    }
`;
export const NavButton = styled.nav `
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-right: 24px;
    @media screen and (max-width: 768px) {
      display: none;
    }
`;
export const NavButtonLink = styled(Link) `
    border-radius: 4px;
    background: white;
    padding: 10px 22px;
    color: orange;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: #808080;
      color: white;
    }
`;
export const NavButtonLink2 = styled(Link) `
    border-radius: 4px;
    background: orange;
    padding: 10px 22px;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    align-items: center;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: darkorange;
      color: white;
    }
`;