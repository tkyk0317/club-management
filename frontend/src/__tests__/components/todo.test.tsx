import Todo from "@app/components/Todo";
import { render } from "@testing-library/react";
import axios from 'axios';

describe("Todo表示テスト", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("取得成功", async () => {
    // mock
    vi.mock('axios');
    (axios.get as any).mockResolvedValue({
      status: 200,
      data: [{
        id: 1,
        content: "テストTodo",
        created_at: "2023-01-01 00:00:00",
        updated_at: "2023-01-01 00:00:00",
      }]
    });

    // レンダー
    render(<Todo />);

    // 期待値確認
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

describe("Todo更新テスト", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test("更新成功", async () => {
    // mock
    vi.mock('axios');
    (axios.put as any).mockResolvedValue({
      status: 200,
      data: {
        id: 1,
        content: "テストTodo更新",
        created_at: "2023-01-01 00:00:00",
        updated_at: "2023-01-01 00:00:00",
      }
    });
    (axios.get as any).mockResolvedValue({
      status: 200,
      data: [{
        id: 1,
        content: "テストTodo",
        created_at: "2023-01-01 00:00:00",
        updated_at: "2023-01-01 00:00:00",
      }]
    });

    // レンダー
    //const { container } = render(<Todo />);

    // Todo内容ダブルクリック後、情報を入力
    //const content = container.getElementsByClassName('content');
    //const grid = screen.getByRole('grid');

    // 期待値確認
    //expect(axios.get).toHaveBeenCalledTimes(1);
  });
});