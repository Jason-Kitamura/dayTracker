$(document).ready(function() {
    var storageArray;

    if(localStorage.storageArray != null){


        var thisArray = JSON.parse(localStorage.storageArray);
        generate();
        for (var i = 0 ; i < thisArray.length; i++){

            for(var j = 0; j < 25; j++){

                if(thisArray[i].storeTime == `hour${j}`)
                {  
                    $(`#hour${j}`).val(thisArray[i].userReminder); 
                }
            }   
        }

    } else {
        generate();
    }

    var now = moment().format("dddd MMM Do YYYY");
    const currentDayDisplay = $("#currentDay");  
    currentDayDisplay.text(now);
    
    
    //creating a table using jquery
    function generate(){
        for (var i = 7; i <=18; i++){
            $(".container").append(
            `<div class="row">
                <div class="col-1 hour">${i}:00</div>
                <input id="hour${i}"class="col-10" type="text">
                <div class="col-1 saveBtn" >
                    <i class="fas fa-lock " onclick='saveButton("${i}")'></i> 
                    <i class="fas fa-unlock" onclick='deleteButton("${i}")'></i> 
                </div>
            </div>
            `
            );
        }
    }


    var hourlyTime = [07,08,09,10,11,12,13,14,15,16,17,18,];
    const currentHour = moment().hours();
   
    for (var i = 0; i <hourlyTime.length ; i++){

        const activeHour = hourlyTime[i];

        if( activeHour < currentHour ){
            $(`#hour${activeHour}`).addClass("past");
        } else if( activeHour == currentHour ){

            $(`#hour${activeHour}`).addClass("present");

        } else {
            $(`#hour${activeHour}`).addClass("future");
        }
    }
});

storageArray = localStorage.storageArray ? JSON.parse(localStorage.storageArray) : [];

function saveButton(i){
    
    var storageObj = {
        userReminder: $(`#hour${i}`).val(),
        storeTime: `hour${i}`
    };
    storageArray.push(storageObj);
    localStorage.setItem("storageArray", JSON.stringify(storageArray));

}


function deleteButton(i){

    $(`#hour${i}`).val('');
    storageArray = JSON.parse(localStorage.storageArray);

    for (var i = 0 ; i < storageArray.length; i++){
        for (var j = 0 ; j < 25; j++){
            if(storageArray[i].storeTime == `hour${j}`){
                storageArray.splice(i,1); 
                console.log(` updated storageArray:`, storageArray);
               localStorage.setItem("storageArray",JSON.stringify(storageArray));
                return;
            }  
        }
    }  
}