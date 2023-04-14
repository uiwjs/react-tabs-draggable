import { FC, PropsWithChildren, useCallback, useRef, useState } from 'react';
import update from 'immutability-helper';
import { useDataContext } from './store';
import { TabsProps } from './';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

export const ItemTypes = {
  Tab: 'wtabs',
};

export interface TabProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  index?: number;
  yAxisType?: boolean; //Y轴是否可上下拖动
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Tab: FC<PropsWithChildren<TabProps>> = ({ children, id, index, yAxisType = false, ...props }) => {
  const { state, onTabClick, onTabDrop, dispatch } = useDataContext();
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.Tab,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current || !state.data) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index || 0;
      // 不要用自己替换项目
      if (dragIndex === hoverIndex) {
        return;
      }
      // 确定屏幕上的矩形
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // 获取垂直中间
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // 确定鼠标位置
      const clientOffset = monitor.getClientOffset();
      // if (!clientOffset) return;
      // 将像素移到顶部
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX && yAxisType !== true) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      const newdata = update(state.data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, state.data[dragIndex]],
        ],
      });
      dispatch!({ data: [...newdata] });
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.Tab,
      item: () => {
        return { id, index };
      },
      end: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();
        onTabDrop && onTabDrop(id, item.index, clientOffset);
      },
      collect: (monitor) => {
        return {
          data: monitor.getItem(),
          targetIds: monitor.getTargetIds(),
          isDragging: monitor.isDragging(),
        };
      },
    }),
    [id, index],
  );

  const opacity = isDragging ? 0.001 : 1;

  if (props.draggable !== false) {
    drag(drop(ref));
  }
  const handleClick = (evn: React.MouseEvent<HTMLDivElement>) => {
    dispatch!({ activeKey: id });
    onTabClick && onTabClick(id, evn);
  };
  return (
    <div
      {...props}
      onClick={handleClick.bind(this)}
      ref={ref}
      style={{ ...props.style, opacity }}
      className={`w-tabs-draggable-item ${props.className || ''}${state.activeKey === id ? ' w-active' : ''}`}
      data-handler-id={handlerId}
    >
      {children}
    </div>
  );
};
