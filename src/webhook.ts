import axios from "axios";
import { compareData, Diff } from "./diff";
import extractSiteNameFromUrl from "./url";

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
            const title = `${extractSiteNameFromUrl(diff.parent.company_url)} stock changed!`;
            const fields = [
                {
                    name: "Title",
                    value: `**${diff.parent.title}**`,
                    inline: true,
                },
                {
                    name: "Size",
                    value: `${diff.variant.title}`,
                    inline: true,
                },
                {
                    name: "Price",
                    value: `$${diff.variant.price}`,
                    inline: true,
                },
                {
                    name: "Link",
                    value: `[Click here](${diff.parent.company_url}products/${diff.parent.handle})`,
                    inline: true,
                },
                {
                    name: "Status",
                    value: `${diff.variant.available ? "Available" : "Not available"}`,
                    inline: true,
                },
            ];
            const image = {
                url: diff.parent.images[0].src
            };
            embeds.push({
                title,
                color,
                fields,
                image
            });
        }
        return embeds.map(l => new Embed(l, url));
    };
}

const main = async (url: string, header: string, webhookUrl: string[]) => {
    console.log(new Date());
    const changes = await compareData(header, url);
    console.log(`Changes: ${changes.length}`);
    if (changes.length > 0) {
        webhookUrl.map(url => Embed.diffsToEmbeds(changes, url).map(l => {
            l.sendEmbed();
        }));
    }
};

const isSiteDown = (url: string) => {
    return new Promise(async (resolve, reject) => {
        let siteDown = false;
        try {
            await axios.get(url);
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

const monitorSiteStatus = (previous: boolean | null, url: string, webhook: string) => {
    console.log(`Monitioring ${url}`)
    if (isSiteDown(url) && previous === true) {
        const color = 0x008080;
        const title = `Password page for ${extractSiteNameFromUrl(url)} is up! 🔒`;
        const embeds = {color, title, fields: []};
        new Embed(embeds, webhook).sendEmbed();
        return true;
    } else if (!isSiteDown(url) && previous === false) {
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
