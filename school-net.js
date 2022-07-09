let trafficUsed = 41
const MAXTRAFFIC = 50
const MAXLENGTH = 264
let curLength = trafficUsed / MAXTRAFFIC * MAXLENGTH
var icnow = new Date()
var interval

var app = new Vue({
    el: '#center-container',
    data:{
        username: "Takasaki You",
        traffic: String(trafficUsed) + 'G',
        myStyle:{
            width: curLength + 'px'
        },
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