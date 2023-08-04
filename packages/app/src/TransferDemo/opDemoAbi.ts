// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const opDemoAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32[]', name: 'programHash', type: 'bytes32[]' },
          { internalType: 'bytes32[]', name: 'ctype', type: 'bytes32[]' },
          { internalType: 'address[]', name: 'attester', type: 'address[]' },
          { internalType: 'uint256[]', name: 'outputField', type: 'uint256[]' },
          {
            components: [{ internalType: 'uint256[]', name: 'constraintList', type: 'uint256[]' }],
            internalType: 'struct StableToken.Constraint[]',
            name: 'constraintConst',
            type: 'tuple[]'
          },
          { internalType: 'bool[]', name: 'isConst', type: 'bool[]' }
        ],
        internalType: 'struct StableToken.ConditionList',
        name: 'senderConditionList',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'bytes32[]', name: 'programHash', type: 'bytes32[]' },
          { internalType: 'bytes32[]', name: 'ctype', type: 'bytes32[]' },
          { internalType: 'address[]', name: 'attester', type: 'address[]' },
          { internalType: 'uint256[]', name: 'outputField', type: 'uint256[]' },
          {
            components: [{ internalType: 'uint256[]', name: 'constraintList', type: 'uint256[]' }],
            internalType: 'struct StableToken.Constraint[]',
            name: 'constraintConst',
            type: 'tuple[]'
          },
          { internalType: 'bool[]', name: 'isConst', type: 'bool[]' }
        ],
        internalType: 'struct StableToken.ConditionList',
        name: 'receiverConditionList',
        type: 'tuple'
      },
      { internalType: 'address', name: 'contractAddr', type: 'address' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { inputs: [], name: 'FaucetDisabled', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
    name: 'checkBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'userAddr', type: 'address' }],
    name: 'checkGetFaucet',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'userAddr', type: 'address' }],
    name: 'conditionalTransferCheckReceiver',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'userAddr', type: 'address' }],
    name: 'conditionalTransferCheckSender',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' }
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'getFaucet', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' }
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'contractAddr', type: 'address' }],
    name: 'modifyCheckingContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32[]', name: 'programHash', type: 'bytes32[]' },
          { internalType: 'bytes32[]', name: 'ctype', type: 'bytes32[]' },
          { internalType: 'address[]', name: 'attester', type: 'address[]' },
          { internalType: 'uint256[]', name: 'outputField', type: 'uint256[]' },
          {
            components: [{ internalType: 'uint256[]', name: 'constraintList', type: 'uint256[]' }],
            internalType: 'struct StableToken.Constraint[]',
            name: 'constraintConst',
            type: 'tuple[]'
          },
          { internalType: 'bool[]', name: 'isConst', type: 'bool[]' }
        ],
        internalType: 'struct StableToken.ConditionList',
        name: 'conditionList',
        type: 'tuple'
      }
    ],
    name: 'modifyReceiverConditionList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32[]', name: 'programHash', type: 'bytes32[]' },
          { internalType: 'bytes32[]', name: 'ctype', type: 'bytes32[]' },
          { internalType: 'address[]', name: 'attester', type: 'address[]' },
          { internalType: 'uint256[]', name: 'outputField', type: 'uint256[]' },
          {
            components: [{ internalType: 'uint256[]', name: 'constraintList', type: 'uint256[]' }],
            internalType: 'struct StableToken.Constraint[]',
            name: 'constraintConst',
            type: 'tuple[]'
          },
          { internalType: 'bool[]', name: 'isConst', type: 'bool[]' }
        ],
        internalType: 'struct StableToken.ConditionList',
        name: 'conditionList',
        type: 'tuple'
      }
    ],
    name: 'modifySenderConditionList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'toggleFaucetRequirement', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'toggleTransferCheck', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
