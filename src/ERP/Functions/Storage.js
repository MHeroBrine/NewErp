let Storage = {
    saveInStorage(identify, value, name) {
        if ((value instanceof Array) === false && (value instanceof Object) === true) {
            for (let item in value) {
                this.saveInStorage(identify + '_' + item, value[item], item);
            }
        } else {
            let storageId = identify;
            localStorage.setItem(storageId, value);
        }
    },

    readFromStorage(identify) {
        let temp = {};
        for (let item in localStorage) {
            if (item === identify) {
                continue;
            }
            try {
                if (item.indexOf(identify) === 0) {
                    let name = item.slice(identify.length + 1);
                    temp[name] = localStorage[item];
                }
            } catch (error) {
                
            }
        }
        return temp;
    },

    cleanStorage() {
        localStorage.clear();
    }
}

export default Storage