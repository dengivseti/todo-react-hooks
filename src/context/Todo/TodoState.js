import React, { useReducer } from 'react'
import axios from 'axios'
import { TodoContext } from "./todoContext"
import { todoReducer } from './todoReducer'
import { SHOW_LOADER, ADD_TODO, REMOVE_TODO, FETCH_TODOS, COMPLETE_TODO } from '../types'


export const TodoState = ({children}) =>{
    const initialState = {
        loading: true,
        todos: [],
    }
    const url = process.env.REACT_APP_BD_URL

    const [state, dispatch] = useReducer(todoReducer, initialState)
    const fetchTodos = async () => {
        showLoader()
        const res = await axios.get(`${url}/todos.json`)
        if (!res.data) res.data = []
        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })
        dispatch({ type: FETCH_TODOS, payload})
    }

    const addTodo = async (title, priority) => {
        const todo = {
            title, priority,
            date: new Date().toJSON(),
            completed: false
        }
        try {
            const res = await axios.post(`${url}/todos.json`, todo)
            const payload = {
                ...todo,
                id: res.data.name
            }
            dispatch({ type: ADD_TODO, payload})
        } catch (error) {
            throw new Error(error.message)
        }
        
    }

    const completeTodo = async (id) => {
        const todos = state.todos
        const todo = todos.find(todo => todo.id === id)
        await axios.patch(`${url}/todos/${id}.json`, {completed: !todo.completed})
        todo.completed = !todo.completed
        dispatch({ type: COMPLETE_TODO, payload: todos })
    }

    const removeTodo = async id => {
        await axios.delete(`${url}/todos/${id}.json`)
        dispatch({ type: REMOVE_TODO, payload: id })
    }

    const showLoader = () => dispatch({type: SHOW_LOADER})

    return (
        <TodoContext.Provider value={{
            fetchTodos, addTodo, removeTodo, showLoader, completeTodo,
            todos: state.todos,
            loading: state.loading
        }}>
            {children}
        </TodoContext.Provider>
    )
}