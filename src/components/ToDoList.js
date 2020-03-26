import React, { Component } from "react";

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
  };
  removeItem = (id) => {
    const remainder = this.state.items.filter((todo) => {
      if (todo.id !== id) return todo;
      console.log("data", this.state.items);
    });
    console.log("uuuu", remainder);
    this.setState({ items: remainder });
    console.log("set", remainder);
  };
  handleChange = (id) => {
    const updated = this.state.items.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setState({ items: updated });
    console.log("cccccc2", updated);
  };

  render() {
    return (
      <div className="Table">
        <h1> ToDo List</h1>
        <List
          items={this.state.items}
          removeItem={this.removeItem}
          handleChange={this.handleChange}
        />
        <input onChange={this.setup} value={this.state.text} />
        <button onClick={this.getup} className="Add">
          Add
        </button>
      </div>
    );
  }
}

class List extends Component {
  render() {
    return (
      //console.log("props",this.props),
      <div className="List">
        <ul>
          {this.props.items.map((item) => (
            <li key={item.id} style={item.completed ? styles : null}>
              {" "}
              {item.text}
              <button onClick={() => this.props.removeItem(item.id)}>
                remove
              </button>
              <input
                className="checkmark"
                type="checkbox"
                checked={item.completed}
                onChange={() => this.props.handleChange(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
