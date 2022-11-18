// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

const Address: React.FC<{ value?: string | null; shorten?: boolean }> = ({
  shorten = true,
  value
}) => {
  if (!value) {
    return null;
  }

  return shorten ? (
    <>
      {value.slice(0, 6)}...{value.slice(-6)}
    </>
  ) : (
    <>{value}</>
  );
};

export default React.memo(Address);
