import styles from './ErrorFallback.module.css';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>⚠️ エラーが発生しました</h1>
        <p className={styles.message}>
          申し訳ございません。予期しないエラーが発生しました。
        </p>
        <button 
          className={styles.reloadButton}
          onClick={resetErrorBoundary}
        >
          再読み込み
        </button>
        <button 
          className={styles.homeButton}
          onClick={() => window.location.href = '/'}
        >
          ホームに戻る
        </button>
        
        {import.meta.env.DEV && (
          <details className={styles.errorDetails}>
            <summary>エラー詳細（開発モードのみ）</summary>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
          </details>
        )}
      </div>
    </div>
  );
}