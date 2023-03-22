function isExpanded(elem){
    return elem.classList.contains('expanded')
}
function expand(elem){
    elem.classList.add('expanded')
}
function reduce(elem){
    elem.classList.remove('expanded')
}
function hideExpandNav(e){
    if(isExpanded(e.currentTarget.parentNode)){
        reduce(e.currentTarget.parentNode)
    }else{
        expand(e.currentTarget.parentNode)
    }
}