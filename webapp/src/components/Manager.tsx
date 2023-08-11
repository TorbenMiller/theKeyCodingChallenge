import React, { useState, useEffect } from "react";
import theKeySubscriber from "../services/Subscriber";
import { Message } from "../types/types";
import moment from "moment";
import Display from "./Display";

const Manager: React.FC = () => {
    const [data, setData] = useState<Message[] | null>(null);

    useEffect(() => {
        const handleMessage = (message: string) => {
            if (message.indexOf("title") === -1) {
                return;
            }
            const parsedMessages = JSON.parse(message);
            const validObjects = parsedMessages.map(
                (message: {
                    title: string;
                    date: string;
                    modified: string;
                    data: object;
                }) => {
                    return {
                        ...message,
                        date: moment(message.date),
                        modified: moment(message.modified),
                    };
                }
            );
            setData(validObjects);
        };
        theKeySubscriber.setMessageCallback(handleMessage);
    }, []);

    return data ? <Display data={data} /> : <></>;
};

export default Manager;
