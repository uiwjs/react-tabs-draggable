import { FC, PropsWithChildren, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDataContext } from './store';
import { Tab, ItemTypes } from './Tab';
import { TabsProps } from './';

export const Tabs: FC<PropsWithChildren<TabsProps>> = ({ children, ...props }) => {
  const { state } = useDataContext();
  const [collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
  }));

  const renderCard = useCallback(({ text, ...item }: { id: string; text: React.ReactNode }, index: number) => {
    return (
      <Tab {...item} key={index} index={index}>
        {text}
      </Tab>
    );
  }, []);
  return (
    <div
      {...props}
      ref={drop}
      className={`w-tabs-draggable ${props.className || ''}`}
      style={{ display: 'flex', ...props.style }}
    >
      {state.data && state.data.length > 0 ? state.data.map((item, idx) => renderCard(item, idx)) : children}
    </div>
  );
};
