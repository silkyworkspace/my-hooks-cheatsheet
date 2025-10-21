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

    // デモ3: データフェッチのstate
    const [users, setUsers] = useState([]); // 取得する情報（配列）
    const [loading, setLoading] = useState(false); // 読み込み中かどうか
    const [error, setError] = useState(false); // エラーが出ているかどうか

    // デモ4: タイマーのstate
    const [seconds, setSeconds] = useState(0); // カウント（経過秒数）
    const [isTimerRunning, setIsTimerRunning] = useState(false); // タイマーが動作中かどうか（実行中/停止中）
    const [autoSlideIndex, setAutoSlideIndex] = useState(0); // スライドのインデックス（何番目のスライドか: 0, 1, 2, 3...）

    // スライドのデータ
    const slides = [
        { id: 1, title: 'スライド 1', color: '#10b981', emoji: '🌟' },
        { id: 2, title: 'スライド 2', color: '#3b82f6', emoji: '🚀' },
        { id: 3, title: 'スライド 3', color: '#f59e0b', emoji: '⭐' },
        { id: 4, title: 'スライド 4', color: '#ef4444', emoji: '🎨' },
    ];


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

    // デモ3: データフェッチ
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!res.ok) {
                throw new Error('データの取得に失敗しました');
            }

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // コンポーネントマウント時にデータを取得
    useEffect(() => {
        fetchUsers();
    }, []) // 空配列 = マウント時のみ実行


    // デモ4-1: カウントアップタイマー
    useEffect(() => {
        let timerIntervalId; // ← タイマーIDを保存する箱を用意（タイマーの識別番号）

        if (isTimerRunning) {
            timerIntervalId = setInterval(() => { // ← 箱にIDを保存
                setSeconds(prev => prev + 1);
            }, 1000); // 1秒ごとに実行
        }

        // クリーンアップ: コンポーネントアンマウント時にタイマー停止
        return () => {
            if (timerIntervalId) { // ← 箱からIDを取り出して停止
                clearInterval(timerIntervalId);
            }
        };
    }, [isTimerRunning]); // isTimerRunningが変わるたびに再実行

    // デモ4-2: 自動スライドショー
    useEffect(() => {
        let slideIntervalId;  // ← スライド用

        slideIntervalId = setInterval(() => {
            setAutoSlideIndex(prev => (prev + 1) % slides.length); // 0, 1, 2, 3を返す
        }, 3000); // 3秒ごとに次のスライド
        // prev = 0
        // (0 + 1) % 4 = 1 % 4 = 1
        // → autoSlideIndex = 1

        // prev = 1
        // (1 + 1) % 4 = 2 % 4 = 2
        // → autoSlideIndex = 2

        // prev = 2
        // (2 + 1) % 4 = 3 % 4 = 3
        // → autoSlideIndex = 3

        // prev = 3
        // (3 + 1) % 4 = 4 % 4 = 0 ← 0に戻る！
        // → autoSlideIndex = 0
        // ... 以降ループ

        // クリーンアップ: コンポーネントアンマウント時にタイマー停止
        return () => {
            clearInterval(slideIntervalId);
        };
    }, []); // 空配列 = マウント時のみ

    // タイマー操作関数
    const startTimer = () => setIsTimerRunning(true);
    const stopTimer = () => setIsTimerRunning(false);
    const resetTimer = () => {
        setIsTimerRunning(false);
        setSeconds(0);
    };

    // 時間を MM:SS 形式に変換
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

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

            {/* デモ3: データフェッチ */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ3: データフェッチ（API連携）</h2>
                <p>外部APIからデータを取得して表示</p>

                <div className={styles.demoBox}>
                    <div className={styles.fetchControls}>
                        <button
                            className={styles.fetchButton}
                            onClick={fetchUsers}
                            disabled={loading}
                        >
                            {loading ? '読み込み中...' : 'データを再取得'}
                        </button>
                    </div>

                    {/* ローディング表示 */}
                    {loading && (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                            <p>データを読み込んでいます...</p>
                        </div>
                    )}

                    {/* エラー表示 */}
                    {error && (
                        <div className={styles.errorContainer}>
                            <p className={styles.errorIcon}>⚠️</p>
                            <p className={styles.errorMessage}>{error}</p>
                        </div>
                    )}

                    {/* データ表示 */}
                    {!loading && !error && users.length > 0 && (
                        <div className={styles.usersGrid}>
                            {users.slice(0, 6).map((user) => (
                                <div key={user.id} className={styles.userCard}>
                                    <div className={styles.userAvatar}>
                                        {user.name.charAt(0)}
                                    </div>
                                    <h4 className={styles.userName}>{user.name}</h4>
                                    <p className={styles.userEmail}>{user.email}</p>
                                    <p className={styles.userCompany}>{user.company.name}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* データ件数表示 */}
                    {!loading && !error && users.length > 0 && (
                        <p className={styles.dataInfo}>
                            全{users.length}件のデータを取得しました（表示: 6件）
                        </p>
                    )}
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// stateの定義
const [users, setUsers] = useState([]); // 取得する情報（配列）
const [loading, setLoading] = useState(false); // 読み込み中かどうか
const [error, setError] = useState(null); // エラーが出ているかどうか

// データ取得関数
const fetchUsers = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }

    const data = await response.json();
    setUsers(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// マウント時にデータを取得
useEffect(() => {
  fetchUsers();
}, []); // 空配列 = マウント時のみ

// データ表示
{loading && <div>読み込み中...</div>}
{error && <div>エラー: {error}</div>}
{users.map(user => (
  <div key={user.id}>{user.name}</div>
))}`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>async/await</strong> - 非同期処理を同期的に書ける</li>
                        <li><strong>try/catch/finally</strong> - エラーハンドリングとローディング管理</li>
                        <li><strong>loading state</strong> - データ取得中の状態を管理</li>
                        <li><strong>error state</strong> - エラー発生時のメッセージを表示</li>
                        <li><strong>空の依存配列[]</strong> - マウント時のみ実行（初回1回だけ）</li>
                        <li><strong>条件付きレンダリング</strong> - loading/error/dataで表示を切り替え</li>
                    </ul>
                </div>
            </section>

            {/* デモ4: タイマー処理 */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ4: タイマー処理</h2>
                <p>setIntervalを使ったタイマーと自動スライドショー</p>

                <div className={styles.demoBox}>
                    {/* カウントアップタイマー */}
                    <div className={styles.timerSection}>
                        <h3>⏱️ カウントアップタイマー</h3>
                        <div className={styles.timerDisplay}>
                            {formatTime(seconds)}
                        </div>
                        <div className={styles.timerControls}>
                            {!isTimerRunning ? (
                                <button
                                    className={styles.timerButton}
                                    onClick={startTimer}
                                >
                                    ▶️ スタート
                                </button>
                            ) : (
                                <button
                                    className={`${styles.timerButton} ${styles.stop}`}
                                    onClick={stopTimer}
                                >
                                    ⏸️ ストップ
                                </button>
                            )}
                            <button
                                className={`${styles.timerButton} ${styles.reset}`}
                                onClick={resetTimer}
                            >
                                🔄 リセット
                            </button>
                        </div>
                    </div>

                    {/* 自動スライドショー */}
                    <div className={styles.slideSection}>
                        <h3>🎬 自動スライドショー（3秒ごと）</h3>
                        <div className={styles.slideContainer}>
                            <div
                                className={styles.slide}
                                style={{ backgroundColor: slides[autoSlideIndex].color }}
                            >
                                <span className={styles.slideEmoji}>
                                    {slides[autoSlideIndex].emoji}
                                </span>
                                <h4>{slides[autoSlideIndex].title}</h4>
                            </div>
                        </div>
                        <div className={styles.slideIndicators}>
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    className={`${styles.indicator} ${index === autoSlideIndex ? styles.active : ''
                                        }`}
                                    onClick={() => setAutoSlideIndex(index)}
                                    aria-label={`スライド ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// stateの定義
const [seconds, setSeconds] = useState(0); // カウント（経過秒数）
const [isTimerRunning, setIsTimerRunning] = useState(false);// タイマーが動作中かどうか（実行中/停止中）

// カウントアップタイマー
useEffect(() => {
  let timerIntervalId; // ← タイマーIDを保存する箱を用意（タイマーの識別番号）

  if (isTimerRunning) {
    timerIntervalId = setInterval(() => { // ← 箱にIDを保存
      setSeconds(prev => prev + 1);
    }, 1000); // 1秒ごと
  }

  // クリーンアップ: タイマー停止
  return () => {
    if (timerIntervalId) { // ← 箱からIDを取り出して停止
      clearInterval(timerIntervalId);
    }
  };
}, [isTimerRunning]);

// 自動スライドショー
const [slideIndex, setSlideIndex] = useState(0); // スライドのインデックス（何番目のスライドか: 0, 1, 2, 3...）

useEffect(() => {
  let slideIntervalId;  // ← スライド用
  slideIntervalId = setInterval(() => {
    setSlideIndex(prev => (prev + 1) % slides.length); // 0, 1, 2, 3を返す
  }, 3000); // 3秒ごと
// prev = 0
// (0 + 1) % 4 = 1 % 4 = 1
// → autoSlideIndex = 1

// prev = 1
// (1 + 1) % 4 = 2 % 4 = 2
// → autoSlideIndex = 2

// prev = 2
// (2 + 1) % 4 = 3 % 4 = 3
// → autoSlideIndex = 3

// prev = 3
// (3 + 1) % 4 = 4 % 4 = 0 ← 0に戻る！
// → autoSlideIndex = 0
// ... 以降ループ

  // クリーンアップ: 必ず停止
  return () => {
    clearInterval(slideIntervalId);
  };
}, []); // 空配列 = マウント時のみ`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>setInterval</strong> - 一定間隔で処理を実行</li>
                        <li><strong>clearInterval</strong> - タイマーを停止（必須！）</li>
                        <li><strong>return文でクリーンアップ</strong> - メモリリーク防止</li>
                        <li><strong>prev =&gt; prev + 1</strong> - 関数型更新で最新の値を取得</li>
                        <li><strong>依存配列の使い分け</strong> - [] vs [isTimerRunning]</li>
                        <li><strong>クリーンアップを忘れると</strong> - タイマーが残り続けてバグの原因に</li>
                    </ul>
                </div>
            </section>

        </div>
    );
}