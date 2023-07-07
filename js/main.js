// dark-light
let shiftbtn = document.getElementById("shift");
let body = document.body;
let card = document.getElementById("play");
let Card = document.getElementById("Play");
// inputs
let title = document.getElementById("title");
let cost = document.querySelectorAll("#cost input");
let count = document.getElementById("count");
let department = document.getElementById("department");
let btncreate = document.getElementById("btncreate");
let allinputs = document.querySelectorAll(".allinputs input");
let valid = document.getElementById("valid");
let postive = document.getElementById("postive");
// table
let tbody = document.getElementById("tbody");
let spancount = document.getElementById("spancount");
let deleteallbtn = document.getElementById("deleteallbtn");
// glob
let globalid;
let errors = [];

// obj
let alldata;

let mood = 'create';

if (localStorage.length != 0) {
      alldata = JSON.parse(localStorage.product);
}else{
      alldata = [];
}


// get total fn.
let gettotal = () => {
      let price = cost[0].value;
      let tax = cost[1].value;
      let tcost = cost[2].value;
      let discount = cost[3].value;

      let totalprice = (+price + +tax + +tcost) - +discount ;
      
      cost[4].value = +totalprice;
}
for (let i = 0; i < cost.length; i++) {
      cost[i].addEventListener("keyup" , gettotal);   
}

// to add table
let createobject = () => {
      let newproduct = {
            title : title.value,
            price : cost[0].value,
            tax : cost[1].value,
            tcost : cost[2].value,
            discount : cost[3].value,
            total : cost[4].value,
            count : count.value,
            department : department.value,
      };
      
      for (let i = 0; i < allinputs.length; i++) {
            if (allinputs[i].value.trim() == "") {
                  errors[1] ="You Must Enter Data...";
                  valid.classList.remove("none");
            }else{
                  valid.classList.add("none");
                  for (let i = 0; i < cost.length; i++) {
                        if (cost[i].value < 0) {
                              errors[1] ="You Must Enter no. > 0 ...";
                              postive.classList.remove("none");
                        }else{
                              postive.classList.add("none");
                              errors.splice(0);
                        }                        
                  }
            }
      }

      if(errors.length == 0){
            if (mood == 'create') {
                  if (newproduct.count <= 0) {
                        alldata.push(newproduct);
                  }else{
                        for (let i = 0; i < newproduct.count ; i++) {
                              alldata.push(newproduct);
                        }
                  }
      
                  count.classList.remove("none");
                  btncreate.innerHTML = "Create Product";
                  btncreate.classList.replace("btn-warning" , "btn-info");
            }else {
                  alldata[globalid] = newproduct;
                  mood = 'create';
            }
      
            window.localStorage.setItem('product' , JSON.stringify(alldata));
            clearinput();
            showdata();
            displaybtn();
      }

}

let showdata = () => {
      let table = "";

      spancount.innerHTML = alldata.length;

      for (let i = 0; i < alldata.length; i++) {
            table +=`
            <tr>
                  <td> ${i + 1} </td>
                  <td> ${alldata[i].title} </td>
                  <td> ${alldata[i].price} </td>
                  <td> ${alldata[i].tax} </td>
                  <td> ${alldata[i].tcost} </td>
                  <td> ${alldata[i].discount} </td>
                  <td> ${alldata[i].total} </td>
                  <td> ${alldata[i].count} </td>
                  <td> ${alldata[i].department} </td>
                  <td> <i onclick="deleteone(${i})" class="delete fa-solid fa-trash-can"></i> </td>
                  <td> <i onclick="editone(${i})" class="edit fa-regular fa-pen-to-square"></i> </td>
            </tr>
            `;       
      }
      tbody.innerHTML = table;
}

showdata();

// clear input 
let clearinput = () => {
      title.value = "";
      cost[0].value = "";
      cost[1].value = "";
      cost[2].value = "";
      cost[3].value = "";
      cost[4].value = "";
      count.value = "";
      department.value = "";
} 

// delete 1
let deleteone = (i) => {
      alldata.splice(i,1);
      localStorage.product = JSON.stringify(alldata);
      showdata();
      displaybtn();
}

// delete all
let deleteall = () => {
      if(confirm("Are You Sure ?")){
            alldata.splice(0);
            localStorage.clear();
            showdata();
      }
      displaybtn();
}

// remove delete all btn
let displaybtn = () => {
      if (alldata.length == 0) {
            deleteallbtn.classList.add("none");
      }else{
            deleteallbtn.classList.remove("none");
      }
}
displaybtn();

// edit item
let editone = (i) => {
      let mood = 'update';
      globalid = i ;

      title.value = alldata[i].title;
      cost[0].value = alldata[i].price;
      cost[1].value = alldata[i].tax;
      cost[2].value = alldata[i].tcost;
      cost[3].value = alldata[i].discount;
      cost[4].value = alldata[i].total;
      department.value = alldata[i].department;

      count.classList.add("none");
      btncreate.innerHTML = "Update Product";
      btncreate.classList.replace("btn-info" , "btn-warning");
}


deleteallbtn.addEventListener("click",deleteall);

btncreate.addEventListener("click", createobject);

// dark-light
let shift = () => {
      if (body.classList != "light") {
           body.classList.add('light');
           card.style.backgroundColor = "white";
           Card.style.backgroundColor = "white";
           shiftbtn.classList.replace('btn-light','btn-dark')
      }else{
            body.classList.remove('light');
            card.style.backgroundColor = "black";
           Card.style.backgroundColor = "black";  
            shiftbtn.classList.replace('btn-dark','btn-light')
      }
}
shiftbtn.addEventListener("click",shift);