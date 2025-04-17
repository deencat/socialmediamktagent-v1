import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

export interface WidgetItem {
  id: string;
  component: React.ReactNode;
  width: "small" | "medium" | "large" | "full";
}

interface DashboardGridProps {
  widgets: WidgetItem[];
  onWidgetsChange?: (widgets: WidgetItem[]) => void;
}

export function DashboardGrid({ widgets, onWidgetsChange }: DashboardGridProps) {
  const [items, setItems] = useState<WidgetItem[]>(widgets);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(prevItems, oldIndex, newIndex);
        
        if (onWidgetsChange) {
          onWidgetsChange(newItems);
        }
        
        return newItems;
      });
    }
  }

  // Map widget width to column span classes
  const getWidthClass = (width: WidgetItem['width']) => {
    switch (width) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-1 md:col-span-2';
      case 'large':
        return 'col-span-1 md:col-span-3';
      case 'full':
        return 'col-span-1 md:col-span-3';
      default:
        return 'col-span-1';
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(item => item.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className={getWidthClass(item.width)}>
              {item.component}
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
} 