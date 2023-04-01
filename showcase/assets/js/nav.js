const nav = document.querySelector('nav')
const header = document.querySelector('header')
const navPrevSibling = nav.previousElementSibling
window.addEventListener(
    'scroll',e=>{
        if(window.scrollY > (header.clientTop + header.clientHeight)){
            document.body.insertBefore(nav,document.body.firstElementChild)
        }else{
            navPrevSibling.nextElementSibling ? navPrevSibling.parentNode.insertBefore(nav, navPrevSibling.nextElementSibling) : navPrevSibling.parentNode.appendChild(nav)
        }
    }
)