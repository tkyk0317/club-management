import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <>
      <h1>お探しのページは見つかりませんでした。</h1>
      <div>
        <Link to={`/todo`}>Todoページにに戻る</Link>
      </div>
    </>
  )
}