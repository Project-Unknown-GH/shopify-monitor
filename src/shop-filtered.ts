import { main } from "./webhook";
import { Webhooks } from "./urls";

const urls = <string[]>[
    "https://undefeated.com/",
    "https://extrabutterny.com/",
    "https://stay-rooted.com/",
    "https://www.deadstock.ca/",
    "https://nrml.ca/",
    "https://shop.havenshop.com/",
    "https://www.socialstatuspgh.com/",
    "https://cncpts.com/",
    "https://us.bape.com/",
    "https://www.jimmyjazz.com",
    "https://shopnicekicks.com",
    "https://www.unknwn.com/",
    "https://juicestore.com/",
    "https://feature.com/",
    "https://www.saintalfred.com/",
    "https://www.dtlr.com/",
    "https://www.trophyroomstore.com/",
    "https://www.noirfonce.eu/",
    "https://kith.com/",
    "https://shopnicekicks.com/collections/mens-kicks/"
];

const webhook = Webhooks.FILTERED;

const filters = "space hippie, yeezy, dunk, jordan 1 high, air force tiger, comme dunk low, cdg dunk low, travis scott, cactus jack, flint, south korea, yzy qntm, yeezy barium, 700 mnvm, yeezy 700, jordan 1 light smoke, jordan 1 smoke, smoke, yzy"

urls.map(url => setInterval(main, 5000, url, "filtered", [webhook], filters.split(", ")));
