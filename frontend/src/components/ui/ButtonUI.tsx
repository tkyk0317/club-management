/** @jsxImportSource @emotion/react */
import React from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/react'

type Props = {
  color?: string | null | undefined
  message: string
  variant: string
  onClick: () => Promise<void>
  icon: () => JSX.Element
  css?: any
}

const buttonStyle = css({
  margin: "20px",
});

export default function ButtonUI(props: Props) {
  const icon = props.icon();

  return (
    <Button
      css={props.css ? props.css : buttonStyle}
      color={props.color}
      variant={props.variant}
      endIcon={icon}
      onClick={props.onClick}
    >
      {props.message}
    </Button>
  );
}