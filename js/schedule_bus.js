// import find_bus  from "./module/api_call.js";

document.getElementById("schedule_button").onclick=async ()=>{
    if(confirm("Do want to add this schedule")){
    var obj={
        from:document.getElementById("from").value,
        to:document.getElementById("to").value,
        date:document.getElementById("date").value,
        time:document.getElementById("time").value,
        rate:document.getElementById("rate").value,
        bus_id:bus_id,
    }
    try{
        var response=await fetch('http://localhost/sit_booking/api/schedule_bus.php',{
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
            document.getElementById("schedules").innerHTML="";
            show_schedule();
        }
        else{
            alert(data.message);
        }  
    } catch (error) {
        alert("same schedule already exist!");
    }
    }
}
async function show_schedule(){
    var response=await fetch('http://localhost/sit_booking/api/fetch_bus_schedule.php',{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            bus_id:bus_id,
        }),
        headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
            },
        })
    var data= await response.json();
    if(document.getElementById("schedules").children.length==0){
        data.forEach(data => {
            let div_row=document.createElement("div");
            div_row.className="row d-flex justify-content-center";
            document.getElementById("schedules").appendChild(div_row);
            let from=document.createElement("div");
            from.className="col-md-3 col-sm-4 d-flex justify-content-center";
            div_row.appendChild(from);
            from.appendChild(document.createTextNode(data.departure+"-"+data.arival));
            let date=document.createElement("div");
            date.className="col-md-2 col-sm-3 d-flex justify-content-center";
            div_row.appendChild(date);
            date.appendChild(document.createTextNode(data.departure_date));
            let time=document.createElement("div");
            time.className="col-md-2 col-sm-3 d-flex justify-content-center";
            div_row.appendChild(time);
            time.appendChild(document.createTextNode(data.departure_time));
            let rate=document.createElement("div");
            rate.className="col-md-1 col-sm-2 d-flex justify-content-center";
            div_row.appendChild(rate);
            rate.appendChild(document.createTextNode(data.rate));
            let div_view=document.createElement("div");
            div_view.className="col-md-1 col-sm-3 d-flex justify-content-center";
            div_row.appendChild(div_view);
            let view_button= document.createElement("button");
            view_button.className='view btn btn-success';
            view_button.innerHTML="View";
            view_button.id=data.id;
            div_view.appendChild(view_button);
            let div_edit=document.createElement("div");
            div_edit.className="col-md-1 col-sm-3 d-flex justify-content-center";
            div_row.appendChild(div_edit);
            let edit_button= document.createElement("button");
            edit_button.className='edit btn btn-primary';
            edit_button.innerHTML="Edit";
            edit_button.id=data.id;
            div_edit.appendChild(edit_button);
            let div_delete=document.createElement("div");
            div_delete.className="col-md-2 col-sm-3 d-flex justify-content-center";
            div_row.appendChild(div_delete);
            let delete_button= document.createElement("button");
            delete_button.className='delete btn btn-danger';
            delete_button.innerHTML="Remove";
            delete_button.id=data.id;
            div_delete.appendChild(delete_button);
            if(data.state!=null){
                edit_button.disabled=true;
                delete_button.disabled=true;
                delete_button.innerHTML="Removed";
            }
            
        });

    }
}
show_schedule();

document.body.addEventListener('click',async (event)=>{
    if(event.target.classList[0]=='delete'){
        try{
            var response=await fetch('http://localhost/sit_booking/api/delete_bus.php', {
                method: 'POST',
                mode: 'cors',
                body:JSON.stringify({
                    id:event.target.id,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
                },
                });
                    var data =await response.json();
                    if(data.status){
                        location.reload();
                    }
                    else{
                        alert(data.message);
                    }
        } catch (error) {
            console.log(error);
        }
    }
});
