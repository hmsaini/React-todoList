import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    // todos: [
    //   {
    //     id: uuid(),
    //     title: 'Take out the trash',
    //     completed:false
    //   },
    //   {
    //     id: uuid(),
    //     title: 'Dinner with wife',
    //     completed: true
    //   },
    //   {
    //     id: uuid(),
    //     title: 'Meeting with boss',
    //     completed: false
    //   }
    // ]
    todos: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res=> {
        // console.log(res)
        this.setState({
          todos: res.data
        })
      });
  }

  // Toggle Complete
  markComplete = (id) => {
    // console.log('from app.js: ' + id)
    this.setState({  // state is an object
      todos: this.state.todos.map((todo) => {
        if(todo.id == id) {
          todo.completed = !todo.completed  // toggle the value
        }
        return todo;
      })
    })
  }

  // delete TodoItem
  delTodo = (id) => {
    // console.log(id)
    // this.setState({
    //   todos: [...this.state.todos.filter(todo=> todo.id != id)]
    // })
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => {
        this.setState({
          todos: [...this.state.todos.filter(todo=> todo.id != id)]
        })
      });
  }

  // Add Todo
  addTodo = (title) => {
    // console.log(title)
    // const newTodo = {
    //   id: uuid,
    //   title: title,
    //   completed: false
    // }
    // this.setState({
    //   todos: [...this.state.todos, newTodo]
    // })

    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title: title,
      completed: false
    })
      .then(res => {
        // console.log(res);
        this.setState({
          todos: [...this.state.todos, res.data]
        })
      })
  }

  render(){
    // console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header></Header>

            <Route exact path="/" render={props => (
              <React.Fragment>
                {/* here we are using 2 components for same route, so that's why using props */}
                  <AddTodo addTodo={this.addTodo}></AddTodo>

                  <Todos 
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                  >
                  </Todos>
              </React.Fragment>
            )}>
            </Route>

            <Route path="/about" component={About}> 
            {/* here we are using single component for this route, so it can be passed directly */}
            </Route>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
