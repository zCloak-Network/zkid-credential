// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InputStringProps } from './types';

import React from 'react';

import Input from './Input';

function InputString({ onChange, ...props }: InputStringProps) {
  return <Input onChange={onChange} {...props} />;
}

export default React.memo(InputString);
