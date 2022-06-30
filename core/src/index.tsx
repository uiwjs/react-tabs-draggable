import { DndProvider } from 'react-dnd';
import { FC, PropsWithChildren } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tabs } from './Tabs';
import { Provider } from './store';
import { useEventCallback } from './hooks';

export * from './Tab';
export * from './hooks';

export interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeKey?: string;
  onTabClick?: (id: string, evn: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Optional. Called when a compatible item is dropped on the target.
   */
  onTabDrop?: (id: string, index?: number) => void;
}

const Container: FC<PropsWithChildren<TabsProps>> = ({ activeKey, onTabClick, onTabDrop, ...props }) => {
  const tabClick = useEventCallback(onTabClick!);
  const tabDrop = useEventCallback(onTabDrop!);
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider init={{ data: [], activeKey, onTabClick: tabClick, onTabDrop: tabDrop }}>
        <Tabs {...props} />
      </Provider>
    </DndProvider>
  );
};

export default Container;
