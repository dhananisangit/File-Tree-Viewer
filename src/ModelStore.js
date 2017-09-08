import { EventEmitter } from 'events';

import dispatcher from './dispatcher';

/**
 * Store, that handles all model events.
 */

class ModelStore extends EventEmitter{
    constructor(){
        super()
        this.model = {
            children: [
            {
                name: 'react',
                children: [
                    {
                        name: 'example21-folder',
                        children: [
                            { name: 'app1.js' },
                            { name: 'data.js' },
                            { name: 'index.html' },
                            { name: 'styles.js' },
                            {
                              name: 'webpack',
                              children : [
                                {name : 'webpack.config.js'},
                                { name: 'styles.js' },
                              ]
                            }
                        ]
                    },
                    {
                        name: 'node_modules',
                        children: []
                    },
                    {
                        name: 'src',
                        children: [
                            {
                                name: 'components',
                                children: [
                                    { name: 'decorators.js' },
                                    { name: 'treebeard.js' }
                                ]
                            },
                            { name: 'index.js' }
                        ]
                    },
                    {
                        name: 'themes',
                        children: [
                            { name: 'animations.js' },
                            { name: 'default.js' }
                        ]
                    },
                    { name: 'Gulpfile.js' },
                    { name: 'index.js' },
                    { name: 'package.json' }
                ]
              }

            ]
        }

    }

    getAll(){
        return this.model;
    }

    /**
    * This is not a complete method for adding new files for a
    * particular folder but just imitation which gives a gist of data
    * flow in react with flux.
    */
    createFile(text){
        this.model.push({text});

        // This change event can be consumed by other components which
        // can listen to this event via componentWillMount method.
        this.emit("change")
    }

    /**
    *  This function handles all the actions across the app
    * I've created 2 for demo purposes.
    */
    handleActions(action){
        switch(action.type){
            case "CREATE_FILE":{
                this.createFile(action.text);
            }
            case "RECEIVE_MODEL":{
                this.model = action.model;
                this.emit("change");
            }
        }
    }
}

const modelStore = new ModelStore;


// This registers a new listener
dispatcher.register(modelStore.handleActions.bind(modelStore))

export default modelStore;
