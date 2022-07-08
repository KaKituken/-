let trafficUsed = 41
const MAXTRAFFIC = 50
const MAXLENGTH = 264
let curLength = trafficUsed / MAXTRAFFIC * MAXLENGTH

var user = new Vue({
    el: '#user',
    data:{
        username: "Takasaki You"
    }
})

var traffic = new Vue({
    el: '#traffic',
    data:{
        traffic: String(trafficUsed) + 'G'
    },
})

var yelloBar = new Vue({
    el: '#traffic-value',
    data:{
        myStyle:{
            width: curLength + 'px'
        }
    }
})

var icnow = new Date()
var interval
var curTime = new Vue({
    el:'#time',
    data:{
        time: icnow.toTimeString().substring(0, 8)
    },
    created(){
        interval = setInterval(()=>{
            let icnow = new Date()
            this.time = icnow.toTimeString().substring(0, 8)
        }, 1000)
    },
    computed:{
        newTime: function(){
            return this.time
        }
    },
    beforeDestroy () {
        clearInterval(interval);
    }
})