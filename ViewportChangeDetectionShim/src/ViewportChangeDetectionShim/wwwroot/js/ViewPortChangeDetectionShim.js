var lastHeight, lastWidth, lastVerticalOrientation, lastScrollPosition = 0;

var CheckViewportIntervalHandle = null;

function CheckViewport(interval,
    HeightChangeCallBackFunction,
    WidthChangeCallBackFunction,
    HeightOrWidthChangeCallBackFunction,
    OrientationChangeCallBackFunction,
    ScrollPositionCallBackFunction,
    AnythingChangedCallBackFunction
    ) {
    CheckViewportIntervalHandle = setInterval(CheckViewportTasks,
        interval,
        HeightChangeCallBackFunction,
        WidthChangeCallBackFunction,
        HeightOrWidthChangeCallBackFunction,
        OrientationChangeCallBackFunction,
        ScrollPositionCallBackFunction,
        AnythingChangedCallBackFunction
        );
}

function CheckViewportTasks(
    HeightChangeCallBackFunction,
    WidthChangeCallBackFunction,
    HeightOrWidthChangeCallBackFunction,
    OrientationChangeCallBackFunction,
    ScrollPositionCallBackFunction,
    AnythingChangedCallBackFunction) {
    console.log("---Viewport checked");

    var height = $(window).height();
    var width = $(window).width();
    var vorientation = true;
    var position = $(window).scrollTop();
    if (height < width) vorientation = false;

    var somethingChanged = false;
    var heightWidthChanged = false;

    if (height !== lastHeight) {
        //console.log("Viewport change");
        //console.log("old height: " + lastHeight + ", width: " + lastWidth);
        //console.log("new height: " + height + ", width: " + width);
        somethingChanged = true;
        heightWidthChanged = true;
        if (lastHeight !== 0 && HeightChangeCallBackFunction !== null)
            HeightChangeCallBackFunction();
    }

    if (width !== lastWidth) {
        //console.log("Viewport change");
        //console.log("old height: " + lastHeight + ", width: " + lastWidth);
        //console.log("new height: " + height + ", width: " + width);
        somethingChanged = true;
        heightWidthChanged = true;
        if (lastWidth !== 0 && WidthChangeCallBackFunction !== null)
            WidthChangeCallBackFunction();
    }

    if (heightWidthChanged && HeightOrWidthChangeCallBackFunction !== null)
        HeightOrWidthChangeCallBackFunction();

    if (vorientation !== lastVerticalOrientation) {
        //console.log("orientation change");
        //console.log("old orientation: " + verticalOrientation);
        //console.log("new orientation: " + vorientation);
        somethingChanged = true;
        if (lastVerticalOrientation !== 0 && OrientationChangeCallBackFunction !== null)
            OrientationChangeCallBackFunction();
    }

    if (position !== lastScrollPosition) {
        //console.log("position change");
        //console.log("old position: " + scrollPosition);
        //console.log("new position: " + position);
        somethingChanged = true;
        if (lastScrollPosition !== 0 && ScrollPositionCallBackFunction !== null)
            ScrollPositionCallBackFunction();
    }

    lastHeight = height;
    lastWidth = width;
    lastVerticalOrientation = vorientation;
    lastScrollPosition = position;

    if (somethingChanged && AnythingChangedCallBackFunction !== null)
        AnythingChangedCallBackFunction();
}