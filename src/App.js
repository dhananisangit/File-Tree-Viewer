import React from 'react';
import ReactDOM from 'react-dom';
import TreeNode from './components/TreeNode';
import ModelStore from './ModelStore';

class TreeView extends React.Component{
    constructor(){
        super();
        this.state = {
            model:ModelStore.getAll(),
        }
    }

    render(){
        return(
            <TreeNode model={this.state.model}/>
        )
    }
}


ReactDOM.render(
    <TreeView />, document.getElementById("root")
);
