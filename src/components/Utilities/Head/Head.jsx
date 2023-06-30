import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ seoContent, seoTitle }) => {
    return (
        <>
            {seoContent ? (
                <Helmet>
                    <title>
                        {seoContent.MetaTitle ? seoContent.MetaTitle : null}
                    </title>
                    {seoContent.NoIndex && seoContent.NoFollow ? (
                        <meta name="robots" content="noindex, nofollow" />
                    ) : null}
                    {seoContent.MetaDescription ? (
                        <meta
                            name="description"
                            content={seoContent.MetaDescription}
                        />
                    ) : null}
                    {seoContent.MetaKeywords ? (
                        <meta
                            name="keywords"
                            content={seoContent.MetaKeywords}
                        />
                    ) : null}
                    {seoContent.MetaAuthor ? (
                        <meta name="author" content={seoContent.MetaAuthor} />
                    ) : null}
                    {seoContent.MetaTitle ? (
                        <meta name="og:title" content={seoContent.MetaTitle} />
                    ) : null}
                    {seoContent.MetaDescription ? (
                        <meta
                            name="og:description"
                            content={seoContent.MetaDescription}
                        />
                    ) : null}
                    {seoContent.MetaURL ? (
                        <meta name="og:url" content={seoContent.MetaURL} />
                    ) : null}
                    {seoContent.MetaImage ? (
                        <meta name="og:image" content={seoContent.MetaImage} />
                    ) : null}
                    {seoContent.MetaScript !== "" &&
                    seoContent.MetaScript !== null ? (
                        <script type="application/ld+json">{`
                            
                                ${seoContent.MetaScript}
                            
                        `}</script>
                    ) : null}
                </Helmet>
            ) : (
                <Helmet>
                    <title>{seoContent ? seoContent.Title : seoTitle}</title>
                </Helmet>
            )}
        </>
    );
};

export default Head;
