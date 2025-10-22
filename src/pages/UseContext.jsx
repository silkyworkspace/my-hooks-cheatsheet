// import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseRef.module.css';

export default function UseContext() {
    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <Link to="/" className={styles.backButton}>← 戻る</Link>
                <h1>useContext</h1>
                <p className={styles.description}>グローバルステート管理 - propsのバケツリレーを解消</p>
            </header>

            {/* 概要 */}
            <section className={styles.overview}>
                <h2>📖 概要</h2>
                <p>useContextは、コンポーネント間でデータを共有するためのフックです。</p>
                <p>propsを何階層も渡す「propsドリリング」を避けることができます。</p>
                <div className={styles.codeBlock}>
                    <code>const value = useContext(MyContext);</code>
                </div>
            </section>

            {/* 問題点の説明 */}
            <section className={styles.problemSection}>
                <h2>❌ Context なしの問題</h2>
                <div className={styles.problemBox}>
                    <h3>propsドリリング（バケツリレー）</h3>
                    <div className={styles.diagram}>
                        <div className={styles.component}>
                            App (user)
                            <div className={styles.arrow}>↓ props</div>
                            <div className={styles.component}>
                                Header (user)
                                <div className={styles.arrow}>↓ props</div>
                                <div className={styles.component}>
                                    Nav (user)
                                    <div className={styles.arrow}>↓ props</div>
                                    <div className={styles.component}>
                                        UserMenu (user) ← やっと使う！
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={styles.problemNote}>
                        ⚠️ 中間のコンポーネントは使わないのに、propsを渡すだけの役割になってしまう
                    </p>
                </div>
            </section>

            {/* 解決策の説明 */}
            <section className={styles.solutionSection}>
                <h2>✅ Context ありの解決</h2>
                <div className={styles.solutionBox}>
                    <h3>Context で直接アクセス</h3>
                    <div className={styles.diagram}>
                        <div className={styles.component}>
                            App (Context Provider)
                            <div className={styles.contextArrow}>
                                Context 🌐
                            </div>
                            <div className={styles.component}>
                                Header
                                <div className={styles.component}>
                                    Nav
                                    <div className={styles.component}>
                                        UserMenu ← Contextから直接取得！
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={styles.solutionNote}>
                        ✅ どの階層からでも直接アクセスできる
                    </p>
                </div>
            </section>

            {/* ここにデモを追加していきます */}
        </div>
    );
}