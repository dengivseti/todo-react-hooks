import React, {useContext, useEffect} from 'react'
import { Todos } from '../components/Todos'
import { Form } from '../components/Form'
import { Loader } from '../components/Loader'
import { TodoContext } from '../context/Todo/todoContext'

export const Home = () => {
    const {todos, loading, fetchTodos, completeTodo, removeTodo} = useContext(TodoContext)
    
    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div className="container">
            <Form />
            <hr/>
            {
                loading
                    ? <Loader />
                    : <Todos todos={todos} onComplete={completeTodo}  onRemove={removeTodo}/>
            }          
            
        </div>
    )
}