import { create_sit,display_sit,sit_detils} from "./module/module.js";
async function fetch_bus(){
    // fetching busses from database
    try{
        let response = await fetch('http://localhost/sit_booking/api/select_bus.php', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
        },
        });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
}
async function show_bus(){
    //print the records of buses in container
    if(document.getElementById("sits").children.length==0){
        document.getElementById("heading").style.visibility='visible';
        let datas=await fetch_bus();
        datas.forEach(data => {
            let div_row=document.createElement("div");
            div_row.className="row";
            document.getElementById("sits").appendChild(div_row);
            let col_bus_number=document.createElement("div");
            col_bus_number.className="col-md-2 col-sm-2 d-flex justify-content-center";
            div_row.appendChild(col_bus_number);
            col_bus_number.appendChild(document.createTextNode(data.bus_number));
            let col_departure=document.createElement("div");
            col_departure.className="col-md-2 col-sm-2 d-flex justify-content-center";
            div_row.appendChild(col_departure);
            col_departure.appendChild(document.createTextNode(data.departure));
            let col_arival=document.createElement("div");
            col_arival.className="col-md-2 col-sm-2 d-flex justify-content-center";
            div_row.appendChild(col_arival);
            col_arival.appendChild(document.createTextNode(data.arival));
            let col_date=document.createElement("div");
            col_date.className="col-md-2 col-sm-2 d-flex justify-content-center";
            div_row.appendChild(col_date);
            col_date.appendChild(document.createTextNode(data.departure_date));
            let col_time=document.createElement("div");
            col_time.className="col-md-2 col-sm-2 d-flex justify-content-center";
            div_row.appendChild(col_time);
            col_time.appendChild(document.createTextNode(data.departure_time));
            let col_fare=document.createElement("div");
            col_fare.className="col-md-1 col-sm-1  d-flex justify-content-center";
            div_row.appendChild(col_fare);
            col_fare.appendChild(document.createTextNode(data.rate));
            let col_book=document.createElement("div");
            col_book.className="col-md-1 col-sm-1 d-flex justify-content-center";
            div_row.appendChild(col_book);
            let book_button= document.createElement("button");
            book_button.className='book btn btn-success';
            book_button.innerHTML="Book";
            book_button.id=data.id;
            book_button.dataset.bus_number=data.bus_number;
            book_button.dataset.rate=data.rate;
            book_button.dataset.row_number=data.row_number;
            book_button.dataset.column_number=data.column_number;
            col_book.appendChild(book_button);
            // if(data.state!=null){
            //     book_button.disabled=true;
            //     book_button.innerHTML="Removed";
            // }
            
        });

    }

}
//render buses at the time of loading
show_bus();
var schedule_id;
var rate;
var seleceted_sit=[];
document.body.addEventListener('click',async (event)=>{
    if(event.target.classList[0]=='book'){
        schedule_id=event.target.id;
        rate=event.target.dataset.rate;
        let row=event.target.dataset.row_number;
        let column=event.target.dataset.column_number;
        document.getElementById("heading").style.visibility='hidden';
        display_sit(row,column);
        document.getElementById("set_button").style.visibility='visible';
        document.getElementById("cancle_button").style.visibility='visible';
        await mark_sit(row,column);
    }
});
async function mark_sit(row,column){
    for(let i=1;i<row;i++){
        for(let j=1;j<=column;j++){
            document.getElementById(i+""+j+"sit").dataset.state="active";
        }
    }
    for(let j=0;j<=column;j++){
        document.getElementById(row+""+j+"sit").dataset.state="active";
    }
    // try{
    //     let response = await fetch('http://localhost/sit_booking/api/find_details_of_selected_schedule.php', {
    //     method: 'GET',
    //     mode: 'cors',
    //     body:JSON.stringify({
    //         id,
    //     }),
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
    //         'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
    //     },
    //     });
    //         return await response.json();
    //     } catch (error) {
    //         console.log(error);
    //     }
}
document.getElementById("cancle_button").onclick=()=>{
    document.getElementById("sits").innerHTML="";
    document.getElementById("set_button").style.visibility='hidden';
    document.getElementById("cancle_button").style.visibility='hidden';
    show_bus();
}

document.body.addEventListener('click',(event)=>{
    if(event.target.className=='sit' && event.target.dataset.state=="active" ){
        seleceted_sit.push(event.target.dataset.value);
        event.target.dataset.state="disable";
        event.target.style.background="rgb(71, 110, 98)";
    }
});

document.getElementById("set_button").onclick=async ()=>{
    const dynamicArray = [];
    seleceted_sit.forEach(async(sit)=>{
        console.log(sit+" "+schedule_id+" "+user);
        try{
        let response = await fetch('http://localhost/sit_booking/api/book.php', {
        method: 'POST',
        mode: 'cors',
        body:JSON.stringify({
            user,
            schedule_id,
            sit,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
        },
        });
            var data= await response.json();
            dynamicArray.push(data.status);
            
        } catch (error) {
            console.log(error);
        }
    });
    console.log(dynamicArray);
    console.log(await checkdynamicArray(dynamicArray));

    // if(s){

    //     alert("booking successfull");
    //     // location.reload();
    // }else{
    //     alert("Some error occure,Try again!");
    // }
    
}
async function checkdynamicArray(dynamicArray){
    console.log("in check"+dynamicArray);
    let flag=true;
    for(let i=0;i<dynamicArray.length;i++){
        console.log(dynamicArray[i]);
        if(dynamicArray[i]==false){
            flag=false;
            break;
        }
    }
    return flag;
}