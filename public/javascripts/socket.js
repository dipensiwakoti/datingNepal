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
    console.log('Could proceed with searchUserId in socket.js');
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

var formMsg = document.querySelector('#formMsg');
var msg = document.querySelector('#sendMsg');
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
xhr.setRequestHeader('Content-Type', 'application/json');


  xhr.onload = function() {
    msg.value='';
      if (xhr.status === 200) {
          // If the server responds with success
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