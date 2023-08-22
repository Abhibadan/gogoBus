document.body.addEventListener('click',async(event)=>{
    if(event.target.classList[0]=='edit'){
        document.body.style.overflow='hidden';
        document.getElementById("modal_back").style.visibility="visible";
        document.getElementById("edit_form").style.visibility="visible";
        var data=await find_schedule(event.target.id);
        data=data[0];
        document.getElementById("update_from").value=data.departure;
        document.getElementById("update_to").value=data.arival;
        document.getElementById("update_date").value=data.departure_date;
        document.getElementById("update_time").value=data.departure_time;
        document.getElementById("update_rate").value=data.rate;
        document.getElementById("update_button").dataset.record_id=event.target.id;
    }
});
const find_schedule= async(id)=>{
    var obj={
        id:id,
    };
    try{
    var response = await fetch('http://localhost/sit_booking/api/find_schedule.php', {
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

document.getElementById("update_button").onclick=async(event)=>{
    let obj={
        id:event.target.dataset.record_id,
        from:document.getElementById("update_from").value,
        to:document.getElementById("update_to").value,
        date:document.getElementById("update_date").value,
        time:document.getElementById("update_time").value,
        rate:document.getElementById("update_rate").value
    }
    try{
        var response = await fetch('http://localhost/sit_booking/api/update_bus_schedule.php', {
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
            let data= await response.json();
            if(data.status){
                location.reload();
            }else{
                alert(data.message);
            }
        } catch (error) {
            alert("Something is running bad");
        }
}

document.getElementById("modal_off1").onclick=()=>{
    document.body.style.overflow="visible";
    document.getElementById("modal_back").style.visibility="hidden";
    document.getElementById("edit_form").style.visibility="hidden";
}
