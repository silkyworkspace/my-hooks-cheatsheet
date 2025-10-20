import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './UseState.module.css';

export default function UseState() {
    // カウンターのstate
    const [count, setCount] = useState(0);

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

            {/* デモ1: カウンター */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ1: カウンター</h2>
                <p>useStateの基本 - 数値の増減とリセット</p>

                <div className={styles.demoBox}>
                    <div className={styles.counter}>
                        <button
                            className={styles.counterButton}
                            onClick={() => setCount(count - 1)}
                        >
                            −
                        </button>
                        <span className={styles.countDisplay}>{count}</span>
                        <button
                            className={styles.counterButton}
                            onClick={() => setCount(count + 1)}
                        >
                            +
                        </button>
                        <button
                            className={styles.resetButton}
                            onClick={() => setCount(0)}
                        >
                            リセット
                        </button>
                    </div>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <pre><code>{`// stateの定義
const [count, setCount] = useState(0);

// 使い方
<button onClick={() => setCount(count - 1)}>−</button>
<span>{count}</span>
<button onClick={() => setCount(count + 1)}>+</button>
<button onClick={() => setCount(0)}>リセット</button>`}</code></pre>
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useState(0)</strong> - 初期値を0に設定</li>
                        <li><strong>setCount(count + 1)</strong> - 現在の値に1を足す</li>
                        <li><strong>setCount(0)</strong> - 直接値を指定してリセット</li>
                        <li>ボタンをクリックするたびに再レンダリングされる</li>
                    </ul>
                </div>
            </section>        </div>


    );
}