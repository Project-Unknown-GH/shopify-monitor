import * as fs from "fs";

const getProxyUrlsRaw = (): Promise<string[]> => {
    return new Promise(res => {
        fs.readFile("proxies.txt", "utf-8", (err, data) => {
            if (err) throw err;
            const splitData = data.split("\n");
            res(splitData.map(proxyToUrl));
        })
    })    
};

export const getProxyUrls = async () => {
    const response = await getProxyUrlsRaw();
    return response.map(proxyToUrl);
}

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
}