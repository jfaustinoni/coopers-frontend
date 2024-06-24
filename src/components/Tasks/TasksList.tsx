import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

const TasksList = ({
    isLoggedIn,
    tasks,
    onTasksUpdate,
    onDeleteTask,
    onUpdateTask,
    onCompleteTask,
    onDeleteAllCompleted,
    onDeleteAllIncompleted,
    onTaskCreated,
    showTaskForm,
    title,
    description,
    droppableId
}) => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');

    const handleEditClick = (taskId, description) => {
        setEditingTaskId(taskId);
        setEditedDescription(description);
    };

    const handleSaveClick = async (taskId) => {
        await onUpdateTask(taskId, { description: editedDescription });
        setEditingTaskId(null);
        setEditedDescription('');
    };

    const handleCancelClick = () => {
        setEditingTaskId(null);
        setEditedDescription('');
    };

    const handleCheckboxChange = async (taskId) => {
        const updatedTasks = tasks.map(task =>
            task._id === taskId ? { ...task, completed: !task.completed } : task
        );
        onTasksUpdate(updatedTasks);

        await onUpdateTask(taskId, { completed: !tasks.find(task => task._id === taskId).completed });
    };

    const handleDeleteTask = async (taskId) => {
        await onDeleteTask(taskId);
    };

    const handleDeleteAllClick = async (type) => {
        if (type === 'completed') {
            await onDeleteAllCompleted();
        } else {
            await onDeleteAllIncompleted();
        }
    };

    const handleTaskCreated = async (newTaskData) => {
        await onTaskCreated(newTaskData);
    };

    const handleDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        const updatedTasks = Array.from(tasks);
        const draggedTask = updatedTasks.splice(source.index, 1)[0];
        updatedTasks.splice(destination.index, 0, draggedTask);

        onTasksUpdate(updatedTasks);

        const isCompleted = destination.droppableId === 'completed-tasks';
        await onUpdateTask(draggableId, { completed: isCompleted });
    };

    return (
        <div className='todo p-5 lg:w-full'>
            <div className="title text-center">
                <h3 className='font-poppins font-bold text-black text-2xl pb-2 lg:text-4xl'>{title}</h3>
                <p className="text-black font-montserrat font-normal lg:text-2xl" dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <ul className="todo-list pt-5" {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                {(provided) => (
                                    <li
                                        className={`todo-list-item${task.completed ? ' completed' : ''} flex justify-between items-center pb-3`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div className='flex justify-between items-center w-full'>
                                            <div className='task-item flex items-center'>
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => handleCheckboxChange(task._id)}
                                                    id={`checkbox-${task._id}`}
                                                    className='mr-2'
                                                />
                                                <label htmlFor={`checkbox-${task._id}`} className="checkbox-label">
                                                    <div className="checkbox"></div>
                                                </label>
                                                {editingTaskId === task._id ? (
                                                    <input
                                                        type="text"
                                                        value={editedDescription}
                                                        onChange={(e) => setEditedDescription(e.target.value)}
                                                    />
                                                ) : (
                                                    <span className="font-montserrat max-w-36 text-left">{task.description}</span>
                                                )}
                                            </div>
                                            <div className='action'>
                                                {!task.completed && (
                                                    <>
                                                        {editingTaskId !== task._id ? (
                                                            <button className='font-montserrat font-bold text-xs mr-2' onClick={() => handleEditClick(task._id, task.description)}>Edit</button>
                                                        ) : (
                                                            <>
                                                                <button className='font-montserrat font-bold text-xs mr-2' onClick={() => handleSaveClick(task._id)}>Save</button>
                                                                <button className='font-montserrat font-bold text-xs' onClick={handleCancelClick}>Cancel</button>
                                                            </>
                                                        )}
                                                        <button className='font-montserrat font-bold text-xs' onClick={() => handleDeleteTask(task._id)}>Delete</button>
                                                    </>
                                                )}
                                                {task.completed && (
                                                    <button className='font-montserrat font-bold text-xs' onClick={() => handleDeleteTask(task._id)}>Delete</button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            {showTaskForm && isLoggedIn && <TaskForm onTaskCreated={handleTaskCreated} isLoggedIn={isLoggedIn} />}
            <div className="button-group mt-8">
                <button className='erase-complete text-white bg-black font-bold font-montserrat p-3 px-16 rounded-lg' onClick={() => handleDeleteAllClick('completed')}>erase all</button>
                <button className='erase-incomplete text-white bg-black font-bold font-montserrat p-3 px-16 rounded-lg' onClick={() => handleDeleteAllClick('incompleted')}>erase all</button>
            </div>
        </div>
    );
};

export default TasksList;
