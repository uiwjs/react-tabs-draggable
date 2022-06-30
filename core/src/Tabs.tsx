import React, { FC, isValidElement, PropsWithChildren, useLayoutEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDataContext, InitialState } from './store';
import { ItemTypes } from './Tab';
import { TabsProps } from './';

export const Tabs: FC<PropsWithChildren<TabsProps>> = ({ children, activeKey, ...props }) => {
  const { state, dispatch } = useDataContext();
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.Tab,
  }));

  useLayoutEffect(() => {
    if (children) {
      const data: InitialState['data'] = [];
      React.Children.toArray(children).forEach((item) => {
        if (isValidElement(item)) {
          data.push({ ...item.props, element: item });
        }
      });
      dispatch!({ data });
    }
  }, [children]);

  return (
    <div
      {...props}
      ref={drop}
      className={`w-tabs-draggable ${props.className || ''}`}
      style={{ display: 'flex', ...props.style }}
    >
      {state.data &&
        state.data.length > 0 &&
        state.data.map(({ element, ...child }, idx) => {
          if (isValidElement(element)) {
            return React.cloneElement<any>(element, { ...child, index: idx });
          }
        })}
    </div>
  );
};
