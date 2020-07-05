import axios from "axios";
import { compareData, Diff } from "./diff";
import extractSiteNameFromUrl from "./url";
const httpsProxyAgent = require("https-proxy-agent");

interface EmbedField {
    name: string,
    value: string,
    inline?: boolean
}

interface EmbedInterface {
    color: number,
    title: string,
    url?: string
    description?: string,
    thumbnail?: Record<string, string>
    fields: EmbedField[],
    image?: Record<string, string>,
    timestamp?: Date,
    footer?: Record<string, any>
}

class Embed {
    constructor (public embed: EmbedInterface, public webhookUrl: string) {
    }

    public sendEmbed = () => {
        axios({
            method: "POST",
            url: this.webhookUrl,
            data: {
                username: "Unknown",
                embeds: [this.embed],
            },
        })
            .catch(e => {
                throw e;
            });
    };

    public static diffsToEmbeds = (diffs: Diff[], url: string) => {
        console.log(`Url: ${url}`);
        const embeds = [];
        for (const diff of diffs) {
            const color = 0x008080;
            const title = `${diff.parent.company_url}`;
            const url = `${diff.parent.company_url}`;
            const footer = {
                text: `Project Unknown | Powered by https://discord.gg/24TqAYj | ${new Date().toLocaleString("en-US", {timeZone: "America/New_York"})}`
            };
            const fields = [
                {
                    name: "Title",
                    value: `[**${diff.parent.title}**](${diff.parent.company_url}products/${diff.parent.handle})`,
                    inline: true,
                },
                {
                    name: "SKU",
                    value: `${diff.variant.sku}`
                },
                {
                    name: "Size",
                    value: `${diff.sizes.reduce((acc, cur, idx) => acc + `[${cur}](${diff.parent.company_url}cart/${diff.parent.variants[idx].id}:1)` + "\n", "")}`,
                    inline: true,
                },
                {
                    name: "Price",
                    value: `$${diff.variant.price}`,
                    inline: true,
                },
                {
                    name: "Status",
                    value: `${diff.variant.available ? "In stock" : "Not in stock"}`,
                    inline: true,
                },
            ];
            const image = {
                url: diff.parent.images[0].src
            };
            embeds.push({
                title,
		        url,
                color,
                fields,
                image,
                footer
            });
        }
        return embeds.map(l => new Embed(l, url));
    };
}

const main = async (url: string, header: string, webhookUrl: string[], filters: string[] = []) => {
    const changes = await compareData(header, url, filters);
    console.log(`Changes: ${changes.length}`);
    if (changes.length > 0) {
        webhookUrl.map(url => Embed.diffsToEmbeds(changes, url).map(l => {
            l.sendEmbed();
        }));
    }
};

const isSiteDown = (url: string, proxy: string) => {
    const agent = new httpsProxyAgent(proxy);
    return new Promise(async (resolve, reject) => {
        let siteDown = false;
        try {
            const resp = await axios.request({url, httpsAgent: agent});
	    console.log(`Status: ${resp.status}`);
        } catch (e) {
            console.log(`Site down! ${e.response.status}`);
            siteDown = true;
            resolve(false);
        }
        if (!siteDown) {
            console.log(`Site up!`);
            resolve(true);
        }
    });
};

const monitorSiteStatus = (previous: boolean | null, url: string, webhook: string, proxy: string) => {
    console.log(`Monitioring ${url}`)
    if (isSiteDown(url, proxy) && previous === true) {
        const color = 0x008080;
        const title = `Password page for ${extractSiteNameFromUrl(url)} is up! 🔒`;
        const embeds = {color, title, fields: []};
        new Embed(embeds, webhook).sendEmbed();
        return true;
    } else if (!isSiteDown(url, proxy) && previous === false) {
        const color = 0x008080;
        const title = `Password page for ${extractSiteNameFromUrl(url)} is down! 🔒`;
        const embeds = {color, title, fields: []};
        new Embed(embeds, webhook).sendEmbed();
        return true;
    } else {
        return false;
    }
};

export { Embed, EmbedInterface, main, monitorSiteStatus };
