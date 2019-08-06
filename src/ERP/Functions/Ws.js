let socket = null;

let Ws = {
    initSocket(gameId) {
        socket = new WebSocket('ws://118.24.113.182:8081/commonWebSocket?gameId=' + gameId);
    },

    openSocket() {
        socket.addEventListener('open', function(e) {
            console.log(e);
        })
    },

    message() {
        let reg_enterprise = /enterpriseId = [0-9]+/;
        socket.addEventListener('message', function(e) {
            console.log(e);
            // 新的一年
            // if ()
            // 订单会开始
            // 企业选单
            if (e.data.match(reg_enterprise)) {
                let enterpriseId = e.data.match(reg_enterprise)[0].replace(/[^0-9]/ig, "");
                console.log(enterpriseId);
                if (parseInt(enterpriseId) === parseInt(localStorage.getItem('enterpriseId'))) {
                    alert('轮到您选单了');
                }
            }
        })
    },
}

export default Ws