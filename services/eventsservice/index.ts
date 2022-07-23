import { IEventDateFilterModel, IEventModel } from "models";

export default class EventService {
    public static async getAllEvent(): Promise<IEventModel[]> {
        const response = await fetch(
            "https://nextjs-course-test-dac39-default-rtdb.firebaseio.com/events.json"
        );
        const data = await response.json();

        const events: IEventModel[] = [];

        for (const key in data) {
            events.push({
                id: key,
                ...data[key],
            });
        }

        return events;
    }

    public static async getFeaturedEvents(): Promise<IEventModel[]> {
        const allEvents: IEventModel[] = await this.getAllEvent();
        return allEvents.filter((event) => event.isFeatured);
    }

    public static async getEventById(id : string) : Promise<IEventModel> {
        const allEvents: IEventModel[] = await this.getAllEvent();
        return allEvents.find((item) => item.id === id);
    }

    public static async getFilteredEvents(
        dateFilter: IEventDateFilterModel
    ): Promise<IEventModel[]> {
        const { year, month } = dateFilter;

        const allEvents = await this.getAllEvent();
    
        let filteredEvents = allEvents.filter((event) => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === year &&
                eventDate.getMonth() === month - 1
            );
        });
    
        return filteredEvents;
    }
}
