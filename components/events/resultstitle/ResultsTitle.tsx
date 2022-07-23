import { Button } from "components";
import React from "react";
import classes from "./ResultsTitle.module.scss";

interface IResultsTitleProps {
    date: Date;
}

const ResultsTitle: React.FunctionComponent<IResultsTitleProps> = (props) => {
    const { date } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <section className={classes.title}>
            <h1>Events in {humanReadableDate}</h1>
            <Button link="/events">Show all events</Button>
        </section>
    );
};

export default ResultsTitle;
