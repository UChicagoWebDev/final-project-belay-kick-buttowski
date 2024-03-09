export async function createUrl(endPoint, requestBody, requestHeader, endType){
    let url = endPoint + (Object.keys(requestBody).length > 0 
                          ? ("?" + Object.keys(requestBody).map((key) => key + "=" + encodeURIComponent(requestBody[key])).join("&")) 
                          : "");

    const urlHeaders = new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Api-Key": localStorage.getItem('harshajulakanti-API-KEY'),
        "User-Id": localStorage.getItem('harshajulakanti-User-Id')
    });
  
    Object.keys(requestHeader).forEach(function(key) {
      urlHeaders.append(key, requestHeader[key]);
    });
  
    const myInit = {
      method: endType,
      headers: urlHeaders,
    };

    let data = await fetch(url, myInit);
    let jsonForm = await data.json();
    return jsonForm
}

export function isLoggedin() {
  return !(localStorage.getItem('harshajulakanti-API-KEY') == null || localStorage.getItem('harshajulakanti-API-KEY') == '')
};
