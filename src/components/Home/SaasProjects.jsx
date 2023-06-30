import React, { useEffect, useState } from "react";
import style from "./SaasProjects.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import parser from "html-react-parser";
import { postURL } from "./../Utilities/PostURL/PostUrl";
import Skeleton from "react-loading-skeleton";
import SaasItemSkeleton from "../Utilities/SkeletonItem/SaasItemSkeleton";
// import ImgPlaceholder from "./../../assets/images/placeholder-medium.png";

const SaasProjects = () => {
    const [saasHeaderData, setSaasHeaderData] = useState([]);
    const [saasButtonData, setSaasButtonData] = useState([]);
    const [saasProjectsData, setSaasProjectsData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function getSaasHeaderData() {
            try {
                const saasHeaderAPI = await axios.get(
                    `${config.BACKEND_URL}/api/home-new?populate[SaasProject][populate]=*&populate[Button][populate]=*`
                );
                // setSaasHeaderData(saasHeaderAPI.data.data.SaasProject.Header);
                // setSaasButtonData(saasHeaderAPI.data.data.SaasProject.Button);
                setTimeout(() => {
                    setSaasHeaderData(
                        saasHeaderAPI.data.data.SaasProject.Header
                    );
                    setSaasButtonData(
                        saasHeaderAPI.data.data.SaasProject.Button
                    );
                }, 625);
            } catch (error) {
                console.error(error);
            }
        }

        getSaasHeaderData();

        async function getSaasProjectsData() {
            try {
                const saasProjectsAPI = await axios.get(
                    `${config.BACKEND_URL}/api/saas-projects?populate=*`
                );
                // setSaasProjectsData(saasProjectsAPI.data.data);
                setTimeout(() => {
                    setSaasProjectsData(saasProjectsAPI.data.data);
                }, 625);
            } catch (error) {
                console.error(error);
            }
        }

        getSaasProjectsData();
    }, []);

    const postURLFunction = async (posturl, type) => {
        const apiResponse = await postURL(posturl, type);
        navigate(`/projects/${apiResponse.data.data[0].PostURL}`, {
            state: apiResponse.data.data[0].Description,
        });
    };

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 mb-4">
                            <h2 className="text-center fw-bold mb-4">
                                {saasHeaderData.Title ? (
                                    saasHeaderData.Title
                                ) : (
                                    <div className="col-sm-4 mx-auto">
                                        <Skeleton />
                                    </div>
                                )}
                            </h2>
                            <div className="text-center">
                                {saasHeaderData.Description ? (
                                    parser(`${saasHeaderData.Description}`)
                                ) : (
                                    <div className="col-sm-8 col-lg-10 mx-auto">
                                        <Skeleton count={3} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={`row ${style.projects_wrapper}`}>
                        {saasProjectsData && saasProjectsData.length > 0 ? (
                            saasProjectsData
                                .slice(0, 4)
                                .map((project, index) => {
                                    return (
                                        <div
                                            key={project.id}
                                            className={`col-sm-6 mt-4 ${style.project_box}`}
                                        >
                                            <Link
                                                className="bg-white text-center text-hover-underline d-block h-100 rounded-3 shadow-sm overflow-hidden"
                                                onClick={
                                                    (e) =>
                                                        postURLFunction(
                                                            project.PostURL,
                                                            "saas-projects"
                                                        ) // slug, type
                                                }
                                            >
                                                {/* <figure className="m-0 ratio ratio-4x3">
                                                    <img
                                                        src={`
                                                    ${config.BACKEND_URL}${project.ProjectThumbnail.formats.medium.url}
                                                `}
                                                        alt={
                                                            project
                                                                .ProjectThumbnail
                                                                .alternativeText
                                                        }
                                                        loading="lazy"
                                                        className="w-100 h-100 object-fit-cover"
                                                    />
                                                </figure> */}

                                                {project.ProjectThumbnailVideo &&
                                                project.ProjectThumbnailVideo
                                                    .url.length > 0 ? (
                                                    <div className="m-0 ratio ratio-4x3 ratio-16x999 overflow-hidden">
                                                        <video
                                                            width="320"
                                                            height="240"
                                                            autoPlay
                                                            className="bg-gray"
                                                            style={{
                                                                transform:
                                                                    "scale(1.4)",
                                                            }}
                                                        >
                                                            <source
                                                                src={`${config.BACKEND_URL}${project.ProjectThumbnailVideo.url}`}
                                                                type="video/mp4"
                                                            />
                                                            Your browser does
                                                            not support the
                                                            video tag.
                                                        </video>
                                                    </div>
                                                ) : (
                                                    <figure className="m-0 ratio ratio-4x3">
                                                        <img
                                                            src={`
                                                    ${config.BACKEND_URL}${project.ProjectThumbnail.formats.medium.url}
                                                `}
                                                            alt={
                                                                project
                                                                    .ProjectThumbnail
                                                                    .alternativeText
                                                            }
                                                            loading="lazy"
                                                            className="w-100 h-100 object-fit-cover"
                                                        />
                                                    </figure>
                                                )}

                                                <h4 className="font-body p-3 mb-0">
                                                    {project.ProjectTitle}
                                                </h4>
                                            </Link>
                                        </div>
                                    );
                                })
                        ) : (
                            <>
                                <SaasItemSkeleton />
                                <SaasItemSkeleton />
                                <SaasItemSkeleton />
                                <SaasItemSkeleton />
                            </>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center mt-5">
                            {saasButtonData.Title ? (
                                <Link
                                    className="btn btn-secondary"
                                    to={saasButtonData.URL}
                                >
                                    {saasButtonData.Title}
                                </Link>
                            ) : (
                                <Skeleton className="btn btn-outline btn-skeleton btn-min-w w-auto" />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SaasProjects;
