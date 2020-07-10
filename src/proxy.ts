import axios from "axios";

export const getProxyUrls = async () => {
    const response = await axios({
        method: "GET",
        url: "https://api.projectunkn.com/api/proxies/"
    });
    return response.data.map(l => l.proxy).map(proxyToUrl);
}

const proxyToUrl = (proxy: string) => {
    const splitProxy = proxy.split(":");
    const reorganizedProxy = [[splitProxy[2], splitProxy[3]], [splitProxy[0], splitProxy[1]]];
    const joinedProxy = reorganizedProxy.map(l => l.join(":")).join("@");
    return `http://${joinedProxy}`;
}