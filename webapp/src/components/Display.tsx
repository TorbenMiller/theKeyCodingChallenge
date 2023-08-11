import { Message } from "../types/types";

interface Props {
    data: Message[];
}

const Display: React.FC<Props> = ({ data }) => {
    return (
        <>
            {data.map((message) => (
                <div key={message.title + message.date}>
                    <h1>{message.title}</h1>
                    <p>{JSON.stringify(message.data, null, 2)}</p>
                </div>
            ))}
        </>
    );
};

export default Display;
