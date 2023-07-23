// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Banner from '@credential/page-sbt-event/Banner';
import { Box, Typography, useMediaQuery, useTheme } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

import Header from '../Header';
import { useNotification } from '../Notification/useNotification';

const TransferDemo: React.FC = () => {
  const { breakpoints, palette, transitions } = useTheme();
  const upMd = useMediaQuery(breakpoints.up('md'));

  const [open, toggleOpen] = useToggle(!!upMd);
  const { pathname } = useLocation();
  const unreads = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Box bgcolor='#F5F6FA' overflow='hidden' paddingTop='70px'>
      <Header toggleOpen={toggleOpen} unreads={unreads} />
      <div style={styles.content}>
        <div style={styles.title}>Conditional Transfer</div>
        <div style={styles.desc}>
          <div style={{ marginTop: 24 }}>The restrictions for conditional transfer are:</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 305,
              marginTop: 12,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <div style={{ width: 4, height: 38, backgroundColor: '#0042F1', borderRadius: 4 }}></div>
            <div style={{ fontSize: 14, marginLeft: 6 }}>
              <div>1. Only adults are allowed to make transfers</div>
              <div>2. Transfers can only be made to adult users.</div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: 720,
    height: 1207,
    border: 'dashed 1px #000'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    height: 39,
    textAlign: 'center'
  },
  desc: {
    width: 625,
    textAlign: 'center',
    height: 120,
    border: 'dashed 1px #000',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'url(/transfer-demo/png_bag.png) no-repeat'
  }
};

export default TransferDemo;
