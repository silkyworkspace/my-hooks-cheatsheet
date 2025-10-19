import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
    const hooks = [
        { name: 'useState', path: '/usestate', description: 'ステート管理の基本' },
        { name: 'useEffect', path: '/useeffect', description: '副作用・ライフサイクル' },
        { name: 'useContext', path: '/usecontext', description: 'グローバルステート管理' },
        { name: 'useRef', path: '/useref', description: 'DOM参照・値の保持' },
        { name: 'useMemo', path: '/usememo', description: '値のメモ化' },
        { name: 'useCallback', path: '/usecallback', description: '関数のメモ化' },
        { name: 'Custom Hooks', path: '/customhooks', description: '独自フックの作成' },
    ];

    return (
        <div className={styles.home}>  {/* ← 変更 */}
            <h1>React Hooks チートシート</h1>
            <p className={styles.subtitle}>Webサイト制作で使える実践的なフック集</p>  {/* ← 変更 */}

            <div className={styles.hooksGrid}>  {/* ← 変更 */}
                {hooks.map((hook) => (
                    <Link to={hook.path} key={hook.path} className={styles.hookCard}>  {/* ← 変更 */}
                        <h2>{hook.name}</h2>
                        <p>{hook.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
