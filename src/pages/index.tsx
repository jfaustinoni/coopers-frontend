import React, { useState, useEffect } from 'react';
import Task from '../components/Tasks/Task';
import { Header } from '@/components/Header';
import { deleteTask, updateTask, completeTask, getTasks, createTask, deleteAllCompleteTasks, deleteAllIncompleteTasks } from '../lib/api';
import Hero from '@/components/Hero';
import CarouselSection from '@/components/Carousel';
import { sendEmail } from '../lib/api';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

interface TaskData {
    _id: string;
    description: string;
    completed: boolean;
}

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        message: '',
    });

    useEffect(() => {
        if (isLoggedIn) {
            fetchTasks();
        }
    }, [isLoggedIn]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleLogin = async () => {
        setIsLoggedIn(true);
        await fetchTasks();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setTasks([]);
    };

    const fetchTasks = async () => {
        try {
            const tasksData = await getTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    const handleTaskCreated = async (newTaskData: TaskData) => {
        try {
            const response = await createTask(newTaskData);
            if (response.success) {
                const newTask = response.task;
                setTasks((prevTasks) => [...prevTasks, newTask]);
            } else {
                console.error('Erro ao criar tarefa no Home:', response.error);
            }
        } catch (error) {
            console.error('Erro ao criar tarefa no Home:', error);
        }
    };

    const handleTasksUpdate = (tasksData: React.SetStateAction<TaskData[]>) => {
        setTasks(tasksData);
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            const response = await deleteTask(taskId);
            if (response.success) {
                setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
            } else {
                console.error('Erro ao deletar tarefa:', response.error);
            }
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    };

    const handleUpdateTask = async (taskId: string, taskData: Partial<TaskData>) => {
        const response = await updateTask(taskId, taskData);
        if (response.success) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, ...taskData } : task
                )
            );
        } else {
            alert('Error updating task: ' + response.error);
        }
    };

    const handleCompleteTask = async (taskId: string, isCompleted: boolean) => {
        const response = await completeTask(taskId, isCompleted);
        if (response.success) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, completed: isCompleted } : task
                )
            );
        } else {
            alert('Error completing task: ' + response.error);
        }
    };

    const handleDeleteAllCompleteTasks = async () => {
        try {
            const response = await deleteAllCompleteTasks();
            if (response.success) {
                setTasks(prevTasks => prevTasks.filter(task => !task.completed));
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
                setTasks(prevTasks => prevTasks.filter(task => task.completed));
                alert('Todas as tarefas incompletas foram excluídas com sucesso.');
            } else {
                console.error('Erro ao excluir todas as tarefas incompletas:', response.error);
            }
        } catch (error) {
            console.error('Erro ao excluir todas as tarefas incompletas:', error);
        }
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await sendEmail(formData);
            if (response.success) {
                alert('E-mail enviado com sucesso!');
                setFormData({
                    name: '',
                    email: '',
                    telephone: '',
                    message: '',
                });
            } else {
                alert('Erro ao enviar e-mail: ' + response.error);
            }
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
        }
    };

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
            />
            <Hero />
            <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
                {isLoggedIn ? (
                    <div className="tasks-container">
                        <div className="section">
                            <Task
                                isLoggedIn={isLoggedIn}
                                tasks={tasks}
                                onTasksUpdate={handleTasksUpdate}
                                onDeleteTask={handleDeleteTask}
                                onUpdateTask={handleUpdateTask}
                                onCompleteTask={handleCompleteTask}
                                onDeleteAllCompleteTasks={handleDeleteAllCompleteTasks}
                                onDeleteAllIncompleteTasks={handleDeleteAllIncompleteTasks}
                                onTaskCreated={handleTaskCreated}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Faça login para ver suas tarefas</h2>
                    </div>
                )}
                <CarouselSection />
                <Contact
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                />
            </div>
            <Footer />
        </>
    );
};

export default Home;
