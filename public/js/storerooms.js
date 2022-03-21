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
                                    </div>");
    });
});

$(function() {
    $("#addMoreHead").click(function(e) {
        e.preventDefault();
        $("#fieldListHead").append("<div class='col-md-12'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΚΕΦΑΛΗ</span>\
                                            <input type='text' class='form-control' list='heads' name='head' id='head'></input>\
                                            <datalist id='heads'>\
                                            <% if(storeroom != undefined) { %> \
                                                <% for (var i=0; i < storeroom.heads.length; i++) { %>\
                                                    <option value='<%= storeroom.heads[i] %>'>\
                                                <% } %>\
                                            <% } %>\
                                            </datalist>\
                                        </div>\
                                    </div> ");
    });
});

$(function() {
    $("#addMoreColour").click(function(e) {
        e.preventDefault();
        $("#fieldListColour").append("<div class='col-md-12'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΧΡΩΜΑΤΙΣΜΟΣ</span>\
                                            <input type='text' class='form-control' list='colours' name='colour' id='colour'></input>\
                                            <datalist id='colours'>\
                                            <% if(storeroom != undefined) { %> \
                                                <% for (var i=0; i < storeroom.colours.length; i++) { %>\
                                                    <option value='<%= storeroom.colours[i] %>'>\
                                                <% } %>\
                                            <% } %>\
                                            </datalist>\
                                        </div>\
                                    </div> ");
    });
});

$(function() {
    $("#addMoreLighter").click(function(e) {
        e.preventDefault();
        $("#fieldListLighter").append("<div class='col-md-12'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΕΚΛΑΜΠΤΗΡΑΣ</span>\
                                            <input type='text' class='form-control' list='lighters' name='lighter' id='lighter'></input>\
                                            <datalist id='lighters'>\
                                            <% if(storeroom != undefined) { %> \
                                                <% for (var i=0; i < storeroom.lighters.length; i++) { %>\
                                                    <option value='<%= storeroom.lighters[i] %>'>\
                                                <% } %>\
                                            <% } %>\
                                            </datalist>\
                                        </div>\
                                    </div> ");
    });
});

$(function() {
    $("#addMoreGeneratorSocket").click(function(e) {
        e.preventDefault();
        $("#fieldListGeneratorSocket").append("<div class='col-md-12'>\
                                                <div class='input-group input-group-sm mb-3'>\
                                                    <span class='input-group-text' id='inputGroup-sizing-sm'>ΡΥΘΜΙΣΤΗΣ ΦΟΡΤΙΣΕΩΣ/ ΦΟΡΤΙΣΤΗΣ</span>\
                                                    <input type='text' class='form-control' list='generatorSockets' name='generatorSocket' id='generatorSocket'></input>\
                                                    <datalist id='generatorSockets'>\
                                                    <% if(storeroom != undefined) { %> \
                                                        <% for (var i=0; i < storeroom.generatorSockets.length; i++) { %>\
                                                            <option value='<%= storeroom.generatorSockets[i] %>'>\
                                                        <% } %>\
                                                    <% } %>\
                                                    </datalist>\
                                                </div>\
                                            </div> ");
    });
});

$(function() {
    $("#addMoreΤorchSocket").click(function(e) {
        e.preventDefault();
        $("#fieldListΤorchSocket").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΥΠΟΔΟΧΗ ΠΥΡΣΟΥ</span>\
                                                <input type='text' class='form-control' list='torchSockets' name='torchSocket' id='torchSocket'></input>\
                                                <datalist id='torchSockets'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.torchSockets.length; i++) { %>\
                                                        <option value='<%= storeroom.torchSockets[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMorePhotocell").click(function(e) {
        e.preventDefault();
        $("#fieldListPhotocell").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΦΩΤΟΚΥΤΤΑΡΟ</span>\
                                                <input type='text' class='form-control' list='photocells' name='photocell' id='photocell'></input>\
                                                <datalist id='photocells'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.photocells.length; i++) { %>\
                                                        <option value='<%= storeroom.photocells[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreAccessory").click(function(e) {
        e.preventDefault();
        $("#fieldListAccessory").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΠΡΟΣΘΕΤΟ ΕΞΑΡΤΗΜΑ</span>\
                                                <input type='text' class='form-control' list='accessorys' name='accessory' id='accessory'></input>\
                                                <datalist id='accessorys'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.accessorys.length; i++) { %>\
                                                        <option value='<%= storeroom.accessorys[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreAlternator").click(function(e) {
        e.preventDefault();
        $("#fieldListAlternator").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΕΝΑΛΛΑΚΤΗΣ</span>\
                                                <input type='text' class='form-control' list='alternators' name='alternator' id='alternator'></input>\
                                                <datalist id='alternators'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.alternators.length; i++) { %>\
                                                        <option value='<%= storeroom.alternators[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreLightingMachineMan").click(function(e) {
        e.preventDefault();
        $("#fieldListLightingMachineMan").append("<div class='col-md-12'>\
                                                    <div class='input-group input-group-sm mb-3'>\
                                                        <span class='input-group-text' id='inputGroup-sizing-sm'>ΦΩΤΙΣΤΙΚΟ ΜΗΧΑΝΗΜΑ (ΚΑΤΑΣΚΕΥΑΣΤΗΣ)</span>\
                                                        <input type='text' class='form-control' list='lightingMachineMans' name='lightingMachineMan' id='lightingMachineMan'></input>\
                                                        <datalist id='lightingMachineMans'>\
                                                        <% if(storeroom != undefined) { %> \
                                                            <% for (var i=0; i < storeroom.lightingMachineMan.length; i++) { %>\
                                                                <option value='<%= storeroom.lightingMachineMan[i] %>'>\
                                                            <% } %>\
                                                        <% } %>\
                                                        </datalist>\
                                                    </div>\
                                                </div> ");
    });
});

