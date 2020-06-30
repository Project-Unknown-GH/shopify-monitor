import { main } from "./webhook";

const urls = [
    "https://kith.com/",
    // "https://undefeated.com/",
    // "https://www.deadstock.ca/",
    // "https://nrml.ca/",
    // "https://shop.havenshop.com/",
    // "https://www.socialstatuspgh.com/",
    // "https://eflash.doverstreetmarket.com/",
    // "https://www.unknwn.com/",
    // "https://juicestore.com/",
    // "https://feature.com/",
    // "https://www.saintalfred.com/",
    // "https://www.dtlr.com/",
    // "https://www.trophyroomstore.com/",
    // "https://www.noirfonce.eu/"
];

const webhook = "https://discord.com/api/webhooks/726921036171444254/brX9g-XWlTDS6CdJwmkE5AUGXx_SDiMsVLj7v7TaHggxRo0Q8vfawZd0mw8KfIt_0QL_";

urls.map(url => setInterval(main, 20000, url, "filtered", [webhook], ["shirt", "footwear"]));
