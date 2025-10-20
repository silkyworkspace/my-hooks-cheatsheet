import { useState } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseState.module.css';

export default function UseState() {
    // カウンターのstate
    const [count, setCount] = useState(0);

    // ハンバーガーメニューのstate
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // タブ切り替えのstate
    const [activeTab, setActiveTab] = useState('home');

    // アコーディオンのstate
    const [openAccordion, setOpenAccordion] = useState(null);

    // モーダルのstate
    const [isModalOpen, setIsModalOpen] = useState(false);

    // アコーディオンのデータ
    const faqItems = [
        {
            id: 1,
            question: 'useStateとは何ですか？',
            answer: 'useStateはReactのフックの一つで、関数コンポーネント内で状態を管理するために使います。クラスコンポーネントのthis.stateに相当する機能を提供します。'
        },
        {
            id: 2,
            question: 'いつuseStateを使うべきですか？',
            answer: 'UIの表示状態（開閉、選択状態など）、フォームの入力値、カウンターなど、コンポーネント内で変化する値を扱う時に使います。'
        },
        {
            id: 3,
            question: 'useStateの注意点は？',
            answer: '直接stateを変更してはいけません。必ずsetState関数を使って更新します。また、オブジェクトや配列を更新する時は、新しいオブジェクト/配列を作成する必要があります。'
        },
        {
            id: 4,
            question: '複数のstateを使ってもいいですか？',
            answer: 'はい、1つのコンポーネントで複数のuseStateを使うことができます。関連性の低い値は別々のstateに分けた方が管理しやすくなります。'
        },
        {
            id: 5,
            question: '初期値はどう決めますか？',
            answer: '必要なデータ型に合わせて決めます。数値なら0、文字列なら空文字""、配列なら[]、オブジェクトなら{}、真偽値ならfalseなどが一般的です。'
        },
    ];

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
                    <CodeBlock code={`// stateの定義
const [count, setCount] = useState(0);

// 使い方
<button onClick={() => setCount(count - 1)}>−</button>
<span>{count}</span>
<button onClick={() => setCount(count + 1)}>+</button>
<button onClick={() => setCount(0)}>リセット</button>`} />
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
                    <CodeBlock code={`// stateの定義
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
</nav>`} />
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
                    <CodeBlock code={`// stateの定義
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
)}`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useState('home')</strong> - 初期値を文字列で指定</li>
                        <li><strong>setActiveTab('about')</strong> - クリックで値を変更</li>
                        <li><strong>条件付きレンダリング</strong> - activeTabの値によって表示を切替</li>
                        <li><strong>&&演算子</strong> - 条件がtrueの時だけ要素を表示</li>
                    </ul>
                </div>
            </section>

            {/* デモ4: アコーディオン */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ4: アコーディオン</h2>
                <p>FAQなどでよく使う開閉式コンテンツ</p>

                <div className={styles.demoBox}>
                    <div className={styles.accordion}>
                        {faqItems.map((item) => (
                            <div key={item.id} className={styles.accordionItem}>
                                <button
                                    className={`${styles.accordionTitle} ${openAccordion === item.id ? styles.active : ''
                                        }`}
                                    onClick={() => {
                                        setOpenAccordion(
                                            openAccordion === item.id ? null : item.id
                                        )
                                    }}>
                                    <span className={styles.questionText}>
                                        Q{item.id}. {item.question}
                                    </span>
                                    <span className={styles.icon}>
                                        {openAccordion === item.id ? '-' : '+'}
                                    </span>
                                </button>
                                {
                                    openAccordion === item.id && (
                                        <div className={styles.accordionContent}>
                                            <p>{item.answer}</p>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// stateの定義（開いている項目のIDを保存）
const [openAccordion, setOpenAccordion] = useState(null);

// データの定義
const faqItems = [
  { id: 1, question: '質問1', answer: '回答1' },
  { id: 2, question: '質問2', answer: '回答2' },
  // ...
];

// アコーディオンの実装
{faqItems.map((item) => (
  <div key={item.id}>
    <button 
      onClick={() => setOpenAccordion(
        openAccordion === item.id ? null : item.id
      )}
    >
      {item.question}
    </button>
    
    {openAccordion === item.id && (
      <div>{item.answer}</div>
    )}
  </div>
))}`} />
                </details>
                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useState(null)</strong> - 初期状態は何も開いていない</li>
                        <li><strong>map()で配列を展開</strong> - データから複数のコンポーネントを生成</li>
                        <li><strong>三項演算子</strong> - クリック時に開閉を切り替え</li>
                        <li><strong>key属性</strong> - 各項目にユニークなIDを指定</li>
                        <li>同時に開けるのは1つだけ（排他的制御）</li>
                    </ul>
                </div>
            </section>

            {/* デモ5: モーダル */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ5: モーダルウィンドウ</h2>
                <p>ポップアップ表示と外側クリックで閉じる処理</p>

                <div className={styles.demoBox}>
                    <button
                        className={styles.primaryButton}
                        onClick={() => { setIsModalOpen(true) }}>
                        モーダルを開く
                    </button>

                    {
                        isModalOpen && (
                            <div
                                className={styles.modalOverlay}
                                onClick={() => setIsModalOpen(false)}
                            >
                                <div
                                    className={styles.modalContent}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className={styles.modalHeader}>
                                        <h3>お知らせ</h3>
                                        <button
                                            className={styles.closeButton}
                                            onClick={() => setIsModalOpen(false)}
                                            aria-label="閉じる"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className={styles.modalBody}>
                                        <p>これはモーダルウィンドウの例です。</p>
                                        <p>以下の方法で閉じることができます：</p>
                                        <ul>
                                            <li>右上の「×」ボタンをクリック</li>
                                            <li>「閉じる」ボタンをクリック</li>
                                            <li>モーダルの外側（暗い部分）をクリック</li>
                                        </ul>
                                    </div>

                                    <div className={styles.modalFooter}>
                                        <button
                                            className={styles.secondaryButton}
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            キャンセル
                                        </button>
                                        <button
                                            className={styles.primaryButton}
                                            onClick={() => {
                                                alert('確認しました！');
                                                setIsModalOpen(false);
                                            }}
                                        >
                                            確認
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// stateの定義
const [isModalOpen, setIsModalOpen] = useState(false);

// モーダルを開くボタン
<button onClick={() => setIsModalOpen(true)}>
  モーダルを開く
</button>

// モーダルの実装
{isModalOpen && (
  <div 
    className="modalOverlay"
    onClick={() => setIsModalOpen(false)}  // 外側クリックで閉じる
  >
    <div 
      className="modalContent"
      onClick={(e) => e.stopPropagation()}  // 内側クリックは伝播させない
    >
      <h3>タイトル</h3>
      <p>コンテンツ</p>
      <button onClick={() => setIsModalOpen(false)}>
        閉じる
      </button>
    </div>
  </div>
)}`} />
                </details>
                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>useState(false)</strong> - 初期状態は閉じている</li>
                        <li><strong>条件付きレンダリング</strong> - isModalOpenがtrueの時だけ表示</li>
                        <li><strong>onClick on overlay</strong> - オーバーレイクリックで閉じる</li>
                        <li><strong>e.stopPropagation()</strong> - モーダル内クリックは親に伝播させない</li>
                        <li><strong>固定配置</strong> - position: fixed で画面中央に表示</li>
                    </ul>
                </div>

            </section>


        </div>// .pageContainer
    );
}