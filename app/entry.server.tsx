//import type { EntryContext } from "@remix-run/core";
//import Remix from "@remix-run/react/server";
//import { renderToString } from "react-dom/server";
//import { ServerStyleSheet } from "styled-components";
//import StylesContext from "./stylesContext";

//export default function handleRequest(
//request: Request,
//responseStatusCode: number,
//responseHeaders: Headers,
//remixContext: EntryContext
//) {
//const sheet = new ServerStyleSheet();

//// first pass to collect styles
//renderToString(
//sheet.collectStyles(
//<StylesContext.Provider value={null}>
//<Remix context={remixContext} url={request.url} />
//</StylesContext.Provider>
//)
//);

//// get the styles
//const styles = sheet.getStyleTags();
//sheet.seal();

//// second time with the styles on context
//let markup = renderToString(
//<StylesContext.Provider value={styles}>
//<Remix context={remixContext} url={request.url} />
//</StylesContext.Provider>
//);

//return new Response("<!DOCTYPE html>" + markup, {
//status: responseStatusCode,
//headers: responseHeaders,
//});
//}

import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
