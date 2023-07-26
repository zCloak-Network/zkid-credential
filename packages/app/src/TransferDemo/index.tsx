// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  ConnectWallet,
  optimismGoerli,
  useAccount,
  useContractRead,
  useContractWrite,
  useDisconnect,
  useMediaQuery,
  useSwitchNetwork,
  useTheme
} from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import Header from '../Header';
import { useNotification } from '../Notification/useNotification';
import { opDemoAbi } from './opDemoAbi';

const TransferDemo: React.FC = () => {
  const { breakpoints } = useTheme();
  const upMd = useMediaQuery(breakpoints.up('md'));
  const [toggleOpen] = useToggle(!!upMd);
  const unreads = useNotification();
  const { did } = useContext(DidsContext);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // const { chain } = useNetwork();

  // const { abi, toAddress } = useContractConfig(chain?.id);
  const [abi, setAbi] = useState();
  const [contractAdress, setContractAdress] = useState('');

  const { switchNetwork } = useSwitchNetwork();
  const [receiver, setReceiver] = useState('');

  useEffect(() => {
    setAbi(opDemoAbi);
    setContractAdress('0x883cF50A207810Dc55D3f45AaBb9e4e8f7D2e9f2');
  }, []);

  useEffect(() => {
    console.log('switching network');

    if (isConnected) {
      switchNetwork(optimismGoerli.id);
    }
  }, [switchNetwork, isConnected]);

  const { isLoading, write: writeFaucet } = useContractWrite({
    abi,
    address: contractAdress,
    functionName: 'getFaucet',
    onSuccess: () => {
      console.log('writeFaucet success');
      refetchBalanceOf();
    }
  });

  const { write: writeTransfer } = useContractWrite({
    abi,
    address: contractAdress,
    functionName: 'transfer',
    enabled: false,
    args: [receiver, 1 * 1000000000000000000],
    onSuccess: () => {
      console.log('writeFaucet success');
      refetchBalanceOf();
    }
  });

  // useEffect(() => {
  //   console.log(`isSuccess ${isSuccess}`);
  // }, [isSuccess]);

  // const { data: dataCheckGetFaucet } = useContractRead({
  //   address: contractAdress,
  //   functionName: 'CheckGetFaucet',
  //   args: [address],
  //   abi: opDemoAbi, // easy to forget
  //   onSuccess: (data: any) => {
  //     console.log(`checkGetFaucet: ${data}`);
  //   }
  // });

  const { data: balanceOf, refetch: refetchBalanceOf } = useContractRead({
    address: contractAdress,
    functionName: 'balanceOf',
    args: [address],
    abi, // easy to forget
    onSuccess: (data: any) => {
      console.log(`balanceOf: ${data}`);
    }
  });

  const { refetch: refetchCheckSender } = useContractRead({
    address: contractAdress,
    functionName: 'conditionalTransferCheckSender',
    args: [address],
    abi, // easy to forget
    onSuccess: (data: any) => {
      console.log(`conditionalTransferCheckSender: ${data}`);
    },
    onError() {
      // it means revert
      console.log('sender status: revert');
    }
  });

  const { refetch: refetchCheckReceiver } = useContractRead({
    address: contractAdress,
    functionName: 'conditionalTransferCheckReceiver',
    args: [receiver],
    enabled: false,
    abi, // easy to forget
    onSuccess: (data: any) => {
      console.log(`conditionalTransferCheckReceiver: ${data}`);
    },
    onError() {
      // it means revert
      // console.log('Error', error);
      console.log('receiver status: revert');
    }
  });

  // console.log(`status ${status}`);
  // console.log(`isConnected: ${isConnected}, chain.id:${chain?.id},address:${address} contractAdress:${contractAdress}`);
  // console.log(`isFetching: ${isFetching}, isRefetching:${isRefetching}, data:${data}`);
  return (
    <Box bgcolor='#F5F6FA' overflow='hidden' paddingTop='70px'>
      {address},
      {isConnected ? (
        <>
          <span> connected</span>
          <span onClick={disconnect}>(Disconnect)</span>
        </>
      ) : (
        <ConnectWallet sx={{ width: 200 }} variant='outlined'>
          Connect Wallet
        </ConnectWallet>
      )}
      <div>Balance: {`${balanceOf}`}</div>
      <div onClick={refetchBalanceOf}>refetchBalanceOf</div>
      {isLoading ? <div>loading...</div> : <div onClick={writeFaucet}>get cToken</div>}
      <div onClick={refetchCheckSender}>refetchCheckSender</div>
      <input onChange={(e) => setReceiver(e.target.value)} placeholder='receiver address' value={receiver} />
      <div onClick={refetchCheckReceiver}>refetchCheckReceiver</div>
      <div onClick={writeTransfer}>writeTransfer</div>
      <Header toggleOpen={toggleOpen} unreads={unreads} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', border: '0' }}>
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

          {/*  transfer */}
          <div style={styles.main_transfer}>
            <div style={styles.main_transfer_desc}>
              <div style={{ fontSize: 20, fontWeight: 500 }}>Transfer</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: 220, fontSize: 12 }}>
                <div style={{ color: '#8F95B2' }}>Your Balance: 0 cToken</div>
                <div>
                  <a href='#' style={{ textDecoration: 'none', color: '#0042F1' }}>
                    Get 10 cToken
                  </a>
                </div>
              </div>
            </div>

            <div style={styles.main_transfer_form}>
              <div style={{}}>
                <div
                  style={{
                    display: 'flex',
                    width: 150,
                    height: 24,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 32,
                      height: 32,
                      background: '#8F95B2',
                      borderRadius: 32
                    }}
                  >
                    <img src='/transfer-demo/logo_zcloak.png' style={{ width: 24, height: 24 }}></img>
                  </div>
                  <div style={{}}>cToken</div>
                  <div style={{ height: 24 }}>
                    <img src='/transfer-demo/icon_down.png' style={styles.main_transfer_icon_down} />
                  </div>
                </div>
              </div>
              <div style={{ color: '#1C1D21', marginRight: 20 }}>0</div>
            </div>
          </div>

          {/* To */}
          <div style={styles.main_to}>
            <div style={{ fontSize: 20, fontWeight: 500 }}>To</div>
            <div
              style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(108,93,211,0.05)',
                borderRadius: 4
              }}
            >
              <div style={{ marginLeft: 15, color: '#8F95B2' }}>To Address</div>
            </div>
          </div>

          {/* Suggest Receiver */}
          <div style={styles.main_suggest}>
            <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 5 }}>Suggest Receiver Address</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: 198,
                  height: 128,
                  borderRadius: 4,
                  border: '1px solid #E5E5E5',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>Alice</div>
                <div style={{ fontSize: 14, fontWeight: 400 }}>Non Adult</div>
                <div style={{ fontSize: 12, fontWeight: 400, color: '#8F95B2' }}>did:zk:0x3sos…cz</div>
              </div>

              <div
                style={{
                  width: 198,
                  height: 128,
                  borderRadius: 4,
                  border: '1px solid #E5E5E5',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>Bob</div>
                <div style={{ fontSize: 14, fontWeight: 400 }}>Adult</div>
                <div style={{ fontSize: 12, fontWeight: 400, color: '#8F95B2' }}>did:zk:0x3sos…cz</div>
              </div>

              <div
                style={{
                  width: 198,
                  height: 128,
                  borderRadius: 4,
                  border: '1px solid #E5E5E5',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 500 }}>Charlie</div>
                <div style={{ fontSize: 14, fontWeight: 400 }}>No SBT</div>
                <div style={{ fontSize: 12, fontWeight: 400, color: '#8F95B2' }}>did:zk:0x3sos…cz</div>
              </div>
            </div>
          </div>

          {/* Validify */}
          <div style={styles.main_valid}>
            <div
              style={{
                borderRadius: 4,
                width: 301,
                height: 258,
                background: 'rgba(108,93,211,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: 237,
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 36,
                      width: 36,
                      borderRadius: 18,
                      background: '#8F95B2'
                    }}
                  >
                    <div>
                      <img src='/transfer-demo/icon_sender.png' />
                    </div>
                  </div>
                  <div></div>
                </div>
                <div>Sender</div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 237,
                  height: 130,
                  border: '1px dashed #808080',
                  borderRadius: 4
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 28,
                    width: 28
                  }}
                >
                  <img src='/transfer-demo/icon_error.png' style={{ height: 28, width: 28 }} />
                </div>
                <div>No zkSBT</div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 4,
                width: 301,
                height: 258,
                background: 'rgba(108,93,211,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: 237,
                  height: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 36,
                      width: 36,
                      borderRadius: 18,
                      background: '#8F95B2'
                    }}
                  >
                    <div>
                      <img src='/transfer-demo/icon_receiver.png' />
                    </div>
                    <div></div>
                  </div>
                  <div>Receiver</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 237,
                  height: 130,
                  border: '1px dashed #808080',
                  borderRadius: 4
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 28,
                    width: 28
                  }}
                >
                  <img src='/transfer-demo/icon_pass.png' style={{ height: 28, width: 28 }} />
                </div>
                <div>Pass</div>
              </div>
            </div>
          </div>

          {/* Transfer Button */}
          <div style={{}}>
            <a href='#' style={styles.transferButton}>
              Transfer
            </a>
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
    // border: 'dashed 1px #000',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    height: 39,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30
  },
  desc: {
    width: 625,
    textAlign: 'center',
    height: 120,
    border: 'dashed 1px #000',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'url(/transfer-demo/png_bag.png) no-repeat'
  },

  main_transfer: {
    width: 625,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30
  },
  main_transfer_desc: {
    display: 'flex',
    flex: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  main_transfer_form: {
    display: 'flex',
    flex: 'row wrap',
    justifyContent: 'space-between',
    height: 64,
    alignItems: 'center',
    background: 'rgba(108,93,211,0.05)',
    borderRadius: 4
  },

  main_to: {
    width: 625,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30
  },
  main_suggest: {
    width: 625,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30
  },
  main_valid: {
    width: 625,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 4
  },
  transferButton: {
    width: 625,
    height: 60,
    color: 'white',
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    display: 'flex',
    borderRadius: 4,
    background: '#0042F1',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none'
  }
};

export default TransferDemo;
