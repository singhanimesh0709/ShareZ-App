const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");

const baseURL = "file:///D:\VsVideos";
const uploadURL = `${baseURL}\files`;
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
            fileInput.files = files[0].files;
            console.log(fileInput);
            uploadFile();
         }//else{
         //showToast("max file size is 200 mb");
        // }
    }//else if(files.length>1){
    //     showToast("you can't upload multiple files");
    // }
    dropZone.classList.remove("dragged");
    });

    const uploadFile = () => {
        const xhr = new XMLHttpRequest();
       const files = fileInput.files[0];// getting the first file, as we allow user to uploa just one file
       const formData = new FormData(); 
    }


