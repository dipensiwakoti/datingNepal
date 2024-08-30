const socket = io({
    auth:{
        searched: senderId,  //actual user id, little funny
    }
});
try{
  var y=  document.querySelector('.wrapMessages');
  console.log(y);
}
catch{
  console.log('could get .wrapmessages');
} 

const username = document.querySelector('.username ');
if(username){
  console.log(username); 
}
console.log('Logged In User',senderId);
try{
  username.addEventListener('click',()=>{
    socket.emit('openingChat',{senderId,receiverIdUser:receiverId});
  })
  username.click();
}
catch{
  console.log('not in the chat route!');
}

socket.on('loadChats', function(e) {
  let i;
  console.log('Loading Chats');
  const chats = e.chats;
  console.log(e);
  console.log(chats.length);
  var z =  document.querySelector('.wrapMessages');
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
catch{
  console.log('couldnt show user status!');
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
catch{
  console.log('Error getting message form datas!')
}
// var y=  document.querySelector('.wrapMessages');
// console.log(y);
        
var audio = document.getElementById("notificationAudio");
console.log(audio);
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
