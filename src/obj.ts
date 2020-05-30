import { main } from "./webhook";

const urls = [
    ["https://kith.com/collections/mens-footwear", "https://discordapp.com/api/webhooks/716362775617863760/YreueDZ1s5bgKe6jXAXdLl84PbwdS8w7yVNVO1sP7N9E-10u5RhVLZMfS7BGqUBnBnJR"],
    ["https://undefeated.com/collections/mens-footwear", "https://discordapp.com/api/webhooks/716362702192377856/LhHQfaiC24w4urcH7tmkoAodQvvXx594pKLrRCBeHjfEvmtsSfayR-Dk5ppSPjUK74LD"]
];

urls.map(l => setInterval(main, 30000, l[0], "objs", l[1]));
