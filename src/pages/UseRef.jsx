// import { useState, useEffect, useEffect } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseRef.module.css';

export default function UseRef() {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <Link to="/" className={styles.backButton}>← 戻る</Link>
                <h1>useRef</h1>
                <p className={styles.description}>DOM参照・値の保持 - 再レンダリングなしで値を保存</p>
            </header>

            {/* 概要 */}
            <section className={styles.overview}>
                <h2>📖 概要</h2>
                <p>useRefはDOM要素への参照や、再レンダリングをトリガーしない値の保持に使います。</p>
                <div className={styles.codeBlock}>
                    <code>const ref = useRef(初期値);</code>
                </div>
            </section>

            {/* ここにデモを追加していきます */}
        </div>

    );
}