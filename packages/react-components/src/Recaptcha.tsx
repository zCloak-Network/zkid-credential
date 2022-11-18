// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box } from '@mui/material';
import React from 'react';

interface Props {
  onCallback(response: string): void;
}

const Recaptcha: React.FunctionComponent<Props> = ({ onCallback }) => {
  const [, setError] = React.useState<string>();

  const container = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const script = document.createElement('script');

    script.onload = () => {
      const { grecaptcha } = window as any;

      grecaptcha.ready(() => {
        if (container.current) {
          grecaptcha.render(container.current, {
            callback: (response: any) => {
              onCallback(response);
            },
            sitekey: '6LdmRHogAAAAAF9YN6bMc6hNExitqRJog3-wDkH-'
          });
        }
      });
    };

    script.onerror = (error) => {
      setError(error.toString());
    };

    script.src = 'https://www.google.com/recaptcha/api.js';

    document.body.appendChild(script);
  }, [onCallback]);

  return <Box ref={container} />;
};

export default React.memo(Recaptcha);
