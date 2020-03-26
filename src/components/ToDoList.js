import React, { Component } from "react";
import "./ToDoList.css";

let styles = { textDecoration: "line-through" };
class ToDoList extends Component {
  state = {
    text: "hookah",
    items: []
  };
  
  

  setup = (e) => {
    this.setState({ text: e.target.value });
  };

  getup = (e) => {
    let items = this.state.items;
    console.log(items);
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      completed: false
    };
    //    console.log(newItem);

    this.setState((state) => ({
      items: this.state.items.concat(newItem),
      text: ""
    }));
    localStorage.setItem("items",JSON.stringify(items));
    
  }
  removeItem = (id) => {
    const remainder = JSON.parse(localStorage.getItem('items')).filter((todo) => {
      if (todo.id !== id) return todo;
      console.log("data",localStorage.getItem('items') );
    });
   localStorage.setItem("items", JSON.stringify( remainder) );
  };
  handleChange = (id) => {
    const updated = JSON.parse(localStorage.getItem('items')).map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    localStorage.setItem('items',JSON.stringify(updated))
    console.log("cccccc2", updated);
  };
  editItem=(item)=>{
    const inputF = document.getElementById('input');
    inputF.value=item;
    // const updatedTask= inputF.value;
    // const change=()=>{
    //      this.state.items.find((item)=>{
    //       return  item.text  === updatedTask
    //     })
    //   }
    
    // const newArr= change()
    // this.setState({items : newArr})

  }

  render() {
    return (
      <div className="Table">
        <h1 className ="Header"> ToDo List</h1>
        <div className="InputDiv">
        <input id="input" placeholder="Type here ...."
        className="InputField" 
        onChange={this.setup} 
        value={this.state.text} />
        <button onClick={this.getup} className="Add">
          Add
        </button>
        </div>
        <div>
          <fieldset className="ListField">
            <legend>Your List For Today</legend>
        <List
          items={this.state.items}
          removeItem={this.removeItem}
          handleChange={this.handleChange}
          editItem={this.editItem}
        />
          </fieldset>
        </div>
      </div>
    );
  }

}
class List extends Component {
  render() {
    return (
      //console.log("props",this.props),
      <div className="List">
        <ul className="ListStyle">
          {
          JSON.parse(localStorage.getItem('items'))
          .map((items) => (
            <li className="ListItem" key={items.id} style={items.completed ? styles : null}>
              <div className="first_li_div">
              <input
                className="checkmark"
                type="checkbox"
                checked={items.completed}
                onChange={() => this.props.handleChange(items.id)}
                />
                {"   "}
              {items.text}
              </div>
              <div className="ButtonsDiv">
              <button className="Removebtn" onClick={() => this.props.removeItem(items.id)}>
                remove
              </button>
              <button className="Removebtn" onClick={()=>this.props.editItem(items.text)}>Edit</button>
              
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
