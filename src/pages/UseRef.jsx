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

    // デモ2: スムーススクロールのref
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    const topRef = useRef(null);

    // デモ3: 前回の値を保持
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const prevCountRef = useRef(0);
    const prevNameRef = useRef('');
    const renderCountRef = useRef(0);

    // デモ1: ページ読み込み時に検索ボックスにフォーカス
    useEffect(() => {
        searchRef.current?.focus();
    }, []);

    // スムーススクロール
    const scrollToSection = (ref) => {
        console.log('ref:', ref);                    // refオブジェクト全体
        console.log('ref.current:', ref.current);    // DOM要素
        console.log('scrollIntoView:', ref.current?.scrollIntoView);  // 関数

        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // レンダリング回数をカウント
    renderCountRef.current = renderCountRef.current + 1;

    // useEffectで前回の値を保存
    useEffect(() => {
        prevCountRef.current = count;

        console.log('前回:', prevCountRef.current);
        console.log('現在:', count);
        console.log('変化:', count - prevCountRef.current);

    }, [count]);

    useEffect(() => {
        prevNameRef.current = name;
    }, [name]);


    return (
        <div className={styles.pageContainer}>

            {/* ページトップの目印 */}
            <div ref={topRef}></div>


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

            {/* デモ2: スムーススクロール */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ2: スムーススクロール</h2>
                <p>ボタンクリックで特定のセクションまでスムーズにスクロール</p>

                <div className={styles.demoBox}>
                    {/* ナビゲーションボタン */}
                    <div className={styles.scrollNav}>
                        <h3>📍 ナビゲーション</h3>
                        <div className={styles.scrollButtons}>
                            <button
                                className={styles.scrollButton}
                                onClick={() => scrollToSection(section1Ref)}
                            >
                                → セクション1へ
                            </button>
                            <button
                                className={styles.scrollButton}
                                onClick={() => scrollToSection(section2Ref)}
                            >
                                → セクション2へ
                            </button>
                            <button
                                className={styles.scrollButton}
                                onClick={() => scrollToSection(section3Ref)}
                            >
                                → セクション3へ
                            </button>
                            <button
                                className={styles.scrollButton}
                                onClick={() => scrollToSection(topRef)}
                            >
                                ↑ トップへ戻る
                            </button>
                        </div>
                    </div>

                    {/* スクロール先のセクション */}
                    <div className={styles.scrollContent}>
                        {/* セクション1 */}
                        <div ref={section1Ref} className={styles.scrollSection}>
                            <h4>📌 セクション1</h4>
                            <p>ここはセクション1です。useRefでこの要素への参照を保持しています。</p>
                            <p>scrollIntoView()メソッドを使って、スムーズにスクロールできます。</p>
                            <div className={styles.placeholder}>
                                <p>🎯 スクロール先の目印</p>
                            </div>
                        </div>

                        {/* セクション2 */}
                        <div ref={section2Ref} className={styles.scrollSection}>
                            <h4>📌 セクション2</h4>
                            <p>ここはセクション2です。ページ内リンクのようにスムーズに移動します。</p>
                            <p>実際のWebサイトでは、目次や「ページトップへ戻る」ボタンでよく使います。</p>
                            <div className={styles.placeholder}>
                                <p>🎯 スクロール先の目印</p>
                            </div>
                        </div>

                        {/* セクション3 */}
                        <div ref={section3Ref} className={styles.scrollSection}>
                            <h4>📌 セクション3</h4>
                            <p>ここはセクション3です。最後のセクションです。</p>
                            <p>「トップへ戻る」ボタンで最上部まで一気にスクロールできます。</p>
                            <div className={styles.placeholder}>
                                <p>🎯 スクロール先の目印</p>
                            </div>
                        </div>
                    </div>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// refの作成
const section1Ref = useRef(null);
const section2Ref = useRef(null);
const topRef = useRef(null);

// スクロール関数
const scrollToSection = (ref) => {
  ref.current?.scrollIntoView({
    behavior: 'smooth',  // スムーズにスクロール
    block: 'start',      // 要素の上端に合わせる
  });
};

// JSX: refを要素に紐付け
<div ref={topRef}></div>  {/* トップの目印 */}

<div ref={section1Ref}>
  セクション1の内容
</div>

<div ref={section2Ref}>
  セクション2の内容
</div>

// ボタン
<button onClick={() => scrollToSection(section1Ref)}>
  セクション1へ
</button>

<button onClick={() => scrollToSection(topRef)}>
  トップへ戻る
</button>`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>scrollIntoView()</strong> - DOM要素をビューポートに表示</li>
                        <li><strong>behavior: 'smooth'</strong> - スムーズなスクロールアニメーション</li>
                        <li><strong>block: 'start'</strong> - 要素の上端をビューポートの上端に合わせる</li>
                        <li><strong>目次・ページ内リンク</strong> - よく使われる実用パターン</li>
                        <li><strong>「トップへ戻る」ボタン</strong> - 長いページで便利</li>
                        <li><strong>アンカーリンクの代替</strong> - a要素を使わずにスクロール制御</li>
                    </ul>
                </div>
            </section>

            {/* デモ3: 前回の値を保持 */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ3: 前回の値を保持</h2>
                <p>useRefで前回の値を記憶し、現在の値と比較する</p>

                <div className={styles.demoBox}>
                    {/* レンダリング回数表示 */}
                    <div className={styles.renderInfo}>
                        <h3>🔄 レンダリング情報</h3>
                        <div className={styles.renderBadge}>
                            レンダリング回数: <strong>{renderCountRef.current}</strong>
                        </div>
                    </div>

                    {/* 例1: カウンターの変化を追跡 */}
                    <div className={styles.valueTracker}>
                        <h3>📊 カウンターの変化を追跡</h3>

                        <div className={styles.valueDisplay}>
                            <div className={styles.valueBox}>
                                <span className={styles.valueLabel}>前回の値:</span>
                                <span className={styles.valueNumber}>{prevCountRef.current}</span>
                            </div>
                            <div className={styles.arrow}>→</div>
                            <div className={styles.valueBox}>
                                <span className={styles.valueLabel}>現在の値:</span>
                                <span className={styles.valueNumber}>{count}</span>
                            </div>
                        </div>

                        <div className={styles.valueChange}>
                            {count > prevCountRef.current && (
                                <span className={styles.increase}>
                                    📈 増加: +{count - prevCountRef.current}
                                </span>
                            )}
                            {count < prevCountRef.current && (
                                <span className={styles.decrease}>
                                    📉 減少: {count - prevCountRef.current}
                                </span>
                            )}
                            {count === prevCountRef.current && (
                                <span className={styles.noChange}>
                                    ➡️ 変化なし
                                </span>
                            )}
                        </div>

                        <div className={styles.controls}>
                            <button
                                className={styles.countButton}
                                onClick={() => setCount(count - 1)}
                            >
                                −1
                            </button>
                            <button
                                className={styles.countButton}
                                onClick={() => setCount(count + 1)}
                            >
                                +1
                            </button>
                            <button
                                className={styles.countButton}
                                onClick={() => setCount(count + 5)}
                            >
                                +5
                            </button>
                            <button
                                className={styles.resetButton}
                                onClick={() => setCount(0)}
                            >
                                リセット
                            </button>
                        </div>
                    </div>

                    {/* 例2: 名前の変化を追跡 */}
                    <div className={styles.valueTracker}>
                        <h3>✏️ 名前の変化を追跡</h3>

                        <div className={styles.nameDisplay}>
                            <div className={styles.nameBox}>
                                <span className={styles.nameLabel}>前回の名前:</span>
                                <span className={styles.nameValue}>
                                    {prevNameRef.current || '(未入力)'}
                                </span>
                            </div>
                            <div className={styles.arrow}>→</div>
                            <div className={styles.nameBox}>
                                <span className={styles.nameLabel}>現在の名前:</span>
                                <span className={styles.nameValue}>
                                    {name || '(未入力)'}
                                </span>
                            </div>
                        </div>

                        {name !== prevNameRef.current && (
                            <div className={styles.nameChange}>
                                🔄 名前が変更されました
                            </div>
                        )}

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="名前を入力してください"
                            className={styles.input}
                        />
                    </div>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// stateの定義
const [count, setCount] = useState(0);

// 前回の値を保存するref
const prevCountRef = useRef(0);

// useEffectで前回の値を記憶
useEffect(() => {
  prevCountRef.current = count;
}, [count]);  // countが変わるたびに実行

// 使い方
console.log('前回:', prevCountRef.current);
console.log('現在:', count);
console.log('変化:', count - prevCountRef.current);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 動作の流れ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. 初期レンダリング
count = 0
prevCountRef.current = 0

// 2. ボタンクリック（+1）
setCount(1) → 再レンダリング

// 3. レンダリング中
count = 1                    // 新しい値
prevCountRef.current = 0     // まだ古い値

// 4. useEffectが実行される
prevCountRef.current = 1     // 更新

// 5. 次のクリック時
count = 1（現在）
prevCountRef.current = 1（前回）
で比較できる！`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useRef + useEffect</strong> - 前回の値を記憶するパターン</li>
                        <li><strong>再レンダリングなし</strong> - refの更新は画面に影響しない</li>
                        <li><strong>useEffectのタイミング</strong> - レンダリング後に実行される</li>
                        <li><strong>差分の計算</strong> - 現在の値と前回の値を比較</li>
                        <li><strong>実用例</strong> - アニメーション、変化の検知、デバッグ</li>
                        <li><strong>usePrevious フック</strong> - カスタムフックで再利用可能</li>
                    </ul>
                </div>
            </section>

        </div> // .styles.pageContainer
    );
}