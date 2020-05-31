import { main } from "./webhook";

const urls = [
    "https://kith.com/collections/mens-footwear/",
    "https://undefeated.com/collections/mens-footwear/",
    "https://www.addictmiami.com/collections/latest-products/",
    "https://www.abovethecloudsstore.com/collections/footwear/",
    "https://www.jimmyjazz.com/collections/footwear/",
    "https://www.patta.nl/collections/footwear/",
    "https://deviceone.gr/collections/sneakers/",
    "https://www.courtsidesneakers.com/collections/sneakers/",
    "https://shopnicekicks.com/collections/mens-kicks/",
    "https://www.blendsus.com/collections/mens-footwear/",
    "https://shop.travisscott.com/",
];

const webhook = "https://discordapp.com/api/webhooks/715588863904579606/l9ao9OAchPh6wSjCMXD6SgTydGZz83RMccoQYSZyc0tVEa5r8TytENBebES65EaFWMzF";

urls.map(url => setInterval(main, 40000, url, "filtered", webhook));
