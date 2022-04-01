import ReactDOMServer from "react-dom/server";
import React from "react";
import fs from "fs";
import process from "process";
import path from "path";
import { SheetsRegistry, JssProvider } from "react-jss";

function main(args) {
  const [_node, _script, outFile, appRoot] = args;

  fs.rmSync(outFile, { force: true });
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

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

  fs.writeFileSync(outFile, styledHtml);
}

main(process.argv);
