var React = require("react");
var Firebase = require('firebase');
var rootUrl = 'https://project-3001876927794091333.firebaseio.com/'

module.exports = React.createClass({
    getInitialState: function()
    {
      return {
        text: this.props.item.text,
        done: this.props.item.done,
        textChanged: false
      }
    },
    componentWillMount: function(){
      this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
    },
    render: function(){
      // return <li>
      // {this.props.item.text} - {this.props.item.key} - {this.props.item.done}
      // </li>
      return <div className="input-group">
      <span className="input-group-addon">
        <input type="checkbox" onChange={this.handleDoneChange} checked={this.state.done}/>
      </span>
      <input type="text"
       disabled={this.state.done}
       className="form-control"
       value={this.state.text} onChange={this.handleTextChange}/>
       <span className="input-group-btn">
       {this.changesButtons()}
       <button className="btn btn-default" onClick={this.handleDeleteClick}>
       Delete
       </button>
       </span>
      </div>
    },
    changesButtons: function(){
      if(!this.state.textChanged){
          return null
      } else{
        return [
          <button onClick={this.handleUpdateClick} className="btn btn-default">Save</button>,
          <button onClick={this.handleUndoClick} className="btn btn-default">Undo</button>
        ]
      }
    },
    handleUndoClick: function(event){

      this.setState({
        text: this.props.item.text,
        textChanged: false
      });
    },
    handleUpdateClick: function(){

      var update = {text: this.state.text}
      this.fb.update(update);
      this.setState({textChanged: false});

    },
    handleDoneChange: function(event){
      var update = {done: event.target.checked}
      this.setState(update);
      this.fb.update(update);


    },
    handleDeleteClick: function(event){
      this.fb.remove();
    },
    handleTextChange: function(event){
      this.setState({text:event.target.value,textChanged:true});
    }
});
