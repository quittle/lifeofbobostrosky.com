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

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const AppElement: React.FunctionComponent = require(path.join(
    __dirname,
    appRoot
  )).default;

  const sheets = new SheetsRegistry();

  const appHtml = ReactDOMServer.renderToStaticMarkup(
    // eslint-disable-next-line react/no-children-prop
    React.createElement(
      JssProvider,
      {
        registry: sheets,
        children: null,
      },
      React.createElement(AppElement)
    )
  );

  const css = sheets.toString();

  writeFileWithDirectory(outHtmlFile, `<!DOCTYPE html> ${appHtml}`);

  writeFileWithDirectory(outCssFile, css);

  const relativeCssFile = path.relative(path.dirname(outJsFile), outCssFile);
  const relativeRuntimeJsFile = path.relative(
    path.dirname(outJsFile),
    runtimeJsFile
  );
  writeFileWithDirectory(
    outJsFile,
    `
    import './${relativeCssFile}';
    import './${relativeRuntimeJsFile}';
    `
  );
}

main();
