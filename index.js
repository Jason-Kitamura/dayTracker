$(document).ready(function() {
    var storageArray;
 
    ///local storage =====> when page refreshed, it works
    if(localStorage.storageArray != null){

        // took it out of localstorage
        var thisArray = JSON.parse(localStorage.storageArray);
        generate();
        for (var i = 0 ; i < thisArray.length; i++){
            // console.log(`current store time# ${thisArray[i].storeTime}`);
            for(var j = 0; j < 25; j++){
                // console.log(`checking hour ${j}`);
                if(thisArray[i].storeTime == `hour${j}`)
                {  
                    $(`#hour${j}`).val(thisArray[i].userReminder); 
                }
            }   
        }
        

    }else {
        generate();
    }
    //Gives the current time
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

    //Conditions to check 
    var hourlyTime = [07,08,09,10,11,12,13,14,15,16,17,18,];
    const currentHour = moment().hours();
   
    for (var i = 0; i <hourlyTime.length ; i++){
        // passed, present future
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

////local storage ======> storing it  and putting it in an array
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
    //delete from input area
    $(`#hour${i}`).val('');
    storageArray = JSON.parse(localStorage.storageArray);
    //console.log(deleteEl);
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