import React from 'react';
import ReactDOM from 'react-dom';
import GUI from './containers/gui.js';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import modalReducer from './reducers/modals';
import pixelReducer from './reducers/pixels.js';
import bluetoothReducer from './reducers/bluetooth.js';
import projectStateReducer from './reducers/project-state.js';

const reducers = combineReducers({
    modals: modalReducer,
    pixels: pixelReducer,
    projectState: projectStateReducer,
    bluetooth: bluetoothReducer
});
const store = createStore(reducers);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GUI />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
