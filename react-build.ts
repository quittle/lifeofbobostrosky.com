import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import process from "process";
import path from "path";
import { SheetsRegistry, JssProvider } from "react-jss";

function main() {
  const args = process.argv;
  const [_node, _script, outFile, appRoot] = args;

  const AppElement: any = require(path.join(__dirname, appRoot)).default;

  const sheets = new SheetsRegistry();

  const appHtml = ReactDOMServer.renderToString(
    React.createElement(
      JssProvider,
      {
        registry: sheets,
        children: [],
      },
      React.createElement(AppElement)
    )
  );
  const styledHtml = appHtml.replace(
    "<style />",
    "<style>" + sheets.toString() + "</style>"
  );

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, styledHtml);
}

main();
