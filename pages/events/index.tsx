import { EventList, EventSearch } from "components";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next";
import { IEventModel } from "models";
import { EventService } from "services";
import Head from 'next/head';

interface IAllEventsPageProps {
    events : IEventModel[]
}

const AllEventsPage :NextPage<IAllEventsPageProps> = (props) => {
    // const events = getAllEvents();
    const {events} = props;
    const router = useRouter();

    function findEventsHandler(year, month) {
        const fullPath: string = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta name="description" content="lorem ipsum" />
            </Head>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
};

export const getStaticProps : GetStaticProps = async ()=>{
    const allEvents: IEventModel[] = await EventService.getAllEvent();


    return {
        props: {
            events : allEvents
        },
        revalidate: 60
    }
}

export default AllEventsPage;
