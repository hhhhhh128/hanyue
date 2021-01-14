
//搜索框
const ul = document.querySelector('ul')
const inp = document.querySelector('input')
inp.addEventListener('input',function(){
  inp.oninput = function(){}
  // console.log('asdfadsf')
    const text = this.value.trim()
    const script = document.createElement('script')
    script.src = `https://api-gw.damai.cn/suggest.html?keyword=${text}&_ksTS=1610332565407_288&callback=bindHtml`
    document.body.appendChild(script)
    script.remove()
})
function bindHtml(res){
    console.log(res);
    if(!res){

        ul.style.display = 'none'
        return
    }else{
        ul.style.display='block'
        let str = ''
    for(let i = 0;i<res.length;i++){
      str += `
               <li>${ res[i].name }  ${ res[i].cityName } </li>
           `
     
    }
    ul.innerHTML = str
    }
}


// 设置 cookie 的操作
function setCookie(key, value, expires) {
    if (!expires) {
      document.cookie = key + '=' + value
      return
    }
  
    const time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
    document.cookie = `${ key }=${ value };expires=${ time }`
  }
  
  // 获取 cookie 的操作
  function getCookie(key) {
    const obj = {}
  
    document.cookie.split('; ').forEach(item => {
      const t = item.split('=')
      obj[t[0]] = t[1]
    })
  
    return key ? obj[key] : obj
  }
  