import { createRoot } from 'react-dom/client';
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import data from '@uiw/react-tabs-draggable/README.md';

const Github = MarkdownPreviewExample.Github;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <MarkdownPreviewExample
    source={data.source}
    components={data.components}
    data={data.data}
    title="Draggable tabs for React"
    description="Draggable tabs for React."
    version={`v${VERSION}`}
  >
    <Github href="https://github.com/uiwjs/react-tabs-draggable" />
  </MarkdownPreviewExample>,
);
