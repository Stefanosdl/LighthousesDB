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
        $("#fieldListHead").append("<label for='head' class='form-label'>ΚΕΦΑΛΗ</label>");
        $("#fieldListHead").append("<input type='text' class='form-control' name='head' id='head'>");
        $("#fieldListHead").append("</div>");
    });
});

$(function() {
    $("#addMoreColour").click(function(e) {
        e.preventDefault();
        $("#fieldListColour").append("<br>");
        $("#fieldListColour").append("<div class='col-md-6'>");
        $("#fieldListColour").append("<label for='colour' class='form-label'>ΧΡΩΜΑΤΙΣΜΟΣ</label>");
        $("#fieldListColour").append("<input type='text' class='form-control' name='colour' id='colour'>");
        $("#fieldListColour").append("</div>");
    });
});

$(function() {
    $("#addMoreLighter").click(function(e) {
        e.preventDefault();
        $("#fieldListLighter").append("<br>");
        $("#fieldListLighter").append("<div class='col-md-6'>");
        $("#fieldListLighter").append("<label for='lighter' class='form-label'>ΕΚΛΑΜΠΤΗΡΑΣ</label>");
        $("#fieldListLighter").append("<input type='text' class='form-control' name='lighter' id='lighter'>");
        $("#fieldListLighter").append("</div>");
    });
});

$(function() {
    $("#addMoreGeneratorSocket").click(function(e) {
        e.preventDefault();
        $("#fieldListGeneratorSocket").append("<br>");
        $("#fieldListGeneratorSocket").append("<div class='col-md-6'>");
        $("#fieldListGeneratorSocket").append("<label for='generatorSocket' class='form-label'>ΡΥΘΜΙΣΤΗΣ ΦΟΡΤΙΣΕΩΣ/ ΦΟΡΤΙΣΤΗΣ</label>");
        $("#fieldListGeneratorSocket").append("<input type='text' class='form-control' name='generatorSocket' id='generatorSocket'>");
        $("#fieldListGeneratorSocket").append("</div>");
    });
});

$(function() {
    $("#addMoreΤorchSocket").click(function(e) {
        e.preventDefault();
        $("#fieldListΤorchSocket").append("<br>");
        $("#fieldListΤorchSocket").append("<div class='col-md-6'>");
        $("#fieldListΤorchSocket").append("<label for='torchSocket' class='form-label'>ΥΠΟΔΟΧΗ ΠΥΡΣΟΥ</label>");
        $("#fieldListΤorchSocket").append("<input type='text' class='form-control' name='torchSocket' id='torchSocket'>");
        $("#fieldListΤorchSocket").append("</div>");
    });
});

$(function() {
    $("#addMorePhotocell").click(function(e) {
        e.preventDefault();
        $("#fieldListPhotocell").append("<br>");
        $("#fieldListPhotocell").append("<div class='col-md-6'>");
        $("#fieldListPhotocell").append("<label for='photocell' class='form-label'>ΦΩΤΟΚΥΤΤΑΡΟ</label>");
        $("#fieldListPhotocell").append("<input type='text' class='form-control' name='photocell' id='photocell'>");
        $("#fieldListPhotocell").append("</div>");
    });
});

$(function() {
    $("#addMoreAccessory").click(function(e) {
        e.preventDefault();
        $("#fieldListAccessory").append("<br>");
        $("#fieldListAccessory").append("<div class='col-md-6'>");
        $("#fieldListAccessory").append("<label for='accessory' class='form-label'>ΠΡΟΣΘΕΤΟ ΕΞΑΡΤΗΜΑ</label>");
        $("#fieldListAccessory").append("<input type='text' class='form-control' name='accessory' id='accessory'>");
        $("#fieldListAccessory").append("</div>");
    });
});

$(function() {
    $("#addMoreAlternator").click(function(e) {
        e.preventDefault();
        $("#fieldListAlternator").append("<br>");
        $("#fieldListAlternator").append("<div class='col-md-6'>");
        $("#fieldListAlternator").append("<label for='alternator' class='form-label'>ΕΝΑΛΛΑΚΤΗΣ</label>");
        $("#fieldListAlternator").append("<input type='text' class='form-control' name='alternator' id='alternator'>");
        $("#fieldListAlternator").append("</div>");
    });
});

