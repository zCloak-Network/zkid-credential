// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

export const CTypeIcon: React.FC<{ color?: string }> = ({ color = '#7f7f7f' }) => (
  <svg height='13.867' viewBox='0 0 16 13.867' width='16' xmlns='http://www.w3.org/2000/svg'>
    <defs></defs>
    <path
      d='M48,97.067A1.067,1.067,0,0,0,46.933,96H33.067A1.067,1.067,0,0,0,32,97.067v1.6a1.067,1.067,0,0,0,1.067,1.067H46.933A1.067,1.067,0,0,0,48,98.667ZM33.067,108.736a1.1,1.1,0,0,0,1.067,1.131H45.867a1.1,1.1,0,0,0,1.067-1.131V100.8H33.067Zm5.333-5.8h3.2a1.067,1.067,0,0,1,0,2.133H38.4a1.067,1.067,0,0,1,0-2.133Z'
      fill={color}
      transform='translate(-32 -96)'
    />
  </svg>
);

export const ClaimsIcon: React.FC<{ color?: string }> = ({ color = '#7f7f7f' }) => (
  <svg height='14.652' viewBox='0 0 16 14.652' width='16' xmlns='http://www.w3.org/2000/svg'>
    <defs></defs>
    <path
      d='M99.733,106.667a1.572,1.572,0,0,1,1.6,1.542v3.856a1.929,1.929,0,1,0,0,3.856v3.856a1.572,1.572,0,0,1-1.6,1.542h-12.8a1.572,1.572,0,0,1-1.6-1.542v-3.856a1.929,1.929,0,1,0,0-3.856v-3.856a1.572,1.572,0,0,1,1.6-1.542Zm-4,8.869h-4.8a.771.771,0,1,0-.06,1.54l.06,0h4.8a.771.771,0,1,0,.06-1.54Zm0-4.627h-4.8a.771.771,0,1,0-.06,1.54l.06,0h4.8a.771.771,0,1,0,.06-1.54Z'
      fill={color}
      transform='translate(-85.333 -106.667)'
    />
  </svg>
);

export const MessageIcon: React.FC<{ color?: string }> = ({ color = '#7f7f7f' }) => (
  <svg height='10.122' viewBox='0 0 16 10.122' width='16' xmlns='http://www.w3.org/2000/svg'>
    <defs></defs>
    <g transform='translate(0)'>
      <path
        d='M16.5,176.964v.2l-7.1,3.609a2.069,2.069,0,0,1-1.847.011L.5,177.292v-.328a.983.983,0,0,1,1-.964h14A.983.983,0,0,1,16.5,176.964Z'
        fill={color}
        transform='translate(-0.5 -176)'
      />
      <path
        d='M16.5,325.7v6.9a.983.983,0,0,1-1,.964H1.5a.983.983,0,0,1-1-.964v-6.782l7.063,3.494a2.061,2.061,0,0,0,1.845-.011Z'
        fill={color}
        transform='translate(-0.5 -323.445)'
      />
    </g>
  </svg>
);
