prediction = ""
Webcam.set({
    width: 350,
    height: 300,
    img_format: 'png',
    png_quality: 90 
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("m15 version",ml5.version);
classifier = ml5.ImageClassifier('https://teachablemachine.withgoogle.com/models/63hBQ-zI3/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("updated_hand").innerHTML = results[0].label;
        if(results[0].label == "like"){
            document.getElementById("updated_hand").innerHTML = ">&#128077;";
        }
        if(results[0].label == "dislike"){
            document.getElementById("updated_hand").innerHTML = "&#128078;";
        }
        if(results[0].label == "victory"){
            document.getElementById("updated_hand").innerHTML = "&#9996;";
        }
    }
}