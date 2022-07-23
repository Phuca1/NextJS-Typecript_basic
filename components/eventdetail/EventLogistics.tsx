import { AddressIcon, DateIcon } from "components";
import React from "react";
import classes from "./EventLogistics.module.scss";
import { LogisticsItem } from "./LogisticsItem";

interface IEventLogistics {
    date?: string;
    address?: string;
    image?: string;
    imageAlt?: string;
}

export const EventLogistics: React.FunctionComponent<IEventLogistics> = (
    props
) => {
    const { date, address, image, imageAlt } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const addressText = address.replace(", ", "\n");

    return (
        <section className={classes.logistics}>
            <div className={classes.image}>
                <img src={`/${image}`} alt={imageAlt} />
            </div>
            <ul className={classes.list}>
                <LogisticsItem icon={DateIcon}>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem icon={AddressIcon}>
                    <address>{addressText}</address>
                </LogisticsItem>
            </ul>
        </section>
    );
};
