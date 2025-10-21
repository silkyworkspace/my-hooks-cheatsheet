// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home'
import UseState from './pages/UseState';
import UseEffect from './pages/UseEffect';
import UseRef from './pages/UseRef';
import NotFound from './pages/NotFound';
import ErrorFallback from './pages/ErrorFallback';
import './App.css'
import { ErrorBoundary } from 'react-error-boundary';

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
  {
    path: '/useeffect',
    element: <UseEffect />
  },
  {
    path: '/useref',
    element: <UseRef />
  },
  // 404ページ - すべての未定義ルートにマッチ
  {
    path: '*',
    element: <NotFound />
  },
]
);

function App() {

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
        onError={(error, errorInfo) => {
          // エラーログを送信する場合はここに書く
          console.error('Error caught:', error, errorInfo);
        }}
      >

        <RouterProvider router={router} /> {/* アプリにルーター機能を付与 */}

      </ErrorBoundary>
    </>
  );
}

export default App
