import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import process from "process";
import path from "path";

function main(args) {
  const [_node, _script, outFile, appRoot] = args;

  fs.rmSync(outFile, { force: true });
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  const AppElement = require(path.join(__dirname, appRoot)).default;
  const appHtml = ReactDOMServer.renderToString(<AppElement />);

  fs.writeFileSync(outFile, appHtml);
}

main(process.argv);
