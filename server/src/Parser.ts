import * as cheerio from "cheerio";
import { WordPressPost } from "./types";

export class Parser {
    private HTMLToString(html: string) {
        const $ = cheerio.load(html);

        $("img").remove();
        $("svg").remove();

        $("p, h1, h2, h3, h4, h5, h6, li, ul, ol, blockquote").append(" ");

        return $("body")
            .text()
            .replace(/[^\w\säöüß-]/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
    }

    private parseRenderedContent(data: string) {
        const text = this.HTMLToString(data);

        const wordCountMap = new Map<string, number>();

        const words = text.split(" ");

        if (words.length === 1 && words[0] === "") {
            return {};
        }

        for (const word of words) {
            if (wordCountMap.has(word)) {
                wordCountMap.set(word, wordCountMap.get(word)! + 1);
            } else {
                wordCountMap.set(word, 1);
            }
        }
        return Object.fromEntries(wordCountMap);
    }

    public parse(posts: WordPressPost[]) {
        const out = [];
        for (const post of posts) {
            out.push({
                title: post.title.rendered,
                date: post.date,
                modified: post.modified,
                data: this.parseRenderedContent(post.content.rendered),
            });
        }
        return JSON.stringify(out);
    }
}
