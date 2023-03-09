// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function execSync(cmd: string) {
  console.log(`$ ${cmd}`);

  cp.execSync(cmd, { stdio: 'inherit' });
}

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(dirname, '../packages/app');
const appPkgJson = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'));

const version = appPkgJson.version;

execSync(`git tag v${version}`);
