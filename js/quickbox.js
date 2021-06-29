// Inject quickbox HTML at the end of body tag
const divElement  = document.createElement('div');
divElement.classList.add('image-viewer-model')

divElement.innerHTML = `<div class="overlay"></div>
<div class="image-viewer-image">
        <img src alt="">
</div>
<div class="controls playpause">
    <img src="images/play.png">
</div>

<div class="info">Image 1 of 6</div>

<div class="controls close ">
    <img src="images/close.png">
</div>

<div class="controls forward">
   <img src="images/next.png">
</div>

<div class="controls backward">
    <img src="images/prev.png">
</div>`;

const body = document.querySelector('body');
body.appendChild(divElement)

// class defination of quicbox
class Quickbox{
    imageTransitionTiming = 500;
    slideShowTime = 1500;
    model = document.querySelector('.image-viewer-model');
    modelImage = document.querySelector('.image-viewer-model .image-viewer-image img');
    modelOverlay = document.querySelector('.image-viewer-model .overlay');
    modelCloseIcon = document.querySelector('.image-viewer-model .close');
    modelNextIcon = document.querySelector('.image-viewer-model .forward');
    modelPrevIcon = document.querySelector('.image-viewer-model .backward');
    modelPlayPauseIcon = document.querySelector('.image-viewer-model .playpause');
    modelInfo = document.querySelector('.image-viewer-model .info');
    images;
    currentIndex;
    isSlideShowRunning = false;
    timevar;
    timevar2;

    constructor(selector){
        this.images = document.querySelectorAll(selector);

        //add click event on each image
        this.images.forEach( (image,index) => {
                image.onclick = ()=>{
                    this.showImage(index)
                }
        });

        //add close event for close icon and overlay
        this.modelCloseIcon.onclick = this.closeModel;
        this.modelOverlay.onclick = this.closeModel;

        //next slide
        this.modelNextIcon.onclick = ()=>{
            //stop slide show, make play icon and update state to false
            clearTimeout(this.timevar)
            this.modelPlayPauseIcon.firstElementChild.src = 'images/play.png'
            this.isSlideShowRunning = false;

            this.currentIndex++;
            this.showImage(this.currentIndex);
        }
        //prev slide
        this.modelPrevIcon.onclick = ()=>{
            //stop slide show, make lay icon and update state to false
            clearTimeout(this.timevar)
            this.modelPlayPauseIcon.firstElementChild.src = 'images/play.png'
            this.isSlideShowRunning = false;

            this.currentIndex--;
            this.showImage(this.currentIndex);
        }
        //slide show event
        this.modelPlayPauseIcon.onclick = ()=>{
            if(this.isSlideShowRunning){
                this.isSlideShowRunning = false;
                clearTimeout(this.timevar);
                this.modelPlayPauseIcon.firstElementChild.src = 'images/play.png'
            }else{
                this.isSlideShowRunning = true;
                this.slideShow();
                this.modelPlayPauseIcon.firstElementChild.src = 'images/pause.png'
            }
        }
    }

    //to show the image by passing image index
    showImage = (imageIndex)=>{
        clearTimeout(this.timevar2)

        if(imageIndex > this.images.length - 1){
            imageIndex = 0;
        }
        if(imageIndex < 0){
            imageIndex = this.images.length - 1;
        }
        //model animation
        this.model.style.display = 'block';
        setTimeout( ()=>{
            this.model.style.opacity = '1';
        })

        //updating image info
        this.modelInfo.textContent = `Image ${imageIndex + 1} of ${this.images.length}`;


        //image animation
        this.modelImage.style.opacity = '0';
        this.timevar2 = setTimeout(()=>{
            this.modelImage.src = this.images[imageIndex].src;
            this.modelImage.style.opacity = '1';
        }, this.imageTransitionTiming )

        this.currentIndex = imageIndex;
    }

    //to close the model
    closeModel = ()=>{
         //stop slide show, make play icon and update state to false
         clearTimeout(this.timevar)
         this.modelPlayPauseIcon.firstElementChild.src = 'images/play.png'
         this.isSlideShowRunning = false;

        this.model.style.opacity = '0';
        setTimeout( ()=>{
            this.model.style.display = 'none';
        },500)
    }

    //slide show function
    slideShow = ()=>{
        this.currentIndex++;
        this.showImage(this.currentIndex);

        this.timevar = setTimeout( ()=>{
            this.slideShow()
        }, this.slideShowTime )
    }


    //for customization.
    option = (obj)=>{

        if( typeof(obj) != 'object' )
            throw "Bad Parameter passed. Object Expected";

        //set overlaty opacuty
        if(obj.backgroundOpacity){
            this.modelOverlay.style.backgroundColor = ` rgba(0,0,0, ${obj.backgroundOpacity} )`
        }
       

        // //set image trans timing
        if(obj.imageTransTimimg){
            this.modelImage.style.transitionDuration = `${obj.imageTransitionTiming / 2}s`
            this.imageTransitionTiming = (obj.imageTransitionTiming / 2)*1000;
        }
        

        //disable / enable navigation
        this.modelNextIcon.style.display = (obj.disableNavigation) ? 'none' : 'block';
        this.modelPrevIcon.style.display = (obj.disableNavigation) ? 'none' : 'block';
        
        //disable / enable slide show
        this.modelPlayPauseIcon.style.display = (obj.disableSlideShow) ? 'none' : 'block';
        
        // //disbale Image index info
        this.modelInfo.style.display = (obj.disableInfo) ? 'none' : 'block';
    
        // //adjust slide duraion of slide show
        this.slideShowTime = (obj.slideShowTiming) ? obj.slideShowTiming * 1000 :  1500;
    }

}

const quickbox = new Quickbox('[quickbox]');






