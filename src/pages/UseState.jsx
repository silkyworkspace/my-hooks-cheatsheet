// import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './UseState.module.css';

export default function UseState() {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <Link to="/" className={styles.backButton}>← 戻る</Link>
                <h1>useState</h1>
                <p className={styles.description}>ステート管理の基本 - UIの状態を管理</p>
            </header>

            {/* 概要 */}
            <section className={styles.overview}>
                <h2>📖 概要</h2>
                <p>useStateはコンポーネント内で状態を保持・更新するためのフックです。</p>
                <div className={styles.codeBlock}>
                    <code>const [state, setState] = useState(初期値);</code>
                </div>
            </section>

            {/* ここにデモを1つずつ追加していきます */}
            
            {/* 1. ハンバーガーメニュー - シンプルで理解しやすい
                2. カウンター - useStateの基本を理解できる
                3. タブ切り替え - 実務でよく使う
                4. アコーディオン - FAQでよく使う
                5. モーダル - ポップアップの基本 
            */}
        </div>
    );
}