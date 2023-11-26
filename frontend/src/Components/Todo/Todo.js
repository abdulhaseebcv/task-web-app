import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import axios from '../../Config';
import { AddTodo, Button, CheckBox, Container, Heading, InputField, List, Section, StyledToastContainer, Task, TodosContainer } from './TodoStyle';
import { IoSunnyOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { MdOutlineNightlightRound } from 'react-icons/md';
import { ThemeContext } from '../../Context/ThemeProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
    console.log("Todo=>");

    // State to manage task input
    const [task, setTask] = useState('');

    // State to manage form errors
    const [errors, setErrors] = useState({});

    // State to manage todo list
    const [todos, setTodos] = useState([]);

    // State to manage loading state during API calls
    const [isLoading, setIsLoading] = useState(false);

    const iconSize = 25;

    // Theme context for dark/light mode
    const { isDark, setIsDark } = useContext(ThemeContext);

    // Function to toggle between dark and light mode
    const toggleTheme = useCallback(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        console.log('isDark', isDark);
    }, [isDark, setIsDark]);

    // Function to handle API errors
    const handleApiError = useCallback((error) => {
        console.error('API Error:', error?.response?.data);
        const errorMessage = error?.response?.data?.message || 'An error occurred.';
        setErrors({ apiError: errorMessage });
        toast.error(errorMessage);
    }, []);

    // Function to fetch todos from the server
    const getTodos = useCallback(() => {
        axios.get('/todos')
            .then((response) => {
                console.log('Todo retrieved successfully:', response?.data);
                setTodos(response?.data?.result);
            })
            .catch((error) => handleApiError(error));
    }, [handleApiError]);

    // Function to add a new todo
    const addTodo = useCallback(() => {
        setIsLoading(true);
        const validationErrors = {};
        setIsLoading(false)
        if (!task.trim()) {
            validationErrors.task = 'Enter any task';
            setErrors(validationErrors);
        } else {
            axios.post('/todos/add', {
                task,
            })
                .then((response) => {
                    console.log('Todo added successfully:', response?.data);
                    setTask('');
                    getTodos();
                    toast.success(response?.data?.message);
                    setErrors({});
                })
                .catch((error) => handleApiError(error))
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [task, handleApiError, getTodos]);


    // Function to update the status of a todo
    const updateTodo = useCallback(
        (todoId, isChecked) => {
            setIsLoading(true);
            axios.put(`/todos/update/${todoId}`, {
                status: isChecked,
            })
                .then((response) => {
                    console.log('Todo updated successfully:', response?.data);
                    setTodos((prevTodos) =>
                        prevTodos.map((todo) => (todo._id === todoId ? { ...todo, completed: isChecked } : todo))
                    );
                })
                .catch((error) => handleApiError(error))
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [handleApiError]
    );

    // Function to delete a todo
    const deleteTodo = useCallback(
        (todoId) => {
            setIsLoading(true);
            axios.delete(`/todos/delete/${todoId}`)
                .then((response) => {
                    console.log('Todo deleted successfully:', response?.data);
                    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
                    toast.success('Todo deleted successfully');
                })
                .catch((error) => handleApiError(error))
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [handleApiError]
    );

    // Memoized count of unchecked todos
    const unCheckedTodos = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);

    // Fetch todos on component mount

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    return (
        <Section>
            <Container>
                <Heading>
                    <h3>Todo</h3>
                    <span onClick={toggleTheme}>{isDark ? <IoSunnyOutline /> : <MdOutlineNightlightRound />}</span>
                </Heading>
                <AddTodo $isDark={isDark}>
                    <InputField
                        $isDark={isDark}
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        type="text"
                        placeholder={errors.task ? `⚠ ${errors?.task}` : 'Create a new todo...'}
                        disabled={isLoading}
                    />
                    <Button $isDark={isDark} $add="addButton">
                        <IoMdAdd onClick={addTodo} size={iconSize} />
                    </Button>
                </AddTodo>
                <TodosContainer $isDark={isDark}>
                    <ul>
                        {todos.map((todo) => (
                            <List key={todo?._id} $isDark={isDark}>
                                <div>
                                    <CheckBox
                                        type="checkbox"
                                        checked={todo?.completed}
                                        onChange={(e) => updateTodo(todo._id, e.target.checked)}
                                        disabled={isLoading}
                                    />
                                    <Task $isChecked={todo?.completed} $isDark={isDark}>
                                        {todo?.task}
                                    </Task>
                                </div>
                                <Button disabled={isLoading} $isDark={isDark} onClick={() => deleteTodo(todo._id)}>
                                    <MdDelete size={iconSize} />
                                </Button>
                            </List>
                        ))}
                        {todos.length !== 0 && (
                            <List $isDark={isDark}>
                                <span>{`${unCheckedTodos} items left`}</span>
                            </List>
                        )}
                    </ul>
                </TodosContainer>
            </Container>
            <StyledToastContainer
                position="bottom-left"
                autoClose={1000}
                hideProgressBar={true}
                theme="dark"
                closeButton={false} />
        </Section>
    );
};

export default Todo;
