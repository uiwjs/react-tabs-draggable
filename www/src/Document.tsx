import data from '@uiw/react-tabs-draggable/README.md';
import CodeLayout from 'react-code-preview-layout';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { getMetaId, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';

const Preview = CodeLayout.Preview;
const Code = CodeLayout.Code;
const Toolbar = CodeLayout.Toolbar;

export const Document = () => (
  <MarkdownPreview
    disableCopy={true}
    source={data.source}
    components={{
      code: ({ inline, node, ...props }) => {
        const { 'data-meta': meta, ...rest } = props as any;
        if (inline || !isMeta(meta)) {
          return <code {...props} />;
        }
        const line = node.position?.start.line;
        const metaId = getMetaId(meta) || String(line);
        const Child = data.components[`${metaId}`];
        if (metaId && typeof Child === 'function') {
          const code = data.data[metaId].value || '';
          const param = getURLParameters(meta);
          return (
            <CodeLayout>
              <Preview>
                <Child />
              </Preview>
              <Toolbar text={code}>{param.title || 'Example Preview'}</Toolbar>
              <Code>
                <code {...rest} />
              </Code>
            </CodeLayout>
          );
        }
        return <code {...rest} />;
      },
    }}
  />
);
