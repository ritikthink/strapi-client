import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ServiceItemSkelton = () => {
    return (
        <>
            <div
                className={`col-sm-6 col-md-4 col-lg-3 text-center mb-4 mb-sm-5 `}
            >
                <div className="display-5 d-table mx-auto mb-3 mb-md-4">
                    <Skeleton width={48} height={48} />
                </div>

                <h4 className="fw-bold col-sm-6 mx-auto">
                    <Skeleton />
                </h4>
                <div className="description-link-underline">
                    <Skeleton count={3} />
                </div>
            </div>
        </>
    );
};

export default ServiceItemSkelton;
