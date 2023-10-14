const studentList=document.querySelector("#student-list");
const studentForm=document.querySelector("#student-form");
let editId;
const API="https://652ab6634791d884f1fd4339.mockapi.io/Student";
// create form
studentForm.innerHTML +=`
<form class="form-data">
<h1 class="head">STUDENT FORM</h1>
<input
type="text"
name="name"
required
value=""
placeholder="Student-name"
class="input-text"
id="input-name"
/>
<input
type="text"
name="batch"
required
value=""
placeholder="Student-Batch"
class="input-text"
id="input-batch"
/>
<input
type="text"
name="age"
required
value=""
placeholder="Student-Age"
class="input-text"
id="input-age"
/>
<div>
<button
type="submit"
id="add-btn"
class="btn">Add Students</button>
<button
type="submit"
id="update-btn"
class="btn">Update Students</button>
</div>
</form>
`;
const updateBtn=document.querySelector("#update-btn");
const addBtn=document.querySelector("#add-btn");
const inputName=document.querySelector("#input-name");
const inputBatch=document.querySelector("#input-batch");
const inputAge=document.querySelector("#input-age");
updateBtn.style.display="none";

// get data
function renderAllDataContent(){
    fetch(API,{
        method:"GET",
    })
    .then((response)=>response.json())
    .then((data)=>renderAllStudent(data))
    .catch((err)=>console.log("Error:",err));
}
renderAllDataContent();



// create 

function createData(newStudent){
        fetch(API,{
            method: "POST",
            body:JSON.stringify(newStudent),
            headers:{
                "Content-Type":"application/json",
            },
        })
   .then((response)=>response.json())
    .then((data)=>renderStudent(data))
    .then(()=>{
        inputName.value="";
        inputBatch.value="";
        inputAge.value="";
    })
    .catch((err)=>console.log("error",err))
     }

     //update
     function updateData(updatedStudent) {
        fetch(`${API}/${editId}`,
         {
          method: "PUT",
          body: JSON.stringify(updatedStudent),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(() => location.reload())
          .catch((err) => console.log("Error", err));
      }

//delete
function deleteData(id,parent){
    fetch(`${API}/${id}`,{
        method:"DELETE",
        header:{
            "content-type":"application/json",
        }
    })
    .then(()=>parent.parentNode.remove())
    .catch((err)=>console.log("error",err));
}



function renderStudent(stud){
    const studentDiv=document.createElement("div");
    studentDiv.className="main";
    studentDiv.innerHTML +=`
    <h1>${stud.name}</h1>
    <p><span class="span-h">Batch:</span>-<span id="batch-val">${stud.batch}</span></p>
    <p><span class="span-h">Age:</span>-<span id="age-val">${stud.age}</span></p>
    <div class="btn-group">
    <button data-id=${stud.id} id="edit-btn"class="btn">Edit</button>
    <button data-id=${stud.id} id="del-btn" class="btn">Delete</button>
    </div>
    `;
   studentList.append(studentDiv);
    // console.log(studentDiv)
}
function renderAllStudent(student){
    student.forEach((student) => {
        renderStudent(student);
    });
}

studentForm.addEventListener("click",(e)=>{
    
    e.preventDefault();
    if(e.target.id=="add-btn")
    {
        const newStudent={
            name:inputName.value,
            batch:inputBatch.value,
            age:inputAge.value,
        };
        createData(newStudent);
    }
    if(e.target.id=="update-btn"){
        const updatedStudent = {
            name: inputName.value,
            batch: inputBatch.value,
            age: inputAge.value,
          };
          updateData(updatedStudent);
        }
});
function populateStudentForm(parent) {
    const editableParent = parent.parentNode;
    inputName.value = editableParent.querySelector("h1").textContent;
    inputBatch.value = editableParent.querySelector("#batch-val").textContent;
    inputAge.value = editableParent.querySelector("#age-val").textContent;
    updateBtn.style.display = "block";
    addBtn.style.display = "none";
  }
 
studentList.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    const parent = event.target.parentNode;
    console.log(parent);
    if (event.target.id === "del-btn") {
      deleteData(id, parent);
    }
    if (event.target.id === "edit-btn") {
        populateStudentForm(parent);
      editId = id;
    }
  });
       
