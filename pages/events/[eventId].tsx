import {
    Button,
    ErrorAlert,
    EventContent,
    EventLogistics,
    EventSummary,
} from "components";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IEventModel } from "models";
// import { useRouter } from "next/router";
import { Fragment } from "react";
import { EventService } from "services";
import Head from "next/head";

interface IEventDetailPageProps {
    event?: IEventModel
}

const EventDetailPage: NextPage<IEventDetailPageProps> = (props) => {
    // const router = useRouter();

    // let eventId: string = "";
    // if (router.query.eventId) eventId = router.query.eventId.toString();
    // const event: IEventModel = getEventById(eventId);

    const { event } = props;

    if (!event) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No event found!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const eventId = context.params.eventId.toString();
    let event: IEventModel | undefined = undefined;
    try {
        event = await EventService.getEventById(eventId);
    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            event
        },
        revalidate: 10
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    let allEvents: IEventModel[]
    try {
        allEvents = await EventService.getFeaturedEvents();
    } catch (error) {
        console.log(error);
    }
    const allEventIds: string[] = allEvents.map((event) => event.id);

    const pathsWithParams = allEventIds.map((id) => ({
        params: {
            eventId: id
        }
    }))

    return {
        paths: pathsWithParams,
        fallback: true
    }
}

export default EventDetailPage;
