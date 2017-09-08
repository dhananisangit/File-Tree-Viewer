import React from 'react';
import ModelStore from '../ModelStore';
import Node from './Node';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

let model = ModelStore.getAll();

class TreeNode extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <Router>
              <div className="TreeNode">
                  <Node model={model} match={{params: {name: model.name}, url: ''}}/>
              </div>
            </Router>
        )
    }
}

export default TreeNode;
