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
import React, { useState } from 'react';
import Tabs, { Tab } from '@uiw/react-tabs-draggable';
import styled from 'styled-components';

const TabIten = styled(Tab)`
  background-color: #b9b9b9;
  padding: 3px 7px;
  border-radius: 5px 5px 0 0;
  &.w-active {
    color: #fff;
    background-color: #333;
  }
`;

const Content = styled.div`
  border-top: 1px solid #333;
`;

function App() {
  const [activeKey, setActiveKey] = useState('tab-1')
  return (
    <div>
      <Tabs activeKey={activeKey} style={{ gap: 6 }} onTabClick={(id) => setActiveKey(id)}>
        <TabIten id="tab-1">Google</TabIten>
        <TabIten id="tab-2">MicroSoft</TabIten>
        <TabIten id="tab-3">Baidu</TabIten>
        <TabIten id="tab-4">Taobao</TabIten>
        <TabIten id="tab-5">JD</TabIten>
      </Tabs>
      <Content>{activeKey}</Content>
    </div>
  );
}
export default App;
```

## Disable Draggable

The first tab is disabled.

```jsx mdx:preview
import React, { Fragment, useState } from 'react';
import Tabs, { Tab } from '@uiw/react-tabs-draggable';
import styled from 'styled-components';

const TabIten = styled(Tab)`
  background-color: #b9b9b9;
  padding: 3px 7px;
  border-radius: 5px 5px 0 0;
  user-select: none;
  &.w-active {
    color: #fff;
    background-color: #333;
  }
`;

const Content = styled.div`
  border-top: 1px solid #333;
`;

function App() {
  const [activeKey, setActiveKey] = useState('')
  return (
    <Fragment>
      <Tabs style={{ gap: 3 }} onTabClick={(id) => setActiveKey(id)}>
        <TabIten id="tab-2-1" draggable={false}>Google</TabIten>
        <TabIten id="tab-2-2">MicroSoft</TabIten>
        <TabIten id="tab-2-3">Baidu</TabIten>
        <TabIten id="tab-2-4">Taobao</TabIten>
        <TabIten id="tab-2-5">JD</TabIten>
      </Tabs>
      <Content>{activeKey}</Content>
    </Fragment>
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

<a href="https://github.com/uiwjs/react-tabs-draggable/graphs/contributors">
  <img src="https://uiwjs.github.io/react-tabs-draggable/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
