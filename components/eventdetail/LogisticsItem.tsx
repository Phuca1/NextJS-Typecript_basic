import React from "react";
import classes from "./LogisticsItem.module.scss";

interface ILogisticItemProps {
    icon?: React.FunctionComponent;
}

export const LogisticsItem: React.FunctionComponent<ILogisticItemProps> = (
    props
) => {
    const { icon: Icon } = props;

    return (
        <li className={classes.item}>
            <span className={classes.icon}>
                <Icon />
            </span>
            <span className={classes.content}>{props.children}</span>
        </li>
    );
};
