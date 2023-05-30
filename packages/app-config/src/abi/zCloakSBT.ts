// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const zCloakSBTAbi = [
  {
    inputs: [{ internalType: 'address[]', name: '_trustedVerifiers', type: 'address[]' }],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { inputs: [], name: 'AlreadyMint', type: 'error' },
  { inputs: [], name: 'AlreadySetKey', type: 'error' },
  { inputs: [], name: 'AttesterSignatureInvalid', type: 'error' },
  { inputs: [], name: 'BindingAlreadyOccupied', type: 'error' },
  { inputs: [], name: 'BindingNotExist', type: 'error' },
  { inputs: [], name: 'BindingSignatureInvalid', type: 'error' },
  { inputs: [], name: 'DigestAlreadyRevoked', type: 'error' },
  { inputs: [], name: 'MintDisabled', type: 'error' },
  { inputs: [], name: 'MintInfoInvalid', type: 'error' },
  { inputs: [], name: 'NotSetKey', type: 'error' },
  { inputs: [], name: 'Soulbound', type: 'error' },
  { inputs: [], name: 'TokenNotExist', type: 'error' },
  { inputs: [], name: 'UnBindingLimited', type: 'error' },
  { inputs: [], name: 'VCAlreadyExpired', type: 'error' },
  { inputs: [], name: 'VerifierNotInWhitelist', type: 'error' },
  { inputs: [], name: 'vcVersionNotValid', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'approved', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' }
    ],
    name: 'ApprovalForAll',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'bindingAddr', type: 'address' },
      { indexed: true, internalType: 'address', name: 'bindedAddr', type: 'address' }
    ],
    name: 'BindingSetSuccess',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'recipent', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenID', type: 'uint256' }
    ],
    name: 'MintSuccess',
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
      { indexed: true, internalType: 'address', name: 'attester', type: 'address' },
      { indexed: false, internalType: 'uint256[]', name: 'tokenIDList', type: 'uint256[]' }
    ],
    name: 'RevokeSuccess',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'bindingAddr', type: 'address' },
      { indexed: true, internalType: 'address', name: 'bindedAddr', type: 'address' }
    ],
    name: 'UnBindingSuccess',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address[]', name: 'verifiers', type: 'address[]' }],
    name: 'VerifierWhiteListAdd',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address[]', name: 'verifiers', type: 'address[]' }],
    name: 'VerifierWhiteListDelete',
    type: 'event'
  },
  {
    inputs: [],
    name: 'CHAIN_ID',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'addressToCheck', type: 'address' }],
    name: 'checkAssertionMethod',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'bindingAddr', type: 'address' }],
    name: 'checkBindingDB',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'bindingAddr', type: 'address' }],
    name: 'checkBindingSBTDB',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'attester', type: 'address' },
      { internalType: 'bytes32', name: 'digest', type: 'bytes32' }
    ],
    name: 'checkDigestConvertCollection',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'attester', type: 'address' },
      { internalType: 'bytes32', name: 'digest', type: 'bytes32' }
    ],
    name: 'checkRevokeDB',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'userAddr', type: 'address' },
      { internalType: 'address', name: 'attester', type: 'address' },
      { internalType: 'bytes32', name: 'programHash', type: 'bytes32' },
      { internalType: 'bytes32', name: 'ctype', type: 'bytes32' }
    ],
    name: 'checkSBTClassValid',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'bytes32', name: 'ctype', type: 'bytes32' },
          { internalType: 'bytes32', name: 'programHash', type: 'bytes32' },
          { internalType: 'bytes32', name: 'digest', type: 'bytes32' },
          { internalType: 'address', name: 'attester', type: 'address' },
          { internalType: 'uint64[]', name: 'output', type: 'uint64[]' },
          { internalType: 'uint64', name: 'mintTimestamp', type: 'uint64' },
          { internalType: 'uint64', name: 'issuanceTimestamp', type: 'uint64' },
          { internalType: 'uint64', name: 'expirationTimestamp', type: 'uint64' },
          { internalType: 'bytes2', name: 'vcVersion', type: 'bytes2' },
          { internalType: 'string', name: 'sbtLink', type: 'string' }
        ],
        internalType: 'struct Tokens.TokenOnChain',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenID', type: 'uint256' }],
    name: 'checkTokenExist',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'checkTokenValid',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'verifier', type: 'address' }],
    name: 'checkVerifierWhitelist',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'verifier', type: 'address' }],
    name: 'checkVerifierWorkDB',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'contractURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' }
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'bytes32', name: 'ctype', type: 'bytes32' },
          { internalType: 'bytes32', name: 'programHash', type: 'bytes32' },
          { internalType: 'bytes32', name: 'digest', type: 'bytes32' },
          { internalType: 'address', name: 'verifier', type: 'address' },
          { internalType: 'address', name: 'attester', type: 'address' },
          { internalType: 'bytes', name: 'attesterSignature', type: 'bytes' },
          { internalType: 'uint64[]', name: 'output', type: 'uint64[]' },
          { internalType: 'uint64', name: 'issuanceTimestamp', type: 'uint64' },
          { internalType: 'uint64', name: 'expirationTimestamp', type: 'uint64' },
          { internalType: 'bytes2', name: 'vcVersion', type: 'bytes2' },
          { internalType: 'string', name: 'sbtLink', type: 'string' }
        ],
        internalType: 'struct Tokens.Token',
        name: 'tokenInfo',
        type: 'tuple'
      },
      { internalType: 'bytes', name: 'verifierSignature', type: 'bytes' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mintOpen',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bool', name: 'isAdd', type: 'bool' },
      { internalType: 'address[]', name: 'modifiedVerifiers', type: 'address[]' }
    ],
    name: 'modifyVerifierWhitelist',
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
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'removeAssertionMehod', outputs: [], stateMutability: 'payable', type: 'function' },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'bytes32', name: 'digest', type: 'bytes32' }],
    name: 'revokeByDigest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: '_approved', type: 'bool' }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'assertionMethod', type: 'address' }],
    name: 'setAssertionMethod',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'bindingAddr', type: 'address' },
      { internalType: 'address', name: 'bindedAddr', type: 'address' },
      { internalType: 'bytes', name: 'bindingSignature', type: 'bytes' },
      { internalType: 'bytes', name: 'bindedSignature', type: 'bytes' }
    ],
    name: 'setBinding',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  { inputs: [], name: 'toggleMinting', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' }
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'bindingAddr', type: 'address' },
      { internalType: 'address', name: 'bindedAddr', type: 'address' }
    ],
    name: 'unBinding',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];
