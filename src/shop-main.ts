import { main } from "./webhook";
import * as fs from "fs";

const getUrls = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("urls_main.txt", "utf8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const getWebhooks = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("webhooks_main.txt", "utf8", (err, data) => {
            if (err) throw err;
            res(data.split("\n"));
        })
    })
}

const start = async () => {
    console.log("Starting!");
    const urls = await getUrls();
    const webhooks = await getWebhooks();
    urls.map(url => {
        setInterval(main, 5000, url, "products", webhooks)
    });
};

start();
