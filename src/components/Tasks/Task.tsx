import React, { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask, updateTask, completeTask, deleteAllCompleteTasks, deleteAllIncompleteTasks } from '../../lib/api';
import TasksList from './TasksList';
import { DragDropContext } from 'react-beautiful-dnd';

interface TaskData {
    _id: string;
    description: string;
    completed: boolean;
}

interface TaskProps {
    isLoggedIn: boolean;
    tasks: TaskData[];
    onTasksUpdate: (tasksData: React.SetStateAction<TaskData[]>) => void;
    onDeleteTask: (taskId: string) => Promise<void>;
    onUpdateTask: (taskId: string, updatedTaskData: Partial<TaskData>) => Promise<void>;
    onCompleteTask: (taskId: string, isCompleted: boolean) => Promise<void>;
    onDeleteAllCompleteTasks: () => Promise<void>;
    onDeleteAllIncompleteTasks: () => Promise<void>;
    onTaskCreated: (newTaskData: TaskData) => Promise<void>;
}

const Task: React.FC<TaskProps> = ({ 
    isLoggedIn, 
    tasks, 
    onTasksUpdate, 
    onDeleteTask, 
    onUpdateTask, 
    onCompleteTask, 
    onDeleteAllCompleteTasks, 
    onDeleteAllIncompleteTasks, 
    onTaskCreated 
}) => {
    const [localTasks, setLocalTasks] = useState<TaskData[]>([]);
    const [tasksFetched, setTasksFetched] = useState(false);

    const fetchTasks = async () => {
        try {
            const tasksData = await getTasks();
            setLocalTasks(Array.isArray(tasksData) ? tasksData : []);
            setTasksFetched(true);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            setLocalTasks([]);
        }
    };

    useEffect(() => {
        if (isLoggedIn && !tasksFetched) {
            fetchTasks();
        }
    }, [isLoggedIn, tasksFetched]);

    const handleTasksUpdate = (updatedTasks: React.SetStateAction<TaskData[]>) => {
        setLocalTasks(updatedTasks);
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            const response = await deleteTask(taskId);
            if (response.success) {
                const updatedTasks = localTasks.filter(task => task._id !== taskId);
                setLocalTasks(updatedTasks);
            } else {
                console.error('Erro ao deletar tarefa:', response.error);
            }
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    };

    const handleUpdateTask = async (taskId: string, updatedTaskData: any) => {
        try {
            const response = await updateTask(taskId, updatedTaskData);
            if (response.success) {
                const updatedTasks = localTasks.map(task =>
                    task._id === taskId ? { ...task, ...updatedTaskData } : task
                );
                setLocalTasks(updatedTasks);
            } else {
                console.error('Erro ao atualizar tarefa:', response.error);
            }
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    };

    const handleCompleteTask = async (taskId: string, isCompleted: boolean) => {
        try {
            const response = await completeTask(taskId, isCompleted);
            if (response.success) {
                const updatedTasks = localTasks.map(task =>
                    task._id === taskId ? { ...task, completed: isCompleted } : task
                );
                setLocalTasks(updatedTasks);
            } else {
                console.error('Erro ao marcar tarefa como completa:', response.error || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao marcar tarefa como completa:', error);
        }
    };

    const handleTaskCreated = async (newTaskData: any) => {
        try {
            const response = await createTask(newTaskData);
            if (response.success) {
                const newTask = response.task;
                const updatedTasks = [...localTasks, newTask];
                setLocalTasks(updatedTasks);
            } else {
                console.error('Erro ao criar tarefa:', response.error);
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    const handleDeleteAllCompleteTasks = async () => {
        try {
            const response = await deleteAllCompleteTasks();
            if (response.success) {
                const updatedTasks = localTasks.filter(task => !task.completed);
                setLocalTasks(updatedTasks);
                alert('Todas as tarefas completas foram excluídas com sucesso.');
            } else {
                console.error('Erro ao excluir todas as tarefas completas:', response.error);
            }
        } catch (error) {
            console.error('Erro ao excluir todas as tarefas completas:', error);
        }
    };

    const handleDeleteAllIncompleteTasks = async () => {
        try {
            const response = await deleteAllIncompleteTasks();
            if (response.success) {
                const updatedTasks = localTasks.filter(task => task.completed);
                setLocalTasks(updatedTasks);
                alert('Todas as tarefas incompletas foram excluídas com sucesso.');
            } else {
                console.error('Erro ao excluir todas as tarefas incompletas:', response.error);
            }
        } catch (error) {
            console.error('Erro ao excluir todas as tarefas incompletas:', error);
        }
    };

    const handleDragEnd = async (result: { source: any; destination: any; }) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const updatedTasks = Array.from(localTasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, movedTask);

        setLocalTasks(updatedTasks);

        const movedTaskId = movedTask._id;
        const isCompleted = destination.droppableId === 'completed-tasks';
        await handleCompleteTask(movedTaskId, isCompleted);
    };

    return (
        <section className='section-to-do-list relative py-14 sm:py-8 lg:pb-14' id='tasks'>
            <div className='content-section container text-center lg:mx-auto'>
                <div className='header flex flex-col items-center px-4 lg:p-4'>
                    <h2 className='text-white font-poppins font-bold text-3xl pb-3 lg:text-6xl'>To-do List</h2>
                    <p className='text-white font-montserrat font-normal sm:w-80 lg:text-2xl lg:w-6/12 lg:pt-5'>Drag and drop to set your main priorities, check when done and create what’s new.</p>
                </div>
                <div className='task-lists flex flex-col mt-20 mx-8 sm:flex-row sm:justify-around sm:align-center lg:mx-auto lg:mt-32'>
                    <DragDropContext onDragEnd={handleDragEnd}>
                    <TasksList
                        isLoggedIn={isLoggedIn}
                        tasks={localTasks.filter(task => !task.completed)}
                        onTasksUpdate={handleTasksUpdate}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}
                        onCompleteTask={handleCompleteTask}
                        onDeleteAllCompleted={handleDeleteAllCompleteTasks}
                        onDeleteAllIncompleted={handleDeleteAllIncompleteTasks}
                        onTaskCreated={handleTaskCreated}
                        showTaskForm={true}
                        title="To-do"
                        description="Take a breath. <span>Start doing.</span>"
                        droppableId="incomplete-tasks"
                    />
                    <TasksList
                        isLoggedIn={isLoggedIn}
                        tasks={localTasks.filter(task => task.completed)}
                        onTasksUpdate={handleTasksUpdate}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask}
                        onCompleteTask={handleCompleteTask}
                        onDeleteAllCompleted={handleDeleteAllCompleteTasks}
                        onDeleteAllIncompleted={handleDeleteAllIncompleteTasks}
                        onTaskCreated={handleTaskCreated}
                        showTaskForm={false}
                        title="Done"
                        description={`Congratulations! <span>You have done ${localTasks.filter(task => task.completed).length} tasks</span>`}
                        droppableId="completed-tasks"
                    />
                    </DragDropContext>
                </div>
            </div>
        </section>
    );
};

export default Task;
