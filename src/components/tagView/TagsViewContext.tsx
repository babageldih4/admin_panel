// import React, { createContext, useContext, useMemo } from "react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
// } from "react-beautiful-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// export interface TagsViewContextType {
//   sensors: any[];
// }

// export const TagsViewContext = createContext<TagsViewContextType>({
//   sensors: [],
// });

// export const useTagsViewContext = () => useContext(TagsViewContext);

// export const TagsViewDragDropContext: React.FC = ({ children }) => {
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor)
//   );

//   const contextValue = useMemo(() => ({ sensors }), [sensors]);

//   return (
//     <TagsViewContext.Provider value={contextValue}>
//       <DndContext sensors={sensors} collisionDetection={closestCenter}>
//         <DragOverlay>
//           {(monitor) => {
//             const isActive = monitor.isActive();
//             if (!isActive) return null;
//             return <div>Custom Drag Layer Component</div>;
//           }}
//         </DragOverlay>
//         {children}
//       </DndContext>
//     </TagsViewContext.Provider>
//   );
// };
