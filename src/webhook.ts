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
    constructor (public embed: EmbedInterface) {
    }

    public sendEmbed = () => {
        console.log("Sending", this.embed);
        axios({
            method: "POST",
            url: "https://discordapp.com/api/webhooks/710813058284519466/7NfyY_-rh6JinUBEuAMsn9QWPlZzbndTNi-CgF-WY9khfjsEcxOgESTbcwYtHDJ_wSSS",
            data: {
                username: "ShopifyMonitor",
                avatar_url: "https://lh3.googleusercontent.com/proxy/9zW0ZlyKMfZgpEwTs4zKxjC9kjd40IgQHZnZoPXBjbO_idOWgrqGdyzUukE45BnGR5f7IPIDSXQ7RTQbkZruOpVkG1_s198",
                embeds: [this.embed],
            },
        })
            .catch(e => {
                throw e;
            });
    };

    public static diffsToEmbeds = (diffs: Diff[]) => {
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
                    value: `[Click here](${diff.parent.company_url}/product/${diff.parent.handle})`,
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
        return embeds.map(l => new Embed(l));
    };
}

const main = async (urls: string[]) => {
    const fullChanges = await Promise.all(urls.map(async l => await compareData(l)));
    for (const changes of fullChanges) {
        console.log(`Changes: ${changes.length}`);
        if (changes.length > 0) {
            Embed.diffsToEmbeds(changes).map(l => {
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

main(urls);

export { Embed, EmbedInterface };
