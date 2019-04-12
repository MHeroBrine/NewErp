import Axios from 'axios'
import store from '../../vuex/store.js'

/*
            [
                {
                    id: 1,
                    college: '经济管理学院'
                    major: [
                        { id: 1, major: '信息管理与信息系统' },
                        { id: 2, major: '工商管理' }
                    ]
                },
                {
                    id: 2,
                    college: 'xxx学院'
                    major: [
                        { id: 3, major: '信息管理与信息系统' },
                        { id: 4, major: '工商管理' }
                    ]
                },
            ]  
          
        */

let CollegeList = new Array();

const College = function(id, college, major) {
    this.id = id;
    this.college = college;
    this.major = major;
}

function loadNewCollegeInfo(item) {
    for (let i in CollegeList) {
        if (CollegeList[i].id === item.college.id) {
            let data = {
                id: item.id,
                major: item.major
            }
            CollegeList[i].major.push(data);
            return;
        }
    }
    CollegeList.push(new College(item.college.id, item.college.college, [{
        id: item.id,
        major: item.major
    }]))
}

let C = {
    getCollegeInfo(url) {
        CollegeList = [];
        Axios.get(url + '/user/student/agency/get')
            .then((Response) => {
                let data = Response.data.data;
                for (let i = 0; i < data.length; i ++) {
                    loadNewCollegeInfo(data[i]);
                }
                store.commit('setCollege', CollegeList);
            })
        // return CollegeList;
    }
}

export default C