import { monitorSiteStatus } from "./webhook";

const monitorSite = (previous: boolean | null, url: string, webhook: string) => {
    const siteChanged = monitorSiteStatus(previous, url, webhook);
    console.log(`Site status: ${previous}`);
    setTimeout(monitorSite, 40000, siteChanged ? !previous : previous, url, webhook);
};

const stuff = [
    ["https://eflash-us.doverstreetmarket.com/", "https://discordapp.com/api/webhooks/716363146499063870/TzmRSsNnQJTK_u-JWtbinWHMMRZyEzeE9M4ET4Iragh54cIMuKx-VNxTwR2SRADLcK33"],
    ["https://shop.travisscott.com/", "https://discordapp.com/api/webhooks/716362929804542004/gdi4O-DFuwLIHkGXK8hilG85Wmz5ulIjLMQMzLyHf_aCwoT7MvR2FEh4fIQS9osXalYw"]
];

stuff.map(l => monitorSite(null, l[0], l[1]));

