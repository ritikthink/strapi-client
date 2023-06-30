import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import config from "../../config";
import Icons, { iconMapFunction } from "./../Utilities/Icons/Icons";

const Header = () => {
    const [logoData, setLogoData] = useState([]);
    const [menuItemData, setMenuItemData] = useState([]);
    const [socialIconData, setSocialIconData] = useState([]);
    const [themeData, setThemeData] = useState([]);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light-mode"
    );

    useEffect(() => {
        async function getHeaderData() {
            try {
                const headerAPI = await axios.get(
                    `${config.BACKEND_URL}/api/header?populate[Header][populate]=*`
                );

                setLogoData(headerAPI.data.data.Header.Logo);
                setMenuItemData(headerAPI.data.data.Header.MenuItem);
                setSocialIconData(headerAPI.data.data.Header.SocialIcon);
                setThemeData(headerAPI.data.data.Header.Theme);
            } catch (error) {
                console.error(error);
            }
        }

        getHeaderData();
    }, []);

    const toggleTheme = () => {
        if (theme === "light-mode") {
            setTheme("dark-mode");
        } else {
            setTheme("light-mode");
        }
    };
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = theme;
    }, [theme]);

    return (
        <>
            <header
                className={`bg-white py-2 py-lg-3 transition ${style.header}`}
            >
                <div className="container-fluid">
                    <Navbar expand="lg" className={`py-0 ${style.navbar}`}>
                        <div className={`${style.mobile_nav}`}>
                            <div
                                className={`d-flex flex-wrap d-lg-none ${style.toggle_wrapper}`}
                            >
                                <Navbar.Toggle
                                    aria-controls="navbar-nav"
                                    className={`border-0 position-relative overflow-hidden rounded-0 ${style.navbar_toggler}`}
                                >
                                    <span className="top"></span>
                                    <span className="middle"></span>
                                    <span className="bottom"></span>
                                </Navbar.Toggle>
                            </div>
                            <Link
                                to="/"
                                className={`navbar-brand ${style.logo}`}
                            >
                                <img
                                    src={`${config.BACKEND_URL}${logoData.url}`}
                                    alt={logoData.alternativeText}
                                />
                            </Link>
                            <div
                                className={`d-lg-none ${style.mobile_contact}`}
                            >
                                <Link className="d-table ms-auto" to="/contact">
                                    Contact Me
                                </Link>
                            </div>
                        </div>

                        <Navbar.Collapse
                            id="navbar-nav"
                            className={`${style.navbar_nav}`}
                        >
                            <Nav className={`ms-auto ${style.menu_wrapper}`}>
                                {menuItemData.map((menu, index) => {
                                    return (
                                        <NavLink
                                            key={menu.id}
                                            className={`nav-link ${
                                                menu.MenuLink === "/contact"
                                                    ? "nav-link-contact"
                                                    : ""
                                            }`}
                                            to={menu.MenuLink}
                                        >
                                            {menu.MenuTitle}
                                        </NavLink>
                                    );
                                })}
                            </Nav>
                            <Nav className={`${style.social_icons_wrapper}`}>
                                {socialIconData.map((icon, index) => {
                                    let iconData = iconMapFunction(icon.Icon);
                                    return (
                                        <Link
                                            key={icon.id}
                                            className=""
                                            to={icon.Link}
                                            target="_blank"
                                        >
                                            <Icons
                                                family={iconData}
                                                name={icon.Icon}
                                            />
                                        </Link>
                                    );
                                })}

                                {themeData && themeData.length > 0 ? (
                                    <Link
                                        to="#"
                                        className=""
                                        onClick={toggleTheme}
                                    >
                                        <Icons
                                            family={
                                                theme === "light-mode"
                                                    ? iconMapFunction(
                                                          themeData[0].Icon
                                                      )
                                                    : iconMapFunction(
                                                          themeData[1].Icon
                                                      )
                                            }
                                            name={
                                                theme === "light-mode"
                                                    ? themeData[0].Icon
                                                    : themeData[1].Icon
                                            }
                                        />
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
        </>
    );
};

export default Header;
