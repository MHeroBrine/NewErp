let F = {
    // 转换数组，脱离原地址限制
    translate(array) {
        let newArr = new Array();
    
        for (let i = 0; i < array.length; i ++) {
            newArr[i] = array[i];
        }
        return newArr;
    },

    // 数组分离
    chunk(array, size = 1) {
        let model = this.translate(array);

        let result = new Array();
        let parts = model.length / size;
        let remain = model.length % size;

        if (model.length <= size) {
            result[0] = model;
            return result;
        } else if (remain == 0) {
            for (let i = 0; i < parts; i++) {
                result[i] = new Array();
                for (let j = 0; j < size; j++) {
                    result[i].push(model[0]);
                    model.splice(0, 1);
                }
            }
            return result;
        } else if (remain != 0 && model.length > size) {
            for (let i = 0; i < parts - 1; i++) {
                result[i] = new Array();
                for (let j = 0; j < size; j++) {
                    result[i].push(model[0]);
                    model.splice(0, 1);
                }
            }
            result[Math.floor(parts)] = model;
            return result;
        }
    }
}

export default F