# 🪦 Life of Robert Ostrosky

A site dedicating to honoring life and memories of Robert Ostrosky.

## Build

This builds entirely using NPM script targets from the [`package.json`](./package.json). It is a bit unique in that it has a two part build which is abstracted away behind the build of course.

1. [`react-build.ts`](./react-build.ts) is invoked, performing a build-time only inflaction of a React app. React is just the templating engine used and is not shipped to the end site, just the rendered HTML. The styling for this site uses [JSS](https://cssinjs.org/), which is a little funny because wrote my own tool called [JSS](https://github.com/quittle/JSS), but it worked entirely differntly. The styles are captured in a context at the `react-build.ts` level and are stored in a separate CSS file. A reference to this stylesheet is then placed in a new JS script, not the HTML. This is to support the next step.
2. After building [`webpack`](./webpack.config.js) uses the `HtmlWebpackPlugin` to bundle the actual site and perform minimization a such. Bundling is neceessary for things like images and fonts which are not inlined in the generated HTML and CSS. The JS script that imports the stylesheet is just there to hook in as the webpack entrypoint so it understands how to attach the CSS to the script and handle the bundling. If runtime JS is needed in the future it should be imported by this generated JS script and not be part of the react app.

```bash
$ npm install
# Sets up live rebuilding and reloading of the site
$ npm run build-serve
# Runs all tests and static analysis
$ npm run build-and-test
```

## Deployment

Not set up yet.
