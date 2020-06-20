import { main } from "./webhook";

const webhookUrls = <string[][]>[
    ["https://undefeated.com/", "https://discordapp.com/api/webhooks/716362702192377856/LhHQfaiC24w4urcH7tmkoAodQvvXx594pKLrRCBeHjfEvmtsSfayR-Dk5ppSPjUK74LD"],
    ["https://extrabutterny.com/"],
    ["https://stay-rooted.com/"],
    ["https://www.deadstock.ca/"],
    ["https://nrml.ca/"],
    ["https://shop.havenshop.com/"],
    ["https://www.socialstatuspgh.com/"],
    ["https://cncpts.com/"],
    ["https://us.bape.com/"],
    ["https://www.jimmyjazz.com"],
    ["https://shopnicekicks.com"],
    ["https://www.unknwn.com/"],
    ["https://juicestore.com/"],
    ["https://feature.com/"],
    ["https://www.saintalfred.com/"],
    ["https://www.dtlr.com/"],
    ["https://www.trophyroomstore.com/"],
    ["https://www.noirfonce.eu/"],
    ["https://kith.com/", "https://discordapp.com/api/webhooks/716362775617863760/YreueDZ1s5bgKe6jXAXdLl84PbwdS8w7yVNVO1sP7N9E-10u5RhVLZMfS7BGqUBnBnJR"],
    ["https://shopnicekicks.com/collections/mens-kicks/", "https://discordapp.com/api/webhooks/716394891869028384/tRhbPnUip282e7oYpgHZJ8MhLvoVTuv-2UvLJZ_O5sXNWBiEhcn5wL2ajF0DsKO_2nUz"],
];

console.log("Starting!");

webhookUrls.map(url => setInterval(main, 30000, url[0], "products", ["https://discordapp.com/api/webhooks/710813058284519466/7NfyY_-rh6JinUBEuAMsn9QWPlZzbndTNi-CgF-WY9khfjsEcxOgESTbcwYtHDJ_wSSS", url[1] ? url[1] : undefined]));
