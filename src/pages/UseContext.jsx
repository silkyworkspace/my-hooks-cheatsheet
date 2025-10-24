import { useState, createContext, useContext } from "react";
import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import styles from './UseContext.module.css';

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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// デモ2: ユーザー認証Context
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const AuthContext = createContext();

// 認証Provider コンポーネント
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // ログイン
    const login = async (username, password) => {
        setIsLoading(true);

        // 実際のAPIを模倣（2秒待つ）
        await new Promise(resolve => setTimeout(resolve, 2000));

        // ユーザー情報を設定
        setUser({
            id: 1,
            username: username,
            email: `${username}@example.com`,
            role: 'user',
            password: password,
        });

        setIsLoading(false);
    };

    // ログアウト
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ログインフォーム
function LoginForm() {
    const { login, isLoading } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            login(username, password);
        }
    };

    return (
        <div className={styles.loginForm}>
            <h3>🔐 ログインフォーム</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>ユーザー名</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ユーザー名を入力"
                        className={styles.input}
                        disabled={isLoading}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>パスワード</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="パスワードを入力"
                        className={styles.input}
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    className={styles.loginButton}
                    disabled={isLoading || !username || !password}
                >
                    {isLoading ? '⏳ ログイン中...' : '✅ ログイン'}
                </button>
            </form>
            <p className={styles.hint}>💡 任意のユーザー名とパスワードを入力してください</p>
        </div>
    );
}

// ユーザー情報表示
function UserProfile() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className={styles.userProfile}>
            <h3>👤 ユーザー情報</h3>
            <div className={styles.userInfo}>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>ユーザー名:</span>
                    <span className={styles.infoValue}>{user.username}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>メール:</span>
                    <span className={styles.infoValue}>{user.email}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>役割:</span>
                    <span className={styles.infoValue}>{user.role}</span>
                </div>
            </div>
            <button
                className={styles.logoutButton}
                onClick={logout}
            >
                🚪 ログアウト
            </button>
        </div>
    );
}

// ナビゲーションバー（認証状態を表示）
function AuthNavbar() {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles.authNavbar}>
            <div className={styles.navLeft}>
                <h4>📱 My App</h4>
            </div>
            <div className={styles.navRight}>
                {user ? (
                    <span className={styles.navUser}>
                        👋 こんにちは、{user.username}さん
                    </span>
                ) : (
                    <span className={styles.navGuest}>
                        👤 ゲスト
                    </span>
                )}
            </div>
        </div>
    );
}

// 保護されたコンテンツ（ログイン必須）
function ProtectedContent() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
            <div className={styles.protectedContent}>
                <h3>🔒 保護されたコンテンツ</h3>
                <p className={styles.lockMessage}>
                    このコンテンツを見るにはログインが必要です。
                </p>
            </div>
        );
    }

    return (
        <div className={styles.protectedContent}>
            <h3>🎉 保護されたコンテンツ</h3>
            <p className={styles.unlockMessage}>
                ログインしているので、このコンテンツが見れます！
            </p>
            <div className={styles.secretContent}>
                <p>🎁 秘密の情報</p>
                <p>これはログインユーザーだけが見れる特別なコンテンツです。</p>
            </div>
        </div>
    );
}
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
            {/* デモ2: ユーザー認証 */}
            <section className={styles.demoSection}>
                <h2>🎨 デモ2: ユーザー認証</h2>
                <p>Contextでユーザー情報とログイン状態を管理</p>

                <div className={styles.demoBox}>
                    <AuthProvider>
                        <div className={styles.authApp}>
                            {/* ナビゲーションバー */}
                            <AuthNavbar />

                            {/* メインコンテンツ */}
                            <div className={styles.authContent}>
                                {/* 左側: ログインフォームまたはユーザー情報 */}
                                <div className={styles.authLeft}>
                                    <AuthContext.Consumer>
                                        {({ user }) => (
                                            user ? <UserProfile /> : <LoginForm />
                                        )}
                                    </AuthContext.Consumer>
                                </div>

                                {/* 右側: 保護されたコンテンツ */}
                                <div className={styles.authRight}>
                                    <ProtectedContent />
                                </div>
                            </div>
                        </div>
                    </AuthProvider>
                </div>

                <details className={styles.codeDetails}>
                    <summary>コードを表示</summary>
                    <CodeBlock code={`// 1. 認証Contextを作成
const AuthContext = createContext();

// 2. 認証Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // API呼び出しを模倣
    const userData = await fetchUser(username, password);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. ログインフォーム
function LoginForm() {
  const { login } = useContext(AuthContext);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// 4. ユーザー情報表示
function UserProfile() {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <div>
      <p>ようこそ、{user.username}さん</p>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
}

// 5. 保護されたコンテンツ
function ProtectedContent() {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <p>ログインが必要です</p>;
  }
  
  return <div>秘密のコンテンツ</div>;
}

// 6. アプリ全体をProviderでラップ
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <LoginForm />
      <ProtectedContent />
    </AuthProvider>
  );
}`} />
                </details>

                <div className={styles.explanation}>
                    <h3>💡 ポイント</h3>
                    <ul>
                        <li><strong>グローバル認証状態</strong> - アプリ全体で認証状態を共有</li>
                        <li><strong>ログイン/ログアウト</strong> - 一箇所で管理、どこからでも呼び出せる</li>
                        <li><strong>保護されたコンテンツ</strong> - ログイン状態で表示を切り替え</li>
                        <li><strong>ユーザー情報へのアクセス</strong> - どのコンポーネントからでも取得可能</li>
                        <li><strong>実用例</strong> - 認証、権限管理、ユーザープロフィール</li>
                        <li><strong>propsなし</strong> - 認証情報をpropsで渡す必要なし</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}