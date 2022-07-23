import { EventList } from "components";
import { IEventModel } from "models";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { EventService } from "services";
import Head from 'next/head';

interface IHomePageProps {
    events: IEventModel[]
}

const HomePage: NextPage<IHomePageProps> = (props) => {

    if (!props.events) {
        return <div className="center">
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div>
            <Head>
                <title>NextJs Events</title>
                <meta name="description" content="lorem ipsum" />
            </Head>
            <EventList items={props.events} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {

    const featuredEvents = await EventService.getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 5
    }
}



export default HomePage;
