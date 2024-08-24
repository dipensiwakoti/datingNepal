const profileDisplay = document.querySelector('.profileIcon');
const profileUpload= document.querySelector('.profileUpload');
const wrap = document.querySelector('.wrap');
const userinfo = document.querySelector('.bellowNav');

const moreAboutIcon = document.querySelector('.moreAbout');
const mouseAbout = document.querySelector('.mouseAbout');
const moreAboutContent = document.querySelector('.moreAboutContent');
let flag = 0;
let check = 0;
profileDisplay.addEventListener("click",()=>{
    if(flag == 0){
        console.log("Done")
    profileUpload.style.top="269px";
    wrap.style.filter="blur(0.77px)";
    flag=1;
    }
    else{
    profileUpload.style.top="-250px";
    wrap.style.filter="blur(0px)";
    flag=0;
    }
})
userinfo.addEventListener("click",()=>{
    check=0;
    profileUpload.style.top="-250px";
    moreAboutContent.style.display="none";
    wrap.style.filter="blur(0px)";
    flag=0;
})
 mouseAbout.addEventListener('click',()=>{
    if(check == 0){
        moreAboutContent.style.display= 'block';
        check =1;
    }
    else{
        moreAboutContent.style.display= 'none';
        check= 0;
    }
 })
 mouseAbout.addEventListener('mouseenter',()=>{
        moreAboutContent.style.display= 'block';
    
    // else{
    //     moreAboutContent.style.display= 'none';
    //     check= 0;
    // }
 })
 mouseAbout.addEventListener('mouseleave',()=>{
        moreAboutContent.style.display= 'none';
 })