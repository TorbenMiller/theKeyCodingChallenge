import axios from "axios";
import EventEmitter from "events";
import { Fetcher } from "../src/Fetcher";
import { Parser } from "../src/Parser";

jest.mock("axios");

describe("Fetcher", () => {
    const mockConfig = {
        url: "https://example.com/api/posts",
        intervalMs: 1000,
    };

    const mockParser = new Parser();

    const mockEmitter = new EventEmitter();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllTimers();
    });

    it("should start fetching data and emitting new data events", async () => {
        const mockApiResponse = {
            data: [
                {
                    id: 0,
                    date: "",
                    date_gmt: "",
                    guid: { rendered: "" },
                    modified: "",
                    modified_gmt: "",
                    slug: "",
                    status: "",
                    type: "",
                    link: "",
                    title: { rendered: "" },
                    content: { rendered: "" },
                    excerpt: { rendered: "" },
                    author: 0,
                    featuredMedia: 0,
                    comment_status: "",
                    ping_status: "",
                    sticky: false,
                    template: "",
                    format: "",
                    meta: {},
                    categories: [0],
                    tags: [""],
                    _links: {},
                },
            ],
        };
        (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

        const fetcher = new Fetcher(mockConfig, mockParser, mockEmitter);
        await fetcher.start();

        expect(axios.get).toHaveBeenCalledWith(mockConfig.url);

        jest.advanceTimersByTime(mockConfig.intervalMs);

        expect(axios.get).toHaveBeenCalledTimes(2);
    });

    it("should handle fetch error", async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error("Fetch error"));

        const fetcher = new Fetcher(mockConfig, mockParser, mockEmitter);

        await expect(fetcher.start()).rejects.toThrow("Fetch error");
    });

    it("should clear existing timer when starting", async () => {
        const mockApiResponse = {
            data: [],
        };

        (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

        const fetcher = new Fetcher(mockConfig, mockParser, mockEmitter);

        fetcher.start();
        fetcher.start();

        jest.advanceTimersByTime(mockConfig.intervalMs);

        expect(axios.get).toHaveBeenCalledTimes(2);
    });
});
