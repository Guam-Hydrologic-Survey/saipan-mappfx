/*
Stats.js
Exports: getStats(statistics, element)
Parameters: "statistics" - JSON object with available statistic properties; "element" - HTML element to be updated with generated HTML content 
Return: None. Appends formatted HTML content in the "content" variable to the given HTML element passed through the parameters of the getStats() function. 
*/

// utils 
import { roundDec } from "../utils/roundDec.js";

// globals 
let content = "";

function header(statistics) {
    let info = /*html*/
    `
    <div class="side-panel-header">
        <h4>Well ${statistics.name}</h4>
        <div class="location" id="basin">Facility Name: ${statistics.facility_name} </div>
        <div class="location" id="coords">${roundDec(statistics.lat)}, ${roundDec(statistics.lon)}</div>
    </div>
    <hr/>
    `;
    return info;
}

/* 
Function: basicStats()
Parameters: "statistics" - JSON data (specifically "feature.properties" from fetch methon in LMap.js) containing statistic attributes 
Return: "basics" - a string variable containing HTML code for the basic statistics available 
Notes: This is the first row of the statistics section of the side panel. Update/change with available JSON properties and  the remove roundDec() util, if needed. 
*/
function basicStats(statistics) {
    let basics = /*html*/
    `
    <div id="stats-basic">
        <div class="stats-row">
            <!-- labels for basic statistics -->
            <div class="stats-col">
                <p class="stats-text">Average</p>
                <p class="stats-text">Min</p>
                <p class="stats-text">Max</p>
                <p class="stats-text">N-Data</p>
            </div>
            <!-- values for basic statistics --> 
            <div class="stats-col">
                <p class="stats-num">${roundDec(statistics.average)}</p>
                <p class="stats-num">${roundDec(statistics.min)}</p>
                <p class="stats-num">${roundDec(statistics.max)}</p>
                <p class="stats-num">${roundDec(statistics.n_data)}</p>
            </div>
        </div>
    </div>
    `;
    return basics;
}

/* 
Function: additionalStats()
Parameters: "statistics" - JSON data (specifically "feature.properties" from fetch methon in LMap.js) containing statistic attributes 
Return: "additionals" - a string variable containing HTML code for any additional statistics/analysis/information 
Notes: This is the second row of the statistics section of the side panel. Update/change with available JSON properties and  the remove roundDec() util, if needed. 
*/
function additionalStats(statistics) {
    let additionals = /*html*/
    `
    <div class="accordion" id="stats-additional">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <i>View Additional ${statistics.name} Statistics</i>
            </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#stats-additional">
                <div class="accordion-body">
                    <div class="stats-row">
                        <!-- labels for additional statistics -->
                        <div class="stats-col">
                            <p class="stats-text">Facility ID</p>
                            <p class="stats-text">Street Num ID</p>
                            <p class="stats-text">PWSS Name</p>
                            <p class="stats-text">Source Type</p>
                            <p class="stats-text">Assigned Capacity</p>
                        </div>
                        <!-- values for additional statistics -->
                        <div class="stats-col">                
                            <p class="stats-num">${(statistics.facility_ID)}</p>
                            <p class="stats-num">${(statistics.streetNum_ID)}</p>              
                            <p class="stats-num">${(statistics.pwss_name)}</p>
                            <p class="stats-num">${(statistics.source_type)}</p>
                            <p class="stats-num">${(statistics.assigned_capacity)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return additionals;
}

/* 
Function: getStats()
Parameters:
    "statistics" - JSON data (specifically "feature.properties" from fetch methon in LMap.js) containing statistic attributes 
    "element" - HTML element with ID for the statistics section's parent container 
Return: none 
Notes: Because of the reserve word, "export," this function is available to other components within the project. 
*/
export function getStats(statistics, element) {
    content = header(statistics) + basicStats(statistics) + additionalStats(statistics)
    document.getElementById(element).innerHTML = content;
}