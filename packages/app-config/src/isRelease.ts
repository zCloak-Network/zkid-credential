// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const isRelease = location.hostname.includes('zkid.app');
export const isTestnet = location.href.includes('demo');
