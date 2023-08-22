
export function create_sit(row_number,id,sit_number){
    let sit_span=document.createElement("span");
    sit_span.className="sit";
    sit_span.id=id;
    sit_span.dataset.value=sit_number;
    document.getElementById(row_number).appendChild(sit_span);
}
export function display_sit(row,column){
    let sit_number=1;
    if(document.getElementById("sits").children.length==0){
        for(let i=1;i<row;i++){
            let div_row=document.createElement("div");
            div_row.className="d-flex justify-content-center";
            div_row.id=i;
            document.getElementById("sits").appendChild(div_row);
            for(let j=1;j<=2;j++){
                create_sit(i,i+""+j+"sit",sit_number);
                sit_number+=1;
            }
            let space=document.createElement("span");
            space.className="space";
            document.getElementById(i).appendChild(space);
            for(let j=3;j<=column;j++){
                create_sit(i,i+""+j+"sit",sit_number);
                sit_number+=1;
            }
        }
        let div_row=document.createElement("div");
        div_row.className="d-flex justify-content-center";
        div_row.id=row;
        document.getElementById("sits").appendChild(div_row);
        for(let j=0;j<=column;j++){
                create_sit(row,row+""+j+"sit",sit_number);
                sit_number+=1;
            }
    }
    else{
        document.getElementById("sits").innerHTML='';
        display_sit(row,column);
    }
}

export function sit_detils(event){
        document.getElementById("sit_details").innerHTML=event.target.dataset.value;
}