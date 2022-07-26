import { AddressIcon, ArrowRightIcon, Button, DateIcon } from "components";
import classes from "./EventItem.module.scss";
import Image from 'next/image';

interface IEventItemOwnProps {
    title: string;
    image: string;
    date: string;
    location: string;
    id: string;
}

const EventItem: React.FunctionComponent<IEventItemOwnProps> = (props) => {
    const { title, image, date, location, id } = props;
    const humanReadableDate: string = new Date(date).toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    const formattedAddress = location.replace(", ", "\n");
    const exploreLink = `/events/${id}`;
    return (
        <li className={classes.item}>
            <Image src={"/" + image} alt={title} width={256} height={160} />
            {/* <img src={"/" + image} alt={title} /> */}
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>

                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default EventItem;
