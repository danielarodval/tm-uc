# T&M Underground

Static marketing site intended for GitHub Pages.

## Asset build

The production Tailwind stylesheet and reduced local icon set are compiled and committed under `assets/`.

```sh
npm install
npm run build
```

Use `npm run watch:css` while editing HTML, `assets/app.js`, or `src/styles.css`, then run `npm run build` before committing. The icon build scans `index.html` and `assets/app.js` and includes only the Font Awesome icons referenced by the page.
