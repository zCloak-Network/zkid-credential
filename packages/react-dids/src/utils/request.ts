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

export const get = async (url: string): Promise<Response> => {
  const res = await fetch(url, { method: 'GET' });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};
