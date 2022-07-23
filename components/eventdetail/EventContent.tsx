import React from "react";
import classes from "./EventContent.module.scss";

export const EventContent: React.FunctionComponent = (props) => {
    return <section className={classes.content}>{props.children}</section>;
};
