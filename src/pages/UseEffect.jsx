// import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseEffect.module.css';

export default function UseEffect() {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <Link to="/" className={styles.backButton}>← 戻る</Link>
                <h1>useEffect</h1>
                <p className={styles.description}>副作用・ライフサイクル - データ取得やイベント処理</p>
            </header>

            {/* 概要 */}
            <section className={styles.overview}>
                <h2>📖 概要</h2>
                <p>useEffectは副作用（データ取得、イベントリスナー、タイマーなど）を扱うフックです。</p>
                <div className={styles.codeBlock}>
                    <code>useEffect(() =&gt; &#123; /* 副作用の処理 */ &#125;, [依存配列]);</code>
                </div>
            </section>

            {/* ここにデモを追加していきます */}
        </div>

    );
}