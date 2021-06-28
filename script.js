var results={}
var DATA = '{"Temperature":10000,"Luminosity":10000,"Radius":1000,"Absmag":5, }';

var Colorvalue = "Red"
var Spectralclassvalue = "M"
var sliderTemperature = document.getElementById("sliderTemperature")
var sliderLuminosity = document.getElementById("sliderLuminosity")
var sliderRadius = document.getElementById("sliderRadius")
var sliderAbsmag = document.getElementById("sliderAbsmag")

var valueTemperature = document.getElementById("valueTemperature")
var valueLuminosity = document.getElementById("valueLuminosity")
var valueRadius = document.getElementById("valueRadius")
var valueAbsmag = document.getElementById("valueAbsmag")

var valuePrediction = document.getElementById("valuePrediction")

//var i = 1
valueTemperature.innerHTML=sliderTemperature.value
valueLuminosity.innerHTML=sliderLuminosity.value
valueRadius.innerHTML=sliderRadius.value
valueAbsmag.innerHTML=sliderAbsmag.value

sliderTemperature.oninput = function() {
  valueTemperature.innerHTML = this.value
  makePrediction()
}

sliderLuminosity.oninput = function() {
  valueLuminosity.innerHTML = this.value
  makePrediction()
}

sliderRadius.oninput = function() {
  valueRadius.innerHTML = this.value
  makePrediction()
}

sliderAbsmag.oninput = function() {
  valueAbsmag.innerHTML = this.value
  makePrediction()
}

Color.oninput = function() {
  Colorvalue=this.value
  console.log("Just saw for Choice1:",Colorvalue)
  makePrediction()
}

Spectralclass.oninput = function() {
  Spectralclassvalue=this.value
  console.log("Just saw for Choice1:",Spectralclassvalue)
  makePrediction()
}


function predict(data = DATA) {
  console.log("\n\n\nPrediction input: ",data)
  var ENDPOINT = 'https://n4oktzjxm5.execute-api.us-east-1.amazonaws.com/Predict/8c9470f4-26e4-46ed-a4f5-51f196fdd8a1';
  return fetch(ENDPOINT, {
    method: 'POST',
    body: data,
  })
  .then(res => res.json())
  .then(response => JSON.parse(response.body))
  .then(function(data) {
    //processPrediction(data)
    var predictedValue=data["predicted_label"]
    valuePrediction.innerHTML=predictedValue
  })
  .catch(err => console.log('err', err));
};

function processPrediction(data) {
  console.log("processAdmissionPrediction: ",data)
  var predictedValue=data["predicted_label"]*100
  valuePrediction.innerHTML=predictedValue.toFixed(1)
}

function makePrediction() {
  var c=valueTemperature.innerHTML
  var y=valueLuminosity.innerHTML
  var h=valueRadius.innerHTML
  var a=valueAbsmag.innerHTML
  var d = `{"Temperature (K)":${c},"Luminosity(L/Lo)":${y},"Radius(R/Ro)":${h},"Absolute magnitude(Mv)":${a},"Star color":"${Colorvalue}","Spectral Class":"${Spectralclassvalue}"}`;
  //var d2 = '{"Temperature (K)":20969.5,"Luminosity(L/Lo)":424710.00004,"Radius(R/Ro)":974.2542,"Absolute magnitude(Mv)":4.069999999999999,"Star color":"Red","Spectral Class":"M"}'
  //var d = `{"Temperature":${c},"Luminosity":${y},"Radius":${h},"Radius":${a}}`;
  predict(d)
}