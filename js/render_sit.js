import { create_sit,display_sit} from "./module/module.js";

// function create_sit(row_number,id,sit_number){
//     let sit_span=document.createElement("span");
//     sit_span.className="sit";
//     sit_span.id=id;
//     sit_span.dataset.value=sit_number;
//     document.getElementById(row_number).appendChild(sit_span);
// }
function addsit(){
    var row=document.getElementById("row").value;
    var column=document.getElementById("column").value;
    var bus_number=document.getElementById("bus_number").value;
    var licence=document.getElementById("licence").value;
        if(row && column && bus_number && licence && column>=4 && column<=5 && row>=8  && row<=12){
            display_sit(row,column);
            document.getElementById("set_button").style.visibility='visible';
        }
        else{
            alert("any of row,column,bus number and licence is missing!\nrange of columns 4-5\nrange of rows 8-12");
            document.getElementById("set_button").style.visibility='hidden';
        }
};
document.getElementById("preview_button").onclick=addsit;

document.getElementById("set_button").onclick=async ()=>{
    var obj={
        bus_number:document.getElementById("bus_number").value,
        licence:document.getElementById("licence").value,
        row_number:document.getElementById("row").value,
        column_number:document.getElementById("column").value,
        
    };
    try{
    var response = await fetch('http://localhost/sit_booking/api/insert_bus.php', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(obj),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
    },
    });
        var data= await response.json();
        if(data.status){
            location.replace(`bus_time.php?bus=${document.getElementById('bus_number').value}`);
        }
        else{
            alert(data.message);
        }
        
    } catch (error) {
        alert(`Bus with same number present`);
    }
}
