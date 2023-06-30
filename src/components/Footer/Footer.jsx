import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Card, Nav } from "react-bootstrap";
import Icons, { iconMapFunction } from "./../Utilities/Icons/Icons";
import axios from "axios";
import config from "../../config";
import parser from "html-react-parser";
import { imagePlaceholder } from "./../Utilities/ImagePlaceholder/ImagePlaceholder";
import { postURL } from "../Utilities/PostURL/PostUrl";

const Footer = () => {
    const [topFooterData, setTopFooterData] = useState([]);
    const [aboutFooterData, setAboutFooterData] = useState([]);
    const [quickLinksFooterData, setQuickLinksFooterData] = useState([]);
    const [quickLinksMenuFooterData, setQuickLinksMenuFooterData] = useState(
        []
    );
    const [uxResourcesFooterData, setUxResourcesFooterData] = useState([]);
    const [uxResourcesMenuFooterData, setUxResourcesMenuFooterData] = useState(
        []
    );
    const [articlesFooterData, setarticlesFooterData] = useState([]);

    const [blogFooterData, setBlogFooterData] = useState([]);

    const [bottomFooterData, setBottomFooterData] = useState([]);
    const [bottomFooterMenu, setBottomFooterMenu] = useState([]);

    const [socialIconsFooter, setSocialIconsFooter] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function getFooterData() {
            try {
                const footerAPI = await axios.get(
                    `${config.BACKEND_URL}/api/footer?populate[FooterAbout][populate]=*&populate[TopFooter][populate]=*&populate[BottomFooter][populate]=*&populate[QuickLinks][populate]=*&populate[UxResources][populate]=*&populate[FeaturedArticles][populate]=*`
                );
                const footerBlogAPI = await axios.get(
                    `${config.BACKEND_URL}/api/blogs?populate=*`
                );

                setTopFooterData(footerAPI.data.data.TopFooter);
                setAboutFooterData(footerAPI.data.data.FooterAbout);
                setQuickLinksFooterData(footerAPI.data.data.QuickLinks);
                setQuickLinksMenuFooterData(
                    footerAPI.data.data.QuickLinks.QuickLinks
                );
                setUxResourcesFooterData(footerAPI.data.data.UxResources);
                setUxResourcesMenuFooterData(
                    footerAPI.data.data.UxResources.UxResources
                );
                setarticlesFooterData(footerAPI.data.data.FeaturedArticles);

                setBlogFooterData(footerBlogAPI.data.data);

                setBottomFooterData(footerAPI.data.data.BottomFooter);
                setBottomFooterMenu(footerAPI.data.data.BottomFooter.menu);

                setSocialIconsFooter(
                    footerAPI.data.data.FooterAbout.SocialIcons
                );
            } catch (error) {
                console.error(error);
            }
        }

        getFooterData();
    }, []);

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        navigate(`/blog/${apiResponse.data.data[0].PostURL}`, {
            state: apiResponse.data.data[0],
        });
    };

    return (
        <>
            <footer
                className={`bg-primary py-4 py-md-5 transition ${style.footer}`}
            >
                <div className="container">
                    <div className={`py-3 py-md-4 ${style.top_footer}`}>
                        <Link
                            className={`font-heading display-2 fw-bold mb-3 ${style.big_font}`}
                            to={topFooterData.TitleURL}
                        >
                            {topFooterData.Title}
                        </Link>
                        {parser(`${topFooterData.Description}`)}
                    </div>
                    <div className={`py-3 py-md-4 ${style.middle_footer}`}>
                        <div className="row">
                            <div className="col-md-12 col-lg-4 my-3 my-md-4">
                                <h5 className="font-body text-white fw-medium">
                                    {aboutFooterData.Title}
                                </h5>
                                {parser(`${aboutFooterData.Description}`)}
                                <div
                                    className={`mt-4 -me-3 -mb-3 d-flex felx-wrap ${style.social_icons_wrapper}`}
                                >
                                    {socialIconsFooter.map((icon, index) => {
                                        const iconData = iconMapFunction(
                                            icon.Icon
                                        );
                                        return (
                                            <Link
                                                key={icon.id}
                                                className="me-3 mb-3"
                                                to="#"
                                                target="_blank"
                                            >
                                                <Icons
                                                    family={iconData}
                                                    name={icon.Icon}
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3 col-lg-2 my-3 my-md-4">
                                <h5 className="font-body text-white fw-medium">
                                    {quickLinksFooterData.Heading}
                                </h5>
                                <Nav className="d-block -mb-1">
                                    {quickLinksMenuFooterData.map(
                                        (menu, index) => {
                                            return (
                                                <NavLink
                                                    key={menu.id}
                                                    className="nav-link d-table p-0 mb-1"
                                                    to={menu.LinkUrl}
                                                >
                                                    {menu.LinkTag}
                                                </NavLink>
                                            );
                                        }
                                    )}
                                </Nav>
                            </div>
                            <div className="col-sm-6 col-md-3 col-lg-2 my-3 my-md-4">
                                <h5 className="font-body text-white fw-medium">
                                    {uxResourcesFooterData.Heading}
                                </h5>
                                <Nav className="d-block -mb-1">
                                    {uxResourcesMenuFooterData.map(
                                        (menu, index) => {
                                            return (
                                                <NavLink
                                                    key={menu.id}
                                                    className="nav-link d-table p-0 mb-1"
                                                    to={menu.UXResourcesUrl}
                                                >
                                                    {menu.UXResourceTag}
                                                </NavLink>
                                            );
                                        }
                                    )}
                                </Nav>
                            </div>
                            <div className="col-md-6 col-lg-4 my-3 my-md-4">
                                <h5 className="font-body text-white fw-medium">
                                    {articlesFooterData.Title}
                                </h5>
                                <div
                                    className={`-mb-3 ${style.blog_list_wrapper}`}
                                >
                                    {blogFooterData
                                        .slice(0, 2)
                                        .map((post, index) => {
                                            return (
                                                <Card
                                                    key={post.id}
                                                    className={`bg-transparent border-0 mb-3 ${style.card}`}
                                                >
                                                    <Card.Link
                                                        className={`d-flex cursor-pointer ${style.card_link}`}
                                                        onClick={
                                                            (e) =>
                                                                postURLFunction(
                                                                    post.PostURL,
                                                                    "blogs"
                                                                ) // slug, type
                                                        }
                                                    >
                                                        <Card.Img
                                                            className={`mt-1 ${style.card_img}`}
                                                            src={
                                                                post.BlogThumbnail ===
                                                                null
                                                                    ? {
                                                                          imagePlaceholder,
                                                                      }
                                                                    : `${config.BACKEND_URL}${post.BlogThumbnail.formats.thumbnail.url}`
                                                            }
                                                            onError={
                                                                imagePlaceholder
                                                            }
                                                        />
                                                        <Card.Body className="flex-shrink-1 p-0 ps-3 m-0">
                                                            <Card.Title
                                                                className={`font-body p-0 m-0 ${style.card_title}`}
                                                            >
                                                                {post.Title}
                                                            </Card.Title>
                                                        </Card.Body>
                                                    </Card.Link>
                                                </Card>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`py-3 py-md-4 overflow-hidden ${style.bottom_footer}`}
                    >
                        <Nav className="-mb-1 -me-5">
                            <span
                                className={`p-0 mb-1 me-5 ${style.copyright}`}
                            >
                                {bottomFooterData.Copyright}
                            </span>
                            {bottomFooterMenu.map((menu, index) => {
                                return (
                                    <NavLink
                                        key={menu.id}
                                        className="nav-link p-0 mb-1 me-5"
                                        to={menu.MenuLink}
                                    >
                                        {menu.MenuTitle}
                                    </NavLink>
                                );
                            })}
                        </Nav>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
