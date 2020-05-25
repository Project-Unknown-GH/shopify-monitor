const extractSiteNameFromUrl = (url: string) => {
    console.log(`Extracting from ${url}`);
    let domain = url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];

    if (domain.indexOf("www.") > -1) {
        domain = domain.split('www.')[1];
    }
    if (domain.indexOf("ftp.") > -1) {
        domain = domain.split('ftp.')[1];
    }

    domain = domain.split(':')[0];
    domain = domain.split('?')[0];
    domain = domain.split('.')[0];

    return domain;
};

export default extractSiteNameFromUrl;
