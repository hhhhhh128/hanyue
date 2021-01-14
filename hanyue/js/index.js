//登录
$(function (){
    const nickname = getCookie('nickname')
  
    // 1-2. 条件判断
    if (nickname) {
      // 登录过
      $('.off').addClass('hide')
      $('.on').text(`${ nickname }`).removeClass('hide')
    } else {
      // 没有登录过 或者 过期了
      $('.off').removeClass('hide')
      $('.on').addClass('hide')
    }


// 回到顶部
var box1 = document.querySelector('.sub_bottom')
box1.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
  })
// 轮播图
  function move(ele, target, fn) {
    let count = 0
    for (let key in target) {
      if (key === 'opacity') target[key] *= 100
      count++
      const timer = setInterval(() => {
        let current
        if (key === 'opacity') current = window.getComputedStyle(ele)[key] * 100
        else current = parseInt(window.getComputedStyle(ele)[key])
        let distance = (target[key] - current) / 10
        distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
        if (current === target[key]) {
          clearInterval(timer)
          count--
          if (!count) fn()
        } else {
          if (key === 'opacity') ele.style[key] = (current + distance) / 100
          else ele.style[key] = current + distance + 'px'
        }
      }, 20)
    }
  }

const imgBox = document.querySelector('.img')
const pointBox = document.querySelector('.point')
const banner = document.querySelector('.banner')
const leftBtn = document.querySelector('.left')
const rightBtn = document.querySelector('.right')


const banner_w = banner.clientWidth
let index = 1
let timer = 0
let flag = true
setPoint()
function setPoint(){
    const pointSum = imgBox.children.length
    const frg = document.createDocumentFragment()
    for(let i = 0 ; i < pointSum ; i ++){
        const li = document.createElement('li')
        li.dataset.page = i
        if(i === 0)li.classList.add('active')
        frg.appendChild(li)

    }
    pointBox.appendChild(frg)
    pointBox.style.width = imgBox.children.length * (20 + 10) + 'px'
}
copyEle()
function copyEle(){
    const first = imgBox.firstElementChild.cloneNode(true)
    const last = imgBox.lastElementChild.cloneNode(true)

    imgBox.appendChild(first)
    imgBox.insertBefore(last , imgBox.firstElementChild)

    imgBox.style.width = imgBox.children.length * 100 + '%'
    imgBox.style.left = -banner_w + 'px'
}
autoPlay()
function autoPlay(){
    timer = setInterval( ()=>{
        index++
        move(imgBox,{left:-index * banner_w},moveEnd)
    },2000)
}
function moveEnd(){
    if(index === imgBox.children.length - 1){
        index = 1
        imgBox.style.left = -index * banner_w + 'px'
    }
    if(index === 0){
        index = imgBox.children.length - 2
        imgBox.style.left = -index * banner_w + 'px'
    }
    for(let i = 0 ; i < pointBox.children.length ; i++) {
        pointBox.children[i].classList.remove('active')
    }
    pointBox.children[index - 1].classList.add('active')
    flag = true

}
moveOut()
function moveOut(){
    banner.addEventListener('mouseover',()=>{
        clearInterval(timer)
    })
    banner.addEventListener('mouseout',()=>{
        autoPlay()
    })
}
pointChange()
function pointChange(){
    pointBox.addEventListener('click',e=>{
        e = e || window.event
        const target = e.target || e.srcElement
        if(target.nodeName === 'LI'){
            if(!flag) return
            flag = false
            index = target.dataset.page - 0 + 1
            move(imgBox,{left:-index * banner_w},moveEnd)
        }
    })
}
leftRight()
function leftRight(){
    leftBtn.addEventListener('click',()=>{
        if(!flag) return
        flag = false
        index--
        move(imgBox,{left:-index * banner_w},moveEnd)
    })
    rightBtn.addEventListener('click',()=>{
        if(!flag) return
        flag = false
        index++
        move(imgBox,{left:-index * banner_w},moveEnd)
    })
}
tab()
function tab(){
    document.addEventListener('visibilitychange',()=>{
        const taste = document.visibilityState
        if(taste === 'hidden')clearInterval(timer)
        if(taste === 'visible')autoPlay()
    })
}





// 页面渲染
bindHtml1()
function bindHtml1(res){
    let str = ''
    for( let i = 1 ; i< res.data.length;i++){
        str +=`
            <div class="item">
                        <img src="${ res.data[i].verticalPic}" alt="">
                        <div class="iteminfo">
                            <span>${ res.data[i].name}</span>
                            <p>${ res.data[i].venueName}</p>
                            <p>${ res.data[i].showTime}</p>
                            <div class="price"><span>￥</span>124<span>起</span></div>
                        </div>
                    </div>
        `
    }
    $('.box_righ_1').html(str)
    let stc =`
    
                    <img src="${ res.data[0].verticalPic}" alt="">
                    <div class="mask">
                        <div class="title">${ res.data[0].name}</div>
                        <div class="details">￥<span>124</span>起</div>
                    </div>
              
    `
    $('.box_left_1').html(stc)
}
bindHtml2()
function bindHtml2(res){
    let str = ''
    for( let i = 1 ; i< res.data.length;i++){
        str +=`
            <div class="item">
                        <img src="${ res.data[i].verticalPic}" alt="">
                        <div class="iteminfo">
                            <span>${ res.data[i].name}</span>
                            <p>${ res.data[i].venueName}</p>
                            <p>${ res.data[i].showTime}</p>
                            <div class="price"><span>￥</span>124<span>起</span></div>
                        </div>
                    </div>
        `
    }
    $('.box_righ_2').html(str)
    let stc =`
    
                    <img src="${ res.data[0].verticalPic}" alt="">
                    <div class="mask">
                        <div class="title">${ res.data[0].name}</div>
                        <div class="details">￥<span>124</span>起</div>
                    </div>
              
    `
    $('.box_left_2').html(stc)
}
bindHtml3()
function bindHtml3(res){
    let str = ''
    for( let i = 1 ; i< res.data.length;i++){
        str +=`
            <div class="item">
                        <img src="${ res.data[i].verticalPic}" alt="">
                        <div class="iteminfo">
                            <span>${ res.data[i].name}</span>
                            <p>${ res.data[i].venueName}</p>
                            <p>${ res.data[i].showTime}</p>
                            <div class="price"><span>￥</span>124<span>起</span></div>
                        </div>
                    </div>
        `
    }
    $('.box_righ_3').html(str)
    let stc =`
    
                    <img src="${ res.data[0].verticalPic}" alt="">
                    <div class="mask">
                        <div class="title">${ res.data[0].name}</div>
                        <div class="details">￥<span>124</span>起</div>
                    </div>
              
    `
    $('.box_left_3').html(stc)
}
bindHtml4()
function bindHtml4(res){
    let str = ''
    for( let i = 1 ; i< res.data.length;i++){
        str +=`
        <div class="item">
                        <img src="${ res.data[i].verticalPic}" alt="">
                        <div class="iteminfo">
                            <span>${ res.data[i].name}</span>
                            <p>${ res.data[i].venueName}</p>
                            <p>${ res.data[i].showTime}</p>
                            <div class="price"><span>￥</span>124<span>起</span></div>
                        </div>
                    </div>
        `
    }
    $('.box_righ_4').html(str)
    let stc =`
   
                    <img src="${ res.data[0].verticalPic}" alt="">
                    <div class="mask">
                        <div class="title">${ res.data[0].name}</div>
                        <div class="details">￥<span>124</span>起</div>
                    </div>
              
    `
    $('.box_left_4').html(stc)
}









