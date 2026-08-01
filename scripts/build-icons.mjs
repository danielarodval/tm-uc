import { readFile, writeFile } from 'node:fs/promises';
import {
  fas,
  faHardHat,
  faRing,
  faShield,
} from '@fortawesome/free-solid-svg-icons';

const sourcePaths = [
  new URL('../index.html', import.meta.url),
  new URL('../assets/app.js', import.meta.url),
];
const outputPath = new URL('../assets/icons.css', import.meta.url);
const source = (await Promise.all(sourcePaths.map((path) => readFile(path, 'utf8')))).join('\n');

const referencedIcons = [...new Set(
  [...source.matchAll(/\bfa-([a-z0-9-]+)\b/g)]
    .map((match) => match[1])
    .filter((name) => name !== 'solid'),
)].sort();

const iconsByName = new Map();
for (const icon of Object.values(fas)) {
  if (icon?.iconName && !iconsByName.has(icon.iconName)) {
    iconsByName.set(icon.iconName, icon);
  }
}

// Font Awesome keeps these legacy/pro class names out of the free iconName index.
// Map them to the closest free local glyph so no page icon silently disappears.
const fallbacks = new Map([
  ['hard-hat', faHardHat],
  ['pipe', faRing],
  ['shield-check', faShield],
]);

const cssRules = referencedIcons.map((name) => {
  const definition = iconsByName.get(name) ?? fallbacks.get(name);
  if (!definition) {
    throw new Error(`No local icon definition found for fa-${name}`);
  }

  const [width, height, , , pathData] = definition.icon;
  if (Array.isArray(pathData)) {
    throw new Error(`Unsupported layered icon definition for fa-${name}`);
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path d="${pathData}"/></svg>`;
  const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return `.fa-${name}{--local-icon:url("${dataUri}")}`;
});

const css = `/*!
 * Reduced local icon set generated from Font Awesome Free 6.7.2.
 * Font Awesome Free License: https://fontawesome.com/license/free
 * Icons: CC BY 4.0; code: MIT License.
 */
.fa-solid {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
  vertical-align: -0.125em;
  background-color: currentColor;
  -webkit-mask: var(--local-icon) center / contain no-repeat;
  mask: var(--local-icon) center / contain no-repeat;
}
${cssRules.join('\n')}
`;

await writeFile(outputPath, css);
console.log(`Generated ${referencedIcons.length} local icons in assets/icons.css`);
