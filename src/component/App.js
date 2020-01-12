import React, { Component } from 'react';
import '../App.css';
import FieldValidation from "../component/fieldTester/field";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        value:'',
        regExpDate:"^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$",
     }

   }

  

    render(){

      return (
          <div>
            <FieldValidation
              values={this.state.value}
              doesChangeValidation={this.state.regExpDate}
            />

          </div>
      )

    }
}
