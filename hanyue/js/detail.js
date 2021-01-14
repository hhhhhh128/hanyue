
// 购物车
$(function (){
  // 登录
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
const box1 = document.querySelector('.sub_bottom')
box1.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}


// 0. 准备一个全局变量表示库存
let goods_number = 1
// 准备一个计数器
let count = 1
//   获取id
const id = window.sessionStorage.getItem('goods_id')
// 查看id 是否存在
if(!id){
    alert('查看商品存在')
    window.location.href = './list.html'
    return
}

// 获取商品信息
getGoodsInfo()
async function getGoodsInfo(){
    const res = await  $.get('./../server/goodsInfo.php',{ id } , null ,'json')
    console.log(res);
    bindHtml(res.info)
}
//渲染页面
function bindHtml(info){
  goods_number = info.goods_number
    // console.log(info);
    let str = `
    <div class="left_l">
    <div class="img">
      <img src="${ info.goods_big_logo }" alt="">
      <div class="mask"></div>
    </div>
    <div class="list">
      <p class="active"><img src="${ info.goods_small_logo }" data-img="${ info.goods_small_logo }" data-large="${ info.goods_big_logo }" alt=""></p>
      <p><img src="./../images/s1.jpg" data-img="./../images/s1.jpg" data-large="./../images/s1.jpg" alt=""></p>
    </div>
    <div class="large" style="background-image:url(${ info.goods_small_logo })"></div>
  </div>
  <div class="left_r">
    <div>
      <span class="total">总票代</span>
      <span>【${ info.cat_id }】${ info.goods_name }</span>
    </div>
    <p>时间：${ info.add_time }</p>
    <p>场馆：${ info.cat_two_id }</p>

    <div class="bottom">
      <div class="bottom_l">场次</div>
      <div class="bottom_r">
        <p>周六  ${info.add_time}</p>
      </div>
     
    </div>

    <div class="bottom">
      <div class="bottom_l">票档</div>
      <div class="bottom_rr">
        <p class="active">${ info.goods_price }</p>
      
      </div>
     
    </div>
    <!-- 数量 加购 -->
    <div class="bottom">
      <div class="bottom_l">数量</div>
      <div class="bottom_rrr">
          <button class="subb">-</button>
          <input class="number" type="text" value="1">张
          <button class="add">+</button>
      </div>
      
    </div>
    
    <div class="bottom_t">选座购买</div>
    

  </div>
    
    `
    $('.main_left').html(str) 
    new Enlarge('.left_l')
}

// 增加减少
$('.main_left').on('click','.add',() =>{
  count++
  // 极限值判断
  if (count > goods_number) return count = goods_number
  $('.main_left .number').val(count)
})
$('.main_left').on('click', '.subb', () => {
  // 减少数量
  count--
  // 极限值判断
  if (count < 1) return count = 1
  // 给文本框进行赋值
  $('.main_left .number').val(count)
})
})


function Enlarge(ele){
  this.ele = document.querySelector(ele)
  this.imgBox = this.ele.querySelector('.img')
  this.maskBox = this.ele.querySelector('.mask')
  this.listBox = this.ele.querySelector('.list')
  this.largeBox = this.ele.querySelector('.large')
  this.imgBox_w = this.imgBox.clientWidth
  this.imgBox_h = this.imgBox.clientHeight
  this.maskBox_w = parseInt(window.getComputedStyle(this.maskBox).width)
  this.maskBox_h = parseInt(window.getComputedStyle(this.maskBox).height)
  this.bg_w = parseInt(window.getComputedStyle(this.largeBox ).backgroundSize.split( ' ')[0])
  this.bg_h = parseInt(window.getComputedStyle(this.largeBox ).backgroundSize.split( ' ')[1])
  this.large_w = parseInt(window.getComputedStyle(this.largeBox ).width)
  this.large_h = parseInt(window.getComputedStyle(this.largeBox ).height)


  this.open()
}
Enlarge.prototype.open = function(){
  this.outover()
  this.listChange()
  this.largeChange() 
}

Enlarge.prototype.outover = function(){
  this.imgBox.addEventListener('mouseover',()=>{
      this.maskBox.style.display = 'block'
      this.largeBox.style.display = 'block'
  })
  this.imgBox.addEventListener('mouseout', ()=>{
      this.maskBox.style.display = 'none'
      this.largeBox.style.display = 'none'
  })
}

Enlarge.prototype.listChange = function(){
  this.listBox.addEventListener('click',e=>{
      e = e || window.event
      const target = e.target || e.srcElement
      if(target.nodeName === 'IMG'){
          const boxUrl = target.dataset.img
          const largeUrl = target.dataset.large
          this.imgBox.firstElementChild.src = boxUrl
          this.largeBox.style.backgroundImage = `url(${ largeUrl })`
      }
      for(let i = 0 ; i < this.listBox.children.length ; i++){
          this.listBox.children[i].classList.remove('active')
      }
      target.parentElement.classList.add('active')
  })
}

Enlarge.prototype.largeChange = function(){
  this.imgBox.addEventListener('mousemove',e=>{
      e = e || window.event
      const target = e.target || e.srcElement
      let moveX = e.offsetX - this.maskBox_w/2
      let moveY = e.offsetY - this.maskBox_h/2
      if(moveX <= 0) moveX = 0
      if(moveY <= 0) moveY = 0
      if(moveX >= this.imgBox_w - this.maskBox_w) moveX = this.imgBox_w - this.maskBox_w
      if(moveY >= this.imgBox_h - this.maskBox_h) moveY = this.imgBox_h - this.maskBox_h
      this.maskBox.style.left = moveX + 'px'
      this.maskBox.style.top = moveY + 'px'

      let bg_X = moveX * this.large_w / this.maskBox_w
      let bg_Y = moveY * this.large_h / this.maskBox_h           
      this.largeBox.style.backgroundPosition = `-${ bg_X }px -${ bg_Y }px`
  })
}
