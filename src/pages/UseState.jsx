import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './UseState.module.css';

export default function UseState() {
    // カウンターのstate
    const [count, setCount] = useState(0);

    // ハンバーガーメニューのstate
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // タブ切り替えのstate
    const [activeTab, setActiveTab] = useState('home')

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
                        <li>
                            <strong>setCount(prevCount =&gt; prevCount + 1);</strong>
                            の方が良いとされてもいる<br />
                            理由：連続クリック時、まだ更新されていない古い値を使ってしまうので、
                            関数型更新が安全(Reactが「必ず最新の値」をprevCountに渡してくれる)
                        </li>
                    </ul>
                </div>
            </section>

            {/* デモ2: ハンバーガーメニュー */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ2: ハンバーガーメニュー</h2>
                <p>モバイルサイトでよく使うメニューの開閉</p>

                <div className={`${styles.demoBox} ${styles.hamBox}`}>
                    <button
                        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="メニュー"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
                        <ul>
                            <li><a href="#home">ホーム</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#service">サービス</a></li>
                            <li><a href="#portfolio">ポートフォリオ</a></li>
                            <li><a href="#contact">お問い合わせ</a></li>
                        </ul>
                    </nav>
                </div>
                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <pre><code>{`// stateの定義
const [isMenuOpen, setIsMenuOpen] = useState(false);

// メニューボタン
<button 
  className={\`hamburger \${isMenuOpen ? 'active' : ''}\`}
  onClick={() => setIsMenuOpen(!isMenuOpen)}
>
  <span></span>
  <span></span>
  <span></span>
</button>

// メニュー本体
<nav className={\`menu \${isMenuOpen ? 'open' : ''}\`}>
  <ul>
    <li><a href="#home">ホーム</a></li>
    {/* ... */}
  </ul>
</nav>`}</code></pre>
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useState(false)</strong> - 初期状態は閉じている</li>
                        <li><strong>!isMenuOpen</strong> - 現在の状態を反転（true ↔ false）</li>
                        <li><strong>条件付きクラス</strong> - isMenuOpenがtrueの時だけactiveクラスを追加</li>
                        <li><strong>CSSアニメーション</strong> - クラスの追加/削除でスムーズに開閉</li>
                    </ul>
                </div>
            </section>

            {/* デモ3: タブ切り替え */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ3: タブ切り替え</h2>
                <p>コンテンツの切り替え表示 - よくあるUI</p>

                <div className={styles.demoBox}>

                    <div className={styles.tabs}>
                        <button
                            className={activeTab === 'home' ? styles.active : ''}
                            onClick={() => setActiveTab('home')}
                        >
                            🏠 ホーム
                        </button>
                        <button
                            className={activeTab === 'about' ? styles.active : ''}
                            onClick={() => setActiveTab('about')}
                        >
                            👤 About
                        </button>
                        <button
                            className={activeTab === 'services' ? styles.active : ''}
                            onClick={() => setActiveTab('services')}
                        >
                            💼 サービス
                        </button>
                        <button
                            className={activeTab === 'contact' ? styles.active : ''}
                            onClick={() => setActiveTab('contact')}
                        >
                            📧 お問い合わせ
                        </button>
                    </div>
                    <div className={styles.tabContent}>
                        {/* &&の左側の条件がtrueのときだけ右側を実行（表示） */}
                        {activeTab === 'home' && (
                            <div className={styles.tabPanel}>
                                <h3>ホーム</h3>
                                <p>ようこそ！このサイトではReact Hooksの実装方法を学べます。</p>
                                <p>各タブをクリックして、コンテンツが切り替わる様子を確認してください。</p>
                            </div>
                        )}
                        {activeTab === 'about' && (
                            <div className={styles.tabPanel}>
                                <h3>About</h3>
                                <p>このチートシートは、Webサイト制作でよく使うReact Hooksをまとめたものです。</p>
                                <ul>
                                    <li>実務で使える実装例</li>
                                    <li>コピペで使えるコード</li>
                                    <li>分かりやすい解説</li>
                                </ul>                        </div>
                        )}
                        {activeTab === 'services' && (
                            <div className={styles.tabPanel}>
                                <h3>サービス</h3>
                                <p>提供しているサービス一覧：</p>
                                <ul>
                                    <li>useState - 状態管理</li>
                                    <li>useEffect - 副作用処理</li>
                                    <li>useContext - グローバル状態</li>
                                    <li>Custom Hooks - 独自フック</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className={styles.tabPanel}>
                                <h3>お問い合わせ</h3>
                                <p>ご質問やフィードバックはGitHubのIssuesからお願いします。</p>
                                <p>📧 Email: div.sawa@example.com</p>
                                <p>🐙 GitHub: @div.sawa</p>
                            </div>
                        )}

                    </div>
                </div>




                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <pre><code>{`// stateの定義
const [activeTab, setActiveTab] = useState('home');

// タブボタン
<button 
  className={activeTab === 'home' ? 'active' : ''}
  onClick={() => setActiveTab('home')}
>
  ホーム
</button>

// コンテンツ表示
{activeTab === 'home' && (
  <div>ホームのコンテンツ</div>
)}

{activeTab === 'about' && (
  <div>Aboutのコンテンツ</div>
)}`}</code></pre>
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useState('home')</strong> - 初期値を文字列で指定</li>
                        <li><strong>setActiveTab('about')</strong> - クリックで値を変更</li>
                        <li><strong>条件付きレンダリング</strong> - activeTabの値によって表示を切替</li>
                        <li><strong>&&演算子</strong> - 条件がtrueの時だけ要素を表示</li>
                    </ul>
                </div>            </section>




        </div>// .pageContainer
    );
}