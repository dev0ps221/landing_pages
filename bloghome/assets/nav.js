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
function hideExpandNav(e){
    if(isExpanded(e.currentTarget.parentNode)){
        reduce(e.currentTarget.parentNode)
    }else{
        expand(e.currentTarget.parentNode)
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