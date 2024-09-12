export default function detectDisease({
    name,
    isbreath,
    isbreathlong,
    iscough,
    agedisease,
    isasymptomatic,
    dosmoke,
    dosmokeyear,
    dosmokebiomass,
    dosmokeyearduration,
    peakflow
}) {
    // If there's no breath issue
    if (!isbreath.value) {
        return 'No clinically relevant Asthma or COPD';
    }

    // If breath issue isn't long-lasting or no peak flow data
    if (!isbreathlong.value || !peakflow.value) {
        return 'Unlikely to have Asthma or COPD';
    }

    // If the age of the disease isn't specified
    if (!agedisease.value) {
        return 'Likely to have asthma, unlikely to have COPD';
    }

    // If smoking history isn't relevant
    if (!dosmoke.value) {
        return 'No relevant smoking history';
    }

    // If smoking history is provided
    if (parseInt(dosmokeyear) < 10 && parseInt(dosmokeyearduration) < 20) {
        return 'Likely to have Asthma, unlikely to have COPD';
    }

    // Based on symptomatic status
    if (isasymptomatic.value) {
        return 'Likely to have Asthma, unlikely to have COPD';
    } else if (!isasymptomatic.value) {
        return 'Likely to have COPD, unlikely to have Asthma';
    } else {
        return 'Fill those fields';
    }
}