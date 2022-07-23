import React, { Fragment } from "react";
import { MainHeader } from "components";

export const Layout: React.FunctionComponent = (props) => {
    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
        </Fragment>
    );
};