$(function() {
    $("#addMoreLightingMachineType").click(function(e) {
        e.preventDefault();
        $("#fieldListLightingMachineType").append("<div class='col-md-12'>\
                                                    <div class='input-group input-group-sm mb-3'>\
                                                        <span class='input-group-text' id='inputGroup-sizing-sm'>ΦΩΤΙΣΤΙΚΟ ΜΗΧΑΝΗΜΑ (ΤΥΠΟΣ)</span>\
                                                        <input type='text' class='form-control' list='lightingMachineTypes' name='lightingMachineType' id='lightingMachineType'></input>\
                                                        <datalist id='lightingMachineTypes'>\
                                                        <% if(storeroom != undefined) { %> \
                                                            <% for (var i=0; i < storeroom.lightingMachineType.length; i++) { %>\
                                                                <option value='<%= storeroom.lightingMachineType[i] %>'>\
                                                            <% } %>\
                                                        <% } %>\
                                                        </datalist>\
                                                    </div>\
                                                </div> ");
    });
});

$(function() {
    $("#addMoreReflectorMan").click(function(e) {
        e.preventDefault();
        $("#fieldListReflectorMan").append("<div class='col-md-12'>\
                                                <div class='input-group input-group-sm mb-3'>\
                                                    <span class='input-group-text' id='inputGroup-sizing-sm'>ΑΝΑΚΛΑΣΤΗΡΑΣ (ΚΑΤΑΣΚΕΥΑΣΤΗΣ)</span>\
                                                    <input type='text' class='form-control' list='reflectorMans' name='reflectorMan' id='reflectorMan'></input>\
                                                    <datalist id='reflectorMans'>\
                                                    <% if(storeroom != undefined) { %> \
                                                        <% for (var i=0; i < storeroom.reflectorMan.length; i++) { %>\
                                                            <option value='<%= storeroom.reflectorMan[i] %>'>\
                                                        <% } %>\
                                                    <% } %>\
                                                    </datalist>\
                                                </div>\
                                            </div> ");
    });
});

$(function() {
    $("#addMoreReflectorType").click(function(e) {
        e.preventDefault();
        $("#fieldListReflectorType").append("<div class='col-md-12'>\
                                                <div class='input-group input-group-sm mb-3'>\
                                                    <span class='input-group-text' id='inputGroup-sizing-sm'>ΑΝΑΚΛΑΣΤΗΡΑΣ (ΤΥΠΟΣ)</span>\
                                                    <input type='text' class='form-control' list='reflectorTypes' name='reflectorType' id='reflectorType'></input>\
                                                    <datalist id='reflectorTypes'>\
                                                    <% if(storeroom != undefined) { %> \
                                                        <% for (var i=0; i < storeroom.reflectorType.length; i++) { %>\
                                                            <option value='<%= storeroom.reflectorType[i] %>'>\
                                                        <% } %>\
                                                    <% } %>\
                                                    </datalist>\
                                                </div>\
                                            </div> ");
    });
});

