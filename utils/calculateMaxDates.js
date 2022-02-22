function getMostDatesLed(currentLight) {
    var longest = 0;
    
    if (currentLight.solarGeneratorDate.length > longest) {
        longest = currentLight.solarGeneratorDate.length
    }
    if (currentLight.headDate.length > longest) {
        longest = currentLight.headDate.length
    }
    if (currentLight.accumulatorDate.length > longest) {
        longest = currentLight.accumulatorDate.length
    }
    if (currentLight.chargeRegulatorDate.length > longest) {
        longest = currentLight.chargeRegulatorDate.length
    }
    if (currentLight.socketDate.length > longest) {
        longest = currentLight.socketDate.length
    }
    return longest;
}

function getMostDatesAuto(currentLight) {
    var longest = 0;
    
    if (currentLight.lighterDate.length > longest) {
        longest = currentLight.lighterDate.length
    }
    if (currentLight.solarGeneratorDate.length > longest) {
        longest = currentLight.solarGeneratorDate.length
    }
    if (currentLight.headDate.length > longest) {
        longest = currentLight.headDate.length
    }
    if (currentLight.lampDate.length > longest) {
        longest = currentLight.lampDate.length
    }
    if (currentLight.accumulatorDate.length > longest) {
        longest = currentLight.accumulatorDate.length
    }
    if (currentLight.generatorSocketDate.length > longest) {
        longest = currentLight.generatorSocketDate.length
    }
    if (currentLight.torchSocketDate.length > longest) {
        longest = currentLight.torchSocketDate.length
    }
    if (currentLight.photocellDate.length > longest) {
        longest = currentLight.photocellDate.length
    }
    if (currentLight.accessoryDate.length > longest) {
        longest = currentLight.accessoryDate.length
    }
    return longest;
}

function getEarliestDate(array) {
    // consider the first element of array as latest
    var latest = array[0];
    var index = 0;

    for(var i=0; i < array.length; i++) {

        // if the date coming from array position is ahead then set latest to this array element
        if (array[i] < latest) {
            latest = array[i];
            index = i;
        }
    }
    return index;
}

module.exports.getEarliestDate = getEarliestDate;
module.exports.getMostDatesLed = getMostDatesLed;
module.exports.getMostDatesAuto = getMostDatesAuto;