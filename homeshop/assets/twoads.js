document.querySelectorAll('.twoads .ad').forEach(
    (adbox,idx)=>{

        const slide = xlide(adbox)
            .addImages(
                ['assets/pictures/zonepub.avif','assets/pictures/zonepub.avif','assets/pictures/zonepub.avif']
            )
                .addOption('autoplay')
                    .addOption('interval',6)
        
        if(!idx%2){
            slide
                .addOption('interval',4)
                    .addOption('vertical')
        }
    }
)