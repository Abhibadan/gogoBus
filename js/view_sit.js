import { create_sit,display_sit,sit_detils} from "./module/module.js";
// function create_sit(row_number,id,sit_number){
//     let sit_span=document.createElement("span");
//     sit_span.className="sit";
//     sit_span.id=id;
//     sit_span.dataset.value=sit_number;
//     document.getElementById(row_number).appendChild(sit_span);
// }

document.body.addEventListener('click',async(event)=>{
    if(event.target.classList[0]=='view'){
        document.body.style.overflow='hidden';
        document.getElementById("modal_back").style.visibility="visible";
        document.getElementById("view_sit").style.visibility="visible";
        let data=await find_bus(bus_id);
        data=data[0];
        var row=data.row_number;
        var column=data.column_number;
        display_sit(row,column);
    }
});

const find_bus= async(id)=>{
    var obj={
        id:id,
    };
    try{
    var response = await fetch('http://localhost/sit_booking/api/find_bus_details.php', {
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
        return await response.json();

    } catch (error) {
        alert(error);
    }
}

document.getElementById("modal_off2").onclick=()=>{
    document.body.style.overflow="visible";
    document.getElementById("modal_back").style.visibility="hidden";
    document.getElementById("view_sit").style.visibility="hidden";
}

document.body.addEventListener('click',(event)=>{
    if(event.target.className=='sit'){
        sit_detils(event);
    }
});