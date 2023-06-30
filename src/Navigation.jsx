import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import Me from "./pages/Me/Me";
import Services from "./pages/Services/Services";
import Bookshelf from "./pages/Bookshelf/Bookshelf";
import ArtShop from "./pages/ArtShop/ArtShop";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";

const Navigation = () => {
    return (
        <>
            <Header />

            <main>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/projects" element={<Projects />} />
                    <Route
                        exact
                        path="/projects/:id"
                        element={<ProjectDetail />}
                    />
                    <Route exact path="/me" element={<Me />} />
                    <Route exact path="/services" element={<Services />} />
                    <Route exact path="/bookshelf" element={<Bookshelf />} />
                    <Route exact path="/artshop" element={<ArtShop />} />
                    <Route exact path="/blog" element={<Blog />} />
                    <Route exact path="/blog/:id" element={<BlogDetail />} />
                    <Route exact path="/contact" element={<Contact />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
};

export default Navigation;
