import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import React {useReducer} from "react";

const initialState ={
    isLoading: false,
    error: null,
    data: []
};


const reducer = (state,action) =>{
    switch(action.type){
        case "get":{
            return {...state, isLoading: true};
        }case "getdata":{
            return {...state, isLoading: false, data:action.payload};
        }
        default:{
            return state;
        }
    }
    return state;

}

const APP=()=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(()=>{
        dispatch({type:"get"});
        axios.get("http://localhost:3000/article").then(
            (response)=>{
                dispatch({type: "getdata", payload: response.data})
            }
        )
    });

    const textInputRef = useRef();
    const [text, setText] = useState("");
    const filterText = useMemo(()=>{
        return users.filter((user)=>user.name==text);
    },[search]);
    const callBack= useCallback((userid)=>{

    },[users]);

    return(
        <>
        {state.isLoading && <div>Loading...</div>}
        <input type="text" ref="textInputRef" value={text} onChange={(e)=> setText(e.target.value)}/>
        <button onClick={onNext}>search</button>
        <list users={users} onRemove={handleRemove} />
        </>
    )
}