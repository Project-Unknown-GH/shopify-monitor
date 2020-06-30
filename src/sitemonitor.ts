import { monitorSiteStatus } from "./webhook";

const monitorSite = (previous: boolean | null, url: string, webhook: string, proxy: string) => {
    const siteChanged = monitorSiteStatus(previous, url, webhook, proxy);
    console.log(`Site status: ${previous}`);
    setTimeout(monitorSite, 10000, siteChanged ? !previous : previous, url, webhook, proxy);
};

const stuff = [
    ["https://eflash-us.doverstreetmarket.com/", "https://discord.com/api/webhooks/726133952469008397/aENg94lwsRmsCTVuKkOqZmcagZdschiCKdzzzoeBSDUMbKYoPVCvFiaV62ik3ST6-iSc"],
    ["https://shop.travisscott.com/", "https://discord.com/api/webhooks/726133952469008397/aENg94lwsRmsCTVuKkOqZmcagZdschiCKdzzzoeBSDUMbKYoPVCvFiaV62ik3ST6-iSc"]
];

const proxy = "http://Ghd897!a65:dSPCGH3p@51.81.97.125:33128"

stuff.map(l => monitorSite(null, l[0], l[1], proxy));

