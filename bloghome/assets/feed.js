function isRevealed(target){
    return target.classList.contains('revealed')
}
function revealHidePost(target){
    const parent = target.parentNode
    if(parent){
        if(isRevealed(parent)){
            target.innerHTML = 'plus'
            unReveal(parent)
        }else{
            target.innerHTML = 'moins'
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