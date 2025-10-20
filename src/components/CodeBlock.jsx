import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({ code, language = 'jsx' }) {
    return (
        <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '1rem',
            }}
            showLineNumbers={false}
        >
            {code}
        </SyntaxHighlighter>
    );
}

export default CodeBlock;