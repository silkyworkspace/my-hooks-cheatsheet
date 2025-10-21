import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseEffect.module.css';

export default function UseEffect() {

    // デモ1: スクロール位置のstate
    const [scrollY, setScrollY] = useState(0);
    const [scrollPercent, setScrollPercent] = useState(0);

    // デモ2: スクロール連動ヘッダーのstate
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0); // 前のスクロール位置


    // デモ1: スクロールイベントを監視
    useEffect(() => {
        // 現在のスクロール位置をスクロール率をstateに反映する関数
        const handleScroll = () => {
            // 現在のスクロール位置
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            // スクロール率を計算(0〜100%)
            const windowHeight = window.innerHeight; // 画面の高さ
            const documentHeight = document.documentElement.scrollHeight; // ページ全体の高さ
            const scrollableHeight = documentHeight - windowHeight;
            const percent = scrollableHeight > 0 ? Math.round((currentScrollY / scrollableHeight) * 100) : 0;

            setScrollPercent(percent);
        };

        window.addEventListener('scroll', handleScroll);

        // 初期値を設定（ページ表示時から正しい値が表示させるため）
        handleScroll();

        // クリーンアップ：コンポーネントがアンマウントされる時にリスナーを削除
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []); // 空の依存配列 = マウント時のみ実行


    // デモ2: ヘッダーの表示/非表示を制御
    useEffect(() => {
        const handleScroll = () => {
            // 現在のスクロール位置
            const currentScrollY = window.scrollY;

            // スクロール方向を判定（現在のスクロール位置と前のスクロール位置を比べる）
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // 下スクロール & 100px以上スクロールしたらヘッダーを隠す
                setIsHeaderVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // 上スクロールしたらヘッダーを表示
                setIsHeaderVisible(true);
            }

            // 現在のスクロール位置を保存
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY]); // lastScrollYが変わるたびに実行




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

            {/* デモ1: スクロール位置検知 */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ1: スクロール位置検知</h2>
                <p>ページ全体のスクロール位置を取得・表示</p>

                <div className={styles.demoBox}>
                    <div className={styles.scrollInfo}>
                        <div className={styles.scrollItem}>
                            <span className={styles.scrollLabel}>スクロール位置:</span>
                            <span className={styles.scrollValue}>{scrollY}px</span>
                        </div>
                        <div className={styles.scrollItem}>
                            <span className={styles.scrollLabel}>スクロール率:</span>
                            <span className={styles.scrollValue}>{scrollPercent}%</span>
                        </div>
                    </div>

                    {/* プログレスバー */}
                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${scrollPercent}%` }}
                        ></div>
                    </div>

                    {/* スクロールを促すダミーコンテンツ */}
                    <div className={styles.dummyContent}>
                        <p>👇 下にスクロールしてみてください</p>
                        {[...Array(10)].map((_, i) => (
                            <p key={i}>スクロール検知のデモコンテンツ {i + 1}</p>
                        ))}
                    </div>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// stateの定義
const [scrollY, setScrollY] = useState(0);
const [scrollPercent, setScrollPercent] = useState(0);

// useEffectでスクロールイベントを監視
useEffect(() => {
  const handleScroll = () => {
    // 現在のスクロール位置
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    // スクロール率を計算
    const windowHeight = window.innerHeight; // 画面の高さ
    const documentHeight = document.documentElement.scrollHeight; // ページ全体の高さ
    const scrollableHeight = documentHeight - windowHeight;
    const percent = scrollableHeight > 0 
      ? Math.round((currentScrollY / scrollableHeight) * 100)
      : 0;
    setScrollPercent(percent);
  };

  // イベントリスナーを登録
  window.addEventListener('scroll', handleScroll);
  
  // 初期値を設定（ページ表示時から正しい値が表示させるため）
  handleScroll();

  // クリーンアップ
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []); // 空配列 = マウント時のみ実行`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>window.scrollY</strong> - 現在のスクロール位置（px）</li>
                        <li><strong>addEventListener</strong> - スクロールイベントを監視</li>
                        <li><strong>return文でクリーンアップ</strong> - メモリリーク防止</li>
                        <li><strong>空の依存配列[]</strong> - マウント時のみeffectを実行</li>
                        <li><strong>リアルタイム更新</strong> - スクロールするたびにstateが更新される</li>
                    </ul>
                </div>
            </section>

            {/* デモ2: スクロール連動ヘッダー */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ2: スクロール連動ヘッダー</h2>
                <p>下スクロールで隠れる、上スクロールで表示されるヘッダー</p>

                <div className={styles.demoBox}>
                    {/* デモ用の固定ヘッダー */}
                    <div className={styles.demoHeaderContainer}>
                        {/* これがheaderだとする */}
                        <div
                            className={`${styles.demoHeader} ${isHeaderVisible ? styles.visible : styles.hidden
                                }`}
                        >
                            <span className={styles.logo}>🌟 My Site</span>
                            <nav className={styles.nav}>
                                <a href="#home">ホーム</a>
                                <a href="#about">About</a>
                                <a href="#contact">お問い合わせ</a>
                            </nav>
                        </div>

                        {/* スクロールを促すコンテンツ */}
                        <div className={styles.scrollContent}>
                            <div className={styles.scrollInstruction}>
                                <p>👇 枠外で下にスクロールするとヘッダーが隠れます</p>
                                <p>👆 枠外で上にスクロールするとヘッダーが表示されます</p>
                            </div>

                            {[...Array(15)].map((_, i) => (
                                <div key={i} className={styles.contentBlock}>
                                    <h4>コンテンツブロック {i + 1}</h4>
                                    <p>スクロール連動ヘッダーのデモコンテンツです。</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// stateの定義
const [isHeaderVisible, setIsHeaderVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0); // 前のスクロール位置

// ヘッダーの表示/非表示を制御
useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // スクロール方向を判定
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // 下スクロール & 100px以上 → 隠す
      setIsHeaderVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // 上スクロール → 表示
      setIsHeaderVisible(true);
    }

    // 現在位置を保存
    setLastScrollY(currentScrollY);
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [lastScrollY]); // lastScrollYを依存配列に追加

// ヘッダーのCSS
<header className={\`header \${isHeaderVisible ? 'visible' : 'hidden'}\`}>
  {/* ヘッダーの内容 */}
</header>`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>スクロール方向の判定</strong> - 前回位置と現在位置を比較</li>
                        <li><strong>lastScrollY</strong> - 前回のスクロール位置を保存</li>
                        <li><strong>依存配列[lastScrollY]</strong> - lastScrollYが変わるたびに再登録</li>
                        <li><strong>100px以上の条件</strong> - トップ付近では隠さない</li>
                        <li><strong>CSSトランジション</strong> - スムーズなアニメーション</li>
                    </ul>
                </div>
            </section>
        </div>






    );
}