import axios from 'axios';


export const deleteAllCompleteTasks = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/tasks/complete`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir todas as tarefas completas:', error);
    throw error;
  }
};

export const deleteAllIncompleteTasks = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/tasks/incomplete`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir todas as tarefas incompletas:', error);
    throw error;
  }
};

export const registerUser = async ({ name, email, password, confirmpassword }) => {
  const response = await axios.post('http://localhost:3000/auth/register', {
    name,
    email,
    password,
    confirmpassword
  });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post('http://localhost:3000/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const getTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar tarefas: ' + error.message);
  }
};


export const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post('http://localhost:3000/tasks', taskData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, task: response.data };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error: error.message };
  }
};

export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: error.message };
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.patch(`http://localhost:3000/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error updating task:', error);
    return { success: false, error: error.message };
  }
};

export const completeTask = async (taskId, isCompleted) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.patch(
      `http://localhost:3000/tasks/${taskId}`,
      { completed: isCompleted },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error completing task:', error);
    return { success: false, error: error.message };
  }
};

export const sendEmail = async (formData) => {
  try {
    const response = await axios.post(`http://localhost:3000/email`, formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};