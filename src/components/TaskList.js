import React from 'react'
import styled from 'styled-components'
import {Droppable} from 'react-beautiful-dnd'
import Task from './Task'

const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 2px;
    padding: 8px;
    margin: 20px;
    width:500px;
`

const TaskList = (props) => {
    return (
        <Droppable droppableId={props.title}>
            {provided => (
                <Container ref={provided.innerRef} {...provided.droppableProps}>
                    {props.tasks.map((task , index) => <Task task={task} key={task.id} index={index} />)}
                    {provided.placeholder}
                </Container>
            )}
        </Droppable>
    )
}

export default TaskList
