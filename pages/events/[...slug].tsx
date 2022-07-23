import { Button, ErrorAlert, EventList, ResultsTitle } from "components";
import { IEventModel } from "models";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from 'swr';

interface IFilteredEventsPageProps {
    // events?: IEventModel[],
    // hasError?: boolean
    // numYear?: number,
    // numMonth?: number
}

const FilteredEventsPage: NextPage<IFilteredEventsPageProps> = () => {
    const [events, setEvents] = useState<IEventModel[]>();
    const router = useRouter(); 

    const {
        data,
        error
    } = useSWR('https://nextjs-course-test-dac39-default-rtdb.firebaseio.com/events.json',
        (url) => fetch(url).then((data) => data.json())
    );

    useEffect(() => {
        if (data) {
            console.log(data);
            const eventsList: IEventModel[] = [];

            for (const key in data) {
                eventsList.push({
                    id: key,
                    ...data[key]
                });
            }

            setEvents(eventsList);
        }
    }, [data]);

    const filterData = router.query.slug;

    let pageHeadData = <Head>
    <title>Filtered Events</title>
    <meta name="description" content={`A list of filtered events`} />
</Head>

    if (!events) {
        return (
            <Fragment>
                {pageHeadData}
                <p className="center">Loading...</p>
            </Fragment>
        );
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadData = <Head>
    <title>Filtered Events</title>
    <meta name="description" content={`All events for ${numMonth}/${numYear}`} />
</Head>

    if (isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your value</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        );
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>No events found for the chosen filter</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { params } = context;

//     let filterData: string[] = [];
//     if (Array.isArray(params.slug)) {
//         filterData = params.slug;
//     }

//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 0 ||
//         numMonth > 12
//     ) {
//         return {
//             props: { hasError: true },
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error'
//             // }
//         }
//     }

//     const filteredEvents = await EventService.getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     })

//     return {
//         props: {
//             events: filteredEvents,
//             numYear,
//             numMonth,
//         }
//     }
// }

export default FilteredEventsPage;
