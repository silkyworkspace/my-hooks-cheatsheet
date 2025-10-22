import { useState, createContext, useContext } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseContext.module.css';

export default function UseContext() {
    // テーマContext作成（値を共有すべき最上位のコンポーネントに準備する）
    const ThemeContext = createContext();

    // テーマProvider コンポーネント（コンテキストに値を引き渡す役割）
    function ThemeProvider({ children }) {
        const [theme, setTheme] = useState('light');

        const toggleTheme = () => {
            setTheme(prev => prev == 'light' ? 'dark' : 'light')
        };

        return (
            <ThemeContext.Provider value={{ theme, toggleTheme }} >
                {children}
            </ThemeContext.Provider>
        );
    }

    // テーマを使うコンポーネント1: ヘッダー
    function ThemedHeader() {
        const { theme, toggleTheme } = useContext(ThemeContext)
        return (
            <div className={`${styles.themedHeader} ${styles[theme]}`}>
                <h3>📱 ヘッダー</h3>
                <p>現在のテーマ: <strong>{theme === 'light' ? 'ライト' : 'ダーク'}</strong></p>
                <button
                    className={styles.themeButton}
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? '🌙 ダークモードに切替' : '☀️ ライトモードに切替'}
                </button>
            </div>
        );
    }

    // テーマを使うコンポーネント2: コンテンツ
    function ThemedContent() {
        const { theme } = useContext(ThemeContext);

        return (
            <div className={`${styles.themedContent} ${styles[theme]}`}>
                <h3>📄 コンテンツ</h3>
                <p>このコンテンツもテーマが適用されています。</p>
                <p>Contextを使うことで、propsを渡さなくてもテーマにアクセスできます！</p>
            </div>
        );
    }

    // テーマを使うコンポーネント3: サイドバー
    function ThemedSidebar() {
        const { theme } = useContext(ThemeContext);

        return (
            <div className={`${styles.themedSidebar} ${styles[theme]}`}>
                <h3>📊 サイドバー</h3>
                <ul>
                    <li>メニュー1</li>
                    <li>メニュー2</li>
                    <li>メニュー3</li>
                </ul>
            </div>
        );
    }

    // テーマを使うコンポーネント4: フッター
    function ThemedFooter() {
        const { theme } = useContext(ThemeContext);

        return (
            <div className={`${styles.themedFooter} ${styles[theme]}`}>
                <p>© 2024 My App - テーマ: {theme === 'light' ? 'ライト' : 'ダーク'}</p>
            </div>
        );
    }

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

            {/* デモ1: テーマ切り替え */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ1: テーマ切り替え（ダークモード）</h2>
                <p>Contextでアプリ全体のテーマを管理</p>

                <div className={styles.demoBox}>
                    <ThemeProvider> {/* Providerでラップ */}
                        <div className={styles.themeApp}>
                            <ThemedHeader />

                            <div className={styles.themeMain}>
                                <ThemedSidebar />
                                <ThemedContent />
                            </div>

                            <ThemedFooter />
                        </div>
                    </ThemeProvider>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// 1. Contextを作成
const ThemeContext = createContext();

// 2. Provider コンポーネントを作成（Providerで値を提供）
// {children} はこのProvider内にラップされた全てのコンポーネント（ThemedHeaderやThemedContentなど）を指す
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 子コンポーネントでContextを使用（useContextで値を取得）
function ThemedHeader() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>
        テーマ切り替え
      </button>
    </div>
  );
}

function ThemedContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      コンテンツ
    </div>
  );
}

// 4. Providerでラップ
function App() {
  return (
    <ThemeProvider>
      <ThemedHeader />
      <ThemedContent />
    </ThemeProvider>
  );
}`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>createContext()</strong> - Contextを作成</li>
                        <li><strong>Context.Provider</strong> - 値を提供するコンポーネント</li>
                        <li><strong>useContext()</strong> - Contextの値を取得</li>
                        <li><strong>propsなし</strong> - どの階層からでも直接アクセス</li>
                        <li><strong>一箇所で管理</strong> - テーマの状態を一元管理</li>
                        <li><strong>実用例</strong> - ダークモード、多言語対応、認証状態</li>
                    </ul>
                </div>

            </section>
        </div>
    );
}