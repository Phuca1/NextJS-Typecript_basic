import React from "react";
import Link from "next/link";
import classes from "./MainHeader.module.scss";

export const MainHeader: React.FunctionComponent = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href="/">Next Events</Link>
            </div>
            <nav>
                <ul className={classes.navigation}>
                    <li>
                        <Link href={"/events"}>Browse All Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
