import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SaasItemSkeleton = () => {
    return (
        <>
            <div className={`col-sm-6 mt-4`}>
                <div className="bg-white text-center text-hover-underline d-block h-100 rounded-3 shadow-sm overflow-hidden">
                    <figure className="m-0 ratio ratio-4x3">
                        <Skeleton className="w-100 h-100 object-fit-cover" />
                    </figure>
                    <h4 className="font-body p-3 mb-0">
                        <Skeleton />
                    </h4>
                </div>
            </div>
        </>
    );
};

export default SaasItemSkeleton;
