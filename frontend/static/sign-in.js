var login = new Vue({
    el: '#center-container',
    data: {
        username: '',
        password: '',
        count: 0,
    },
    methods: {
        onSubmit(){
            console.log('nihao')
            const param = {
                'username': this.username,
                'password': this.password
            }
            axios.post('/submit', param).then(function(res){
                if(parseInt(res.status) == 200){
                    window.location.href = 'succeed'
                }
            }
            ).catch(function (error) {
                console.log(error.response)
            })
        }
    }
})