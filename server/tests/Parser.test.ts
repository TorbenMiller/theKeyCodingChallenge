import { Parser } from "../src/Parser";
import { WordPressPost } from "../src/types";

describe("Parser", () => {
    const parser = new Parser();

    const emptyProperties: WordPressPost = {
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
    };

    const emptyMockPosts = [{ ...emptyProperties }];

    it("should parse empty post", () => {
        const result = JSON.parse(parser.parse(emptyMockPosts));
        expect(result).toEqual([
            { title: "", date: "", modified: "", data: {} },
        ]);
    });

    const mockPosts = [
        { ...emptyProperties, content: { rendered: "<body>text</body>" } },
    ];

    it("should parse post with single word", () => {
        const result = JSON.parse(parser.parse(mockPosts));
        expect(result).toEqual([
            { title: "", date: "", modified: "", data: { text: 1 } },
        ]);
    });

    const mockPosts_two_words = [
        { ...emptyProperties, content: { rendered: "<body>text text</body>" } },
    ];

    it("should parse post with two times the same word", () => {
        const result = JSON.parse(parser.parse(mockPosts_two_words));
        expect(result).toEqual([
            { title: "", date: "", modified: "", data: { text: 2 } },
        ]);
    });
});
