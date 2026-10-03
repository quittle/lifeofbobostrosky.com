import { JssProvider, SheetsRegistry } from "react-jss";
import React from "react";
import ReactDOMServer from "react-dom/server";

import fs from "fs";
import path from "path";
import process from "process";

function writeFileWithDirectory(filePath: string, contents: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
}

function main(): void {
  const args = process.argv;
  const [
    _node,
    _script,
    runtimeJsFile,
    outHtmlFile,
    outCssFile,
    outJsFile,
    appRoot,
  ] = args;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const AppElement: React.FunctionComponent = require(
    path.join(__dirname, appRoot),
  ).default;

  const sheets = new SheetsRegistry();

  const appHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(
      JssProvider,
      {
        registry: sheets,
        // eslint-disable-next-line @eslint-react/jsx-no-children-prop, @eslint-react/jsx-no-children-prop-with-children -- JssProvider takes children: null alongside the rendered child element
        children: null,
      },
      React.createElement(AppElement),
    ),
  );

  const css = sheets.toString();

  writeFileWithDirectory(outHtmlFile, `<!DOCTYPE html> ${appHtml}`);

  writeFileWithDirectory(outCssFile, css);

  const relativeCssFile = path.relative(path.dirname(outJsFile), outCssFile);
  const relativeRuntimeJsFile = path.relative(
    path.dirname(outJsFile),
    runtimeJsFile,
  );
  writeFileWithDirectory(
    outJsFile,
    `
    import './${relativeCssFile}';
    import './${relativeRuntimeJsFile}';
    `,
  );
}

main();
