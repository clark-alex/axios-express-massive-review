import React, { Component } from 'react';
import ToDo from './ToDo';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      toDo: [],
      toDone:[]
    }
    this.handleInput = this.handleInput.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.addToDone = this.addToDone.bind(this)
  }
  // ==== on page load get todos from server ====
  componentDidMount() {
    axios.get('/api/todolist').then((res) => this.setState({ toDo: res.data }))
  }

  handleInput(e) {
    this.setState({
      userInput: e.target.value
    })
  }
  addTodo() {
    axios.post('/api/todolist', { toDoThing: this.state.userInput }).then((res) => this.setState({ toDo: res.data, userInput: '' }))
  }
  addToDone(index){
    let toDoCopy = [...this.state.toDo];
    let toDoneCopy = [...this.state.toDone,toDoCopy.splice(index,1)]
    this.setState({toDone: toDoneCopy, toDo:toDoCopy})
    axios.delete(`/api/todolist/${index}`)
  }
  editTodo=(editedTodo, id)=> {
    axios.put(`/api/todolist/${id}`, {editedTodo} )
    .then((res)=>console.log(res.data))
  }

  render() {
    console.log(this.state)
    let displayToDos = this.state.toDo.map((e, i) => {
        return (
          <ToDo key={i} toDo={e} index={i} editFunction={this.editTodo}/>
      )
    })
    let displayToDones = this.state.toDone.map((e, i) => {
      return (
        <div key={i} className='toDone'>{e}</div>
      )
    })
    return (
      <div className="App">
      <section className='todo_list'>
        <h1>My New List of Things to be Done </h1>
        <input type="text" value={this.state.userInput} onChange={this.handleInput} />
        <button onClick={this.addTodo}>add Item</button>
        <h3>To Do's</h3>
        {displayToDos}
        {this.state.toDone.length !== 0 ? <h3> To Done's</h3>:''}
        {displayToDones}
      </section>
      </div>
    );
  }
}

export default App;
