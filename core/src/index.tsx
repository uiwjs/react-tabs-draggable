import { DndProvider } from "react-dnd";
import { FC, PropsWithChildren } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tabs } from './Tabs';
import { Provider } from './store';

export * from './Tab';
export interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeKey?: string;
  onTabClick?: (id: string) => void;
}

const Container: FC<PropsWithChildren<TabsProps>> = ({ activeKey, onTabClick, ...props }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider init={{ data: [], activeKey, onTabClick }}>
        <Tabs {...props} />
      </Provider>
    </DndProvider>
  )
}

export default Container