import React from "react";
import { IEventModel } from "models";
import EventItem from "../eventitem/EventItem";
import classes from "./EventList.module.scss";

interface IEventListOwnProps {
    items: IEventModel[];
}

const EventList: React.FunctionComponent<IEventListOwnProps> = (props) => {
    const { items } = props;

    return (
        <ul className={classes.list}>
            {items.map((item) => {
                return (
                    <EventItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        location={item.date}
                        date={item.date}
                        image={item.image}
                    />
                );
            })}
        </ul>
    );
};

export default EventList;
