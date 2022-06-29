import { DndProvider } from 'react-dnd';
import { FC, PropsWithChildren, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tabs } from './Tabs';
import { Provider } from './store';

export * from './Tab';

export interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeKey?: string;
  onTabClick?: (id: string, evn: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Optional. Called when a compatible item is dropped on the target.
   */
  onTabDrop?: (id: string, index?: number) => void;
}

const Container: FC<PropsWithChildren<TabsProps>> = ({ activeKey, ...props }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider init={{ data: [], activeKey, onTabClick: props.onTabClick, onTabDrop: props.onTabDrop }}>
        <Tabs {...props} />
      </Provider>
    </DndProvider>
  );
};

export default Container;
