import { main } from "./webhook";

const url = process.argv[2];
const webhook = process.argv[3];

setInterval(main, 30000, url, "cmd", webhook);
