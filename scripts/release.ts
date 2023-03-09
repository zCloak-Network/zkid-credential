// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import cp from 'child_process';

console.log('$ zkid-credential-release', process.argv.slice(2).join(' '));

function execSync(cmd: string) {
  console.log(`$ ${cmd}`);

  cp.execSync(cmd, { stdio: 'inherit' });
}

function runClean() {
  execSync('yarn zcloak-dev-clean-build');
}

function runCheck() {
  execSync('yarn lint');
}

function runTest() {
  execSync('yarn test');
}

function runBuild() {
  execSync('yarn build');
}

runClean();
runCheck();
runTest();
runBuild();
