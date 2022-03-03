$(function() {
    $("#addMoreSolar").click(function(e) {
        e.preventDefault();
        $("#fieldListSolar").append("<br>");
        $("#fieldListSolar").append("<div class='col-md-6'");
        $("#fieldListSolar").append("<label for='solarGenerator' class='form-label'>ΗΛΙΑΚΗ ΓΕΝΝΗΤΡΙΑ</label>");
        $("#fieldListSolar").append("<input type='text' class='form-control' name='solarGenerator' id='solarGenerator'>");
        $("#fieldListSolar").append("</div>");
    });
});

$(function() {
    $("#addMoreAcc").click(function(e) {
        e.preventDefault();
        $("#fieldListAcc").append("<br>");
        $("#fieldListAcc").append("<div class='col-md-6'");
        $("#fieldListAcc").append("<label for='accumulator' class='form-label'>ΣΥΣΣΩΡΕΥΤΗΣ</label>");
        $("#fieldListAcc").append("<input type='text' class='form-control' name='accumulator' id='accumulator'>");
        $("#fieldListAcc").append("</div>");
    });
});

$(function() {
    $("#addMoreLamp").click(function(e) {
        e.preventDefault();
        $("#fieldListLamp").append("<br>");
        $("#fieldListLamp").append("<div class='col-md-6'>");
        $("#fieldListLamp").append("<label for='lamp' class='form-label'>ΛΥΧΝΙΑ</label>");
        $("#fieldListLamp").append("<input type='text' class='form-control' name='lamp' id='lamp'>");
        $("#fieldListLamp").append("</div>");
    });
});

$(function() {
    $("#addMoreHead").click(function(e) {
        e.preventDefault();
        $("#fieldListHead").append("<br>");
        $("#fieldListHead").append("<div class='col-md-6'>");
        $("#fieldListHead").append("<label for='head' class='form-label'>ΛΥΧΝΙΑ</label>");
        $("#fieldListHead").append("<input type='text' class='form-control' name='head' id='head'>");
        $("#fieldListHead").append("</div>");
    });
});