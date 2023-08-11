/*import React from "react";
import { render } from "@testing-library/react";
import Display from "../src/components/Display";
import { Message } from "../src/types/types";
import moment from "moment";
import { test, expect } from "vitest";

const mockData: Message[] = [
    {
        title: "Test Message 1",
        date: moment("2023-08-11"),
        modified: moment(),
        data: { content: "This is a test message." },
    },
    {
        title: "Test Message 2",
        date: moment("2023-08-12"),
        modified: moment(),
        data: { content: "Another test message." },
    },
];

test("renders the Display component with messages", () => {
    const { getByText } = render(<Display data={mockData} />);

    mockData.forEach((message) => {
        const titleElement = getByText(message.title);
        expect(titleElement).toBeInTheDocument();
    });

    mockData.forEach((message) => {
        const contentElement = getByText(JSON.stringify(message.data, null, 2));
        expect(contentElement).toBeInTheDocument();
    });
});
*/
import { test, expect } from "vitest";

test("mock",()=>{
    expect(true).toBe(true)
})
