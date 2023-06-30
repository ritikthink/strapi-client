import React, { Suspense, lazy, useEffect, useState } from "react";

import axios from "axios";
import config from "../../config";

// import HeroSection from "../../components/Home/HeroSection";
// import SaasProjects from "../../components/Home/SaasProjects";
// import HomeServices from "../../components/Home/HomeServices";

import Head from "../../components/Utilities/Head/Head";

const HeroSection = lazy(() => import("../../components/Home/HeroSection"));
const SaasProjects = lazy(() => import("../../components/Home/SaasProjects"));
const HomeServices = lazy(() => import("../../components/Home/HomeServices"));

const Home = () => {
    const [seoData, setSeoData] = useState([]);
    const [seoHomeTitle, setSeoHomeTitle] = useState([]);

    useEffect(() => {
        async function getSEOData() {
            try {
                const homeSEOAPI = await axios.get(
                    `${config.BACKEND_URL}/api/home-new?populate[seo][populate]=*`
                );
                setSeoData(homeSEOAPI.data.data.seo);

                const homeSEOTitle = await axios.get(
                    `${config.BACKEND_URL}/api/home-new?populate[HeroSection][populate]=*&populate[seo][populate]=*`
                );
                setSeoHomeTitle(homeSEOTitle.data.data.HeroSection.Title);
            } catch (error) {
                console.error(error);
            }
        }

        getSEOData();
    }, []);

    return (
        <>
            <Head seoContent={seoData} seoTitle={seoHomeTitle} />

            <Suspense fallback={<p>Fetching user details...</p>}>
                <HeroSection />
                <SaasProjects />
                <HomeServices />
            </Suspense>
        </>
    );
};

export default Home;
