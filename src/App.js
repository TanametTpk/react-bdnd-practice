import React, {useState} from 'react';
import TaskList from './components/TaskList'
import {DragDropContext} from 'react-beautiful-dnd'

let tasks = [
  {
    id:1,
    content:"1"
  },
  {
    id:2,
    content:"2"
  },
  {
    id:3,
    content:"3"
  },
]

let todos = [
  {
    id:4,
    content:"4"
  },
  {
    id:5,
    content:"5"
  },
  {
    id:6,
    content:"6"
  },
]


function App() {
  
  const [state, setState] = useState({ tasks , todos });

  const reorder = (startList, endList, startIndex, endIndex, isSameList) => {
    const startResult = Array.from(startList);
    const endResult = isSameList ? startResult : Array.from(endList);
    const [removed] = startResult.splice(startIndex, 1);
    endResult.splice(endIndex, 0, removed);
  
    return [startResult, endResult];
  };

  const onDragEnd = result => {

    if (!result.destination) {
      return;
    }

    if ( result.source.droppableId === result.destination.droppableId && result.destination.index === result.source.index) {
      return;
    }

    let startList = state[result.source.droppableId]
    let endList = state[result.destination.droppableId]

    let [startResult, endResult] = reorder(
      startList,
      endList,
      result.source.index,
      result.destination.index,
      result.source.droppableId === result.destination.droppableId
    );

    setState({
      ...state,
      [result.source.droppableId]: startResult,
      [result.destination.droppableId]: endResult
    })

  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList tasks={state.tasks} title="tasks" />
        <TaskList tasks={state.todos} title="todos" />
      </DragDropContext>
    </div>
  );
}

export default App;
