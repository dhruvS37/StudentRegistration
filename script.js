const textarea = document.querySelectorAll(".textarea");
const submit = document.querySelector("#submit");
const stdlist = document.querySelector(".stdlist");

const img_element = document.getElementById("file");
let img_src="DummyImg.png"
img_element.addEventListener("change" , (e)=>{
    img_src=URL.createObjectURL(e.target.files[0])
});

let dob_element=document.querySelector("#dob");
const radioButtons = document.querySelectorAll('input[name="Gender"]');


let studentListArray = JSON.parse(localStorage.getItem("registraion-form"));


submit.onclick = () => {
    let name = textarea[0].value.trim();
    let enroll = textarea[1].value.trim();
    let email = textarea[2].value.trim();
    let mob = textarea[3].value.trim();
    let dob = new Date(dob_element.value).toLocaleDateString('en-GB');
    let selectedGender 
    for(i=0; i<radioButtons.length ; i++){
        if(radioButtons[i].checked){
            selectedGender=radioButtons[i].value;
            break;
        }
    }

    let istd = [ name, enroll, email , mob, img_src , dob ,selectedGender];
    if (studentListArray == null)
        studentListArray = [];
        
    if(formValidation())
        studentListArray.push(istd);
    localStorage.setItem("registration-form", JSON.stringify(studentListArray));
    console.log(formValidation())
    console.log(typeof(dob),dob)
    if(formValidation())
        displayStdList();
    img_src="DummyImg.png"
}

function displayStdList() {
    let newList = '';
    if (studentListArray != undefined ) {
        studentListArray.forEach(istd => {
            newList += `<li class="stdlist-row">
                            <div class="info">
                                <h3>${istd[0]}</h2>
                                <p>${istd[1]}</p>
                                <p>${istd[2]}</p>
                                <p>${istd[6]}</p>
                                <p>${istd[5]}</p>
                                <p>${istd[3]}</p>
                            </div>
                            <div class="img">
                                <img src="${istd[4]}" alt="DummyImg.png" width="150" height="180">
                            </div>
                        </li>  `
        });
    }
    stdlist.innerHTML=newList;
}

function formValidation(){
    let vname=false;
    let venroll=false;
    let vmob=false;
    let vdob=false;
    let vemail=false;
    let vgender=false;
    let allright=false;

    if(textarea[0].value!="")
        vname=true;
    if(textarea[1].value!="")
        venroll=true;
    if(textarea[2].value!="")
        vemail=true;
    if(textarea[3].value!="")
        vmob=true;

    var i = 0;
    while (!vgender && i < radioButtons.length) {
        if (radioButtons[i].checked) vgender = true;
        i++;        
    }

    if(new Date(dob_element.value).toLocaleDateString('en-GB')!="Invalid Date")
        vdob=true;

    if(vname && venroll && vemail && vmob && vgender && vdob)
        allright=true;
    return allright;
}
