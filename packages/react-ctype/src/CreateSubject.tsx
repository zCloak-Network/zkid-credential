// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from './types';

import React from 'react';

import { SchemaBase } from './Schema';

function CreateSubject(props: CTypeSchemaProps) {
  return <SchemaBase {...props} />;
}

export default React.memo(CreateSubject);
