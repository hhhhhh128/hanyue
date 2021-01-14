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
