import React, { Component } from 'react'
import './ToDo.css'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editToggle: false,
            editInput: this.props.toDo.todo
            // the initial value of edit input should be the todo passed down.
            // this allows for a better user experience when editing.
        }

    }
    // ==== edit/save button ==== //
    handleEditToggle = () => {
        this.state.editToggle?
        this.handleSaveClick()
        :
        this.setState({ editToggle: !this.state.editToggle })
    }
    handleSaveClick = () => {
        this.props.editFunction(this.state.editInput, this.props.toDo.id)
        this.setState({ editToggle: !this.state.editToggle })
    }
    // ========// 
    
    handleEditInput = (e) => {
        this.setState({editInput:e.target.value})
    }


    render() {
        console.log('props', this.props, 'state', this.state)
        return (
            <div>
                {
                    this.state.editToggle ?
                        <input value={this.state.editInput} onChange={this.handleEditInput}/>
                        :
                        <div>- {this.state.editInput}</div>
                }
            <button onClick={this.handleEditToggle}>

            {
                this.state.editToggle
                ?
                'save'
                :
                'edit'
            }

            </button>
            </div>
        )
    }
}