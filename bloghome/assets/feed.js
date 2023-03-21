function isRevealed(target){
    return target.classList.contains('revealed')
}
function revealHidePost(target){
    const parent = target.parentNode
    if(parent){
        if(isRevealed(parent)){
            unReveal(parent)
    
        }else{
            reveal(parent)
        }
    }
}
function unReveal(target){
    target.classList.remove('revealed')
}
function reveal(target){
    target.classList.add('revealed')
}