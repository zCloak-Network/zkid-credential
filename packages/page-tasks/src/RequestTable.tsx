// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Task } from '@credential/react-hooks/types';

import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import React, { useCallback, useContext } from 'react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';

import { CTypeName, TaskStatusDisplay } from '@credential/react-components';
import { DidName, DidsContext } from '@credential/react-dids';
import { useTasks } from '@credential/react-hooks';

import Approve from './RequestDetails/Approve';
import Reject from './RequestDetails/Reject';
import ActionButton from './ActionButton';
import { TaskCard, TaskCardItem } from './TaskCard';

const Row: React.FC<{ task: Task }> = ({ task }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleClick = useCallback(() => {
    if (!upMd) navigate(`/attester/tasks/${task.id}`);
  }, [navigate, task.id, upMd]);

  return (
    <TaskCard
      onClick={handleClick}
      operate={
        upMd ? (
          <ActionButton task={task} />
        ) : (
          <>
            {task.status === 'pending' && <Approve task={task} type="button" />}
            {task.status === 'pending' && <Reject task={task} type="button" />}
          </>
        )
      }
    >
      <TaskCardItem content={<DidName value={task.data.holder} />} label="Claimer" />
      <TaskCardItem
        content={
          <Link component={LinkRouter} to={`/attester/tasks/${task.id}`}>
            {task.id}
          </Link>
        }
        label="Task id"
      />
      <TaskCardItem content={<CTypeName cTypeHash={task.data.ctype} />} label="Credential type" />
      <TaskCardItem
        content={moment(task.createTime).format('YYYY-MM-DD HH:mm:ss')}
        label="Approval initiation time"
      />
      <TaskCardItem content={<TaskStatusDisplay showText status={task.status} />} label="Status" />
    </TaskCard>
  );
};

const RequestTable: React.FC = () => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const { did } = useContext(DidsContext);
  const list = useTasks(did?.id);

  if (upMd) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Claimer</TableCell>
              <TableCell>Claim hash</TableCell>
              <TableCell>Credential type</TableCell>
              <TableCell>Approval initiation time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Operate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((task, index) => (
              <Row key={index} task={task} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Grid columns={{ xs: 8 }} container spacing={3}>
      {list?.map((task) => (
        <Grid key={task.id} sm={4} xs={8}>
          <Row task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RequestTable;
