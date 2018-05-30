//Config
var lag = 12;
var grow = 20;
var shrink = 20;

//Vars
var windowHeight = window.innerHeight;
var scrollAmount = 0;
var stretchAmount = 0;
var stretchDirection = 0;
var mouseDown = false;
var scrollMove = 0;
var transitionProgress = 0;
var currentPrev = null;
var currentNext = null;

//Els
var images = document.getElementsByClassName("image");
var stripe = document.getElementById('stripe');

//Handlers
window.addEventListener('resize', function () {
    windowHeight = window.innerHeight;
});
window.addEventListener('mousedown', function () {
    mouseDown = true;
});
window.addEventListener('mouseup', function () {
    mouseDown = false;
});
for (i = 0, lim = images.length; i < lim; i++) {
    images[i].addEventListener('click', function () {
        scrollToImage(this);
    })
}
document.getElementById('prev').addEventListener('click', goToPrev);
document.getElementById('next').addEventListener('click', goToNext);

function scrollToImage(image) {
    var bound = image.getBoundingClientRect();
    scrollMove = windowHeight / 2 - (bound.top + bound.height / 2);
}

function goToPrev() {
    if (currentPrev) {
        scrollToImage(currentPrev)
    }
}

function goToNext() {
    if (currentNext) {
        scrollToImage(currentNext)
    }
}

//Animate
function animate() {

    //UPDATE VARS
    scrollAmount += (window.pageYOffset - scrollAmount) / lag;
    stretchDirection += (window.pageYOffset - scrollAmount) * grow;
    stretchDirection /= shrink;

    if (stretchDirection < 0) {
        stretchDirection = Math.max(-0.3 * windowHeight, stretchDirection);
    } else {
        stretchDirection = Math.min(0.3 * windowHeight, stretchDirection);
    }
    stretchAmount = Math.abs(stretchDirection);

    //SCROLL POSITION
    if (Math.floor(Math.abs(scrollMove)) !== 0) {
        var thisMove = Math.floor(scrollMove / lag);
        window.scrollTo(0, window.pageYOffset - thisMove);
        scrollMove -= thisMove;
    }

    //TRANSITION
    if (mouseDown) {
        transitionProgress += 0.01;
        transitionProgress *= 1 + transitionProgress / grow;
    } else {
        transitionProgress *= 1 - transitionProgress / shrink;
    }
    transitionProgress = Math.min(transitionProgress, 1);

    //POSITION ELEMENTS

    //Images
    for (i = 0, lim = images.length; i < lim; i++) {
        var image = images[i];
        var bound = image.getBoundingClientRect();
        var progress = (windowHeight - bound.top) / (windowHeight + bound.height);

        progress = Math.max(0, Math.min(1, progress));

        if (bound.top > 0 && bound.bottom < windowHeight) {
            addClass(image, 'is-center');
            currentPrev = images[i - 1] || image;
            currentNext = images[i + 1] || image;
        } else {
            removeClass(image, 'is-center');
        }

        var top = image.children[0];
        var stretch = image.children[1];
        var stretchInner = stretch.children[0];
        var bottom = image.children[2];

        // Top
        top.style.height = progress * 100 + "%";
        top.style.transform = 'translateY(' + (stretchDirection + (0.5 - progress) * windowHeight) + 'px)';

        // Stretch
        stretch.style.height = stretchAmount + 2 + "px";
        stretch.style.transform = 'translateY(' + (stretchDirection + (0.5 - progress) * windowHeight) + 'px)';
        stretchInner.style.backgroundPosition = "0 " + progress * 100 + "%";

        // Bottom
        bottom.style.height = (1 - progress) * 100 + "%";
        bottom.style.transform = 'translateY(' + (stretchDirection + (0.5 - progress) * windowHeight) + 'px)';

    }

    // Stripe
    //stripe.style.transform = 'scaleY(' + (1+transitionProgress*3) + ')';
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)


//utility
function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
}