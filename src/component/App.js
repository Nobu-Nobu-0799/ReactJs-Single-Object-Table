import React, { Component } from 'react';
import Table from "../component/table/table";
import '../App.css';


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
     jola:"klk",
     data:{
       part12:["klk", "papotico"],
       part2:"manolin"
     }

   };

  }

    render(){

      return (
        <Table {...this.state} Table={this.state.data}></Table>
      );

    }
}
