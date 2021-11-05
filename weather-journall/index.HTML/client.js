
/* Global Variables */
const api ="https://api.openweathermap.org/data/2.5/weather?zip=";
const apikey =",us&appid=bedbc2e2cd36239438be067f24f78768&units=imperial";


let feelings;
let zipcode;

let d =new Date();
let newDate = d.getMonth()+1+"."+d.getDay()+"."+d.getFullYear();

document.getElementById('generate').addEventListener('click',()=>{
    zipcode = document.getElementById('zip').value;
    feelings = document.getElementById('feelings').value;

    getInfo(api,apikey).then(function(myData){
        return postData({info1 : myData.main.temp, info2 : newDate , info3 :feelings});
        
        

    }).then(function(){
        return outputMessage();
    }).then((allData)=>{
        document.getElementById('date').innerHTML +='date :  '+ allData.date;
        document.getElementById('temp').innerHTML +='city temprature is '+ allData.temp;
        document.getElementById('content').innerHTML +='you feel '+ allData.content;
    });
    
});

const getInfo = async (url,key)=>{
     
    const response = await fetch(url+zipcode+key)
try{
    const myData = await response.json();
    console.log(myData);
    return myData;

}
catch(error){
console.log('you have an error'+ error);
}
}
const postData = async (urlData= {})=>{
    const response =await fetch('/postData',{
        method:'POST',
        headers:{
            'Content-Type':'application/json' ,
        },
        body: JSON.stringify(urlData)

    });
    try{
        const siteData = await response.json();
        console.log(siteData);
        return siteData;
    } catch(error){
        console.log('error'+ error);
    }
}
const outputMessage = async ()=> {
    const request = await fetch("/all");
try{
    const allData = await request.json(); 
   
    return allData;

}
catch(error){
console.log('you have an error'+ error);
}
}