let path='https://crudcrud.com/api/677639628edb4441bb2357bfbbff7501/users/';


document.addEventListener("DOMContentLoaded", () => {
    getData();
  });

  function getData(){
    axios.get(path).then((obj)=>displayContent(obj)).catch(err=>console.log(err));
  }




  function displayContent(obj){

    let parentList=document.querySelector('.list-group');
    let childlists=document.querySelectorAll('.list-group-item');

    for(let i=0;i<childlists.length;i++)
    {
        childlists[i].remove();
    }
    let users=obj.data;
    let htmltxt="";
    for(let i=0;i<users.length;i++)
    {
        htmltxt+=`<li class="list-group-item">
        <div id="uid" style="display: none">${users[i]._id}</div>

        <div class="row">
        <div class="col">Email : ${users[i].Email}</div>
        <div class="col">Password : ${users[i].Password}</div>
        <div class="col"><button onclick="editfun(this)" type="button" class="btn btn-warning edit-btn">Edit</button></div>
        <div class="col"><button onclick="delfun(this)" type="button" class="btn btn-danger delete-btn">Delete</button></div>
        </div>
        
        </li>`;
    }
    parentList.innerHTML=htmltxt;
    
  }


  function sbmit(e)
  {
    //e.preventDefault();
    let mail=document.querySelector('#exampleInputEmail1').value;
    //console.log("email");
    //console.log(mail); 
    let pass=document.querySelector('#exampleInputPassword1').value;
    let obj={
        "Email":mail,
        "Password":pass
    }

    axios.post(path,obj).then(()=>getData()).catch(err=>console.log(err));
  }

  function editfun(e){
    let elemettodelete=e.parentElement.parentElement.parentElement;
    let ele=e.parentElement.parentElement.parentElement.children;
    //console.log(ele[1].children[0])
    //let mail=ele[0][0].textContent;
    

    let elementid=ele[0].textContent;
    let url=path+elementid;
   
    axios.get(url).then((obj)=>{
        let objdata=obj.data;
        document.querySelector('#exampleInputEmail1').value=objdata.Email;
        document.querySelector('#exampleInputPassword1').value=objdata.Password;
        elemettodelete.remove();

        deletefun(elementid);


    }).catch(err=>console.log(err));

    //axios.get(url).then(obj=>)
  }

  function delfun(e){
    let elemettodelete=e.parentElement.parentElement.parentElement;
    let ele=e.parentElement.parentElement.parentElement.children;
   
    let elementid=ele[0].textContent;
    elemettodelete.remove();
    deletefun(elementid);
  }


  function deletefun(id){
    let url=path+id;
    axios.delete(url).then(()=>getData()).catch(err=>console.log(err));
  }


  document.querySelector('#submitbtn').addEventListener('click',sbmit);

  //document.querySelector('.edit-btn').addEventListener('click',editfun);
  //document.querySelector('.delete-btn').addEventListener('click',deletefun);