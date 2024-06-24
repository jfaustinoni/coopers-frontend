import React, { useState } from 'react';

interface TaskFormProps {
    onTaskCreated: (newTaskData: { description: string }) => Promise<void>;
    isLoggedIn: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, isLoggedIn }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error('Você precisa estar logado para criar uma tarefa.');
            return;
        }
        const newTaskData = { description };
        try {
            await onTaskCreated(newTaskData);
            setDescription('');
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <form onSubmit={handleSubmit} className='flex align-center justify-between'>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter new task"
                    />
                    <button type="submit">Add Task</button>
                </form>
            ) : (
                <p>Você precisa estar logado para criar uma tarefa.</p>
            )}
        </>
    );
};

export default TaskForm;
