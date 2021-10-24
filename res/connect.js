function sendRequest(){
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange=function(){
        if(this.status==200 && this.readyState==this.DONE){
            let problems = JSON.parse(XHR.responseText);

            console.log(problems);
            const datas = document.getElementById('data');
            while(datas.childElementCount>0){
                datas.removeChild(datas.lastChild);
            }

            problems.forEach((row)=>{
                const k = makerow(row);
                datas.appendChild(k);
            })
        }
    }
    XHR.open("GET", "/data", true);
    XHR.send();
}

function userRequest(){
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange=function(){
        if(this.status==200 && this.readyState==this.DONE){
            let user_db = JSON.parse(XHR.responseText);

            const users = document.getElementById('user');
            while(users.childElementCount>0){
                users.removeChild(users.lastChild);
            }

            console.log(user_db.user);
            
            for(let i=0;i<user_db.user.length();i++){
                user_db.user[i].username;
                user_db.profile[i].real_name;
            
                const k = makerow(row);
                users.appendChild(k);
            }
        }
    }
    XHR.open("GET", "/userList", true);
    XHR.send();
}

function makerow(row){
    const Tr = document.createElement('tr');
    const idTd = document.createElement('td');
    const nameTd = document.createElement('td'); 
    idTd.innerText = row._id;
    nameTd.innerText = row.title;

    Tr.appendChild(idTd);
    Tr.appendChild(nameTd);
    return Tr;
}

function makeuserRow(row){
    const Tr = document.createElement('tr');
    const idTd = document.createElement('td');
    const nameTd = document.createElement('td'); 
    idTd.innerText = row.user.username;
    nameTd.innerText = row.profile.real_name;

    Tr.appendChild(idTd);
    Tr.appendChild(nameTd);
    return Tr;
}