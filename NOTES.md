What is a thunk?

- A thunk is a function that wraps an expression to delay its evaluation
- allows action creators to return a function instead of a plain object

```
export const incrementAsync = () => {
    return async dispatch = > {
        dispatch(startCounterAction())
        await delay(1000);
        dispatch({ type: INCREMENT_COUNTER })
        dispatch(finishCounterAction())
    }
}
```

[Action Creators](https://redux.js.org/glossary#action-creator)

[Defining mapDispatchToProps As An Object](https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object)

[Defining the mapDispatchToProps Function with bindActionCreators](https://react-redux.js.org/using-react-redux/connect-mapdispatch#defining-the-mapdispatchtoprops-function-with-bindactioncreators)
