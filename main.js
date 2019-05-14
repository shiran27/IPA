

var arrivalProcess = 0; // for poisson
var arrivalRate = 1.0;
var arrivalRateMax = 1.0;
var serviceTimeProcess = 0; // for exponential
var serviceRate = 1.2;
var serviceRateMax = 1.2;
var simulationLengthType = 0; // number of customers
var simulationLength = 10000;

var bufferSizeMode = 0; // if size is inf
var bufferSize = -1; // inf




var simulationTime = 0; //simulationTime
var nextArrivalTime = 0;
var nextDepartureTime = 0;
var interArrivalTimeGenerated = 0;
var serviceTimeGenerated = 0;


var numberOfArrivals = 0;
var numberOfDepartures = 0;
var queueLength = 0;


//// for basic estimators  (Assuming ergocity)
var sumOfInterArrivalTimes = 0;
var sumOfServiceTimes = 0;
var sumQueLengthTime = 0;
var arrivalTimesArray = []; 
var sumOfSystemTimes = 0;
//// end for basic estimators




//// for IPA estimators
////var systemTime = 0; //simulationTime
var PA_L_Arrival = 0;
var PA_G_Arrival = 0;
var PA_L_Service = 0;
var PA_G_Service = 0;
var numberOfBusyPeriods = 0;
var IPAEstimatorMode = 1;
// for plots
var MQLEstArray = [];
var MQLEstTimeArray = [];
var MQLPlotMode = 1;

var MSTEstArray = [];
var MSTEstTimeArray = [];
var MSTPlotMode = 1;

var SJLEstArray = [];
var SJLEstTimeArray = [];
var SJLPlotMode = 1;

var SJMEstArray = [];
var SJMEstTimeArray = [];
var SJMPlotMode = 1;
//// end for IPA estimators




var updateInterfaceInterval;

var elem1 = document.getElementById("simulationTimeDisplay");
var elem2 = document.getElementById("progressLevelIndicator");
updateInterfaceInterval = setInterval(updateInterface,100);
loadBasicsIntoTheTable();



function simulateSystem(){

	consolePrint("Simulation started!");

	readInputs();
	loadBasicsIntoTheTable();
	initialize();
	//updateInterface();
	setTimeout(runARealization,500);

}


function runARealization(){

	var startTime = performance.now(); // to track simulation time
	while(numberOfDepartures<simulationLength){
		if (nextArrivalTime<nextDepartureTime){
			executeArrivalEvent();
		}else{
			executeDepartureEvent();
		}
	}
	var duration = performance.now() - startTime;// to track simulation time

	displayEstimates();

	consolePrint("Simulation Completed in "+ duration.toFixed(3)+" milliseconds for "+numberOfDepartures+" departures." );
	
}



function executeArrivalEvent(){
	
	// for minor estimates
	sumQueLengthTime = sumQueLengthTime + (nextArrivalTime-simulationTime)*queueLength;
	// end for minor estimates


	// for IPA estimator
	if(IPAEstimatorMode){
		if(queueLength==0){
			PA_L_Arrival = 0;
		}else{
			PA_L_Arrival = PA_L_Arrival + interArrivalTimeGenerated;
			PA_G_Arrival = PA_G_Arrival + PA_L_Arrival;
		}
		// for plotting
		if(SJLPlotMode){
			var MAREst = 1/(sumOfInterArrivalTimes/(numberOfArrivals-1));
			SJLEstArray.push(PA_G_Arrival/(MAREst*(numberOfArrivals-1)));
			////SJLEstArray.push(PA_G_Arrival/(arrivalRate*(numberOfArrivals)));
			SJLEstTimeArray.push(numberOfArrivals);
		}
	}

	// end IPA estimator


	simulationTime = nextArrivalTime;
	
	queueLength = queueLength + 1;
	numberOfArrivals = numberOfArrivals + 1;

	////interArrivalTimeGenerated = generateExponential(arrivalRate);
	interArrivalTimeGenerated = generateInterArrivalTime();
	if(bufferSizeMode==0 || queueLength < bufferSize){
		nextArrivalTime = simulationTime + interArrivalTimeGenerated;
	}else{
		nextArrivalTime = nextDepartureTime + interArrivalTimeGenerated;
	}


	// for minor estimates
	sumOfInterArrivalTimes = sumOfInterArrivalTimes + interArrivalTimeGenerated;
	arrivalTimesArray.push(simulationTime); // time stamp at the arrival event

	if(MQLPlotMode){
		MQLEstArray.push(sumQueLengthTime/simulationTime);
		MQLEstTimeArray.push(numberOfArrivals);
	}
	// end for minor estimates
	
}


