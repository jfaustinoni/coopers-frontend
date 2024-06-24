import React, { useState, useEffect } from 'react';
import Task from '../components/Tasks/Task';
import { Header } from '@/components/Header';
import { deleteTask, updateTask, completeTask, getTasks, createTask } from '../lib/api';
import Hero from '@/components/Hero';
import CarouselSection from '@/components/Carousel';
import { sendEmail } from '../lib/api';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';


const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tasks, setTasks] = useState([]);
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

    const handleTaskCreated = async (newTaskData) => {
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

    const handleTasksUpdate = (tasksData) => {
        setTasks(tasksData);
    };

    const handleDeleteTask = async (taskId) => {
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

    const handleUpdateTask = async (taskId, taskData) => {
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

    const handleCompleteTask = async (taskId, isCompleted) => {
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

    const handleDeleteAllTasks = async () => {
        try {
            const response = await deleteAllTasks();
            if (response.success) {
                setTasks([]);
            } else {
                console.error('Erro ao excluir todas as tarefas:', response.error);
            }
        } catch (error) {
            console.error('Erro ao excluir todas as tarefas:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
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
                handleOpenModal={handleOpenModal}
                handleLogout={handleLogout}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                handleLogin={handleLogin}
            />
            <Hero />
            <Task
                isLoggedIn={isLoggedIn}
                tasks={tasks}
                onTasksUpdate={handleTasksUpdate}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
                onCompleteTask={handleCompleteTask}
                onDeleteAllTasks={handleDeleteAllTasks}
                onTaskCreated={handleTaskCreated}
            />
            <CarouselSection />
            <Contact
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
            <Footer />

        </>
    );
};

export default Home;
