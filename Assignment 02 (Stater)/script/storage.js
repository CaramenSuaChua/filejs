'use strict';


////////save storage//////
const saveToStorage = function(key, value) {
    localStorage.setItem(key, value);
}
const getFromStorage = function(key, value) {
    return localStorage.getItem(key);
}