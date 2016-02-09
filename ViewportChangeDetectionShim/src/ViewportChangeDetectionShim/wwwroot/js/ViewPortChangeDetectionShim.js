var CheckViewportLastHeight, CheckViewportLastWidth,
    CheckViewportLastVerticalOrientation, CheckViewportLastScrollPosition = 0;

var CheckViewportIntervalHandle = null;

$(function () {
    CheckViewportLastHeight = $(window).height();
    CheckViewportLastWidth = $(window).width();
    CheckViewportLastVerticalOrientation = (CheckViewportLastHeight > CheckViewportLastWidth);
    CheckViewportLastScrollPosition = $(window).scrollTop();

    CheckViewportIntervalHandle = setInterval(CheckViewportTasks, 250);
});

function CheckViewportTasks() {
    //console.log("---Viewport checked");

    var height = $(window).height();
    var width = $(window).width();
    var vorientation = true;
    var position = $(window).scrollTop();
    if (height < width) vorientation = false;

    var somethingChanged = false;
    var heightWidthChanged = false;

    if (height !== CheckViewportLastHeight) {
        //console.log("Viewport change");
        //console.log("old height: " + CheckViewportLastHeight + ", width: " + CheckViewportLastWidth);
        //console.log("new height: " + height + ", width: " + width);
        somethingChanged = true;
        heightWidthChanged = true;

        $(document).trigger("HeightChanged");
    }

    if (width !== CheckViewportLastWidth) {
        //console.log("Viewport change");
        //console.log("old height: " + CheckViewportLastHeight + ", width: " + CheckViewportLastWidth);
        //console.log("new height: " + height + ", width: " + width);
        somethingChanged = true;
        heightWidthChanged = true;
        $(document).trigger("WidthChanged");
    }

    if (heightWidthChanged)
        $(document).trigger("HeightOrWidthChanged");

    if (vorientation !== CheckViewportLastVerticalOrientation) {
        //console.log("orientation change");
        //console.log("old orientation: " + verticalOrientation);
        //console.log("new orientation: " + vorientation);
        somethingChanged = true;
        $(document).trigger("OrientationChanged");
    }

    if (position !== CheckViewportLastScrollPosition) {
        //console.log("position change");
        //console.log("old position: " + scrollPosition);
        //console.log("new position: " + position);
        somethingChanged = true;
        $(document).trigger("ScrollPositionChanged");
    }

    CheckViewportLastHeight = height;
    CheckViewportLastWidth = width;
    CheckViewportLastVerticalOrientation = vorientation;
    CheckViewportLastScrollPosition = position;

    if (somethingChanged)
        $(document).trigger("ViewportChanged");
}