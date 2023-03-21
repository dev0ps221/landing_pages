let pics = ['pic1.jpg','pic2.jpg','pic3.jpg']
const slides = document.querySelectorAll('#slides .slide')
const sliders = []
let baseInter = 4
slides.forEach(
    slide=>{
        const inter = baseInter+1
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
                interval:inter,
                controls:1
            }
        )
        baseInter++
    }
)
console.log(slides)