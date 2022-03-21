$(function() {
    $("#addMoreSolar").click(function(e) {
        e.preventDefault();
        $("#fieldListSolar").append("<div class='col-md-12 mt-0'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΗΛΙΑΚΗ ΓΕΝΝΗΤΡΙΑ</span>\
                                            <input type='text' class='form-control' list='datalistOptions1' name='solarGenerator' id='solarGenerator'>\
                                            <datalist id='datalistOptions1'>\
                                            <% if(storeroom != undefined) { %>\
                                                <% for (var i=0; i < storeroom.solarGenerators.length; i++) { %>\
                                                    <option value='<%= storeroom.solarGenerators[i] %>'>\
                                                <% } %>\
                                            <% } %>\
                                            </datalist>\
                                        </div>\
                                    </div>\
                                    <div class='col-md-12 mt-0'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΗΜ/ΝΙΑ ΤΟΠΟΘΕΤΗΣΗΣ</span>\
                                            <input type='date' class='form-control' name='solarGeneratorDate' id='solarGeneratorDate'>\
                                        </div>\
                                    </div>");
    });
});
$(function() {
    $("#addMoreAcc").click(function(e) {
        e.preventDefault();
        $("#fieldListAcc").append("<div class='col-md-12'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΣΥΣΣΩΡΕΥΤΗΣ</span>\
                                            <input type='text' class='form-control' list='datalistOptions' name='accumulator' id='accumulator'></input>\
                                            <datalist id='datalistOptions'>\
                                            <% if(storeroom != undefined) { %> \
                                                <% for (var i=0; i < storeroom.accumulators.length; i++) { %>\
                                                    <option value='<%= storeroom.accumulators[i] %>'>\
                                                <% } %>\
                                            <% } %>\
                                            </datalist>\
                                        </div>\
                                    </div>\
                                    <div class='col-md-12 mt-0'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΗΜ/ΝΙΑ ΤΟΠΟΘΕΤΗΣΗΣ</span>\
                                            <input type='date' class='form-control' name='accumulatorDate' id='accumulatorDate'>\
                                        </div>\
                                    </div>");
    });
});

$(function() {
    $("#addMoreLamp").click(function(e) {
        e.preventDefault();
        $("#fieldListLamp").append("<div class='col-md-12'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΛΥΧΝΙΑ</span>\
                                            <input type='text' class='form-control' list='datalistOptions2' name='lamp' id='lamp'></input>\
                                            <datalist id='datalistOptions2'>\
                                            <% if(storeroom != undefined) { %> \
                                                <% for (var i=0; i < storeroom.lamps.length; i++) { %>\
                                                    <option value='<%= storeroom.lamps[i] %>'>\
                                                <% } %>\
                                            <% } %>\
                                            </datalist>\
                                        </div>\
                                    </div>\
                                    <div class='col-md-12 mt-0'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΗΜ/ΝΙΑ ΤΟΠΟΘΕΤΗΣΗΣ</span>\
                                            <input type='date' class='form-control' name='lampDate' id='lampDate'>\
                                        </div>\
                                    </div>");
    });
});
