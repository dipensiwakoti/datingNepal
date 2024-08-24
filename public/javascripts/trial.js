const profileDisplay = document.querySelector('.profileIcon');
const profileUpload= document.querySelector('.profileUpload');
const wrap = document.querySelector('.wrap');
const userinfo = document.querySelector('.bellowNav');
let flag = 0;
profileDisplay.addEventListener("click",()=>{
    if(flag == 0){
        console.log("Done")
    profileUpload.style.top="269px";
    wrap.style.filter="blur(1.5px)";
    flag=1;
    }
    else{
    profileUpload.style.top="-250px";
    wrap.style.filter="blur(0px)";
    flag=0;
    }
})
userinfo.addEventListener("click",()=>{
    profileUpload.style.top="-250px";
    wrap.style.filter="blur(0px)";
    flag=0;
})