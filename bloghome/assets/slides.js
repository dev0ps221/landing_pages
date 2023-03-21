let pics = ['pic1.jpg','pic2.jpg','pic3.jpg']
const slides = document.querySelectorAll('#slides .slide')
const sliders = []
let baseInter = 2
slides.forEach(
    slide=>{
        baseInter++
        const slider = xlide(slide)
        pics = pics.reverse()
        pics.forEach(
            (pic,idx)=>{
                slider.addImage(
                    {
                        img:`assets/pictures/${pic}`,
                        data:`titre article ${idx}`
                    }
                )
            }
        )
        slider.addOptions(
            {
                autoplay:1,
                interval:baseInter,
                controls:1
            }
        )
        console.log(slider)
    }
)
console.log(slides)