// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import fs from 'fs';
import { toString as mdastToString } from 'mdast-util-to-string';
import path from 'path';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { fileURLToPath } from 'url';

export const BumpLevels = {
  dep: 0,
  patch: 1,
  minor: 2,
  major: 3
} as const;

const dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(dirname, '../packages/app');
const changelog = fs.readFileSync(path.join(appDir, 'CHANGELOG.md'), 'utf8');
const appPkgJson = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'));
const release = getChangelogEntry(changelog, appPkgJson.version);

fs.writeFileSync(path.join(dirname, '../RELEASE.md'), release.content);

function getChangelogEntry(changelog: string, version: string) {
  const ast = unified().use(remarkParse).parse(changelog);

  let highestLevel: number = BumpLevels.dep;

  const nodes = ast.children as any[];
  let headingStartInfo:
    | {
        index: number;
        depth: number;
      }
    | undefined;
  let endIndex: number | undefined;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.type === 'heading') {
      const stringified: string = mdastToString(node);
      const match = stringified.toLowerCase().match(/(major|minor|patch)/);

      if (match !== null) {
        const level = BumpLevels[match[0] as 'major' | 'minor' | 'patch'];

        highestLevel = Math.max(level, highestLevel);
      }

      if (headingStartInfo === undefined && stringified === version) {
        headingStartInfo = {
          index: i,
          depth: node.depth
        };
        continue;
      }

      if (endIndex === undefined && headingStartInfo !== undefined && headingStartInfo.depth === node.depth) {
        endIndex = i;
        break;
      }
    }
  }

  if (headingStartInfo != null) {
    ast.children = (ast.children as any).slice(headingStartInfo.index + 1, endIndex);
  }

  return {
    content: `${unified().use(remarkStringify).stringify(ast)}
`,
    highestLevel
  };
}
