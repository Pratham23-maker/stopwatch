//stopwatch.js
$(function(){
    //variables
    var mode = 0;//App mode
    var timeCounter = 0;//time counter
    var lapCounter = 0;//lap counter
    var action;//variable for setInterval
    var lapNumber = 0;//Number of Laps
        
        //minutes,seconds,centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //On App load show start and lap buttons
    hideshowButtons("#startbutton","#lapbutton");
    //click on startButton
    $("#startbutton").click(function(){
        //mode on
        mode = 1;
        //show stop and lap buttons
        hideshowButtons("#stopbutton","#lapbutton");
        //start counter
        startAction();
    });
    //click on stopButton
    $("#stopbutton").click(function(){
        //show stop and lap buttons
        hideshowButtons("#resumebutton","#resetbutton");
        //stop counter
        clearInterval(action);

    });
     //click on resumeButton
     $("#resumebutton").click(function(){
         //show stop and lap buttons
         hideshowButtons("#stopbutton","#lapbutton");
         //start counter
         startAction();
     })
    //click on resetButton
    $("#resetbutton").click(function(){
        //relaod th page
        location.reload();
    })
    //click on lapButton
    $("#lapbutton").click(function(){
    //if mode is on
    if(mode){
    //stop action
    clearInterval(action); 
    //reset lap and print lap daetails 
    lapCounter=0;
    addlap();
    //start action
    startAction(); 
    }
    
    })
    
    
    
    //functions
    //hideshowButtons function shows two buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;   
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;   
            }
            updateTime();
        },10);
    }
    
    //updateTime: converts counters to min,sec,centisec
    function updateTime(){
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }
    
    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;   
        }else{
            return number;   
        }
    }
    
    //addLap function: print lap details inside the lap box
    function addlap(){
        lapNumber++
        var myLapDetails = '<div class="lap">'+ 
        '<div class="laptimetittle">'+
        'lap'+lapNumber+
        '</div>'+
        '<div class=laptime >'+
        '<span>'+ format(lapMinutes)+'</span>:'+ 
        '<span>'+ format(lapSeconds)+'</span>:'+ 
        '<span>'+ format(lapCentiseconds)+'</span>'+
        '</div>'+
        
        
        
        
        '</div>';
        $(myLapDetails).prependTo("#laps");

    }
    
});