$(function() {
    $("#addMoreLightingMachineMan").click(function(e) {
        e.preventDefault();
        $("#fieldListLightingMachineMan").append("<br>");
        $("#fieldListLightingMachineMan").append("<div class='col-md-6'>");
        $("#fieldListLightingMachineMan").append("<label for='lightingMachineMan' class='form-label'>ΦΩΤΙΣΤΙΚΟ ΜΗΧΑΝΗΜΑ (ΚΑΤΑΣΚΕΥΑΣΤΗΣ)</label>");
        $("#fieldListLightingMachineMan").append("<input type='text' class='form-control' name='lightingMachineMan' id='lightingMachineMan'>");
        $("#fieldListLightingMachineMan").append("</div>");
    });
});

$(function() {
    $("#addMoreLightingMachineType").click(function(e) {
        e.preventDefault();
        $("#fieldListLightingMachineType").append("<br>");
        $("#fieldListLightingMachineType").append("<div class='col-md-6'>");
        $("#fieldListLightingMachineType").append("<label for='lightingMachineType' class='form-label'>ΦΩΤΙΣΤΙΚΟ ΜΗΧΑΝΗΜΑ (ΤΥΠΟΣ)</label>");
        $("#fieldListLightingMachineType").append("<input type='text' class='form-control' name='lightingMachineType' id='lightingMachineType'>");
        $("#fieldListLightingMachineType").append("</div>");
    });
});

$(function() {
    $("#addMoreReflectorMan").click(function(e) {
        e.preventDefault();
        $("#fieldListReflectorMan").append("<br>");
        $("#fieldListReflectorMan").append("<div class='col-md-6'>");
        $("#fieldListReflectorMan").append("<label for='reflectorMan' class='form-label'>ΑΝΑΚΛΑΣΤΗΡΑΣ (ΚΑΤΑΣΚΕΥΑΣΤΗΣ)</label>");
        $("#fieldListReflectorMan").append("<input type='text' class='form-control' name='reflectorMan' id='reflectorMan'>");
        $("#fieldListReflectorMan").append("</div>");
    });
});

$(function() {
    $("#addMoreReflectorType").click(function(e) {
        e.preventDefault();
        $("#fieldListReflectorType").append("<br>");
        $("#fieldListReflectorType").append("<div class='col-md-6'>");
        $("#fieldListReflectorType").append("<label for='reflectorType' class='form-label'>ΑΝΑΚΛΑΣΤΗΡΑΣ (ΤΥΠΟΣ)</label>");
        $("#fieldListReflectorType").append("<input type='text' class='form-control' name='reflectorType' id='reflectorType'>");
        $("#fieldListReflectorType").append("</div>");
    });
});

$(function() {
    $("#addMoreSignsMan").click(function(e) {
        e.preventDefault();
        $("#fieldListSignsMan").append("<br>");
        $("#fieldListSignsMan").append("<div class='col-md-6'>");
        $("#fieldListSignsMan").append("<label for='signsMan' class='form-label'>ΕΠΙΣΗΜΑΤΑ (ΚΑΤΑΣΚΕΥΑΣΤΗΣ)</label>");
        $("#fieldListSignsMan").append("<input type='text' class='form-control' name='signsMan' id='signsMan'>");
        $("#fieldListSignsMan").append("</div>");
    });
});

$(function() {
    $("#addMoreSignsType").click(function(e) {
        e.preventDefault();
        $("#fieldListSignsType").append("<br>");
        $("#fieldListSignsType").append("<div class='col-md-6'>");
        $("#fieldListSignsType").append("<label for='signsType' class='form-label'>ΕΠΙΣΗΜΑΤΑ (ΤΥΠΟΣ)</label>");
        $("#fieldListSignsType").append("<input type='text' class='form-control' name='signsType' id='signsType'>");
        $("#fieldListSignsType").append("</div>");
    });
});

$(function() {
    $("#addMoreType").click(function(e) {
        e.preventDefault();
        $("#fieldListType").append("<br>");
        $("#fieldListType").append("<div class='col-md-6'>");
        $("#fieldListType").append("<label for='type' class='form-label'>ΤΥΠΟΣ ΦΩΤΟΣΗΜΑΝΤΗΡΑ</label>");
        $("#fieldListType").append("<input type='text' class='form-control' name='type' id='type'>");
        $("#fieldListType").append("</div>");
    });
});

