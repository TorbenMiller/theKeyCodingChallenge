import { Moment } from "moment";

export type Message = {
    title: string;
    date: Moment;
    modified: Moment;
    data: object;
};
