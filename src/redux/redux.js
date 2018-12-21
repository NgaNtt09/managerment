import { createStore } from 'redux';
import { status, sort } from './actions/Action'
var initState = {
    status: false,
    sort: {
        by: 'name',
        value: 1
    }
}

var reducer = (state = initState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        state.status = !state.status
    }
    if (action.type === 'SORT') {
        var { by, value } = action.sort; // by=action.by
        var { status } = state;
        console.log(action);
        return {
            status: status,
            by: by,
            value: value

        }
    }
    return state;
}
const store = createStore(reducer);
console.log('Default: ', store.getState());

store.dispatch(status());
console.log('TOGGLE_STATUS: ', store.getState());

store.dispatch(sort({
    by: 'name',
    value: -1
}));
console.log('SORT: ', store.getState());
