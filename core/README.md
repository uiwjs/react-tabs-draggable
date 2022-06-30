# react-tabs-draggable

[![CI](https://github.com/uiwjs/react-tabs-draggable/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-tabs-draggable/actions/workflows/ci.yml)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-tabs-draggable/file/README.md)
[![npm version](https://img.shields.io/npm/v/@uiw/react-tabs-draggable.svg)](https://www.npmjs.com/package/@uiw/react-tabs-draggable)

Draggable tabs for React. Demo Preview: [@uiwjs.github.io/react-tabs-draggable](https://uiwjs.github.io/react-tabs-draggable/)

## Install

**Not dependent on uiw.**

```bash
npm install @uiw/react-tabs-draggable --save
```

## Base Usage

```jsx mdx:preview
import React, { useState } from 'react';
import Tabs, { Tab } from '@uiw/react-tabs-draggable';

function App() {
  const [activeKey, setActiveKey] = useState('tab-1');
  return (
    <div>
      <Tabs activeKey={activeKey} style={{ gap: 12 }} onTabClick={(id) => setActiveKey(id)}>
        <Tab id="tab-1">{activeKey === 'tab-1' && '▶'}Google</Tab>
        <Tab id="tab-2">{activeKey === 'tab-2' && '▶'}MicroSoft</Tab>
        <Tab id="tab-3">{activeKey === 'tab-3' && '▶'}Baidu</Tab>
        <Tab id="tab-4">{activeKey === 'tab-4' && '▶'}Taobao</Tab>
        <Tab id="tab-5">{activeKey === 'tab-5' && '▶'}JD</Tab>
      </Tabs>
      <div style={{ background: '#fff', padding: 12 }}>{activeKey}</div>
    </div>
  );
}
export default App;
```

## Disable Draggable

The first tab is disabled.

```jsx mdx:preview
import React, { useState } from 'react';
import Tabs, { Tab } from '@uiw/react-tabs-draggable';
import styled from 'styled-components';

const TabItem = styled(Tab)`
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
  const [activeKey, setActiveKey] = useState('tab-0-1');
  return (
    <div>
      <Tabs activeKey={activeKey} style={{ gap: 6 }} onTabClick={(id) => setActiveKey(id)}>
        <TabItem id="tab-0-1">Google</TabItem>
        <TabItem id="tab-0-2">MicroSoft</TabItem>
        <TabItem id="tab-0-3">Baidu</TabItem>
        <TabItem id="tab-0-4">Taobao</TabItem>
        <TabItem id="tab-0-5">JD</TabItem>
      </Tabs>
      <Content>{activeKey}</Content>
    </div>
  );
}
export default App;
```

## Add & Close tab

The first tab is disabled.

```jsx mdx:preview
import React, { Fragment, useState, useCallback } from 'react';
import Tabs, { Tab, useDataContext } from '@uiw/react-tabs-draggable';
import styled from 'styled-components';

const TabWarp = styled(Tabs)`
  max-width: 450px;
  border-bottom: 1px solid #333;
  margin-bottom: -2px;
  &:hover::-webkit-scrollbar {
    height: 0px;
    background-color: red;
  }
  &:hover::-webkit-scrollbar-track {
    background-color: #333;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: green;
  }
`;

const TabItem = styled(Tab)`
  background-color: #b9b9b9;
  padding: 3px 7px;
  border-radius: 5px 5px 0 0;
  user-select: none;
  &.w-active {
    color: #fff;
    background-color: #333;
  }
`;

function insertAndShift(arr, from, to) {
  let cutOut = arr.splice(from, 1)[0];
  arr.splice(to, 0, cutOut);
  return arr;
}

let count = 9;

function App() {
  const [data, setData] = useState([
    { id: 'tab-4-1', children: 'Google' },
    { id: 'tab-4-2', children: 'MicroSoft' },
    { id: 'tab-4-3', children: 'Baidu' },
    { id: 'tab-4-4', children: 'Taobao' },
    { id: 'tab-4-5', children: 'JD' },
    { id: 'tab-4-6', children: 'Apple' },
    { id: 'tab-4-7', children: 'Bing' },
    { id: 'tab-4-8', children: 'Gmail' },
    { id: 'tab-4-9', children: 'Gitter' },
  ]);
  const [test, setTest] = useState(1);
  const [activeKey, setActiveKey] = useState('');

  const tabClick = (id, evn) => {
    evn.stopPropagation();
    setActiveKey(id);
    setTest(test + 1);
  };
  const closeHandle = (item, evn) => {
    evn.stopPropagation();
    const idx = data.findIndex((m) => m.id === item.id);

    let active = '';
    if (idx > -1 && activeKey) {
      active = data[idx - 1] ? data[idx - 1].id : data[idx].id;
      setActiveKey(active || '');
    }
    setData(data.filter((m) => m.id !== item.id));
  };
  const addHandle = () => {
    ++count;
    const newData = [...data, { id: `tab-3-${count}`, children: `New Tab ${count}` }];
    setData(newData);
  };
  const tabDrop = (id, index) => {
    const oldIndex = [...data].findIndex((m) => m.id === id);
    const newData = insertAndShift([...data], oldIndex, index);
    setData(newData);
  };
  return (
    <Fragment>
      <button onClick={addHandle}>Add{count}</button>
      <TabWarp
        activeKey={activeKey}
        style={{ gap: 3, overflow: 'auto' }}
        onTabClick={(id, evn) => tabClick(id, evn)}
        onTabDrop={(id, index) => tabDrop(id, index)}
      >
        {data.map((m, idx) => {
          return (
            <TabItem key={idx} id={m.id} draggable={idx !== 0}>
              {m.children}
              <button onClick={(evn) => closeHandle(m, evn)}>x</button>
            </TabItem>
          );
        })}
      </TabWarp>
      <div>{activeKey}</div>
    </Fragment>
  );
}
export default App;
```

```jsx mdx:preview
import React, { Fragment, useState, useCallback } from 'react';
import Tabs, { Tab, useDataContext } from '@uiw/react-tabs-draggable';
import styled from 'styled-components';

const TabWarp = styled(Tabs)`
  max-width: 450px;
  border-bottom: 1px solid #333;
  margin-bottom: -2px;
  gap: 3px;
`;

const TabItem = styled(Tab)`
  background-color: #b9b9b9;
  padding: 3px 7px;
  border-radius: 5px 5px 0 0;
  user-select: none;
  flex-wrap: nowrap;
  overflow: hidden;
  word-break: keep-all;
  align-items: center;
  display: flex;
  position: relative;
  flex-direction: row;
  &.w-active {
    color: #fff;
    background-color: #333;
  }
`;

function insertAndShift(arr, from, to) {
  let cutOut = arr.splice(from, 1)[0];
  arr.splice(to, 0, cutOut);
  return arr;
}

let count = 9;

function App() {
  const [data, setData] = useState([
    { id: 'tab-4-1', children: 'Google' },
    { id: 'tab-4-2', children: 'MicroSoft' },
    { id: 'tab-4-3', children: 'Baidu' },
    { id: 'tab-4-4', children: 'Taobao' },
    { id: 'tab-4-5', children: 'JD' },
    { id: 'tab-4-6', children: 'Apple' },
    { id: 'tab-4-7', children: 'Bing' },
    { id: 'tab-4-8', children: 'Gmail' },
    { id: 'tab-4-9', children: 'Gitter' },
  ]);
  const [test, setTest] = useState(1);
  const [activeKey, setActiveKey] = useState('');

  const tabClick = (id, evn) => {
    evn.stopPropagation();
    setActiveKey(id);
    setTest(test + 1);
  };
  const closeHandle = (item, evn) => {
    evn.stopPropagation();
    setData(data.filter((m) => m.id !== item.id));
  };
  const addHandle = () => {
    ++count;
    const newData = [...data, { id: `tab-3-${count}`, children: `New Tab ${count}` }];
    setData(newData);
  };
  const tabDrop = (id, index) => {
    const oldIndex = [...data].findIndex((m) => m.id === id);
    const newData = insertAndShift([...data], oldIndex, index);
    setData(newData);
  };
  return (
    <Fragment>
      <button onClick={addHandle}>Add{count}</button>
      <TabWarp onTabClick={(id, evn) => tabClick(id, evn)} onTabDrop={(id, index) => tabDrop(id, index)}>
        {data.map((m, idx) => {
          return (
            <TabItem key={idx} id={m.id}>
              {m.children}
              <button onClick={(evn) => closeHandle(m, evn)}>x</button>
            </TabItem>
          );
        })}
      </TabWarp>
      <div>{activeKey}</div>
    </Fragment>
  );
}
export default App;
```

## Props

```ts
export interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeKey?: string;
  onTabClick?: (id: string, evn: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Optional. Called when a compatible item is dropped on the target.
   */
  onTabDrop?: (id: string) => void;
}
export interface TabProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  index?: number;
}
export declare const Tab: FC<PropsWithChildren<TabProps>>;
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
