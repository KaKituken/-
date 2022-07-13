const MAXTRAFFIC = 50
const MAXLENGTH = 264
var icnow = new Date()
var interval

var app = new Vue({
    el: '#center-container',
    data:{
        username: "Takasaki You",
        trafficUsed: 41,
        time: icnow.toTimeString().substring(0, 8),
    },
    methods: {
        disconnect(){
            let param = 'bye'
            axios.post('/logout', param).then(function(res){
                if(parseInt(res.status) == 200){
                    window.location.href = 'login'
                }
            }).catch(err => console.log(err))
        },
    },
    created(){
        interval = setInterval(()=>{
            let icnow = new Date()
            this.time = icnow.toTimeString().substring(0, 8)
        }, 1000)
        _this = this
        axios.get('/traffic').then(function(res){
            console.log(res)
            console.log(res.data['traffic'])
            _this.trafficUsed = res.data['traffic']
            _this.username = res.data['username']
        }).catch(function(err){
            console.log(err)
        })
    },
    computed:{
        newTime: function(){
            return this.time
        },
        traffic: function(){
            return String(this.trafficUsed) + 'G'
        },
        curLength: function(){
            return this.trafficUsed / MAXTRAFFIC * MAXLENGTH
        },
        myStyle: function(){
            return {
                width: this.trafficUsed / MAXTRAFFIC * MAXLENGTH + 'px'
            }
        }
    },
    beforeDestroy () {
        clearInterval(interval);
    }
})