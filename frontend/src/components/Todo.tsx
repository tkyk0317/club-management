/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import React from 'react';
import '../App.css'
import {
  DataGrid,
  GridColDef,
  GridRowModel,
} from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';
import {
  requestCreateTodo,
  requestUpdateTodo,
  requestGetTodo,
  Todo
} from '../api/todo';
import TextField from '@mui/material/TextField';
import SnackBarUI from '@app/components/ui/SnackBarUI';
import Button from '@mui/material/Button';
import ModalUI from '@app/components/ui/ModalUI';
import { css } from '@emotion/react';
import { formatDateTime } from '@app/utils/date'

const buttonStyle = css({
  textAlign: "center",
  margin: "10px"
});

export default function App() {
  const [data, setList] = useState<Array<Todo>>([])
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [updateSnackBarOpen, setUpdateSnackBar] = useState(false)
  const [todo, setTodo] = useState("")

  useEffect(() => {
    requestGetTodo((data: Array<Todo>) => setList(data));
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', cellClassName: 'id', width: 30 },
    { field: 'content', headerName: '内容', cellClassName: 'content', width: 300, editable: true, },
    {
      field: 'created_at',
      headerName: '作成日',
      cellClassName: 'created_at',
      width: 200,
      valueFormatter: (params: any) => { return formatDateTime(params.value) }
    },
    {
      field: 'updated_at',
      headerName: '更新日',
      width: 200,
      cellClassName: 'updated_at',
      valueFormatter: (params: any) => { return formatDateTime(params.value) }
    },
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
  const onCloseUpdateSnackBar = () => {
    setUpdateSnackBar(false);
  };

const onUpdatedRow = React.useCallback(
  (newRow: GridRowModel, _oldRow: GridRowModel) =>
    new Promise<GridRowModel>((_resolve, _reject) => {
      requestUpdateTodo(newRow as Todo, () => setUpdateSnackBar(true))
    }),
  [],
);

const todoArea = (): JSX.Element => {
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
      <Button
        css={buttonStyle}
        endIcon={<SendIcon />}
        onClick={onRegisterHandler}
        variant={"contained"}
      >
      登録
      </Button>
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
      processRowUpdate={onUpdatedRow}
    />
    <ModalUI
      open={modalOpen}
      onHandleClose={onCloseModalHandler}
      title={"Todo登録"}
      message={"登録するToDoを入力してください"}
      component={todoArea}
    />
    <Button
      endIcon={<SendIcon />}
      onClick={onClick}
      variant={"contained"}
    >
      登録
    </Button>
    <SnackBarUI
      open={open}
      onHandleClose={onHandleClose}
      message={'登録しました'}
    />
    <SnackBarUI
      open={updateSnackBarOpen}
      onHandleClose={onCloseUpdateSnackBar}
      message={'更新しました'}
    />
  </div >
)
}