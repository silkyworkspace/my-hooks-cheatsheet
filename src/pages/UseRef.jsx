import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseRef.module.css';

export default function UseRef() {
    // デモ1: フォーカス制御のref
    const inputRef = useRef(null);
    const textareaRef = useRef(null);
    const searchRef = useRef(null);

    // 比較デモ用のstate
    const [renderCount, setRenderCount] = useState(0);
    const [stateValue, setStateValue] = useState('');
    const refRenderCount = useRef(0);

    // デモ1: ページ読み込み時に検索ボックスにフォーカス
    useEffect(() => {
        searchRef.current?.focus();
    }, []);



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

            {/* デモ1: フォーカス制御 */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ1: フォーカス制御</h2>
                <p>ボタンクリックで入力欄にフォーカスを当てる</p>

                <div className={styles.demoBox}>
                    {/* 例1: 入力欄へのフォーカス */}
                    <div className={styles.focusGroup}>
                        <h3>📝 基本的なフォーカス</h3>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="ここにフォーカスします"
                            className={styles.input}
                        />
                        <button
                            className={styles.focusButton}
                            onClick={() => inputRef.current?.focus()}
                        >
                            入力欄にフォーカス
                        </button>
                    </div>

                    {/* 例2: テキストエリアへのフォーカス */}
                    <div className={styles.focusGroup}>
                        <h3>📋 テキストエリアへのフォーカス</h3>
                        <textarea
                            ref={textareaRef}
                            placeholder="コメントを入力..."
                            className={styles.textarea}
                            rows="4"
                        />
                        <button
                            className={styles.focusButton}
                            onClick={() => textareaRef.current?.focus()}
                        >
                            テキストエリアにフォーカス
                        </button>
                    </div>

                    {/* 例3: 検索ボックス（ページ読み込み時に自動フォーカス） */}
                    <div className={styles.focusGroup}>
                        <h3>🔍 自動フォーカス（ページ読み込み時）</h3>
                        <input
                            ref={searchRef}
                            type="search"
                            placeholder="検索..."
                            className={styles.input}
                        />
                        <p className={styles.hint}>
                            💡 このページを開いた時、自動的にこの検索ボックスにフォーカスが当たります
                        </p>
                    </div>
                </div> {/* .styles.demoBox */}

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// refの作成
const inputRef = useRef(null);
/*
この時点で inputRef は次のようなオブジェクト
{ current: null }
つまり、inputRef.current = null;である
*/

// JSX: refを要素に紐付け
<input
  ref={inputRef}
  type="text"
  placeholder="入力してください"
/>
/*
currentプロパティには、このinputそのもののDOM要素（HTMLInputElement）が代入される
つまり、inputRef.current = <input type="text" ...> のDOM要素 になる
*/

// フォーカスを当てる
<button onClick={() => inputRef.current?.focus()}>
  フォーカス
</button>

// ページ読み込み時に自動フォーカス
useEffect(() => {
  searchRef.current?.focus();
}, []); // マウント時のみ実行`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useRef(null)</strong> - 初期値はnullで作成</li>
                        <li><strong>ref属性</strong> - DOM要素にrefを紐付ける</li>
                        <li><strong>ref.current</strong> - 実際のDOM要素にアクセス</li>
                        <li><strong>?.focus()</strong> - オプショナルチェーンで安全に呼び出し</li>
                        <li><strong>useEffectと組み合わせ</strong> - マウント時の自動フォーカス</li>
                        <li><strong>再レンダリングなし</strong> - refの更新は再レンダリングをトリガーしない</li>
                    </ul>
                </div> {/* .styles.explanation */}


                <div className={`${styles.demoBox} ${styles.secondDemoBox}`}>
                    {/* 例4: useRef vs useState の違い（新規追加） */}
                    <h3>⚔️ useRef vs useState の違い</h3>

                    <div className={styles.comparisonGrid}>

                        {/* useState の例 */}
                        <div className={styles.comparisonBox}>
                            <h4 className={styles.comparisonTitle}>
                                useState（再レンダリングあり）
                            </h4>
                            <div className={styles.renderCounter}>
                                再レンダリング回数: <strong>{renderCount}</strong>
                            </div>
                            <input
                                type="text"
                                value={stateValue}
                                onChange={(e) => {
                                    setStateValue(e.target.value);
                                    setRenderCount(prev => prev + 1);
                                }}
                                placeholder="入力してみてください"
                                className={styles.input}
                            />
                            <p className={styles.comparisonNote}>
                                ⚠️ 1文字入力するたびに再レンダリング
                            </p>
                        </div>

                        {/* useRef の例 */}
                        <div className={styles.comparisonBox}>
                            <h4 className={styles.comparisonTitle}>
                                useRef（再レンダリングなし）
                            </h4>
                            <div className={styles.renderCounter}>
                                再レンダリング回数: <strong>{refRenderCount.current}</strong>
                            </div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    // refの値を更新（再レンダリングなし）
                                    console.log('useRef値:', e.target.value);
                                }}
                                placeholder="入力してみてください"
                                className={styles.input}
                            />
                            <p className={styles.comparisonNote}>
                                ✅ 何文字入力しても再レンダリングなし
                            </p>
                        </div>


                    </div> {/* .styles.comparisonGrid */}


                </div> {/* .styles.demoBox */}

                <div className={styles.comparisonExplanation}>
                <h4>📊 違いのまとめ</h4>

                <table className={styles.comparisonTable}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>useState</th>
                            <th>useRef</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>再レンダリング</strong></td>
                            <td className={styles.negative}>あり ⚠️</td>
                            <td className={styles.positive}>なし ✅</td>
                        </tr>
                        <tr>
                            <td><strong>値の保持</strong></td>
                            <td className={styles.positive}>あり ✅</td>
                            <td className={styles.positive}>あり ✅</td>
                        </tr>
                        <tr>
                            <td><strong>画面表示</strong></td>
                            <td className={styles.positive}>更新される ✅</td>
                            <td className={styles.negative}>更新されない ⚠️</td>
                        </tr>
                        <tr>
                            <td><strong>用途</strong></td>
                            <td>画面に表示する値</td>
                            <td>DOM参照・裏側の値</td>
                        </tr>
                    </tbody>
                </table>

                </div> {/* .styles.comparisonExplanation */}
                
                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useState（再レンダリングあり）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
// 入力するたびに再レンダリング
// → 画面が更新される
// → パフォーマンスに影響

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useRef（再レンダリングなし）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const inputRef = useRef(null);

<input ref={inputRef} />

// 値を取得
const value = inputRef.current?.value;

// フォーカス
inputRef.current?.focus();

// 再レンダリングなし
// → パフォーマンスが良い
// → 画面は更新されない

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 使い分け
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// useState: 画面に表示する値
// useRef: DOM操作、裏側で使う値`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useState</strong> - 値が変わると再レンダリング（画面更新）</li>
                        <li><strong>useRef</strong> - 値が変わっても再レンダリングなし（画面そのまま）</li>
                        <li><strong>useRefの用途</strong> - DOM操作、タイマーID、前回の値の保持</li>
                        <li><strong>useStateの用途</strong> - ユーザーに見せる値、画面に反映する値</li>
                        <li><strong>パフォーマンス</strong> - 不要な再レンダリングを避けるためuseRefを使う</li>
                    </ul>
                </div> {/* .styles.explanation */}


            </section> {/* .styles.demoSection */}
        </div> // .styles.pageContainer
    );
}