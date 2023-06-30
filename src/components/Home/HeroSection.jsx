import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Waves from "../Utilities/Svg/Waves";
import style from "./HeroSection.module.css";
import axios from "axios";
import config from "../../config";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSection = () => {
    const [heroData, setHeroData] = useState();
    const [heroImage, setHeroImage] = useState();

    useEffect(() => {
        async function getHeroData() {
            try {
                const heroAPI = await axios.get(
                    `${config.BACKEND_URL}/api/home-new?populate[HeroSection][populate]=*`
                );

                setTimeout(() => {
                    setHeroData(heroAPI.data.data.HeroSection);
                    setHeroImage(heroAPI.data.data.HeroSection.Image.url);
                }, 625);
            } catch (error) {
                console.error(error);
            }
        }

        getHeroData();
    }, []);

    return (
        <>
            <section className="bg-primary text-white position-relative">
                <div className="container">
                    <div className="row flex-column-reverse flex-lg-row">
                        <>
                            <div className="col-lg-5 text-center text-lg-start d-flex flex-wrap jus align-content-center py-5">
                                <h4 className="font-heading fw-700 w-100">
                                    {heroData ? (
                                        heroData.Subtitle
                                    ) : (
                                        <div className="col-sm-5 col-lg-8 mx-auto mx-lg-0">
                                            <Skeleton className="opacity-75" />
                                        </div>
                                    )}
                                </h4>
                                <h1 className="fs-2 w-100">
                                    {heroData ? (
                                        heroData.Title
                                    ) : (
                                        <div className="col-sm-8 col-lg-12 mx-auto mx-lg-0">
                                            <Skeleton
                                                className="opacity-75"
                                                count={2}
                                            />
                                        </div>
                                    )}
                                </h1>
                                <div className="text-white link-text-white mb-3 w-100">
                                    {heroData ? (
                                        parse(`${heroData.Description}`)
                                    ) : (
                                        <div className="col-sm-10 col-lg-12 mx-auto mx-lg-0">
                                            <Skeleton
                                                className="opacity-75"
                                                count={5}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="text-center text-lg-start w-100">
                                    {heroData ? (
                                        <Link
                                            className="btn btn-outline btn-min-w mt-2"
                                            to={heroData.ButtonURL}
                                            target={
                                                heroData.NewTab === true
                                                    ? "_blank"
                                                    : ""
                                            }
                                        >
                                            {heroData.ButtonTitle}
                                        </Link>
                                    ) : (
                                        <Skeleton className="btn btn-outline btn-skeleton btn-min-w w-auto opacity-75" />
                                    )}
                                </div>

                                <div className="py-3 py-sm-5 py-lg-0 w-100"></div>
                            </div>
                            <div
                                className={`
                                    col-lg-7 d-flex flex-wrap align-content-bottom pt-5 ${style.hero_min_h}
                                `}
                            >
                                {heroImage ? (
                                    <figure className="d-flex flex-wrap align-content-end m-0 mx-auto">
                                        <img
                                            className={`${style.hero_img}`}
                                            src={`${config.BACKEND_URL}${heroImage}`}
                                            alt={heroData.Image.alternativeText}
                                        />
                                    </figure>
                                ) : (
                                    <figure className="d-flex flex-wrap align-content-center m-0 mx-auto">
                                        <Skeleton
                                            className={`opacity-75 ${style.skeleton_hero_img}`}
                                            circle
                                        />
                                    </figure>
                                )}
                            </div>
                        </>
                    </div>
                </div>
                <div
                    className={`w-100 position-absolute bottom-0 start-0 overflow-hidden ${style.wave_wrapper}`}
                >
                    <Waves />
                </div>
            </section>
        </>
    );
};

export default HeroSection;
