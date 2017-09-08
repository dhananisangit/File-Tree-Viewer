import dispatcher from '../dispatcher';

/**
 * Defines actions, that relate to the model
 * changes via ui interactions
 */

export function createFile(name){
    dispatcher.dispatch({
        type: "CREATE_FILE",
        name,
    })
}


export function deleteFile(id){
    dispatcher.dispatch({
        type: "DELETE_FILE",
        id,
    })
}

/**
 * Functions here can be used to get data from external
 * servers via some api endpoints.
 */
export function reloadModel(){
    /**
    * AJAX call
    */

    axios("https://someapiendpoint").then((data) => {
        console.log("Data from some API")
    })

    // This fires a event and the guys listening to this event can
    // handle it appropriately. For e.g. a loader can start loading
    dispatcher.dispatch({type:"FETCH_MODEL"})

    /**
    * Mocking the AJAX call by setTimeout
    */
    setTimeout(() =>{
        dispatcher.dispatch({type:"RECEIVE_MODEL"}, model:[
            {
                model:modelObject,
            }
        ]);
        if(false){
            dispatcher.dispatch({type:"FETCH_MODEL_ERROR"})
        }
    }, 1000)


}
