//选项卡
function Tabs(ele,type='click'){
        this.ele=document.querySelector(ele)
        this.btns=this.ele.querySelectorAll('ul>li')
        this.tabs=this.ele.querySelectorAll('ol>li')
        this.change(type)
    }
    Tabs.prototype.change=function (type){
        this.btns.forEach((item,index)=>{
            item['on'+type]=()=>{
            this.btns.forEach((item,index)=>{
                this.btns[index].classList.remove('active')
                this.tabs[index].classList.remove('active')
            })
            this.btns[index].classList.add('active')
            this.tabs[index].classList.add('active')
        }
        })
    }
new Tabs('.tab','click')

// 登录验证  
$(function(){

    $('.input_sub').click(async (e) =>{
        // submit表单默认提交 事件取消
        if(e.preventDefault){
            e.preventDefault()
        }else{
            e.returnValue = false
        }
        //获取到用户输入的内容
        const username = $('.input_id').val()
        const password = $('.input_pas').val()
        //进行验证 
        if(!username || !password)  { return alert('请填写完整表单') }
        if(!/^1[3-9]\d{9}$/.test(username) || !/^\w{6,12}$/i.test(password)) return alert('表单不符合规则')
   
        const {code,nickname} = await $.post('./../server/login.php', { username, password }, null, 'json')
        
        if(!code) return alert('用户名密码错误')

        //设置cookie
        setCookie('nickname',nickname,60*60*24 * 7 )
        const url = window.sessionStorage.getItem('url')
        window.location.href=`./${ url ? url : 'index'}.html`
    })
})

