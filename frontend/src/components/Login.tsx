/** @jsxImportSource @emotion/react */
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonUI from './ui/ButtonUI';
import { css } from '@emotion/react'
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import { requestLogin } from "../api/login";

const formStyle = css({
  width: "800px",
  margin: "auto"
})
const textFieldStyle = css({
  margin: "10px",
})

export default function Login() {
  const navigate = useNavigate();

  const onClick = (): Promise<void> => {
    return requestLogin(() => navigate("/todo"))
  }

  const icon = (): JSX.Element => {
    return <SendIcon />;
  };

  return (
    <div
      id="loginForm"
      css={formStyle}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <h1>ログイン</h1>
        <div>
          <TextField
            css={textFieldStyle}
            required
            id="mail-address"
            label="メールアドレス"
          />
        </div>
        <div>
          <TextField
            css={textFieldStyle}
            id="outlined-password-input"
            label="パスワード"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <ButtonUI
          variant={"contained"}
          icon={icon}
          message={"ログイン"}
          onClick={onClick}
        />
      </Box >
    </div>
  )
}