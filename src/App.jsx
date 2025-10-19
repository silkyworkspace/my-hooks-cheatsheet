// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home'
import UseState from './pages/UseState';
import './App.css'

// ルーティングテーブルを定義
const router = createHashRouter([
  {
    path: '/', // リクエストパス
    element: <Home /> // ルーティングによって描画されるReact要素
  },
  {
    path: '/usestate',
    element: <UseState />
  },

]
);

function App() {

  return (
    <>
    <RouterProvider router={router} /> {/* アプリにルーター機能を付与 */}
    </>
  )
}

export default App