$(function() {
    $("#addMoreSignsMan").click(function(e) {
        e.preventDefault();
        $("#fieldListSignsMan").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΕΠΙΣΗΜΑΤΑ (ΚΑΤΑΣΚΕΥΑΣΤΗΣ)</span>\
                                                <input type='text' class='form-control' list='signsMans' name='signsMan' id='signsMan'></input>\
                                                <datalist id='signsMans'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.signsMan.length; i++) { %>\
                                                        <option value='<%= storeroom.signsMan[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreSignsType").click(function(e) {
        e.preventDefault();
        $("#fieldListSignsType").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΕΠΙΣΗΜΑΤΑ (ΤΥΠΟΣ)</span>\
                                                <input type='text' class='form-control' list='signsTypes' name='signsType' id='signsType'></input>\
                                                <datalist id='signsTypes'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.signsType.length; i++) { %>\
                                                        <option value='<%= storeroom.signsType[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});


$(function() {
    $("#addMoreType").click(function(e) {
        e.preventDefault();
        $("#fieldListType").append("<div class='col-md-12'>\
                                        <div class='input-group input-group-sm mb-3'>\
                                            <span class='input-group-text' id='inputGroup-sizing-sm'>ΤΥΠΟΣ ΦΩΤΟΣΗΜΑΝΤΗΡΑ</span>\
                                            <input type='text' class='form-control' list='types' name='type' id='type'></input>\
                                            <datalist id='types'>\
                                            <% if(storeroom != undefined) { %> \
                                                <% for (var i=0; i < storeroom.type.length; i++) { %>\
                                                    <option value='<%= storeroom.type[i] %>'>\
                                                <% } %>\
                                            <% } %>\
                                            </datalist>\
                                        </div>\
                                    </div> ");
    });
});

$(function() {
    $("#addMoreStateriType").click(function(e) {
        e.preventDefault();
        $("#fieldListStateriType").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΣΤΑΤΕΡΙ (Άλυσος)</span>\
                                                <input type='text' class='form-control' list='stateriTypes' name='stateriType' id='stateriType'></input>\
                                                <datalist id='stateriTypes'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.stateriType.length; i++) { %>\
                                                        <option value='<%= storeroom.stateriType[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreAlysosType").click(function(e) {
        e.preventDefault();
        $("#fieldListAlysosType").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΑΛΥΣΟΣ</span>\
                                                <input type='text' class='form-control' list='alysosTypes' name='alysosType' id='alysosType'></input>\
                                                <datalist id='alysosTypes'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.alysosType.length; i++) { %>\
                                                        <option value='<%= storeroom.alysosType[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreAgkyrioChainType").click(function(e) {
        e.preventDefault();
        $("#fieldListAgkyrioChainType").append("<div class='col-md-12'>\
                                                    <div class='input-group input-group-sm mb-3'>\
                                                        <span class='input-group-text' id='inputGroup-sizing-sm'>ΑΓΚΥΡΙΟ (Άλυσος)</span>\
                                                        <input type='text' class='form-control' list='agkyrioChainTypes' name='agkyrioChainType' id='agkyrioChainType'></input>\
                                                        <datalist id='agkyrioChainTypes'>\
                                                        <% if(storeroom != undefined) { %> \
                                                            <% for (var i=0; i < storeroom.agkyrioChainType.length; i++) { %>\
                                                                <option value='<%= storeroom.agkyrioChainType[i] %>'>\
                                                            <% } %>\
                                                        <% } %>\
                                                        </datalist>\
                                                    </div>\
                                                </div> ");
    });
});


$(function() {
    $("#addMoreStreptyrasType").click(function(e) {
        e.preventDefault();
        $("#fieldListStreptyrasType").append("<div class='col-md-12'>\
                                                <div class='input-group input-group-sm mb-3'>\
                                                    <span class='input-group-text' id='inputGroup-sizing-sm'>ΑΓΚΥΡΙΟ (Άλυσος)</span>\
                                                    <input type='text' class='form-control' list='streptyrasTypes' name='streptyrasType' id='streptyrasType'></input>\
                                                    <datalist id='streptyrasTypes'>\
                                                    <% if(storeroom != undefined) { %> \
                                                        <% for (var i=0; i < storeroom.streptyrasType.length; i++) { %>\
                                                            <option value='<%= storeroom.streptyrasType[i] %>'>\
                                                        <% } %>\
                                                    <% } %>\
                                                    </datalist>\
                                                </div>\
                                            </div> ");
    });
});

$(function() {
    $("#addMoreNavyKeyType").click(function(e) {
        e.preventDefault();
        $("#fieldListNavyKeyType").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΝΑΥΤΙΚΟ ΚΛΕΙΔΙ</span>\
                                                <input type='text' class='form-control' list='navyKeyTypes' name='navyKeyType' id='navyKeyType'></input>\
                                                <datalist id='navyKeyTypes'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.navyKeyType.length; i++) { %>\
                                                        <option value='<%= storeroom.navyKeyType[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreAgkyrioType").click(function(e) {
        e.preventDefault();
        $("#fieldListAgkyrioType").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΑΓΚΥΡΙΟ</span>\
                                                <input type='text' class='form-control' list='agkyrioTypes' name='agkyrioType' id='agkyrioType'></input>\
                                                <datalist id='agkyrioTypes'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.agkyrioType.length; i++) { %>\
                                                        <option value='<%= storeroom.agkyrioType[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreTechnician").click(function(e) {
        e.preventDefault();
        $("#fieldListTechnician").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΤΕΧΝΙΚΟΣ</span>\
                                                <input type='text' class='form-control' list='technicians' name='technician' id='technician'></input>\
                                                <datalist id='technicians'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.technicians.length; i++) { %>\
                                                        <option value='<%= storeroom.technicians[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});

$(function() {
    $("#addMoreLocation").click(function(e) {
        e.preventDefault();
        $("#fieldListLocation").append("<div class='col-md-12'>\
                                            <div class='input-group input-group-sm mb-3'>\
                                                <span class='input-group-text' id='inputGroup-sizing-sm'>ΠΕΡΙΟΧΗ</span>\
                                                <input type='text' class='form-control' list='locations' name='location' id='location'></input>\
                                                <datalist id='locations'>\
                                                <% if(storeroom != undefined) { %> \
                                                    <% for (var i=0; i < storeroom.locations.length; i++) { %>\
                                                        <option value='<%= storeroom.locations[i] %>'>\
                                                    <% } %>\
                                                <% } %>\
                                                </datalist>\
                                            </div>\
                                        </div> ");
    });
});
