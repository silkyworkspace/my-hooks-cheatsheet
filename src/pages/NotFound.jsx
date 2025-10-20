import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>ページが見つかりません</p>
      <Link to="/" className={styles.homeButton}>
        ホームに戻る
      </Link>
    </div>
  );
}