// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchema } from '@zcloak/ctype/types';

import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@credential/react-components';
import { useLocalStorage } from '@credential/react-hooks';

import CreateProperty from './CreateProperty';
import SubmitCType from './SubmitCType';

const key = 'credential:ctype:draft';

const CreateCType: React.FC = () => {
  const navigate = useNavigate();

  const [cTypeContent, setCTypeContent, clear] = useLocalStorage<{
    title?: string;
    description?: string;
    properties?: Record<string, CTypeSchema>;
  }>(key);

  const onDone = useCallback(() => {
    clear();
    navigate('/attester/ctypes', { replace: true });
  }, [navigate, clear]);

  return (
    <Dialog fullScreen open>
      <DialogHeader onClose={() => navigate('/attester/ctypes', { replace: true })}>
        Create ctype
      </DialogHeader>
      <Container component={DialogContent} maxWidth="lg">
        <Container component={Stack} maxWidth="sm" spacing={3} sx={{ paddingY: 7 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Ctype title</InputLabel>
            <OutlinedInput
              defaultValue={cTypeContent?.title}
              onChange={(e) =>
                setCTypeContent((value) => ({
                  ...value,
                  title: e.target.value
                }))
              }
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Description</InputLabel>
            <OutlinedInput
              defaultValue={cTypeContent?.description}
              minRows={6}
              multiline
              onChange={(e) => {
                setCTypeContent((value) => ({
                  ...value,
                  description: e.target.value
                }));
              }}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Data</InputLabel>
            <Box sx={{ textAlign: 'right' }}>
              <CreateProperty
                onCreate={(property) => {
                  setCTypeContent((value) => ({
                    ...value,
                    properties: { ...(value?.properties ?? {}), ...property }
                  }));
                }}
              />
              <TableContainer
                sx={({ palette }) => ({
                  border: '1px solid',
                  borderColor: palette.grey[400],
                  marginTop: 4,
                  borderRadius: 1
                })}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Data Name</TableCell>
                      <TableCell>Property</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(cTypeContent?.properties ?? {}).map(([name, property]) => (
                      <TableRow key={name}>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              setCTypeContent((value) => {
                                if (value?.properties?.[name]) {
                                  delete value.properties[name];
                                }

                                return { ...value, properties: { ...value.properties } };
                              })
                            }
                          >
                            <IndeterminateCheckBoxOutlinedIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{property.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </FormControl>
        </Container>
      </Container>
      <DialogActions>
        <Button variant="outlined">Save</Button>
        <SubmitCType
          description={cTypeContent?.description}
          onDone={onDone}
          properties={cTypeContent?.properties}
          title={cTypeContent?.title}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CreateCType;
