const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");
const bgProgress = document.querySelector(".bg-progress");
const percentDiv = document.querySelector("#percent");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
// const baseURL = "file:///D:\VsVideos";
// const uploadURL = `${baseURL}\files`;
const baseURL = "http://localhost:3000";
const uploadURL = `${baseURL}/api/files`;
// const uploadURL = `${baseURL}\files`;

const maxAllowedSize = 200*1024*1024;   // 200 mb

browseBtn.addEventListener("click",()=>{
fileInput.click();
});

dropZone.addEventListener("dragover",(e)=>{
e.preventDefault();// dragover ka bhi default behaviour something we don't want
if(!dropZone.classList.contains("dragged")){
    dropZone.classList.add("dragged");
}
//console.log("dropping files");
});

dropZone.addEventListener("dragleave",(e)=>{
dropZone.classList.remove("dragged");
//console.log("drag ended");
})

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();// default behaviour is to download.
    console.log("dropped",e.dataTransfer.files[0].name);
    
    const files = e.dataTransfer.files; // when we consoled the event e , we saw that uploaded files are saved in e.dataTransfer as files
    if(files.length ===1){
        if(files[0].size < maxAllowedSize){
            fileInput.files = files;
            
            uploadFile();
         }//else{
         //showToast("max file size is 200 mb");
        // }
    }//else if(files.length>1){
    //     showToast("you can't upload multiple files");
    // }
    dropZone.classList.remove("dragged");
    });

    fileInput.addEventListener("change",()=>{ console.log("this was fired ----------",fileInput.files);
        if(fileInput.files.length > 0){
            if(fileInput.files[0].size>maxAllowedSize){
                //showToast("Max file size is 200 mb");
                fileInput.value = ""; // resetting the input value
                return;
            }
        }//aadded by me
    

        uploadFile();
    });

    const uploadFile = () => {
        progressContainer.style.display = "block";
        const files = fileInput.files[0];// getting the first file, as we allow user to uploa just one file
       const formData = new FormData(); 
       formData.append("myfile",files);
       
       const xhr = new XMLHttpRequest();
       
       xhr.onreadystatechange = ()=>{ // ye tab fir hoota hao jab event change hota hai, like, stop , finish,star etc.
           if(xhr.readyState === XMLHttpRequest.DONE){
               console.log(xhr.response);// in this xhr.response we'll have the url  of the file we just uploded. as a jason object
               showLink(JSON.parse(xhr.response));   // ye JSON object hai toh pajle hum isse normal object me parse karenge
           }
       };

       xhr.upload.onprogress= updateProgress;
       xhr.open('POST',uploadURL);
       xhr.send(formData);
    }

const updateProgress = (e)=>{
    var percent = Math.round((100 * e.loaded) / e.total);
    bgProgress.style.width=`${percent}%`;
    percentDiv.innerText = percent;
    progressBar.style.transform = `scaleX(${percent/100})`;
}

const showLink = ({file})=>{// ye destructuring karke file nikal liya, issilie wha JSON.parse bhi zaroori tha. so that we get a JS object and not a JSON object
console.log(file);

}