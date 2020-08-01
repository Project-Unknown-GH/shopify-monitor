import { main } from "./webhook";
import { Webhooks } from "./urls";
import * as fs from "fs";

const getUrls = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("urls_filtered.txt", "utf8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const getFilters = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("filters.txt", "utf8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const getWebhooks = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("webhooks_filtered.txt", "utf8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const start = async () => {
    console.log("Starting!");
    const urls = await getUrls();
    const filters = await getFilters();
    const webhooks = await getWebhooks();
    urls.map(url => {
        setInterval(main, 5000, url, "filtered", webhooks, filters)
    });
};

start();
