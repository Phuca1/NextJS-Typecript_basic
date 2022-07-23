import React from "react";
import Link from "next/link";
import classes from "./Button.module.scss";

interface IButtonOwnProps {
    link?: string;
}

const Button: React.FunctionComponent<IButtonOwnProps> = (props) => {
    if (props.link) {
        return (
            <Link href={props.link}>
                <a className={classes.btn}>{props.children}</a>
            </Link>
        );
    }

    return <button className={classes.btn}>{props.children}</button>;
};

export default Button;
