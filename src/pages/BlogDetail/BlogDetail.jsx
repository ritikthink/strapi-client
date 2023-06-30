import React from "react";
import { useLocation } from "react-router-dom";
import parser from "html-react-parser";
import Head from "../../components/Utilities/Head/Head";

const BlogDetail = () => {
    const location = useLocation();
    const postContent = location.state;
    const seoContent = location.state.seo;

    return (
        <>
            <Head seoContent={seoContent} seoTitle={postContent.Title} />

            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {parser(`${postContent.BlogContent}`)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogDetail;
