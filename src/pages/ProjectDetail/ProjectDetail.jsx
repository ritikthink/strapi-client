import React from "react";
import { useLocation } from "react-router-dom";
import parser from "html-react-parser";

const ProjectDetail = () => {
    const location = useLocation();
    const projectContent = location.state;

    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {parser(`${projectContent}`)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectDetail;
