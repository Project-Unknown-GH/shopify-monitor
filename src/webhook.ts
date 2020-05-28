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
                    name: "Description",
                    value: `${diff.parent.body_html.replace(/(<[^>]*>)/g, "").replace(/\n/g, " ")}`,
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
            embeds.push({
                title,
                color,
                fields,
            });
        }
        return embeds.map(l => new Embed(l, url));
    };
}

const main = async (urls: string[], header: string, webhookUrl: string) => {
    console.log(new Date());
    const fullChanges = await Promise.all(urls.map(async l => await compareData(header, l)));
    console.log(`Changes: ${fullChanges.reduce((acc, cur) => acc + cur.length, 0)}`);
    for (const changes of fullChanges) {
        if (changes.length > 0) {
            Embed.diffsToEmbeds(changes, webhookUrl).map(l => {
                l.sendEmbed();
            });
        }
    }
};

const urls = [
    "https://undefeated.com/",
    "https://www.addictmiami.com/",
    "https://www.abovethecloudsstore.com/",
    "https://www.jimmyjazz.com/",
    "https://kith.com/",
    "https://dope-factory.com/",
];

console.log("Starting!");
setInterval(main, 30000, urls, "products", "https://discordapp.com/api/webhooks/710813058284519466/7NfyY_-rh6JinUBEuAMsn9QWPlZzbndTNi-CgF-WY9khfjsEcxOgESTbcwYtHDJ_wSSS");

export { Embed, EmbedInterface, main };
