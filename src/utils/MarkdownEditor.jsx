import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you

const MarkdownEditor = (props) => {
  return (
    <Markdown 
        components={{
            code(props) {
            const {children, className, node, ...rest} = props
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
                <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                />
            ) : (
                <code {...rest} className={className}>
                {children}
                </code>
            )}
        }}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        {...props} 
    />
  )
}

export default MarkdownEditor;