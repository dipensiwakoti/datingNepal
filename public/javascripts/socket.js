const socket = io({
    auth:{
        searched: senderId,  //actual user id, little funny
    }
});
console.log('Logged In User',senderId);

socket.emit('userStatus',function(){
  })

  try{
    if(receiverId){
      const SUI = receiverId ;
    }
  }
  catch{
    console.log('Couldnt proceed with searchUserId in socket.js');
  }
socket.on('onlineStatus',function(data){
    const idValue = `${data.userId} status`;
      var z=  document.querySelector(`#${CSS.escape(idValue)}`);
      z.innerHTML = '';
      const element = document.createElement('span');
      element.innerText = '';
      z.classList.remove('userStatus', 'Offline');
      element.innerText = 'Online';
      z.classList.add('userStatus', 'Online');
      z.appendChild(element);
  });
socket.on('offlineStatus',function(data){
    const idValue = `${data.userId} status`;
    var z=  document.querySelector(`#${CSS.escape(idValue)}`);
    z.innerHTML = '';
    const element = document.createElement('span');
    element.innerText = '';
    element.innerText = 'Offline';
    z.classList.remove('userStatus', 'Online');
    z.classList.add('userStatus', 'Offline');
    z.appendChild(element);
  })
socket.emit('userStatus',function(){
  })

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
 
);
var y=  document.querySelector('.wrapMessages');
console.log(y);
socket.on('private_message_distinct',function(data){
  try{
    const divElement = document.createElement('div');
    const element = document.createElement('span');
    element.innerText = data.message; 
    divElement.classList.add('distinct-user-message');
    divElement.appendChild(element);
    y.appendChild(divElement);
    console.log('senderSocketId:',data.from, 'and message:',data.message);
  }
  catch{
    console.log('There is issue receiving the message!',Error);
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
  }
  catch{
    console.log('There is issue sending the message!',Error);
  }
})    


{/* <div class="our-user-message"><span>Hello sir</span></div>
<div class="distinct-user-message"> <span>hi madam,how can i help you?</span></div> */}