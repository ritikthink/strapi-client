import React from "react";
import { Link } from "react-router-dom";

const MailTo = ({ email, subject, body, children, className }) => {
    const classes = "mailto " + className;

    return (
        <>
            <Link
                className={classes}
                to={`mailto:${email}?subject=${subject || ""}&body=${
                    body || ""
                }`}
            >
                {" "}
                {children}
            </Link>
        </>
    );
};

export default MailTo;
