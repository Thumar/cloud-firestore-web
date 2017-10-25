  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyApREa6-Q8hMQRRbEq6_ad4NU5u7dfsdfw",
    authDomain: "web-jnd.firebaseapp.com",
    databaseURL: "https://web-jnd.firebaseio.com",
    projectId: "web-jnd",
    storageBucket: "",
    messagingSenderId: "571862343"
  };
  firebase.initializeApp(config);

 const outputHeader=document.querySelector("#lblQuote");
 const inputTextField=document.querySelector("#txtQuote");
 const saveButton=document.querySelector("#saveButton");
 const loadButton=document.querySelector("#loadButton");

var firestore = firebase.firestore();
        
const docRef = firestore.doc("samples/quote");

saveButton.addEventListener("click",function(){
    const textToSave=inputTextField.value;
    console.log("Quotes "+textToSave);
    
    docRef.set({
        inspirationalQuote:textToSave   
    }).then(function(){
        console.log("Quote Save");
    }).catch(function(error){
        console.log("Got an error: ",error);
    });
});

loadButton.addEventListener("click",function(){
    docRef.get().then(function(doc){
        if(doc && doc.exists){
            const myQuote=doc.data();
            outputHeader.innerText="My Inspirational Quote: "+myQuote.inspirationalQuote;
        }
    }).catch(function(error){
        console.log("Got an error: ",error);
    });
});

//Real Time Data


getRealTimeUpdate=function(){
    docRef.onSnapshot(function(doc){
        if(doc && doc.exists){
            const myQuote=doc.data();
            console.log("Check out this document I received ",doc);
            outputHeader.innerText="My Inspirational Quote: "+myQuote.inspirationalQuote;
        }
    });
}
getRealTimeUpdate();

 