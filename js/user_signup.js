document.getElementById("login_user").onclick=async()=>{
    let email=document.getElementById("login_email").value;
    let password=document.getElementById("login_password").value;
    if(email && password){
        try{
            let response=await fetch('http://localhost/sit_booking/api/find_user.php',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers,Content-type,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
                },
            });
            let data=await response.json();
            if(data.status){
                location.replace(`user.php?id=${data.message}`);
            }
            else{
                alert(data.message)
            }
        }
        catch(error){
            console.log("Something is going wrong! Please try again.");
        }
            
    }else{
        alert("Name or Password is missing");
    }
}
document.getElementById("register_user").onclick=async ()=>{
    mno=document.getElementById("mno").value;
    pattern=/[0-9]{10}/;
    password=document.getElementById("password").value;
    confirm_password=document.getElementById("confirm_password").value;
    if(pattern.test(mno)){
        if(password==confirm_password){
            var obj={
                name:document.getElementById("reg_name").value,
                address:document.getElementById("reg_address").value,
                mno,
                email:document.getElementById("email").value,
                password
            };
            try{
            var response = await fetch('http://localhost/sit_booking/api/insert_user.php', {
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
                    location.replace(`user.php?id=${data.message}`);
                }
                else{
                    alert(data.message);
                }
                
            } catch (error) {
                alert(`user with same email present`);
            }
        }
    }else{
        alert("enter valid mobile number");
    }
    
    
}