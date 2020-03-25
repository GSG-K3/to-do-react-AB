import React, { Component } from 'react';




class Add extends Component {
    state = {
         text: 'hookah',
         items: []
       };
   
   setup = (e) => {
     this.setState({text: e.target.value});
   }
   
   getup = (e) => {
     let items = this.state.items;
     console.log(items);
     e.preventDefault();
     if(!this.state.text.length){
       return;
     }
     const newItem = {
       text: this.state.text,
       id: Date.now()
     }    
       console.log(newItem);



     this.setState(state => ({
       items: this.state.items.concat(newItem),
       text: ''
     }));
    //  localStorage.setItem('items',JSON.stringify(items)); // not working , later
    //  localStorage.getItem('items')
   }
     render(){
   return(
     <div className="Table">
       <h1> ToDo List</h1>
       <List items={this.state.items}/>
       <input onChange={this.setup}
       value={this.state.text} />
       <button onClick={this.getup}
       className="Add">Add</button>
       </div>
   )
   
   
     }}
   
   
    
   
   
   
   
   class List extends Component {
   
     render() {
       return (
   <div className="List">
     <ul>
       {this.props.items.map((item,id)=>
       (
         <li key={id}>{item.text}</li>
       ))}
       </ul>
   </div> 
       );
    
       }
     }
       

export default Add;
