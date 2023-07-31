// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  ConnectWallet,
  Divider,
  IdentityIcon,
  optimismGoerli,
  Paper,
  Snackbar,
  Stack,
  styled,
  Typography,
  useAccount,
  useContractRead,
  useContractWrite,
  useDisconnect,
  useMediaQuery,
  useNetwork,
  useSwitchNetwork,
  useTheme
} from '@credential/react-components';

import Logo from './Logo';
import { opDemoAbi } from './opDemoAbi';

interface StyledPaperProps {
  selected?: boolean;
}
const StyledPaper = styled(Paper)<StyledPaperProps>(({ selected }) => ({
  width: 198,
  height: 128,
  borderRadius: 4,
  border: selected ? '2px solid #0042F1' : '1px solid #E5E5E5',
  display: 'flex',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
}));

const StyledTransferButton = styled(Button)({
  width: 625,
  height: 60,
  color: 'white',
  fontSize: 18,
  fontWeight: 600,
  marginTop: 30,
  display: 'flex',
  borderRadius: 4,
  background: '#0042F1',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none'
});

const TransferDemo: React.FC = () => {
  const { breakpoints } = useTheme();
  const upMd = useMediaQuery(breakpoints.up('md'));
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [abi, setAbi] = useState();
  const [contractAdress, setContractAdress] = useState('');

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [receiver, setReceiver] = useState('');

  const [senderStatus, setSenderStatus] = useState(0);
  const [receiverStatus, setReceiverStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('0');

  const {
    data: balanceOf,
    isFetching: fetchingBalanceOf,
    refetch: refetchBalanceOf
  } = useContractRead({
    address: contractAdress as any,
    functionName: 'balanceOf',
    args: [address],
    abi, // easy to forget
    onSuccess: (data: any) => {
      console.log(`balanceOf: ${data}, ${typeof data}`);
    }
  });

  const handleInputChange = (event: any) => {
    const value = event.target.value;

    // setInputValue(Number(value));
    // 检查输入是否符合一位小数的格式
    if (/^\d*\.?\d{0,1}$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReceiverClick = (suggestAddress: React.SetStateAction<string>) => {
    // const val = e.target.getAttribute('aria-hidden');

    setReceiver(suggestAddress);
  };

  useEffect(() => {
    setAbi(opDemoAbi as any);
    setContractAdress('0x1A3C1baacd6D7269547a1b877C79709e9B60aBb2');
  }, []);

  useEffect(() => {
    console.log(`check current network: ${chain?.id}, isConnected: ${isConnected}`);

    if (switchNetwork) {
      if (isConnected) {
        if (chain && chain.id !== 420) {
          console.log('switching network...');
          switchNetwork(optimismGoerli.id);
        }
      }
    }
  }, [chain, isConnected, switchNetwork]);

  const { isLoading: loadingFaucet, write: writeFaucet } = useContractWrite({
    abi,
    address: contractAdress as any,
    functionName: 'getFaucet',
    onSuccess: () => {
      console.log('writeFaucet success');
      refetchBalanceOf();
    }
  });

  const { isLoading: loadingTransfer, write: writeTransfer } = useContractWrite({
    abi,
    address: contractAdress as any,
    functionName: 'transfer',
    args: [receiver, parseFloat(inputValue) * 1000000000000000000],
    onSuccess: () => {
      console.log('writeTransfer success');
      refetchBalanceOf();
      setOpen(true);
    }
  });

  const { isFetching: fetchingCheckSender } = useContractRead({
    address: contractAdress as any,
    functionName: 'conditionalTransferCheckSender',
    args: [address],
    enabled: true,
    abi, // easy to forget
    onSuccess: (data: any) => {
      console.log(`conditionalTransferCheckSender: ${data}`);

      if (data) {
        setSenderStatus(1);
      } else {
        setSenderStatus(2);
      }
    },
    onError(error) {
      // it means revert
      console.log(error.name);
      console.log('sender status: revert');

      if (error.name !== 'InvalidAddressError') {
        setSenderStatus(3);
      }
    }
  });

  const { isFetching: fetchingCheckReceiver } = useContractRead({
    address: contractAdress as any,
    functionName: 'conditionalTransferCheckReceiver',
    args: [receiver],
    enabled: true,
    abi, // easy to forget
    onSuccess: (data: any) => {
      console.log(`conditionalTransferCheckReceiver: ${data}`);

      if (data) {
        setReceiverStatus(1);
      } else {
        setReceiverStatus(2);
      }
    },
    onError(error: { name: string }) {
      // it means revert
      // console.log('Error', error);
      console.log(error.name);
      console.log('receiver status: revert');

      if (error.name !== 'InvalidAddressError') {
        setReceiverStatus(3);
      }
    }
  });

  // console.log(`network: ${JSON.stringify(chain?.id)}`);

  return (
    <Box bgcolor='#F5F6FA' overflow='hidden' paddingTop='70px'>
      {/* {address}, */}
      {/* {isConnected ? (
        <>
          <span> connected</span>
          <span onClick={disconnect}>(Disconnect)</span>
        </>
      ) : (
        <ConnectWallet sx={{ width: 200 }} variant='outlined'>
          Connect Wallet
        </ConnectWallet>
      )} */}
      {/* {balanceOf && <div>Balance: {`${balanceOf / 10n ** 18n}`}</div>} */}
      {/* <div onClick={refetchBalanceOf}>refetchBalanceOf</div> */}
      {/* {isLoading ? <div>loading...</div> : <div onClick={writeFaucet}>get cToken</div>} */}
      {/* <div onClick={refetchCheckSender}>refetchCheckSender</div> */}
      {/* <input onChange={(e) => setReceiver(e.target.value)} placeholder='receiver address' value={receiver} /> */}
      {/* <div onClick={refetchCheckReceiver}>refetchCheckReceiver</div> */}
      {/* <div onClick={writeTransfer}>writeTransfer</div> */}
      {/* <Header toggleOpen={toggleOpen} unreads={unreads} /> */}
      <Stack
        alignItems='center'
        direction='row'
        height={70}
        justifyContent='space-between'
        sx={({ palette }) => ({
          paddingX: upMd ? 5 : 2,
          zIndex: 999,
          position: 'fixed',
          top: 0,
          width: '100%',
          background: palette.common.white,
          borderBottom: '1px solid',
          borderBottomColor: alpha(palette.primary.main, 0.1)
        })}
      >
        <Stack alignItems='center' direction='row' spacing={upMd ? 2 : 1}>
          <Logo />
        </Stack>
        <Stack alignItems='center' direction='row' spacing={upMd ? 2 : 1}>
          {/* <DidInfo did={did} /> */}

          {isConnected && (
            <>
              <Button
                endIcon={<IdentityIcon value={address} />}
                size={upMd ? 'medium' : 'small'}
                sx={({ palette }) => ({
                  border: '1px solid',
                  borderColor: alpha(palette.primary.main, 0.12),
                  background: palette.common.white,
                  borderRadius: 50,
                  boxShadow: 'none',
                  color: palette.text.primary,
                  ':hover': {
                    background: palette.common.white
                  }
                })}
                variant='contained'
              >
                {`${address?.slice(0, 8)}...${address?.slice(-4)}`}
              </Button>
              <Button onClick={() => disconnect()}>logout</Button>
            </>
          )}

          {!isConnected && (
            <ConnectWallet initialnetworkid={420} sx={{ width: 200 }} variant='outlined'>
              Connect Wallet
            </ConnectWallet>
          )}
        </Stack>
      </Stack>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', border: '0' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 720,
            height: 1207,
            backgroundColor: 'white'
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              height: 39,
              textAlign: 'center',
              marginTop: 40,
              marginBottom: 30
            }}
          >
            Conditional Transfer
          </div>
          <div
            style={{
              width: 625,
              textAlign: 'center',
              height: 120,
              border: 'dashed 1px #000',
              marginLeft: 'auto',
              marginRight: 'auto',
              background: 'url(/transfer-demo/png_bag.png) no-repeat'
            }}
          >
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

          {/*  transfer input */}
          <div
            style={{
              width: 625,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 30
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 'row wrap',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 500 }}>Transfer</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: 260, fontSize: 13 }}>
                <div style={{ color: '#8F95B2' }}>
                  Your Balance:&nbsp;
                  {fetchingBalanceOf ? ' -- ' : balanceOf ? ` ${Number(balanceOf / 10n ** 17n) / 10} cToken` : 0}
                </div>
                <div onClick={() => refetchBalanceOf()}>
                  <img src='/transfer-demo/icon_refresh.png' style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <div onClick={() => writeFaucet()} style={{ cursor: 'pointer', color: '#0042F1' }}>
                    {loadingFaucet ? <>loading...</> : <>Get 10 cToken</>}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flex: 'row wrap',
                justifyContent: 'space-between',
                height: 64,
                alignItems: 'center',
                background: 'rgba(108,93,211,0.05)',
                borderRadius: 4
              }}
            >
              <div>
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
                    <img src='/transfer-demo/icon_down.png' />
                  </div>
                </div>
              </div>
              <div style={{ color: '#1C1D21', marginRight: 20 }}>
                <input
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'rgba(108, 93, 211, 0)',
                    border: 0,
                    textAlign: 'right',
                    fontSize: 16,
                    height: 40
                  }}
                  value={inputValue}
                />
              </div>
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
              <div style={{ marginLeft: 15, color: '#8F95B2' }}>
                <input
                  onChange={(e) => setReceiver(e.target.value)}
                  placeholder='To Address'
                  style={{ border: 0, backgroundColor: 'rgba(108, 93, 211, 0)', fontSize: 16, height: 40, width: 400 }}
                  value={receiver}
                />
              </div>
            </div>
          </div>

          {/* Suggest Receiver */}
          <div style={styles.main_suggest}>
            <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 5 }}>Suggest Receiver Address</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <StyledPaper
                elevation={0}
                onClick={() => handleReceiverClick('0x05476EE9235335ADd2e50c09B2D16a3A2cC4ebEC')}
                selected={receiver === '0x05476EE9235335ADd2e50c09B2D16a3A2cC4ebEC'}
              >
                <Typography component='div' fontWeight={500} variant='h6'>
                  Alice
                </Typography>
                <Typography component='div' fontWeight={400} variant='body1'>
                  Non Adult
                </Typography>
                <Typography color='textSecondary' component='div' fontWeight={400} variant='body2'>
                  did:zk:0x0547...EC
                </Typography>
              </StyledPaper>

              <StyledPaper
                elevation={0}
                onClick={() => handleReceiverClick('0xFeDE01Ff4402e35c6f6d20De9821d64bDF4Ba563')}
                selected={receiver === '0xFeDE01Ff4402e35c6f6d20De9821d64bDF4Ba563'}
              >
                <Typography component='div' fontWeight={500} variant='h6'>
                  Bob
                </Typography>
                <Typography component='div' fontWeight={400} variant='body1'>
                  Adult
                </Typography>
                <Typography color='textSecondary' component='div' fontWeight={400} variant='body2'>
                  did:zk:0xFeDE...63
                </Typography>
              </StyledPaper>
              <StyledPaper
                elevation={0}
                onClick={() => handleReceiverClick('0x61625acF58Bae797F4cE6E398A0C6857C22D1475')}
                selected={receiver === '0x61625acF58Bae797F4cE6E398A0C6857C22D1475'}
              >
                <Typography component='div' fontWeight={500} variant='h6'>
                  Charlie
                </Typography>
                <Typography component='div' fontWeight={400} variant='body1'>
                  No SBT
                </Typography>
                <Typography color='textSecondary' component='div' fontWeight={400} variant='body2'>
                  did:zk:0x6162...75
                </Typography>
              </StyledPaper>
            </div>
          </div>

          <Box
            alignItems='center'
            display='flex'
            justifyContent={'center'}
            style={{
              width: 625,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 30,
              display: 'flex'
            }}
          >
            <Box>
              <Divider flexItem style={{ marginRight: 8, width: 243 }} />
            </Box>
            <Box
              alignItems='center'
              display='flex'
              justifyContent={'space-evenly'}
              sx={{ width: 125, height: 40, borderRadius: 2, border: '1px solid #0042F1' }}
            >
              <img alt='icon' src='/transfer-demo/icon_validity.png' style={{ width: 22, height: 22 }} />
              <Typography variant='h5'>Validity</Typography>
            </Box>

            <Box>
              <Divider flexItem style={{ marginLeft: 8, width: 243 }} />
            </Box>
          </Box>

          {/* Validify */}
          <div
            style={{
              width: 625,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 30,
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 4
            }}
          >
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
                {fetchingCheckSender ? (
                  <div>loading...</div>
                ) : (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 28,
                        width: 28
                      }}
                    >
                      {senderStatus === 1 && (
                        <img src='/transfer-demo/icon_pass.png' style={{ height: 28, width: 28 }} />
                      )}
                      {senderStatus === 2 && (
                        <img src='/transfer-demo/icon_non.png' style={{ height: 28, width: 28 }} />
                      )}
                      {senderStatus === 3 && (
                        <img src='/transfer-demo/icon_error.png' style={{ height: 28, width: 28 }} />
                      )}
                    </div>
                    {(!address || senderStatus === 0) && <div>empty sender address.</div>}
                    {address && senderStatus === 1 && <div>Pass</div>}
                    {address && senderStatus === 2 && <div>Non-Adult</div>}
                    {address && senderStatus === 3 && (
                      <div>
                        <div> No zkSBT </div>
                        <div>
                          <a href='#/event/zk-kyc2023'>go to mint</a>
                        </div>
                      </div>
                    )}
                  </>
                )}
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
                  </div>
                </div>
                <div>Receiver</div>
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
                {fetchingCheckReceiver ? (
                  <CircularProgress color='primary' />
                ) : (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 28,
                        width: 28
                      }}
                    >
                      {receiverStatus === 1 && (
                        <img src='/transfer-demo/icon_pass.png' style={{ height: 28, width: 28 }} />
                      )}
                      {receiverStatus === 2 && (
                        <img src='/transfer-demo/icon_non.png' style={{ height: 28, width: 28 }} />
                      )}
                      {receiverStatus === 3 && (
                        <img src='/transfer-demo/icon_error.png' style={{ height: 28, width: 28 }} />
                      )}
                    </div>
                    {receiverStatus === 0 && <div>empty receiver address.</div>}
                    {receiverStatus === 1 && <div>Pass</div>}
                    {receiverStatus === 2 && <div>Non-Adult</div>}
                    {receiverStatus === 3 && <div>No zkSBT</div>}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Transfer Button */}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <StyledTransferButton
              component={'div'}
              disabled={loadingTransfer || receiverStatus !== 1}
              onClick={() => writeTransfer()}
              variant='contained'
            >
              {loadingTransfer ? <CircularProgress color='primary' size={24} /> : 'Transfer'}
            </StyledTransferButton>
          </div>

          <Snackbar
            action={
              <Button color='secondary' onClick={handleClose} size='small'>
                Close
              </Button>
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            autoHideDuration={4000}
            message='Transfer Successfully!'
            onClose={handleClose}
            open={open}
          />
        </div>
      </div>
    </Box>
  );
};

const styles = {
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
  }
};

export default TransferDemo;
