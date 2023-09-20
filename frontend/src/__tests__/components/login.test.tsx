import Login from "@app/components/Login";
import { render, fireEvent, screen } from "@testing-library/react";
import axios from 'axios';
import * as router from 'react-router-dom';

describe("ログインテスト", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("ログイン成功", async () => {
    // mock
    vi.mock('axios')
    axios.post.mockResolvedValue({ status: 200 })
    vi.mock('react-router-dom')
    router.useNavigate.mockImplementation(() => {})

    // レンダー
    render(<Login />);

    // テスト実施
    const button = screen.getByRole("button");
    await fireEvent.click(button);

    // 期待値確認
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(router.useNavigate).toHaveBeenCalled(1)
  });

  test("ログイン失敗", async () => {
    // mock
    vi.mock('axios')
    axios.post.mockResolvedValue({ status: 500 })
    vi.mock('react-router-dom')
    router.useNavigate.mockImplementation(() => {})

    // レンダー
    render(<Login />);

    // テスト実施
    const button = screen.getByRole("button");
    await fireEvent.click(button);

    // 期待値確認
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(router.useNavigate).toHaveBeenCalled(0)
  });
});