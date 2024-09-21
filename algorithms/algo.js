export default function detectDisease({
    isbreath,
    isbreathlong,
    breathlessAge,
    iscough,
    isExpectoration,
    peakflow,
    agedisease,
    isasymptomatic,
    dosmoke,
    dosmokeyear,
    dosmokebiomass,
    dosmokeyearduration,
    dorelative,
}) {
    // If there's no breath issue
    if (!isbreath.value) {
        return 'No clinically relevant Asthma or COPD';
    }

    // If breath issue isn't long-lasting
    if (!isbreathlong.value) {
        return 'Unlikely to have Asthma or COPD';
    }

    if(parseFloat(pefPercentage) >= 80) {
        return 'No clinically relevant asthma or COPD';
    }

    // If the age of the disease isn't specified
    if (!agedisease.value) {
        return 'Likely to have asthma, unlikely to have COPD';
    }

    // If smoking history is provided
    if (parseInt(dosmokeyear) < 10 && parseInt(dosmokeyearduration) < 20) {
        return 'Likely to have Asthma, unlikely to have COPD';
    }

    if (parseInt(dosmokeyear) >= 10 || (parseInt(dosmokeyear) < 10 && parseInt(dosmokeyearduration) >= 20)) {
        // Based on symptomatic status
        if (isasymptomatic.value) {
            return 'Likely to have Asthma, unlikely to have COPD';
        } else if (!isasymptomatic.value) {
            return 'Likely to have COPD, unlikely to have Asthma';
        }
    }
    return 'Likely to have Asthma, unlikely to have COPD';    
}