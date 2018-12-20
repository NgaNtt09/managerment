import { createStore } from 'redux';

var initState = {
    status: false,
    name: 2
}

var reducer = (state = initState, action) => {
    return state;
}
const store = createStore(reducer);
console.log(store);