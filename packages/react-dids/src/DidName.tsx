// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import React, { useMemo } from 'react';

import { isDidUrl } from '@zcloak/did/utils';
import { parseDid } from '@zcloak/did-resolver/parseDid';

import { Address } from '@credential/react-components';

interface Props {
  value?: DidUrl | undefined | null;
  shorten?: boolean;
}

const DidName: React.FC<Props> = ({ shorten = true, value }) => {
  const identifier: string = useMemo(() => {
    if (!value) return '0x';

    if (!isDidUrl(value)) return '0x';

    const { identifier } = parseDid(value);

    return identifier;
  }, [value]);

  return (
    <>
      did:zk:
      <Address shorten={shorten} value={identifier} />
    </>
  );
};

export default React.memo(DidName);
