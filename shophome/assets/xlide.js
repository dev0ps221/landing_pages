class xLide{
    checkOptionsList(name){
        return this.checkOption(name) && Array.isArray(this.options[name]) && this.options[name].length
    }
    checkOption(name){
        return this.options.hasOwnProperty(name)
    }
    checkBooleanOption(option){
        return this.checkOption(option) && this.options[option]
    }
    matchHtmlElem(elem){
        return elem instanceof HTMLElement
    }
    processItems(){

        this.items = this.slider.querySelectorAll('.xlide-item')
        this.items = []
        if(this.checkOptionsList('images')){
            this.options['images'].forEach(
                img=>{
                    const item = document.createElement('div')
                    item.classList.add('xlide-item')
                    if((typeof img) === 'string'){
                        const slideimg = document.createElement('img')
                        slideimg.src = img+"?t="+new Date().getTime()
                        item.appendChild(slideimg)
                    }
                    if((typeof img) === 'object'){
                        if(this.matchHtmlElem(img)){
                            item.appendChild(img)
                        }else{
                            if(img.hasOwnProperty('img')){
                                const slideimg = document.createElement('img')
                                slideimg.src = img['img']+"?t="+new Date().getTime()
                                item.appendChild(slideimg)
                            }
                            if(img.hasOwnProperty('data')){
                                const data = img['data']
                                if((this.matchHtmlElem(data))){
                                    data.classList.add('data')
                                    item.appendChild(data)
                                }else{
                                    const dataelem = document.createElement('div')
                                    dataelem.classList.add('data')
                                    if((typeof data === 'string')){
                                        dataelem.innerHTML=data
                                        item.appendChild(dataelem)
                                    }
                                    if((typeof data) === 'object'){
                                        if(data.hasOwnProperty('title')){
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.items.push(item)
                }
            )
        }
        return this
    }
    hasCtrlBar(){
        return this.checkOption('controls') || this.checkOption('previews')
    }
    processCtrlBar(){
        //check if a controlbar is needed and build it if necessary
        if(this.hasCtrlBar()){
            let previews = null,
                leftCtrl = null,
                rightCtrl = null
            const controls = document.createElement('div')
            controls.classList.add('controlbar')
            if(this.checkOption('previews') && this.options['previews']){
                previews = document.createElement('div')
                previews.classList.add('previews')
                this.items.forEach(
                    (item,idx)=>{
                        const img = item.querySelector('img')
                        const preview = document.createElement('div')
                        preview.classList.add('preview')
                        if(img){
                            preview.appendChild(img.cloneNode())
                        }else{
                            const label = document.createElement('h4')
                            label.innerHTML = "slide "+(idx+1)
                            preview.appendChild(label)
                        }
                        previews.appendChild(preview)
                    }
                )
            }
            if(this.checkOption('controls') && this.options['controls']){
                leftCtrl = document.createElement('div')
                leftCtrl.classList.add('before')
                leftCtrl.innerHTML = "<"
                controls.appendChild(leftCtrl)
                if(previews){
                    controls.appendChild(previews)
                }
                rightCtrl = document.createElement('div')
                rightCtrl.classList.add('after')
                rightCtrl.innerHTML = ">"
                controls.appendChild(rightCtrl)
            }else{
                if(previews){
                    controls.appendChild(previews)
                }
            }
            return controls
        }
    }
    delImage(image,refresh=1){
        if(this.checkOption('images')){
            let images = []
            this.options.images.forEach(
                (img,idx)=>{
                    if(idx != image){
                        images.push(img)
                    }
                }
            )
            this.options['images'] = images
            if(refresh){
                this.xlide()
            }
        }
        return this
    }
    delImages(images){
        images.forEach(
            (image,idx)=>{
                this.delImage(idx,0)
                this.xlide()
            }
        )
        return this
    }
    addImage(image,refresh=1){
        if(!this.checkOption('images')) this.options['images'] = []
        this.options.images.push(image)
        if(refresh){
            this.xlide()
        }
        return this
    }
    addImages(images){
        images.forEach(
            image => {
                this.addImage(image,0)
            }
        )
        if(images.length){
            this .xlide()
        }
        return this
    }
    processOption(option){
        if(this.checkOption(option)){
            let value = this.options[option]
            if(option == 'autoplay' && value){
                this.is_playing = true
            }
            if(option == 'rotate'){
                this.setOption('vertical',false)
                this.slider.classList[value ? 'add' : 'remove' ]('rotate')
            }
            if(['rvertical','rhorizontal'].includes(option)){
                if(option == 'rvertical'){
                    this.setOption('vertical',1)
                }
                if(option == 'rhorizontal'){
                    this.setOption('horizontal',1)
                }
                if(value){
                    this.reverse_playing = true
                }
            }
            if(option == 'vertical' && value){
                this.setOption('horizontal',0)
                this.slider.classList[value ? 'add' : 'remove' ]('vertical')
                this.reverse_playing = false
            }
            if(option == 'horizontal' && value){
                this.setOption('vertical',false)
                this.slider.classList.remove('vertical')
                this.reverse_playing = false
            }
            if(option == 'interval'){
                this.play_interval = value
            }
            this.xlide()
        }
        return this
    }
    setOption(option,value){
        this.addOption(option,value)
        return this
    }
    setOptions(options){
        this.setOptions(options)
        return this
    }
    addOption(option,value=true){
        this.options[option] = value
        this.processOption(option)
        return this
    }
    addOptions(options={}){
        Object.keys(options).forEach(
            option=>{
                const value = options[option]
                this.addOption(option,value)

            }
        )
        return this
    }
    xlide(){
        this.slider.innerHTML = ''
        this.wrapper.innerHTML = ''
        this.processItems()
        this.items.forEach(
            item=>{
                this.wrapper.appendChild(item)
            }
        )
        this.slider.appendChild(this.wrapper)



        //build and append a .controlbar element if necessary
        if(this.hasCtrlBar()){
            this.controlbar = this.processCtrlBar()
            this.slider.appendChild(this.controlbar)
            this.init_xlide_controls()
        }
        if(this.checkBooleanOption('rvertical') || this.checkBooleanOption('rhorizontal')){
            this.reverse_playing = true
        }

        if(this.checkOption('vertical') && this.options['vertical']){
            this.slider.classList.add('vslider')
        }


        if(this.checkOption('rotate') && this.options['rotate']){
            this.slider.classList.add('rotate')
        }

        this.target.removeEventListener(
            'mouseenter',e=>{
                this.is_playing = false
            }
        )

        this.target.removeEventListener(
            'mouseleave',e=>{
                this.is_playing = true
                this.move()
            }
        )

        this.target.addEventListener(
            'mouseenter',e=>{
                this.is_playing = false
            }
        )

        this.target.addEventListener(
            'mouseleave',e=>{
                this.is_playing = true
                this.move()
            }
        )

        if(this.checkOption('autoplay')){
            this.is_playing = true
            this.play()
        }

        if(this.checkBooleanOption('interval')){
            this.play_interval = this.options['interval']
            this.play()
        }
        return this

    }
    
    slideTo(position){
        //moves to the specified slide
        this.setSlideVar('--slide-position',position)
        this.disablepreviews()
        this.enablepreview(position)
        this.justSlide()
        this.slidesOut()
        this.slideIn(position)
        
        return this
    }

    prevSlide(){
        //moves to the previous slide
        const slidenumber = parseInt(getComputedStyle(this.slider).getPropertyValue('--slide-position'))
        if(slidenumber > 0){
            this.slideTo(slidenumber-1)
        }else{
            this.slideTo(this.items.length-1)
        }
        return this
    }

    nextSlide(){
        //moves to the next slide
        const slidenumber = parseInt(getComputedStyle(this.slider).getPropertyValue('--slide-position'))
        if(slidenumber+1 < this.items.length){
            this.slideTo(slidenumber+1)
        }else{
            this.slideTo(0)
        }
        return this
    }

    reset_left_arrow_event(){
        this.slider.querySelectorAll(
            '.before'
        ).forEach(
            before=>{
                before.addEventListener('click',e=>this.prevSlide())
            }
        )
        return this
    }

    reset_right_arrow_event(){
        this.slider.querySelectorAll(
            '.after'
        ).forEach(
            before=>{
                before.addEventListener('click',e=>this.nextSlide())
            }
        )
        return this
    }

    reset_arrows_events(){
        this.reset_left_arrow_event()
        this.reset_right_arrow_event()
        return this
    }

    reset_preview_events(preview,idx){
        preview.removeEventListener(
            'click',e=>{
                this.slideTo(idx)
            }
        )
        preview.addEventListener(
            'click',e=>{
                this.slideTo(idx)
            }
        )
        return this
    }

    reset_previews_events(){

        this.slider.querySelectorAll(
            '.preview'
        ).forEach(
            (elem,idx)=>{
                this.reset_preview_events(elem,idx)
            }
        )
        this.disablepreviews()
        this.enablepreview(this.reverse_playing ? this.items.length-1 : 0)
        return this
    }

    init_xlide_controls(){
        this.reset_arrows_events()
        this.reset_previews_events()
        return this
    }



    //slide animations related actions

    //assign defined moving out animation on all items
    slidesOut(){
        this.slider.querySelectorAll('.xlide-item').forEach(
            slide=>{
                slide.classList.remove('in')
                slide.classList.add('out')
            }
        )
        return this
    }

    //assign defined moving in animation on  all items
    slidesIn(){
        this.slider.querySelectorAll('.xlide-item').forEach(
            slide=>{
                slide.classList.remove('out')
                slide.classList.add('in')
            }
        )
        return this
    }

    //assign defined moving in animation on one item
    slideIn(idx){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                if(i == idx){
                    slide.classList.remove('out')
                    slide.classList.add('in')
                }
            }
        )
        return this
    }

    //assign defined moving out animation on  one item
    slideOut(idx){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                if(i == idx){
                    slide.classList.remove('in')
                    slide.classList.add('out')
                }
            }
        )
        return this
    }

    //just remove all animations (just sslide just moves in a linear way without animation special animation)
    justSlide(){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                slide.classList.remove('in')
                slide.classList.remove('out')
            
            }   
        )
        return this
    }
    //assigns some css value to the slider elem (mainly for css vars)
    setSlideVar(key,value){
        this.setElemVar(this.slider,key,value)
        return this
    }
    //assigns some css value to the specified elem
    setElemVar(elem,key,value){
        if(elem instanceof HTMLElement){
            elem.style.setProperty(key,value)
        }
        return this
    }
    //resets previews highlights
    disablepreviews(){
        this.slider.querySelectorAll(
            '.preview'
        ).forEach(
            (elem,idx)=>{
                elem.classList.remove('active')
            }
        )
        return this
    }
    //highlight the specified preview item of the slider
    enablepreview(idx){
        this.slider.querySelectorAll(
            '.preview'
        ).forEach(
            (elem,x)=>{
                if(x == idx){
                    elem.classList.add('active')
                }
            }
        )
        return this
    }

    //move the slide
    move(){
        setTimeout(()=>{
                if(this.is_playing){
                    this[this.reverse_playing ? "prevSlide" : 'nextSlide']()
                    this.move()
                }
            },this.play_interval * 1000
        )
        return this
    }

    //pause
    pause(){
        this.play_state = 'paused'
        return this
    }

    //autoplay feature
    play(){
        if(this.play_state == 'paused'){
            this.play_state='playing'
            this.move()
        }
        return this
    }
                
    appendTo(target){
        try{
            if((typeof target) === 'string'){
                target = document.querySelector(target)
            }
            target.appendChild(this.target)
        }catch(e){
            console.log(`'failed appending slider to target: { ${e} }'`)
        }
        return this
    }

    constructor(target=document.createElement('section'),options={}){
        this.play_state = 'paused'
        this.is_playing = false
        this.reverse_playing = false
        this.play_interval = 3 //seconds
        this.target = this.slider = target
        this.options = options
        this.wrapper = document.createElement('div')
        this.target.classList.add('xlide')
        this.wrapper.classList.add('wrapper')
        this.xlide()
        return this
    }
}

function xlide(target=document.createElement('section'),options){
    if((typeof target) === 'string'){
        target = document.querySelector(target)
    }
    const slider = new xLide(target,options)
    return slider
}