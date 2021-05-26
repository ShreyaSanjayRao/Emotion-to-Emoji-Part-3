var Predicition1="";
var Predicition2="";
Webcam.set({
    width :350,
    height:350,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function Camera()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src=" '+data_uri +'">';
    });
}
console.log("ml5.version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6n-N7Rmnm/model.json",modelLoaded);
function modelLoaded()
{
    console.log("modleLoaded");
}
function speak()
{
    var synth=window.speechSynthesis;
    speak_data1="The First Predicition is: "+Predicition1;
    speak_data2="And The Second Predicition is: "+Predicition2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterthis);
}
function checkfunction()
{
    img=document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}
function gotResult (error,results) {
    if(error) {
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        Predicition1=results[0].label;
        Predicition2=results[1].label;
        speak();
        if(results[0].label =="happy")
        {
            document.getElementById("update_emoji").innerHTML ="&#128522;";
        }
        if(results[0].label =="sad")
        {
            document.getElementById("update_emoji").innerHTML ="&#128532;";
        }
        if(results[0].label =="angry")
        {
            document.getElementById("update_emoji").innerHTML ="&#128548;";
        }
        if(results[1].label =="happy")
        {
            document.getElementById("update_emoji2").innerHTML ="&#128522;";
        }
        if(results[1].label =="sad")
        {
            document.getElementById("update_emoji2").innerHTML ="&#128532;";
        }
        if(results[1].label =="angry")
        {
            document.getElementById("update_emoji2").innerHTML ="&#128548;";
        }
    }
}