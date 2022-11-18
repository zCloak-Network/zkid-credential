// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

interface Response {
  code: number;
  data?: any;
  message: string;
}

export const post = async <T = any>(url: string, data?: T): Promise<Response> => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

export const get = async (url: string, query?: Record<string, any>): Promise<Response> => {
  const search = serializeQuery(query);
  const res = await fetch(`${url}${search ? '?' + search : ''}`, { method: 'GET' });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

export function serializeQuery(obj?: Record<string, any>): string {
  if (!obj) {
    return '';
  }

  const keys: string[] = [];

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      keys.push(String(key));
    }
  }

  keys.sort((l, r) => (l > r ? 1 : -1));

  return keys
    .map(
      (key) =>
        key +
        '=' +
        encodeURIComponent(
          Array.isArray(obj[key])
            ? `[${(obj[key] as any[]).map((v) => `"${v.toString()}"`).join(',')}]`
            : obj[key].toString()
        )
    )
    .join('&');
}
