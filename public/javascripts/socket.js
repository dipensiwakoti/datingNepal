const socket = io({
  auth:{
      searched: senderId,  //actual user id, little funny
  }
});
try{
var y=  document.querySelector('.wrapMessages');
console.log(y);
}
catch(error){
console.log('could get .wrapmessages',error);
} 
try{
var chatUsers=  document.querySelectorAll('.chatUser');
console.log(chatUsers);
chatUsers.forEach((chatUser)=>{
  const chatUserId = chatUser.id;
  chatUser.addEventListener('click',()=>{
  socket.emit('openingChat',{senderId,receiverIdUser:chatUserId});
})
})
}
catch(error){
console.log('could get .chatUser',error);
} 
const username = document.querySelector('.username ');
console.log('Logged In User',senderId);
try{
username.addEventListener('click',()=>{
  setTimeout(() => {
    try{
      socket.emit('openingChat',{senderId,receiverIdUser:receiverId});
      console.log('clicked username');
    }
    catch{
      console.log('couldnt click username');
    }
  }, 500);
})
const event = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  view: window
});
username.dispatchEvent(event);  
}
catch(error){
console.log('not in the chat route!',error);
}

socket.on('loadChats', function(e) {
let i;
const middleChat = document.querySelector('.topMiddleChat');
console.log('Loading Chats'); 
const chats = e.chats;
const profileName = e.profileName;
const profilePic = e.profilePic;
middleChat.innerHTML = '';
middleChat.innerHTML = `                    <div class="ChatImg">
<img src="/images/profilePictures/${profilePic}" alt="Not found!">
</div>
<div style="display: flex; flex-direction: column;">

<div class="username"><span>${profileName}</span></div>
<% if (searchedUser.isOnline == 1){ %>
<div class="userStatus Online" id="<%= searchedUser._id %> status"><span>Online</span></div>
<%} else{ %>
<div class="userStatus Offline" id="<%= searchedUser._id %> status"><span>Offline</span></div>
<% } %>
</div>
<div class="icons"></div>
`;

if(chats.length>0){
console.log(chats.length);
var z =  document.querySelector('.wrapMessages');
z.innerText='';
for(i=0;i<chats.length;i++){
  let addClass = '';
  if(chats[i].senderId == senderId){
    addClass = 'our-user-message'
  }
  else{
    addClass = 'distinct-user-message'
  }

  const divElement = document.createElement('div');
  const element = document.createElement('span');
  element.innerText= `${chats[i].message}`;
  divElement.classList.add(`${addClass}`);
  divElement.appendChild(element);
  z.appendChild(divElement);
  scrollToBottom();
}
const y=  document.querySelector('.wrapMessages');
}
else{
var z =  document.querySelector('.wrapMessages');
z.innerText='';
const divElement = document.createElement('div');
const element = document.createElement('span');
element.innerText= `Start Chat Now !`;
divElement.classList.add(`our-user-message`);
element.style.background = 'white';
divElement.appendChild(element);
z.appendChild(divElement);
}
});

socket.emit('userStatus',function(){
})

try{
socket.on('onlineStatus',function(data){
   const idValue = `${data.userId} status`;
    var z=  document.querySelector(`#${CSS.escape(idValue)}`);
    z.classList.remove('userStatus', 'Offline');
    z.innerText='';
    z.innerHTML='';
    const element = document.createElement('span');
    z.classList.remove('userStatus', 'Offline');
    element.innerText = 'Online';
    z.classList.add('userStatus', 'Online');
    z.appendChild(element);
});
}
catch(error){
console.log('couldnt show user status!',error);
}
socket.on('offlineStatus',function(data){
  const idValue = `${data.userId} status`;
  var z=  document.querySelector(`#${CSS.escape(idValue)}`);
  z.classList.remove('userStatus', 'Online');

  z.innerText='';
  z.innerHTML='';
  const element = document.createElement('span');
  element.innerText = '';
  element.innerText = 'Offline';
  z.classList.remove('userStatus', 'Online');
  z.classList.add('userStatus', 'Offline');
  z.appendChild(element);
})
try{
var formMsg = document.querySelector('#formMsg');  //gets up the formmm
var msg = document.querySelector('#sendMsg'); // the msg input area  where msg.vlaue will give the msg
formMsg.addEventListener('submit',(function(data){
data.preventDefault();
console.log(msg.value); 
const formData = {
  senderId:senderId ,
  receiverId: receiverId,
  message:msg.value ,
};
const xhr = new XMLHttpRequest();
xhr.open('POST', '/chatSave', true);
xhr.setRequestHeader('Content-Type', 'application/json');   //solves the error faced in the /chatSave route to parse the sent formData


xhr.onload = async function() {   //success weather true or false
    if (xhr.status === 200) {
        // If the server responds with success
       await socket.emit('sendMessage',{senderId,receiverId,message: msg.value});
        msg.value= '';
        console.log('Form submitted successfully! Response: ' + xhr.responseText);
    } else {
        console.log('Form submission failed! Status: ' + xhr.status);
    }
};

xhr.onerror = function() {
    console.log('An error occurred during the request.');
};

// Send the form data to the server
xhr.send(JSON.stringify(formData));
})

);}
catch(error){
console.log('Error getting message form datas!',error)
}
      
var audio = document.getElementById("notificationAudio");
socket.on('private_message_distinct',function(data){
try{
  const divElement = document.createElement('div');
  const element = document.createElement('span');
  element.innerText = data.message; 
  divElement.classList.add('distinct-user-message');
  divElement.appendChild(element);
  y.appendChild(divElement);
  audio.play(); 
  scrollToBottom();
  console.log('senderSocketId:',data.from, 'and message:',data.message);
  
}
catch(error) {
  console.log('There is issue receiving the message!',error);
}
})    
socket.on('private_message_ourside',function(data){
try{
  const divElement = document.createElement('div');
  const element = document.createElement('span');
  element.innerText = data.message; 
  divElement.classList.add('our-user-message');
  divElement.appendChild(element);
  y.appendChild(divElement);
  scrollToBottom();

}
catch(error){
  console.log('There is issue sending the message!',error);
}
})    

function scrollToBottom() {
const chatContainer = document.querySelector('.allMessages');
chatContainer.scrollTop = chatContainer.scrollHeight;
}
