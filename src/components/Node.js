import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

import ModelStore from '../ModelStore'
import * as ModelActions from '../actions/ModelActions';

let model = ModelStore.getAll();


// findModel is a functio to find the object in the ModelStore by the path in url
function findModel(path, model){
  if(!path) return model;
  path = path.split('/');
  if(!path[0]){
    path.shift();
  }
  var foundObj = model;
  path.forEach( pathPart => {
	foundObj = foundObj.children.filter( o => o.name===pathPart )[0];
  });
  return foundObj;
}


class Node extends React.Component{

  constructor(props){
    super(props);
    this.getModel = this.getModel.bind(this)
    this.state = {
      expanded: false,
      node: null
    };
  }

  componentWillMount(){
    this.setState({ node: findModel(this.props.match.url, model) })
    // This is a good place to listen to events as components only need to be
    // rendered at the beginning and when model changes.
    ModelStore.on("change", this.getModel );
  }

  // This unbinds the event so that JS doesnt keep the object in memory
  // which can be a cause to flux memory leaks
  componentWillUnmount(){
      ModelStore.removeListener("change", this.getModel );
  }

  getModel(){
      this.setState({
          model : ModelStore.getAll(),
      })
  }

  componentDidUpdate(prev){
    if(prev.match.url!==this.props.match.url){
      this.setState({ node: findModel(this.props.match.url, model) })
    }
  }

  
  createFile(){
      ModelActions.createFile(name)
  }

  toggle() {
        this.setState({
          expanded: !this.state.expanded
        });
  }

  render() {
        let childNodes = [];
        let classes = [];
        let {match} = this.props;
        let { node } = this.state;

    return (
        <div>
          <ul>
          { !!node.children && node.children.map( child => {
            let to = `${match.url}/${child.name}`;
            if(location.pathname.indexOf(`${match.url}/${child.name}`)===0 ){
              to = match.url;
            }
            return (
              <li key={child.name}>
                <Link to={to}>{child.name}</Link>
                <Route path={`${match.url}/${child.name}`} component={Node} />
              </li>
            )
          })}
          </ul>
        </div>
    );
  }
}

export default Node;
