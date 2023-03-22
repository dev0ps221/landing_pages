function isExpanded(elem){
    if(elem){
        return elem.classList.contains('expanded')
    }
}
function expand(elem){
    if(elem){
        elem.classList.add('expanded')
    }
}
function reduce(elem){
    if(elem){
        elem.classList.remove('expanded')
    }
}
function getNav(elem){
    if(elem.tagName.toLowerCase()=='nav'){
        return elem
    }else{
        if(!elem.parentNode){
            return null
        }else{
            if(elem.parentNode.tagName.toLowerCase()=='nav'){
                return elem.parentNode
            }else{
                return getNav(elem.parentNode)
            }
        }
    }
}
function hideExpandNav(e){
    if(isExpanded(getNav(e.currentTarget.parentNode))){
        reduce(getNav(e.currentTarget.parentNode))
    }else{
        expand(getNav(e.currentTarget.parentNode))
    }
}
document.querySelectorAll('nav a').forEach(
    link=>{
        link.addEventListener(
            'click',e=>{
                reduce(document.querySelector('nav'))
            }
        )
    }
)
window.addEventListener(
    'scroll',e=>{
        console.log('scrolling')
        const scroll = window.scrollY
        const limit = parseInt(getComputedStyle(document.querySelector(':root')).getPropertyValue('--nav-height').replace('px',''))
        if (scroll > limit) {
            document.querySelector('nav').classList.add('inpage')
        }

        else{
            
            document.querySelector('nav').classList.remove('inpage')
        }
    }
)