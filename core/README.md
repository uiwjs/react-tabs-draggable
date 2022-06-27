react-tabs-draggable
===

Draggable tabs for React. Demo Preview: [@uiwjs.github.io/react-tabs-draggable](https://uiwjs.github.io/react-tabs-draggable/)

## Install

**Not dependent on uiw.**

```bash
npm install @uiw/react-tabs-draggable --save
```

## Usage

```jsx mdx:preview
import React from 'react';
import { Tabs } from '@uiw/react-tabs-draggable';

function App() {
  const data = [
    {
      id: 'tab-1',
      text: 'Baidu'
    },
    {
      id: 'tab-2',
      text: 'Google'
    },
    {
      id: 'tab-3',
      text: 'Taobap'
    },
    {
      id: 'tab-4',
      text: 'Taobap'
    }
  ];
  const addTab = () => {

  }
  return (
    <Tabs data={data}>
      <button onClick={addTab}>+</button>
    </Tabs>
  );
}
export default App;
```

## Development

```bash
npm run watch     # Listen create type and .tsx files.
npm run start     # Preview code example.
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-codemirror/graphs/contributors">
  <img src="https://uiwjs.github.io/react-codemirror/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
