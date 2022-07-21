const MAXTRAFFIC = 50
const MAXLENGTH = 264
var icnow = new Date()
var myChart

var app = new Vue({
    el: '#vue-loader',
    data: {
        username: "Takasaki You",
        trafficUsed: 41,
        time: icnow.toTimeString().substring(0, 8),
        echartsFlag: false,
        echartsOpstion: {
            title: {
                text: '流量使用折线图'
            },
            backgroundColor: '#FFFFFF',
            xAxis: {
                name: '时间',
                type: 'time',
                // data: [],
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                name: '使用流量',
                type: 'value',
                scale: true
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b} &nbsp {c}',
                axisPointer: {
                    animation: false
                }
            },
            series: [
                {
                    data: [],
                    type: 'line',
                    smooth: false,
                    label: {
                        show: false,
                        position: 'bottom',
                        textStyle: {
                          fontSize: 20
                        }
                    },
                }
            ]
        },
    },
    watch: {
        xData(val){
            console.log('change')
            if(this.echartsFlag){
                this.changeEcharts()
            }
        }
    },
    methods: {
        disconnect() {
            let param = 'bye'
            axios.post('/logout', param).then(function (res) {
                if (parseInt(res.status) == 200) {
                    window.location.href = 'login'
                }
            }).catch(err => console.log(err))
        },
        changeEcharts() {
            // 基于准备好的dom，初始化echarts实例
            if(myChart == null || myChart == "" || myChart == undefined){
                myChart = echarts.init(document.getElementById('main'))
            }
            // 使用刚指定的配置项和数据显示图表
            myChart.setOption(this.echartsOpstion, false);
        },
        ShowEcharts() {
            this.echartsFlag = true
            this.$nextTick(() => {
                this.changeEcharts()
            })
        },
        HideEcharts() {
            console.log("hide")
            this.echartsFlag = false
            myChart.dispose()
            myChart = null
        }, 
        UpdateEchartsData() {
            if(this.echartsOpstion.series[0].data.length == 10){
                this.echartsOpstion.series[0].data.shift()
            }
            let length = this.echartsOpstion.series[0].data.length
            let trafficToPush = parseFloat(this.echartsOpstion.series[0].data[length - 1][1]) + Math.random() * 50
            // console.log(trafficToPush)
            let temp = trafficToPush.toFixed(2)
            this.echartsOpstion.series[0].data.push([new Date(), temp])
            console.log(this.echartsOpstion.series[0].data)
        }
    },
    created() {
        // get current time
        var interval_time = setInterval(() => {
            let icnow = new Date()
            this.time = icnow.toTimeString().substring(0, 8)
        }, 1000)
        var interval_chart = setInterval(() => {
            this.UpdateEchartsData()
        }, 2000)
        this.echartsOpstion.series[0].data.push([new Date(), 50 + Math.random().toFixed(4) * 100])
        // get username and traffic used
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
    computed: {
        newTime() {
            return this.time
        },
        traffic() {
            return String(this.trafficUsed) + 'G'
        },
        curLength() {
            return this.trafficUsed / MAXTRAFFIC * MAXLENGTH
        },
        myStyle() {
            return {
                width: this.trafficUsed / MAXTRAFFIC * MAXLENGTH + 'px'
            }
        },
        xData() {
            return this.echartsOpstion.series[0].data
        }
    },
    beforeDestroy() {
        clearInterval(interval);
    }
})