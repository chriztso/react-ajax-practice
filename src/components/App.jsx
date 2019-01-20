import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {namevalue: '',
                  messagevalue: '', 
                  response: ''};
    this.nameHandleChange = this.nameHandleChange.bind(this);
    this.messageHandleChange = this.messageHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  nameHandleChange(event) {
    this.setState({namevalue: event.target.value});
  }

  messageHandleChange(event) {
    this.setState({messagevalue: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.namevalue + ' ' + this.state.messagevalue);
    event.preventDefault();
     var message = {
     'name' : this.state.namevalue,
     'message' : this.state.messagevalue
     }
      
     var context = this; 
     $.ajax({
     type: 'POST',
     url: 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf110/greeting',
     contentType: 'application/json',
     data: JSON.stringify(message),
     success: function(data){$('.responses').html(data)}
     })
  }

  render() {
    return (
     <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.namevalue} onChange={this.nameHandleChange} />
        </label>
        <label>
          Message:
          <input type="text" value={this.state.messagevalue} onChange={this.messageHandleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1 className = 'responses'> Server response: {this.state.response} </h1>

      </div>
    );
  }
}

export default App;