function executeDepartureEvent(){
	
	//for minor estimates
	sumQueLengthTime = sumQueLengthTime + (nextDepartureTime-simulationTime)*queueLength;
	// end for minor estimates

	// for IPA estimator
	if(IPAEstimatorMode){
		PA_L_Service = PA_L_Service + serviceTimeGenerated;
		PA_G_Service = PA_G_Service + PA_L_Service;
		if(queueLength==1){
			PA_L_Service = 0;
		}
		// for plotting
		if(SJMPlotMode){
			////SJMEstArray.push(-1*PA_G_Service/(serviceRate*(numberOfDepartures)));
			var MSREst = 1/(sumOfServiceTimes/(numberOfDepartures));
			SJMEstArray.push(-1*PA_G_Service/(MSREst*(numberOfDepartures)));
			SJMEstTimeArray.push(numberOfDepartures);
		}
	}
	// end IPA estimator


	simulationTime = nextDepartureTime;
	
	queueLength = queueLength - 1; // queue includes the server
	numberOfDepartures = numberOfDepartures + 1;


	////serviceTimeGenerated = generateExponential(serviceRate);
	serviceTimeGenerated = generateServiceTime();
	if(queueLength==0){
		nextDepartureTime = nextArrivalTime + serviceTimeGenerated;	
		
		// for IPA
		numberOfBusyPeriods = numberOfBusyPeriods + 1;
		//end  for IPA

	}else{
		nextDepartureTime = simulationTime + serviceTimeGenerated;
	}


	
	// for minor estimates
	sumOfServiceTimes = sumOfServiceTimes + serviceTimeGenerated;
	sumOfSystemTimes = sumOfSystemTimes + simulationTime-arrivalTimesArray.shift();

	if(MSTPlotMode){
		MSTEstArray.push(sumOfSystemTimes/numberOfDepartures);
		MSTEstTimeArray.push(numberOfDepartures);
	}
	// end for minor estimates

}








function initialize(){

	simulationTime = 0; //simulationTime
	nextArrivalTime = 0;
	nextDepartureTime = 0;
	interArrivalTimeGenerated = 0;
	serviceTimeGenerated = 0;

	numberOfArrivals = 0;
	numberOfDepartures = 0;
	queueLength = 0;



	////interArrivalTimeGenerated = generateExponential(arrivalRate);
	interArrivalTimeGenerated = generateInterArrivalTime();
	nextArrivalTime = interArrivalTimeGenerated;


	////serviceTimeGenerated = generateExponential(serviceRate);
	serviceTimeGenerated = generateServiceTime();
	nextDepartureTime = nextArrivalTime + serviceTimeGenerated;

	updateInterface();



	// for minor estimates
	sumOfInterArrivalTimes = interArrivalTimeGenerated;
	sumOfServiceTimes = serviceTimeGenerated;
	sumQueLengthTime = 0; 
	arrivalTimesArray = [];
	sumOfSystemTimes = 0; 

	MQLEstArray = [];
	MQLEstTimeArray = [];
	MSTEstArray = [];
	MSTEstTimeArray = [];


	// end for minor updates


	// for IPA estimators
	////systemTime = 0;
	PA_L_Arrival = 0; // level 1 aggregator
	PA_L_Service = 0; // level 1 aggregator  
	PA_G_Arrival = 0; // level 2 aggregator
	PA_G_Service = 0; // level 2 aggregator
	numberOfBusyPeriods = 0;

	SJLEstArray = [];
	SJLEstTimeArray = [];
	SJMEstArray = [];
	SJMEstTimeArray = [];
	
	document.getElementById('myPlot1').innerHTML = "";
	document.getElementById('myPlot2').innerHTML = "";
	document.getElementById('myPlot3').innerHTML = "";
	document.getElementById('myPlot4').innerHTML = "";

	////document.getElementById('PlotsParent1').innerHTML = "";
	////document.getElementById('PlotsParent2').innerHTML = "";


}

function generateInterArrivalTime(){
	if(arrivalProcess==0){//  exponential
		return generateExponential(arrivalRate);	
	}else if(arrivalProcess==1){ // uniform
		return generateUniform(arrivalRate,arrivalRateMax);
	}else if(arrivalProcess==2){ // deterministic
		return generateDeterministic(arrivalRate);
	}
	
}

function generateServiceTime(){
	
	if(serviceTimeProcess==0){//  exponential
		return generateExponential(serviceRate);	
	}else if(serviceTimeProcess==1){ // uniform
		return generateUniform(serviceRate,serviceRateMax);
	}else if(serviceTimeProcess==2){ // deterministic
		return generateDeterministic(serviceRate);
	}

}

function generateExponential(rate){

	var U = Math.random();
	return -1*Math.log(1-U)/rate;

}

function generateUniform(rate,rateMax){//(2/(T_max+T_min) , 1/T_min)

	var U = Math.random();
	////var rateRandom = 2*rate - rateMax + (rateMax-rate)*2*U;
	////var rateRandom = rateMax - 2*(rateMax-rate)*U;
	////return 1/rateRandom;
	var TMin = 1/rateMax;
	var TMax = 2/rate-TMin; 
	return TMin + (TMax-TMin)*U;
}

function generateDeterministic(rate){

	return 1/rate;

}