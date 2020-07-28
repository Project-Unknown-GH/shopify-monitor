import { main } from "./webhook";
import { Webhooks } from "./urls";

const webhookUrls = <string[][]>[
    ["https://undefeated.com/", "https://discordapp.com/api/webhooks/716362702192377856/LhHQfaiC24w4urcH7tmkoAodQvvXx594pKLrRCBeHjfEvmtsSfayR-Dk5ppSPjUK74LD"],
    ["https://extrabutterny.com/"],
    ["https://stay-rooted.com/"],
    ["https://www.deadstock.ca/"],
    ["https://nrml.ca/"],
    ["https://shop.havenshop.com/"],
    ["https://www.socialstatuspgh.com/"],
    ["https://cncpts.com/"],
    ["https://us.bape.com/", "https://discordapp.com/api/webhooks/727203195637465138/7Go4gWHtOX44tdxYgGzo1DA9pZ6h4Mnab_pWRBTs0peGdPuYLG-bxiIZb9ie1wI8KVnR"],
    ["https://www.jimmyjazz.com"],
    ["https://shopnicekicks.com"],
    ["https://www.unknwn.com/"],
    ["https://juicestore.com/"],
    ["https://feature.com/"],
    ["https://www.saintalfred.com/"],
    ["https://www.dtlr.com/"],
    ["https://www.trophyroomstore.com/"],
    ["https://www.noirfonce.eu/"],
    ["https://eflash-us.doverstreetmarket.com/", "https://discordapp.com/api/webhooks/727203255242981387/Jv_Z_vPMt8OdYhWSuB8fHSVJ9kg2Cmp3TXZUWA7k8OM-cs73eiHc6ejDwxnEyi0d1JVM"],
    ["https://eflash.doverstreetmarket.com/", "https://discordapp.com/api/webhooks/727203339758207087/v3If89wghNneEU5Sdw2rTGERCQrbvOfQ25Hn-RxGUPzrQToCCzciy7nLc25G2iqDHFrA"],
    ["https://eflash-jp.doverstreetmarket.com/", "https://discordapp.com/api/webhooks/727203398440452097/suCkRQYvghmsIct8hNc3-LHNNIBp6e3fPC9WICg4NzSNNQTpaAkOzOHa4ZqJbvKVYmeB"],
    ["https://shop-usa.palaceskateboards.com/", "https://discordapp.com/api/webhooks/727203459300065343/ruOc2dnsN6QZZI_DC_d38SOXJnTLAvvfz1dg4UsFyVoLXRnnGvqRBVDXrLmqOVz8lrQJ"],
    ["https://kith.com/", "https://discordapp.com/api/webhooks/716362775617863760/YreueDZ1s5bgKe6jXAXdLl84PbwdS8w7yVNVO1sP7N9E-10u5RhVLZMfS7BGqUBnBnJR"],
    ["https://shop.travisscott.com/", "https://discordapp.com/api/webhooks/727203574534373539/SvN-qdKPW6U1pSlLaasQespDmOldu3PlC0y0OK5n5yRur-HsbBA-UtFGD5MffAZEYR5c"],
    ["https://cactusplantfleamarket.com/", "https://discordapp.com/api/webhooks/730951400196014140/MO5GCXfIbJotSUQJ_kphBEkCQXwpcWeMc190YNzDtXVahAlA7eH0aeKFpDZgYhK1cgb3"],
    ["https://shopnicekicks.com/collections/mens-kicks/", "https://discordapp.com/api/webhooks/716394891869028384/tRhbPnUip282e7oYpgHZJ8MhLvoVTuv-2UvLJZ_O5sXNWBiEhcn5wL2ajF0DsKO_2nUz"],
];

console.log("Starting!");

webhookUrls.map(url => setInterval(main, 5000, url[0], "products", [Webhooks.UNFILTERED, url[1] ? url[1] : undefined]));
