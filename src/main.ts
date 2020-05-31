import { main } from "./webhook";

const webhookUrls = <string[][]>[
    ["https://undefeated.com/", "https://discordapp.com/api/webhooks/716362702192377856/LhHQfaiC24w4urcH7tmkoAodQvvXx594pKLrRCBeHjfEvmtsSfayR-Dk5ppSPjUK74LD"],
    ["https://www.addictmiami.com/"],
    ["https://www.abovethecloudsstore.com/"],
    ["https://www.jimmyjazz.com/"],
    ["https://kith.com/", "https://discordapp.com/api/webhooks/716362775617863760/YreueDZ1s5bgKe6jXAXdLl84PbwdS8w7yVNVO1sP7N9E-10u5RhVLZMfS7BGqUBnBnJR"],
    ["https://dope-factory.com/"],
    ["https://shopnicekicks.com/collections/mens-kicks/", "https://discordapp.com/api/webhooks/716394891869028384/tRhbPnUip282e7oYpgHZJ8MhLvoVTuv-2UvLJZ_O5sXNWBiEhcn5wL2ajF0DsKO_2nUz"]
];

console.log("Starting!");

webhookUrls.map(url => setInterval(main, 40000, url[0], "products", ["https://discordapp.com/api/webhooks/710813058284519466/7NfyY_-rh6JinUBEuAMsn9QWPlZzbndTNi-CgF-WY9khfjsEcxOgESTbcwYtHDJ_wSSS", url[1] ? url[1] : undefined]));
