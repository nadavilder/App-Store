import * as remx from 'remx';


const initialState = {
    isRegistered: true,
    isLoggedIn: undefined,
    items: [],
    userInfo: {
        userName: '',
        id: ''
    }
};


const state = remx.state(initialState);

const getters = remx.getters({
    getIsRegistered: () => state.isRegistered,
    getIsLoggedIn: () => state.isLoggedIn,
    getItems: () => state.items,
    getUserInfo: () => state.userInfo

});

const setters = remx.setters({
    setIsRegistered: (isRegister) => state.isRegistered = isRegister,
    setIsLoggedIn: (isLoggedIn) => state.isLoggedIn = isLoggedIn,
    setItems: (items) => state.items = items,
    setUserInfo: (userInfo) => state.userInfo = userInfo
});


const store_state = {
    ...getters,
    ...setters,
};

export default store_state;
