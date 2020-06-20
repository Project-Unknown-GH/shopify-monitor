import { main } from "./webhook";

const urls = [
    "https://kith.com/collections/mens-footwear/",
    "https://undefeated.com/collections/mens-footwear/",
    "https://www.deadstock.ca/collections/footwear/",
    "https://nrml.ca/collections/nrml-footwear/",
    "https://shop.havenshop.com/collections/footwear/",
    "https://www.socialstatuspgh.com/collections/sneakers/",
    "https://cncpts.com/collections/footwear/",
    "https://eflash.doverstreetmarket.com/",
    "https://www.unknwn.com/collections/footwear/",
    "https://juicestore.com/collections/footwear/",
    "https://feature.com/collections/footwear/",
    "https://www.saintalfred.com/collections/footwear/",
    "https://www.dtlr.com/collections/men-footwear/",
    "https://www.trophyroomstore.com/collections/footwear/",
    "https://www.noirfonce.eu/collections/sneakers/"
];

const webhook = "https://discordapp.com/api/webhooks/715588863904579606/l9ao9OAchPh6wSjCMXD6SgTydGZz83RMccoQYSZyc0tVEa5r8TytENBebES65EaFWMzF";

urls.map(url => setInterval(main, 40000, url, "filtered", [webhook]));
