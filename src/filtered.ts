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

const webhook = "https://discordapp.com/api/webhooks/726921036171444254/brX9g-XWlTDS6CdJwmkE5AUGXx_SDiMsVLj7v7TaHggxRo0Q8vfawZd0mw8KfIt_0QL_";

const filters = "space hippie, yeezy, dunk, jordan 1 high, air force tiger, comme dunk low, cdg dunk low, travis scott, cactus jack, flint, south korea, yzy qntm, yeezy barium, 700 mnvm, yeezy 700, jordan 1 light smoke, jordan 1 smoke, smoke, yzy"

urls.map(url => setInterval(main, 20000, url, "filtered", [webhook], filters.split(", ")));
