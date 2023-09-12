import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';


import {  legacy_createStore,applyMiddleware } from 'redux';

//import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import  rootReducer  from './reducers';

// const logger=function({dispatch,getState}){
//  return function (next){
//   return function(action){
//     //middleware
//     console.log('Action_type=',action.type);
//     next(action);
//   }
//  }
// }

const logger =({dispatch,getState})=>(next)=>(action)=>{
 // console.log('Action_type=',action.type);
 if (typeof action!=='function'){
 console.log('ACTION_TYPE=',action.type)
 }
  next(action);
}
const thunk=({dispatch,getState})=>(next)=>(action)=>{
  if (typeof action ==='function'){
    action(dispatch)
    return;
  }
  next(action);
}
const store =legacy_createStore( rootReducer,applyMiddleware(logger,thunk) );
// console.log ('store',store);
 console.log('beforestate',store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{ name:'superman'}]
// });

// console.log('afterstate',store.getState());
export const StoreContext=createContext();

console.log('StoreContent',StoreContext);


class Provider extends React.Component{
  render(){
    const { store }=this.props;
   
    return (<StoreContext.Provider value={store}>
       {this.props.children}
    </StoreContext.Provider>
    );
  }
}

// const connectedComponent = connect(callback)(App);
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBeSentAsProps = callback(state);

        return <Component dispatch={store.dispatch} {...dataToBeSentAsProps} />;
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => {
              return <ConnectedComponent store={store} />;
            }}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;
  };
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App /> 
    </Provider>,
  </React.StrictMode>
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

