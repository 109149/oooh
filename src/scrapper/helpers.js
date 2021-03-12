function combinedFileFormatTemplate() {
  return (info) => {
    if (info.msgObj) {
      const method = info.msgObj.Method
        ? `| Method: ${info.msgObj.Method}`
        : "";
      const path = info.msgObj.Path ? `| Path: ${info.msgObj.Path}` : "";
      const ip = info.msgObj.IP ? `| IP: ${info.msgObj.IP}` : "";
      const body = info.msgObj.Body ? `| Body: ${info.msgObj.Body}` : "";
      const protocol = info.msgObj.Protocol
        ? `| Protocol: ${info.msgObj.Protocol}`
        : "";
      const secCon = info.msgObj["Secure Connection"]
        ? `| Secure Connection: ${info.msgObj["Secure Connection"]}`
        : "";
      const contType = info.msgObj["Content-Type"]
        ? `| Content-Type: ${info.msgObj["Content-Type"]}`
        : "";
      const msg = info.message.length > 0 ? `| message: ${info.message}` : "";
      return `${
        info.timestamp
      } | ${info.level.toUpperCase()} ${method} ${path} ${ip} ${body} ${protocol} ${secCon} ${contType} ${msg}`;
    }
    return `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`;
  };
}

function errorFileFormatTemplate() {
  return (info) => {
    if (info.msgObj) {
      const error = info.msgObj.ERROR ? `| ERROR: ${info.msgObj.ERROR}` : "";
      const ip = info.msgObj.IP ? `| IP: ${info.msgObj.IP}` : "";
      const method = info.msgObj.Method
        ? `| Method: ${info.msgObj.Method}`
        : "";
      const originalUrl = info.msgObj["Original URL"]
        ? `| Original URL: ${info.msgObj["Original URL"]}`
        : "";
      const body = info.msgObj.Body
        ? `| Body: ${JSON.stringify(info.msgObj.Body)}`
        : "";
      const params = info.msgObj.Params
        ? `| Params: ${JSON.stringify(info.msgObj.Params)}`
        : "";
      const query = info.msgObj.Query
        ? `| Query: ${JSON.stringify(info.msgObj.Query)}`
        : "";
      const msg = info.message ? `| message: ${info.message}` : "";
      const stack = info.msgObj.stack ? `| stack: ${info.msgObj.stack}` : "";
      return `${
        info.timestamp
      } | ${info.level.toUpperCase()} ${error} ${ip} ${method} ${originalUrl} ${body} ${params} ${query} ${msg} ${stack}`;
    }
    return `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`;
  };
}

function logFormatTemplate() {
  return (info) => {
    if (info.msgObj) {
      const method = info.msgObj.Method
        ? `\nMethod: ${info.msgObj.Method}`
        : "";
      const path = info.msgObj.Path ? `\nPath: ${info.msgObj.Path}` : "";
      const ip = info.msgObj.IP ? `\nIP: ${info.msgObj.IP}` : "";
      const body = info.msgObj.Body
        ? `\nBody: ${JSON.stringify(info.msgObj.Body)}`
        : "";
      const protocol = info.msgObj.Protocol
        ? `\nProtocol: ${info.msgObj.Protocol}`
        : "";
      const secCon = info.msgObj["Secure Connection"]
        ? `\nSecure Connection: ${info.msgObj["Secure Connection"]}`
        : "";
      const contType = info.msgObj["Content-Type"]
        ? `\nContent-Type: ${info.msgObj["Content-Type"]}`
        : "";
      const msg = info.message ? `\nmessage: ${info.message}` : "";
      const stack = info.msgObj.stack ? `\nstack: ${info.msgObj.stack}` : "";
      return `${info.timestamp} ${info.level} ${method} ${path} ${ip} ${body} ${protocol} ${secCon} ${contType} ${msg} ${stack}\n---`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
  };
}

module.exports = {
  logFormatTemplate,
  combinedFileFormatTemplate,
  errorFileFormatTemplate,
};
