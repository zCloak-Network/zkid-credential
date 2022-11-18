const fs = require('fs-extra');
const path = require('path');
const humps = require('humps');
const { parse } = require('node-html-parser');
const { execSync } = require('child_process');

function main() {
  const assets = fs.readdirSync('packages/app-config/src/assets');

  fs.removeSync('packages/app-config/src/icons', { recursive: true });
  fs.mkdirSync('packages/app-config/src/icons');

  const icons = [];

  for (const asset of assets) {
    if (!asset.endsWith('.svg')) continue;
    const fileName = humps.pascalize(asset.split('.svg')[0]);
    const svgName = humps.pascalize(asset.replace('.', '_'));

    const viewBox = parse(
      fs.readFileSync(path.join('packages/app-config/src/assets/', asset)).toString()
    ).getElementsByTagName('svg')[0].attributes.viewBox;
    const width = parse(
      fs.readFileSync(path.join('packages/app-config/src/assets/', asset)).toString()
    ).getElementsByTagName('svg')[0].attributes.width;
    const height = parse(
      fs.readFileSync(path.join('packages/app-config/src/assets/', asset)).toString()
    ).getElementsByTagName('svg')[0].attributes.height;

    console.log(`write ${fileName}.tsx`);
    fs.writeFileSync(
      `packages/app-config/src/icons/${fileName}.tsx`,
      `// generate by buildAssets.js
import { SvgIcon } from '@mui/material';
import React from 'react';

import ${svgName} from '${`../assets/${asset}`}';

function ${fileName}(props: any) {
  return <SvgIcon component={${svgName}} viewBox="${viewBox}" {...props} sx={{ width: ${width}, height: ${height}, ...props?.sx }} />;
}

export default React.memo(${fileName});
`
    );
    icons.push(fileName);
  }

  fs.writeFileSync(
    'packages/app-config/src/icons/index.tsx',
    `// generate by buildAssets.js

${icons.map((icon) => `export { default as ${icon} } from './${icon}';`).join('\n')}
`
  );

  fs.writeFileSync(
    'packages/app-config/src/images.ts',
    `// generate by buildAssets.js

`
  );

  for (const asset of assets) {
    if (asset.endsWith('.svg')) continue;
    const fileName = humps.pascalize(asset.split('.')[0]);

    fs.appendFileSync(
      'packages/app-config/src/images.ts',
      `export { default as ${fileName} } from './assets/${asset}'
`
    );
  }

  execSync(
    'yarn zcloak-exec-eslint --fix --ext .js,.cjs,.mjs,.ts,.tsx packages/app-config/src/icons packages/app-config/src/images.ts',
    {
      stdio: 'inherit'
    }
  );
}

main();
