function UrlParamHash(url) {
    var params = {}, h;
    var hash = url.slice(url.indexOf("?") + 1).split('&');
    for (var i = 0; i < hash.length; i++) {
        h = hash[i].split("=");
        // params.push(h[0]);
        params[h[0]] = h[1];
    }
    return params;
}
export default {
    UrlParamHash
}