var myDiv = document.querySelector('.canvas');
var container = document.querySelector('.myContainer');
var resizers = document.querySelector('.draggers');

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    console.log(e.target);
    if (e.target === resizers) {
        active = true;
    }
}

function dragEnd(e) {
    //    initialX = e.clientX;
    //  initialY = e.clientY;
    active = false;
    var rect = document.querySelector('.center').getBoundingClientRect();
    console.log(rect);

}

function drag(e) {
    if (active) {

        e.preventDefault();

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;
        //console.log(currentX, currentY);
        //console.log(e.target);

        setTranslate(currentX, currentY, myDiv);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function makeResizableDiv() {
    const element = document.querySelector('.canvas');
    const cursor = document.querySelectorAll('.draggers .cursor');
    console.log(cursor);

    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    for (let i = 0; i < cursor.length; i++) {
        const currentResizer = cursor[i];
        currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;

            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
            console.log(e);
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
            }
            else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.pageY - original_mouse_y)
                const width = original_width - (e.pageX - original_mouse_x)
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                }
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = (original_x - xOffset) + (e.pageX - original_mouse_x) + 'px'
                }
            }
            else if (currentResizer.classList.contains('top-right')) {
                const width = original_width + (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = (original_y - yOffset) + (e.pageY - original_mouse_y) + 'px'
                }
            }
            else {
                const width = original_width - (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = (original_x - xOffset) + (e.pageX - original_mouse_x) + 'px'
                }
                if (height > minimum_size) {
                    element.style.height = height + 'px'
                    element.style.top = (original_y - yOffset) + (e.pageY - original_mouse_y) + 'px'
                }
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }
}

makeResizableDiv();

container.addEventListener("mousedown", rotStart, false);
container.addEventListener("mouseup", rotEnd, false);
container.addEventListener("mousemove", rotDo, false);

var rotActive = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
var rotater = document.querySelector('.turners');

function rotStart(evt) {
    //if () {
    //    if (mouseDown == true) {
    //  }
    //}
    console.log(evt.target);
    if(evt.target == rotater)
    rotActive = true;
}

function rotDo(evt) {

    if (rotActive === true) {
        evt.preventDefault();
        evt.stopPropagation();
        var rect = document.querySelector('.middle').getBoundingClientRect();
        console.log(rect);
        var center_x = rect.left;
        var center_y = rect.top;
        var mouse_x = evt.pageX;
        var mouse_y = evt.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 90;
        myDiv.style.webkitTransform = "rotate(" + degree + "deg)";
        myDiv.style.OTransform = "rotate(" + degree + "deg)";
        myDiv.style.transform = "rotate(" + degree + "deg)";
        //myDiv.style.msTransfer = "rotate(" + degree + "deg")";
    }

}

function rotEnd(evt){
    rotActive = false;
}
