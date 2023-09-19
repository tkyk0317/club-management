/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import React from 'react';
import '../App.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';
import { parseISO, format } from 'date-fns';
import ja from 'date-fns/locale/ja'
import { requestCreateTodo, requestGetTodo, Todo } from '../api/todo';
import TextField from '@mui/material/TextField';
import SnackBarUI from './ui/SnackBarUI';
import ButtonUI from './ui/ButtonUI';
import ModalUI from './ui/ModalUI';
import { css } from '@emotion/react';

const buttonStyle = css({
  textAlign: "center",
  margin: "10px"
});

export default function App() {
  useEffect(() => {
    requestGetTodo(setList);
  }, [])

  const [data, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [todo, setTodo] = useState("")

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'content', headerName: 'Todo', width: 300 },
    {
      field: 'created_at',
      headerName: 'created_at',
      width: 200,
      valueFormatter: (params: object) => {
        format(parseISO(params.value), 'yyyy-MM-dd HH:mm', { locale: ja })
      }
    },
    { field: 'updated_at', headerName: 'updated_at', width: 200 },
  ];
  const onSuccessCreateHandler = (todo: Todo): void => {
    const newData = [...data];
    newData.unshift(todo)
    setList(newData)
    onHandleClick();
  }
  const onClick = async (): Promise<void> => {
    setModalOpen(true);
  }
  const onRegisterHandler = async (): Promise<void> => {
    await requestCreateTodo(todo, onSuccessCreateHandler)
    setModalOpen(false)
  }
  const onHandleClick = () => {
    setOpen(true);
  };
  const onHandleClose = () => {
    setOpen(false);
  };
  const onCloseModalHandler = () => {
    setModalOpen(false);
  };
  const icon = (): React.FC => {
    return <SendIcon />;
  };
  const todoArea = (): React.FC => {
    return (
      <div>
        <TextField id="todo"
          label={"Todo"}
          fullWidth
          multiline
          rows={10}
          variant="standard"
          value={todo}
          onChange={(ev) => setTodo(ev.target.value)}
        />
        <ButtonUI
          css={buttonStyle}
          icon={icon}
          message="登録"
          onClick={onRegisterHandler}
          variant={"contained"}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Todoリスト</h1>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <ModalUI
        open={modalOpen}
        onHandleClose={onCloseModalHandler}
        title={"Todo登録"}
        message={"登録するToDoを入力してください"}
        component={todoArea}
      />
      <ButtonUI
        icon={icon}
        message="登録"
        onClick={onClick}
        variant={"contained"}
      />
      <SnackBarUI
        open={open}
        onHandleClose={onHandleClose}
        message={'登録しました'}
      />
    </div >
  )
}