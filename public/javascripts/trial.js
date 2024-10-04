const profileDisplay = document.querySelector('.profileIcon');
const profileUpload= document.querySelector('.profileUpload');
const wrap = document.querySelector('.wrap');
const userinfo = document.querySelector('.bellowNav');
const likesCountFinal = document.querySelectorAll('.likesCountFinal');
const likesCountFinalTwo = document.querySelectorAll('.likesCountFinalTwo');
const userId = document.querySelector('#userId');

const moreAboutIcon = document.querySelector('.moreAbout');
const mouseAbout = document.querySelector('.mouseAbout');
const moreAboutContent = document.querySelector('.moreAboutContent');
const menuIcon = document.getElementById('menuBoxIcon');
const menuIconBox = document.querySelector('.wrapRes_Menu_List'); //whole wrap box

let flag = 0;
let check = 0;
let menu = 0;
menuIcon.addEventListener('click',()=>{
    if(menu==0){
        menuIconBox.style.display = 'block';
        menu = 1;
    } 
    else  {
        menuIconBox.style.display = 'none';
        menu = 0;
    }
})
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
});
userinfo.addEventListener("click",()=>{
    check=0;
    profileUpload.style.top="-250px";
    moreAboutContent.style.display="none";
    wrap.style.filter="blur(0px)";
    flag=0;
});
 mouseAbout.addEventListener('click',()=>{
    if(check == 0){
        moreAboutContent.style.display= 'block';
        check =1;
    }
    else{
        moreAboutContent.style.display= 'none';
        check= 0;
    }
 });
 mouseAbout.addEventListener('mouseenter',()=>{
        moreAboutContent.style.display= 'block';
    

 });
 mouseAbout.addEventListener('mouseleave',()=>{
        moreAboutContent.style.display= 'none';
 });
 likesCountFinalTwo.forEach(function(post){
     console.log('liked or disliked')
    post.addEventListener('click',()=>{
        setTimeout(function(){
            location.reload();
        },10);
       });
    })
 likesCountFinal.forEach(function(postLike){
    console.log('liked or disliked')
    postLike.addEventListener('click',()=>{
        setTimeout(function(){
               window.location.reload();
        },10);
       });
    })




