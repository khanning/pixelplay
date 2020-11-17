const SET_PIXEL = 'setPixel';
const NEXT_PIXEL = 'nextPixel';
const PREV_PIXEL = 'previousPixel';
const CHANGE_PIXEL_COLOR = 'changePixelColor';
const SET_PIXEL_COLOR = 'setPixelColor';
const SET_ALL_PIXEL_COLOR = 'setAllPixelColor';
const ADD_PIXEL = 'addPixel';
const REMOVE_PIXEL = 'removePixel';
const SET_PIXEL_TYPE = 'setPixelType';
const FORWARD_PIXEL = 'forwardPixel';
const BACK_PIXEL = 'backPixel';

const randomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
};

const randomColorInts = count => {
    const colors = [];
    const random = randomInt(100);
    for (let i=0; i<count; i++) {
        colors.push(random);
    }
    return colors;
};

const initialState = {
    pixelType: 'ring',
    selectedPixel: 0,
    pixelCount: 10,
    pixelColors: randomColorInts(10)
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch(action.type) {
    case SET_PIXEL:
        return Object.assign({}, state, {
            selectedPixel: action.selectedPixel
        });
    case NEXT_PIXEL: {
        let select = state.selectedPixel+1;
        if (select >= state.pixelCount) select = 0;
        return Object.assign({}, state, {
            selectedPixel: select
        });
    }
    case PREV_PIXEL: {
        let select = state.selectedPixel-1;
        if (select < 0) select = state.pixelCount-1;
        return Object.assign({}, state, {
            selectedPixel: select
        });
    }
    case CHANGE_PIXEL_COLOR: {
        const newColors = [...state.pixelColors];
        newColors[state.selectedPixel] += action.value;
        if (newColors[state.selectedPixel] >= 100) newColors[state.selectedPixel] %= 100;
        else if (newColors[state.selectedPixel] < 0) newColors[state.selectedPixel] += 100;
        return Object.assign({}, state, {
            pixelColors: newColors
        });
    }
    case SET_PIXEL_COLOR: {
        const newColors = [...state.pixelColors];
        newColors[state.selectedPixel] = action.value;
        return Object.assign({}, state, {
            pixelColors: newColors
        });
    }
    case SET_ALL_PIXEL_COLOR: {
        const newColors = [];
        const color = action.value % 100;
        for (let i=0; i<state.pixelCount; i++) {
            newColors.push(color);
        }
        return Object.assign({}, state, {
            pixelColors: newColors
        });
    }
    case ADD_PIXEL: {
        const newColors = [...state.pixelColors];
        newColors.push(0);
        return Object.assign({}, state, {
            pixelCount: state.pixelCount+1,
            pixelColors: newColors
        });
    }
    case REMOVE_PIXEL: {
        if (state.pixelCount === 1) return;
        const newColors = [...state.pixelColors];
        newColors.pop();
        return Object.assign({}, state, {
            pixelCount: state.pixelCount-1,
            pixelColors: newColors
        });
    }
    case SET_PIXEL_TYPE: {
        return Object.assign({}, state, {
            pixelType: action.value
        });
    }
    case FORWARD_PIXEL: {
        let select = (state.selectedPixel + action.value) % state.pixelCount;
        return Object.assign({}, state, {
            selectedPixel: select
        });
    }
    case BACK_PIXEL: {
        let select = (state.selectedPixel - action.value) % state.pixelCount;
        if (select < 0) select = state.pixelCount + select;
        console.log(select);
        return Object.assign({}, state, {
            selectedPixel: select
        });
    }
    default:
        return state;
    }
};

const setSelectedPixel = function (pixel) {
    return {
        type: SET_PIXEL,
        selectedPixel: pixel
    };
};

const moveNextPixel = function () {
    return {
        type: NEXT_PIXEL
    };
};

const movePreviousPixel = function () {
    return {
        type: PREV_PIXEL
    };
};

const changePixelColor = function (value) {
    return {
        type: CHANGE_PIXEL_COLOR,
        value: value
    };
};

const setPixelColor = function (value) {
    return {
        type: SET_PIXEL_COLOR,
        value: value
    };
};

const setAllPixelColor = function (value) {
    return {
        type: SET_ALL_PIXEL_COLOR,
        value: value
    };
};

const addPixelNode = function () {
    return {
        type: ADD_PIXEL
    };
};

const removePixelNode = function () {
    return {
        type: REMOVE_PIXEL
    };
};

const setPixelType = function (type) {
    return {
        type: SET_PIXEL_TYPE,
        value: type
    };
};

const moveForwardPixels = function (value) {
    return {
        type: FORWARD_PIXEL,
        value: value
    };
};

const moveBackPixels = function (value) {
    return {
        type: BACK_PIXEL,
        value: value
    };
};

export {
    reducer as default,
    initialState as pixelInitialState,
    setSelectedPixel,
    moveNextPixel,
    movePreviousPixel,
    changePixelColor,
    setPixelColor,
    addPixelNode,
    removePixelNode,
    setPixelType,
    moveForwardPixels,
    moveBackPixels,
    setAllPixelColor
};
