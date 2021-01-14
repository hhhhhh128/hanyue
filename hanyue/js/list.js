$(function(){
  
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

// 1. 准备一个商品列表信息对象
const list_info = {
    cat_one: 'all',
    cat_two: 'all',
    cat_three: 'all',
    sort: 'id',
    sortType: 'ASC',
    current: 1,
    pagesize: 12
  }


   // 2. 请求一级分类列表
   getCatOne()
   async function getCatOne() {
     // 2-1. 请求一级分类列表
     const { list } = await $.get('./../server/catOne.php', null, null, 'json')
 
     // 2-2. 渲染页面
     let str = '<span class="active">全部</span>'
     list.forEach(item => {
       str += `<span>${ item.cat_one_id }</span>`
     })
     $('.cat_one .right').html(str)
   }
 
   // 3. 一级分类的点击事件
   $('.cat_one .right').on('click', 'span', function () {
     // 3-1. 切换类名
     $(this).addClass('active').siblings().removeClass('active')
     // 3-2. 拿到点击的这个 span 的分类内容
     const cat_one = $(this).text()
     // 3-3. 修改 list_info
     list_info.cat_one = cat_one
     list_info.cat_two = 'all'
     list_info.cat_three = 'all'
     $('.cat_three .right').html('<span class="active">全部</span>')
     // 3-4. 要请求二级列表
     if (cat_one === '全部') {
       $('.cat_two .right').html('<span class="active">全部</span>')
       // 把 list_info 里面的 cat_one 改变成 all
       list_info.cat_one = 'all'
     } else {
       // 请求二级分类列表
       getCatTwo()
     }
     getCount()
   })
 
   // 4. 请求二级分类列表
   async function getCatTwo() {
     // 4-1. 请求数据, 携带参数是 list_info.cat_one
     const { list } = await $.get('./../server/catTwo.php', { cat_one: list_info.cat_one }, null, 'json')
 
     // 4-2. 渲染页面
     let str = '<span class="active">全部</span>'
     list.forEach(item => {
       str += `<span>${ item.cat_two_id }</span>`
     })
     $('.cat_two .right').html(str)
   }
 
   // 5. 二级分类列表的事件
   $('.cat_two .right').on('click', 'span', function () {
     // 5-1. 切换类名
     $(this).addClass('active').siblings().removeClass('active')
     // 5-2. 拿到分类内容
     const cat_two = $(this).text()
     // 5-3. 修改 list_info
     list_info.cat_two = cat_two
     // 修改 list_info 里面的 cat_three 回归
     list_info.cat_three = 'all'
     // 5-4. 条件判断请求三级分类列表
     if (cat_two === '全部') {
       // 让 list_info 里面的 cat_two === 'all'
       list_info.cat_two = 'all'
       // 让三级列表回归
       $('.cat_three .right').html('<span class="active">全部</span>')
     } else {
       // 请求三级分类列表
       getCatThree()
     }
     getCount()
   })
 
   // 6. 请求三级分类列表
   async function getCatThree() {
     // 6-1. 发送请求
     const { list } = await $.get('./../server/catThree.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')
 
     // 6-2. 渲染页面
     let str = '<span class="active">全部</span>'
     list.forEach(item => {
       str += `<span>${ item.cat_three_id }</span>`
     })
     $('.cat_three .right').html(str)
   }
 
   // 7. 三级分类列表的事件
   $('.cat_three .right').on('click', 'span', function () {
     // 7-1. 切换类名
     $(this).addClass('active').siblings().removeClass('active')
     // 7-2. 拿到点击的文本内容
     const cat_three = $(this).text()
     // 7-3. 修改 list_info 里面的 cat_three
     list_info.cat_three = cat_three
     // 7-4. 条件判断
     if (cat_three === '全部') {
       list_info.cat_three = 'all'
     }
     // 每次切换三级分类也要请求总页数
     getCount()
   })
 
   // 8. 请求总条数
   getCount()
   async function getCount() {
     // 8-1. 发起请求
     const { count } = await $.get('./../server/getCount.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two, cat_three: list_info.cat_three }, null, 'json')
 
    //  console.log(count);
     new Pagination('.pagination', {
       total: count,
       pagesize: 12,
       sizeList: [12, 16, 20, 24],
       change (current, pagesize) {
         // 先把 listInfo 里面的数据修改掉
         list_info.current = current
         list_info.pagesize = pagesize
 
         // 请求商品列表
         getGoodsList()
       }
     })
   }

  // 9. 请求商品列表
  async function getGoodsList() {
    // 9-1. 请求商品列表
    const { list }= await $.get('./../server/goodsList.php', list_info, null, 'json')
    // 9-2. 渲染页面
    let str = ''
    list.forEach(item => {
      str += `
     <li>
      <img src="${ item.goods_big_logo }" alt="">
      <div class="items_con">
            <div class="items_top">
            <p class="jump" data-id= "${ item.goods_id }">
                <span>【成都】</span><span>${ item.goods_name }</span>
            </p>
            <p class="con_1">
                <svg class="icon" aria-hidden="true"><use xlink:href="#iconlocation"></use></svg>
                <span>${ item.goods_id }|发的会计师</span>
            </p>
            <p class="con_1">
                <svg class="icon" aria-hidden="true"><use xlink:href="#iconyanzhengma"></use></svg>
                <span>${ item.goods_id }</span>
            </p>
        </div>

        <div class="price">
            <span class="pri">${ item.goods_price }元</span>
            <span>售票中</span>
        </div>
        </div>
        </li>
      
      `
    })
    $('.items ').html(str)
  }


// 10. 排序方式的切换
$('.left_title').on('click', 'li', function () {
  // 10-3. 修改排序方式
  // 修改 list_info.sort 之前确定
  if (list_info.sort === this.dataset.sort) {
    list_info.sortType = list_info.sortType === 'ASC' ? 'DESC' : 'ASC'
  } else {
    list_info.sortType = 'ASC'
  }

  console.log('切换排序方式')
  // 10-2. 拿到你点击的这个按钮代表的排序方式
  // 设置给 listInfo 里面的 sort 属性就可以
  list_info.sort = this.dataset.sort

  // 10-4. 还原到第一页
  list_info.current = 1

  // 10-5. 切换类名
  $(this).addClass('active').siblings().removeClass('active')

  // 10-6. 请求列表数据
  getGoodsList()
})

// 11. 每一个商品的点击事件
$('.items').on('click', '.jump', function () {
  window.sessionStorage.setItem('goods_id', this.dataset.id)
  window.location.href = './detail.html'
})


})