$(function() {
    $("#addMoreStateriType").click(function(e) {
        e.preventDefault();
        $("#fieldListStateriType").append("<br>");
        $("#fieldListStateriType").append("<div class='col-md-6'>");
        $("#fieldListStateriType").append("<label for='stateriType' class='form-label'>ΣΤΑΤΕΡΙ (Άλυσος)</label>");
        $("#fieldListStateriType").append("<input type='text' class='form-control' name='stateriType' id='stateriType'>");
        $("#fieldListStateriType").append("</div>");
    });
});

$(function() {
    $("#addMoreAlysosType").click(function(e) {
        e.preventDefault();
        $("#fieldListAlysosType").append("<br>");
        $("#fieldListAlysosType").append("<div class='col-md-6'>");
        $("#fieldListAlysosType").append("<label for='alysosType' class='form-label'>ΑΛΥΣΟΣ</label>");
        $("#fieldListAlysosType").append("<input type='text' class='form-control' name='alysosType' id='alysosType'>");
        $("#fieldListAlysosType").append("</div>");
    });
});

$(function() {
    $("#addMoreAgkyrioChainType").click(function(e) {
        e.preventDefault();
        $("#fieldListAgkyrioChainType").append("<br>");
        $("#fieldListAgkyrioChainType").append("<div class='col-md-6'>");
        $("#fieldListAgkyrioChainType").append("<label for='agkyrioChainType' class='form-label'>ΑΓΚΥΡΙΟ (Άλυσος)</label>");
        $("#fieldListAgkyrioChainType").append("<input type='text' class='form-control' name='agkyrioChainType' id='agkyrioChainType'>");
        $("#fieldListAgkyrioChainType").append("</div>");
    });
});

$(function() {
    $("#addMoreStreptyrasType").click(function(e) {
        e.preventDefault();
        $("#fieldListStreptyrasType").append("<br>");
        $("#fieldListStreptyrasType").append("<div class='col-md-6'>");
        $("#fieldListStreptyrasType").append("<label for='streptyrasType' class='form-label'>ΣΤΡΕΠΤΗΡΑΣ</label>");
        $("#fieldListStreptyrasType").append("<input type='text' class='form-control' name='streptyrasType' id='streptyrasType'>");
        $("#fieldListStreptyrasType").append("</div>");
    });
});

$(function() {
    $("#addMoreNavyKeyType").click(function(e) {
        e.preventDefault();
        $("#fieldListNavyKeyType").append("<br>");
        $("#fieldListNavyKeyType").append("<div class='col-md-6'>");
        $("#fieldListNavyKeyType").append("<label for='navyKeyType' class='form-label'>ΝΑΥΤΙΚΟ ΚΛΕΙΔΙ</label>");
        $("#fieldListNavyKeyType").append("<input type='text' class='form-control' name='navyKeyType' id='navyKeyType'>");
        $("#fieldListNavyKeyType").append("</div>");
    });
});

$(function() {
    $("#addMoreAgkyrioType").click(function(e) {
        e.preventDefault();
        $("#fieldListAgkyrioType").append("<br>");
        $("#fieldListAgkyrioType").append("<div class='col-md-6'>");
        $("#fieldListAgkyrioType").append("<label for='agkyrioType' class='form-label'>ΑΓΚΥΡΙΟ</label>");
        $("#fieldListAgkyrioType").append("<input type='text' class='form-control' name='agkyrioType' id='agkyrioType'>");
        $("#fieldListAgkyrioType").append("</div>");
    });
});

$(function() {
    $("#addMoreTechnician").click(function(e) {
        e.preventDefault();
        $("#fieldListTechnician").append("<br>");
        $("#fieldListTechnician").append("<div class='col-md-6'>");
        $("#fieldListTechnician").append("<label for='technician' class='form-label'>ΤΕΧΝΙΚΟΣ</label>");
        $("#fieldListTechnician").append("<input type='text' class='form-control' name='technician' id='technician'>");
        $("#fieldListTechnician").append("</div>");
    });
});

$(function() {
    $("#addMoreLocation").click(function(e) {
        e.preventDefault();
        $("#fieldListLocation").append("<br>");
        $("#fieldListLocation").append("<div class='col-md-6'>");
        $("#fieldListLocation").append("<label for='location' class='form-label'>ΠΕΡΙΟΧΗ</label>");
        $("#fieldListLocation").append("<input type='text' class='form-control' name='location' id='location'>");
        $("#fieldListLocation").append("</div>");
    });
});
