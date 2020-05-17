import axios from "axios";

interface EmbedField {
    name: string,
    value: string,
    inline?: boolean
}

interface EmbedAuthor {
    name: string,
    icon_url: string,
    url?: string
}

interface EmbedInterface {
    color: number,
    title: string,
    url?: string,
    author: EmbedAuthor,
    description?: string,
    thumbnail?: Record<string, string>
    fields: EmbedField[],
    image?: Record<string, string>,
    timestamp?: Date,
    footer?: Record<string, any>
}

class Embed {
    constructor (public embed: EmbedInterface) {}
    public sendEmbed () {
        axios({method: "GET", url: "https://discordapp.com/api/webhooks/708285711006171156/wpGG8gARQpC0hY5ZG2g3zgzwNfeH0ryHGvnzxISRFIQ1dn7qwVB7YTO3XZhuAr1g-ChE", data: {content: this.embed}});
    }
}

export { Embed, EmbedInterface }
