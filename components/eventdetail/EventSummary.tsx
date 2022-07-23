import classes from "./EventSummary.module.scss";

interface IEventSummary {
    title?: string;
}

export const EventSummary: React.FunctionComponent<IEventSummary> = (props) => {
    const { title } = props;

    return (
        <section className={classes.summary}>
            <h1>{title}</h1>
        </section>
    );
};
