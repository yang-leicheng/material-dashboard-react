const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_BASE_URL_PROD;

const Fetch = async (url = "", data = {}, type = "GET", method = "fetch") => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type === "GET") {
    let dataStr = ""; //数据拼接字符串
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });

    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
  }

  if (window.fetch && method === "fetch") {
    //这里写的是拦截器
    let requestConfig = {
      method: type,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jsyang-token"),
      },
    };

    if (type === "POST") {
      Object.defineProperty(requestConfig, "body", {
        value: JSON.stringify(data),
      });
    }

    try {
      const response = await fetch(url, requestConfig);
      console.log(response);
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.status === "error") {
        throw new Error(responseJson.message);
      }
      return responseJson;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
      }

      let sendData = "";
      if (type === "POST") {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response;
            if (typeof obj !== "object") {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          } else {
            reject(requestObj);
          }
        }
      };
    });
  }
};
export default Fetch;
