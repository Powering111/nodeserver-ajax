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