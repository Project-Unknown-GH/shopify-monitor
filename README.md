# Shopify monitor

This is a shopify monitor.

## How to use

- Run `npm install`. Make sure that you have npm installed before doing this, you can download it for free with Node.JS (which is also necessary).
- Run `npm run build`. This builds the files and outputs it in the `dist` folder.
- Place your urls in files named `urls_main.txt` or `urls_filtered.txt`. These will go in the `dist` folder. These are the urls for the sites that are checked by the monitor. Keep the url structure as `https://kith.com/`, and note the https and / at the end.
- Place your webhooks in files named `webhooks_main.txt` or `webhooks_filtered.txt`. These will all go in the `dist` folder. These are webhooks for the main urls, and webhooks for the filtered urls.
- Place your filters in a file named `filters.txt`. This is in the `dist` folder. Make sure that the filtesr are separated by line breaks, not commas.
  - Note: the filtering algorithm is not very complex, as I don't do stuff with matching spelling errors, etc, so please make sure that everything is spelled correctly.
- Place your proxies in a file named `proxies.txt`. This is also in the `dist` folder.
- To run the monitor, run `shop-main.js` or `shop-filtered.js`. This will be in the `dist` folder. Tools like `pm2` can be used to keep this process alive forever, or at least until it is stopped or the computer turns off.

## Advanced config

To change how often a monitor checks for restocks, you have 2 options:
- Edit the `dist/shop-setting.js` file directly - this is faster, and does not require rebuilding, but note that your changes will be overridden in the next build
- Edit the `src/shop-setting.ts` file - this requires you to run `npm run build` again, but your changes will be saved.

If you are editing the source file, the line on which the interval is is on line 16. If you are editing the compiled file, the line will be line 36.

Which line to find the intervals:
- Source
  - Main - 27
  - Filtered - 38
- Compiled
  - Main - 72
  - Filtered - 84

Note that the interval is in milliseconds (e.g. 5000 milliseconds is 5 seconds)