function Dom() {
    // Abstract class

    this.canvas = $('canvas');
    this.circleRadius = function () {
        return parseFloat($('#circleRadius')[0].value);
    };

    this.ellipseRadiusX = function () {
        return parseFloat($('#ellipseRadiusX')[0].value);
    };

    this.ellipseRadiusY = function () {
        return parseFloat($('#ellipseRadiusY')[0].value);
    };

    this.hyperbolaRadiusX = function () {
        return parseFloat($('#hyperbolaRadiusX')[0].value);
    };

    this.hyperbolaRadiusY = function () {
        return parseFloat($('#hyperbolaRadiusY')[0].value);
    };
    this.parabolaRadius = function () {
        return parseFloat($('#parabolaRadius')[0].value);
    };
    this.axisX1 = $('#axisX1');

    this.axisX1Value = function () {
        return parseFloat($('#axisX1')[0].value);
    };

    this.axisY1 = $('#axisY1');

    this.axisY1Value = function () {
        return parseFloat($('#axisY1')[0].value);
    };

    this.axisZ1 = $('#axisZ1');

    this.axisZ1Value = function () {
        return parseFloat($('#axisZ1')[0].value);
    };

    this.axisX2 = $('#axisX2');

    this.axisX2Value = function () {
        return parseFloat($('#axisX2')[0].value);
    };

    this.axisY2 = $('#axisY2');

    this.axisY2Value = function () {
        return parseFloat($('#axisY2')[0].value);
    };

    this.axisZ2 = $('#axisZ2');

    this.axisZ2Value = function () {
        return parseFloat($('#axisZ2')[0].value);
    };

    this.timeoutValue = function () {
        return parseFloat($('#throttling')[0].value);
    };

    this.meshOn = $('#meshOn');
    this.meshOff = $('#meshOff');
    this.axisOn = $('#axisOn');
    this.axisOff = $('#axisOff');
    this.scalePlus = $('#scalePlus');
    this.scaleMinus = $('#scaleMinus');
    this.clearCanvas = $('#clearCanvas');
    this.cube = $('#cube');
    this.document = $(document);
    this.cdaButton = $('#cda');
    this.brezButton = $('#brez');
    this.wooButton = $('#woo');
    this.circleButton = $('#circle');
    this.ellipseButton = $('#ellipse');
    this.hyperbolaButton = $('#hyperbola');
    this.parabolaButton = $('#parabola');
    this.hermitButton = $('#hermit');
    this.bezierButton = $('#bezier');
    this.BSplineButton = $('#b_spline');
    this.perspectiveButton = $('#perspective');
    this.createPoligonButton = $('#createPoligon');
    this.createLineButton = $('#createLine');
    this.bulgeCheckingButton = $('#bulgeChecking');
    this.GreckemShellButton = $('#GrekhemShell');
    this.JarvisShellButton = $('#JarvisShell');
    this.pointOfIntersectionButton = $('#point_of_intersection');
    this.membershipPointButton = $('#membership_points');
    this.sketch1Button = $('#sketch1');
    this.sketch2Button = $('#sketch2');
    this.sketch3Button = $('#sketch3');
    this.sketch4Button = $('#sketch4');
    this.hideLines1 = $('#hideLines1');

    this.poligonPoints = function () {
        return parseInt($('input#poligonPoints')[0].value);
    };

    this.allNavSections = $('.nav .section');
    this.allSections = $('div.section');

    this.defSection = function (section) {
        return $(".sections .section[data-section='" + section + "']");
    }
}