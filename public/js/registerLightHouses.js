$(function() {
    $("#addMoreSolar").click(function(e) {
        e.preventDefault();
        $("#fieldListSolar").append("<br>");
        $("#fieldListSolar").append("<div class='col-md-6'>");
        $("#fieldListSolar").append("<label for='solarGenerator' class='form-label'>ΗΛΙΑΚΗ ΓΕΝΝΗΤΡΙΑ</label>");
        $("#fieldListSolar").append("<input type='text' class='form-control' list='datalistOptions1' name='solarGenerator' id='solarGenerator'>");
        $("#fieldListSolar").append("<datalist id='datalistOptions1'> <% if(storeroom != undefined) { %> <% for (var i=0; i < storeroom.solarGenerators.length; i++) { %> <option value='<%= storeroom.solarGenerators[i] %>'> <% } %> <% } %>");
        $("#fieldListSolar").append("</datalist>");
        $("#fieldListSolar").append("</div>");
        $("#fieldListSolar").append("<div class='col-md-6'>");
        $("#fieldListSolar").append("<label for='solarGeneratorDate' class='form-label'>ΗΜ/ΝΙΑ ΤΟΠΟΘΕΤΗΣΗΣ</label>");
        $("#fieldListSolar").append("<input type='date' class='form-control' name='solarGeneratorDate' id='solarGeneratorDate'>");
        $("#fieldListSolar").append("</div>");
    });
});
$(function() {
    $("#addMoreAcc").click(function(e) {
        e.preventDefault();
        $("#fieldListAcc").append("<br>");
        $("#fieldListAcc").append("<div class='col-md-6' id='fieldListAcc'>");
        $("#fieldListAcc").append("<label for='accumulator' class='form-label'>ΣΥΣΣΩΡΕΥΤΗΣ</label>");
        $("#fieldListAcc").append("<input type='text' class='form-control' list='datalistOptions' name='accumulator' id='accumulator'>");
        $("#fieldListAcc").append("<datalist id='datalistOptions'> <% if(storeroom != undefined) { %> <% for (var i=0; i < storeroom.accumulators.length; i++) { %> <option value='<%= storeroom.accumulators[i] %>'> <% } %> <% } %>");
        $("#fieldListAcc").append("</datalist>");
        $("#fieldListAcc").append("</div>");
        $("#fieldListAcc").append("<div class='col-md-6'>");
        $("#fieldListAcc").append("<label for='accumulatorDate' class='form-label'>ΗΜ/ΝΙΑ ΤΟΠΟΘΕΤΗΣΗΣ</label>");
        $("#fieldListAcc").append("<input type='date' class='form-control' name='accumulatorDate' id='accumulatorDate'>");
        $("#fieldListAcc").append("</div>");
    });
});

$(function() {
    $("#addMoreLamp").click(function(e) {
        e.preventDefault();
        $("#fieldListLamp").append("<br>");
        $("#fieldListLamp").append("<div class='col-md-6'>");
        $("#fieldListLamp").append("<label for='lamp' class='form-label'>ΛΥΧΝΙΑ</label>");
        $("#fieldListLamp").append("<input type='text' class='form-control' list='datalistOptions2' name='lamp' id='lamp'>");
        $("#fieldListLamp").append("<datalist id='datalistOptions2'> <% if(storeroom != undefined) { %> <% for (var i=0; i < storeroom.lamps.length; i++) { %> <option value='<%= storeroom.lamps[i] %>'> <% } %> <% } %>");
        $("#fieldListLamp").append("</datalist>");
        $("#fieldListLamp").append("</div>");
        $("#fieldListLamp").append("<div class='col-md-6'>");
        $("#fieldListLamp").append("<label for='lampDate' class='form-label'>ΗΜ/ΝΙΑ ΤΟΠΟΘΕΤΗΣΗΣ</label>");
        $("#fieldListLamp").append("<input type='date' class='form-control' name='lampDate' id='lampDate'>");
        $("#fieldListLamp").append("</div>");
    });
});