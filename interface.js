
function readInputs(){

	arrivalProcess = document.getElementById("arrivalDistributionDropdown").selectedIndex;
	if(arrivalProcess==1){
		var array = document.getElementById("arrivalRate").value.split(",");
		arrivalRate = 2/(Number(array[0])+Number(array[1])); //mean
		arrivalRateMax = 1/Number(array[0]);  //max
		if (isNaN(arrivalRate)){//forgot to enter the range!
			consolePrint("Define the range of the uniform distribution (of arrival rates) properly !!!");
			arrivalRate = 1/Number(document.getElementById("arrivalRate").value);
			arrivalRateMax = arrivalRate;
		}
	}else{
		arrivalRate = Number(document.getElementById("arrivalRate").value);
	}

	serviceTimeProcess = document.getElementById("serviceTimeDistributionDropdown").selectedIndex;
	if(serviceTimeProcess==1){
		var array = document.getElementById("serviceRate").value.split(",");
		serviceRate = 2/(Number(array[0])+Number(array[1]));
		serviceRateMax = 1/Number(array[1]);
		if (isNaN(serviceRate)){//forgot to enter the range!
			consolePrint("Define the range of the uniform distribution (of service rates) properly !!!");
			serviceRate = 1/Number(document.getElementById("serviceRate").value);
			serviceRateMax = serviceRate;
		}
	}else{
		serviceRate = Number(document.getElementById("serviceRate").value);
	}

	bufferSizeMode = document.getElementById("bufferSizeDropdown").selectedIndex;
	bufferSize = Number(document.getElementById("bufferSize").value);
	

	simulationLengthType = document.getElementById("simulationLengthDropdown").selectedIndex;
	simulationLength = document.getElementById("simulationLength").value;


	MQLPlotMode = Number(document.getElementById("MQLPlotMode").checked);
	MSTPlotMode = Number(document.getElementById("MSTPlotMode").checked);


	IPAEstimatorMode = Number(document.getElementById("IPAEstimatorMode").checked);	
	SJLPlotMode = Number(document.getElementById("SJLPlotMode").checked);
	SJMPlotMode = Number(document.getElementById("SJMPlotMode").checked);



}




function updateInterface(){
	var st = Math.round(simulationTime*1000)/1000;
	elem1.innerHTML = st.toString();

	var width = numberOfDepartures*100/simulationLength;
	//console.log(width);
	elem2.style.width = width + "%"; 
    elem2.innerHTML = width * 1 + "%";

}




function stopSimulation(){
	consolePrint("Simulation stopped!")
	readInputs();
	loadBasicsIntoTheTable();
	initialize();
	
}


function refreshAll(){
    location.reload(true);
    consolePrint("Web-page will be reloaded!")
}


function consolePrint(consoleText){
	
	document.getElementById("consoleText").innerHTML += "> "+consoleText+"<br>";
	document.getElementById("consoleText").scrollTop = document.getElementById("consoleText").scrollHeight;
	
}


function loadBasicsIntoTheTable(){

	var theoreticalValues = calculateTheoreticalValues();

	var MARTheo = theoreticalValues[0]; 
	var MSRTheo = theoreticalValues[1]; 
	var MQLTheo = theoreticalValues[2]; 
	var MSTTheo = theoreticalValues[3]; 
	var SJLTheo = theoreticalValues[4]; 
	var SJMTheo = theoreticalValues[5]; 


	document.getElementById("MARTheo").innerHTML = MARTheo.toFixed(3).toString();
	document.getElementById("MAREst").innerHTML = "-";
	document.getElementById("MARPE").innerHTML = "-";
	document.getElementById("MARRem").innerHTML = "-";

	document.getElementById("MSRTheo").innerHTML = MSRTheo.toFixed(3).toString();
	document.getElementById("MSREst").innerHTML = "-";
	document.getElementById("MSRPE").innerHTML = "-";
	document.getElementById("MSRRem").innerHTML = "-";

	if(MQLTheo!="-"){
		document.getElementById("MQLTheo").innerHTML = MQLTheo.toFixed(3).toString();
	}else{
		document.getElementById("MQLTheo").innerHTML = MQLTheo;
	}
	document.getElementById("MQLEst").innerHTML = "-";
	document.getElementById("MQLPE").innerHTML = "-";
	document.getElementById("MQLRem").innerHTML = "-";


	if(MSTTheo!="-"){
		document.getElementById("MSTTheo").innerHTML = MSTTheo.toFixed(3).toString();
	}else{
		document.getElementById("MSTTheo").innerHTML = MSTTheo;
	}
	document.getElementById("MSTEst").innerHTML = "-";
	document.getElementById("MSTPE").innerHTML = "-";
	document.getElementById("MSTRem").innerHTML = "-";


	if(SJLTheo!="-"){
		document.getElementById("SJLTheo").innerHTML = SJLTheo.toFixed(3).toString();
	}else{
		document.getElementById("SJLTheo").innerHTML = SJLTheo;
	}
	document.getElementById("SJLEst").innerHTML = "-";
	document.getElementById("SJLPE").innerHTML = "-";
	document.getElementById("SJLRem").innerHTML = "-";


	if(SJMTheo!="-"){
		document.getElementById("SJMTheo").innerHTML = SJMTheo.toFixed(3).toString();
	}else{
		document.getElementById("SJMTheo").innerHTML = SJMTheo;
	}
	document.getElementById("SJMEst").innerHTML = "-";
	document.getElementById("SJMPE").innerHTML = "-";
	document.getElementById("SJMRem").innerHTML = "-";

}


function arrivalDistributionChanged(val){// setting some default values
	if(val==1){
		document.getElementById("arrivalRate").value = "0.5,1.5";
	}else{
		document.getElementById("arrivalRate").value = "1";
	}
}

function serviceTimeDistributionChanged(val){// setting some default values
	if(val==1){
		document.getElementById("serviceRate").value = "0.25,0.75";
	}else{
		document.getElementById("serviceRate").value = "1.5";
	}
}



function calculateTheoreticalValues(){

	var MARTheo = "-";
	var MSRTheo = "-";
	var MQLTheo = "-";
	var MSTTheo = "-";
	var SJLTheo = "-";
	var SJMTheo = "-";

	
	// read distribution data
	arrivalProcess = document.getElementById("arrivalDistributionDropdown").selectedIndex;
	if(arrivalProcess==1){// uniform distribution
		var array = document.getElementById("arrivalRate").value.split(",");
		arrivalRate = 2/(Number(array[0])+Number(array[1])); //mean
		arrivalRateMax = 1/Number(array[0]);  //max
		if (isNaN(arrivalRate)){//forgot to enter the range!
			consolePrint("Define the range of the uniform distribution (of arrival rates) properly !!!");
			arrivalRate = 1/Number(document.getElementById("arrivalRate").value);
			arrivalRateMax = arrivalRate;
		}
	}else{// other
		arrivalRate = Number(document.getElementById("arrivalRate").value);
	}

	serviceTimeProcess = document.getElementById("serviceTimeDistributionDropdown").selectedIndex;
	if(serviceTimeProcess==1){// uniform distribution
		var array = document.getElementById("serviceRate").value.split(",");
		serviceRate = 2/(Number(array[0])+Number(array[1]));
		serviceRateMax = 1/Number(array[0]);
		if (isNaN(serviceRate)){//forgot to enter the range!
			consolePrint("Define the range of the uniform distribution (of service rates) properly !!!");
			serviceRate = Number(document.getElementById("serviceRate").value);
			serviceRateMax = serviceRate;
		}
	}else{// other
		serviceRate = Number(document.getElementById("serviceRate").value);
	}



	var MARTheo = arrivalRate;
	var MSRTheo = serviceRate;
	var rho =  MARTheo/MSRTheo;


	if(arrivalProcess==0 && serviceTimeProcess==0){//M/M/1
		
		var MQLTheo = rho/(1-rho);
		var MSTTheo = (1/MSRTheo)/(1-rho);
		var SJLTheo = 1/sq(MSRTheo-MARTheo);
		var SJMTheo = -1/sq(MSRTheo-MARTheo);
	
	}else if(arrivalProcess==0 && serviceTimeProcess==1){ //M/U/1

		var TMin = 1/serviceRateMax;
		var TMax = 2/serviceRate-TMin;
		var varT = sq(TMax-TMin)/12; 

		var MQLTheo = (rho/(1-rho)) - (sq(rho)/(2*(1-rho)))*(1-sq(MSRTheo)*varT);
		var MSTTheo = ((1/MSRTheo)/(1-rho)) - ((rho/MSRTheo)/(2*(1-rho)))*(1-sq(MSRTheo)*varT);
		var SJLTheo = ((1+sq(MSRTheo)*varT)/(2*sq(MSRTheo-MARTheo)));
		var SJMTheo = -((1-rho+(sq(rho)/2))/sq(MSRTheo-MARTheo))-(sq(rho)*varT/(2*sq(1-rho)));	

	}else if(arrivalProcess==0 && serviceTimeProcess==2){ // M/D/1

		var MQLTheo = rho*(1-(rho/2))/(1-rho);
		var MSTTheo = (1/MSRTheo)*(1-(rho/2))/(1-rho);
		var SJLTheo = 1/(2*sq(MSRTheo-MARTheo));;
		var SJMTheo = -((1-rho+(sq(rho)/2))/sq(MSRTheo-MARTheo));

	}

	

	var answer = [MARTheo,MSRTheo,MQLTheo,MSTTheo,SJLTheo,SJMTheo];
	return answer;



}










function sq(val){
	return Math.pow(val,2);
}











function displayEstimates(){

	// var MAREst = 1/(sumOfInterArrivalTimes/(1+numberOfArrivals));
	// var MSREst = 1/(sumOfServiceTimes/(1+numberOfDepartures));

	var MAREst = 1/(sumOfInterArrivalTimes/(numberOfArrivals-1));
	var MSREst = 1/(sumOfServiceTimes/(numberOfDepartures));

	document.getElementById("MAREst").innerHTML = MAREst.toFixed(3).toString();
	document.getElementById("MSREst").innerHTML = MSREst.toFixed(3).toString();

	var MQLEst = sumQueLengthTime/simulationTime;
	document.getElementById("MQLEst").innerHTML = MQLEst.toFixed(3).toString();

	var MSTEst = sumOfSystemTimes/numberOfDepartures;
	document.getElementById("MSTEst").innerHTML = MSTEst.toFixed(3).toString();

	

	
	// theoretical values

	// var lambda = Number(document.getElementById("arrivalRate").value);
	// var mu = Number(document.getElementById("serviceRate").value);	
	// var rho = lambda/mu;
	// var MQLTheo = rho/(1-rho);
	// var MSTTheo = (1/mu)/(1-rho);
	var theoreticalValues = calculateTheoreticalValues();

	var MARTheo = theoreticalValues[0]; 
	var MSRTheo = theoreticalValues[1]; 
	var MQLTheo = theoreticalValues[2]; 
	var MSTTheo = theoreticalValues[3]; 
	var SJLTheo = theoreticalValues[4]; 
	var SJMTheo = theoreticalValues[5]; 


	// percentage errors

	var MARPE = 100*(Math.abs(MAREst-MARTheo)/MARTheo);
	var MSRPE = 100*(Math.abs(MSREst-MSRTheo)/MSRTheo);
	document.getElementById("MARPE").innerHTML = MARPE.toFixed(3).toString();
	document.getElementById("MSRPE").innerHTML = MSRPE.toFixed(3).toString();

	if(MQLTheo!="-"){
		var MQLPE = 100*(Math.abs(MQLEst-MQLTheo)/MQLTheo);
		document.getElementById("MQLPE").innerHTML = MQLPE.toFixed(3).toString();
	}else{
		var MQLPE = "-";
		document.getElementById("MQLPE").innerHTML = MQLPE;
	}

	if(MSTTheo!="-"){
		var MSTPE = 100*(Math.abs(MSTEst-MSTTheo)/MSTTheo);
		document.getElementById("MSTPE").innerHTML = MSTPE.toFixed(3).toString();
	}else{
		var MSTPE = "-";
		document.getElementById("MSTPE").innerHTML = MSTPE;
	}
	
	


	// remarks
	document.getElementById("MARRem").innerHTML = "Inter-arrival times";
	document.getElementById("MSRRem").innerHTML = "Service times";
	document.getElementById("MQLRem").innerHTML = "Full state information";
	document.getElementById("MSTRem").innerHTML = "Full state information";
	


	if(IPAEstimatorMode){

		// estimates

		////var SJLEst = PA_G_Arrival/(arrivalRate*(numberOfArrivals-1));
		var SJLEst = PA_G_Arrival/(MAREst*(numberOfArrivals-1));
		document.getElementById("SJLEst").innerHTML = SJLEst.toFixed(3).toString();


		////var SJMEst = -1*PA_G_Service/(serviceRate*(numberOfDepartures-1));
		var SJMEst = -1*PA_G_Service/(MSREst*(numberOfDepartures));
		document.getElementById("SJMEst").innerHTML = SJMEst.toFixed(3).toString();


		// percentage errors
		if(SJLTheo!="-"){
			var SJLPE = 100*(Math.abs(SJLEst-SJLTheo)/SJLTheo);
			document.getElementById("SJLPE").innerHTML = SJLPE.toFixed(3).toString();
		}else{
			var SJLPE = "-";
			document.getElementById("SJLPE").innerHTML = SJLPE;
		}
		
		if(SJMTheo!="-"){
			var SJMPE = 100*(Math.abs(SJMEst-SJMTheo)/SJMTheo);
			document.getElementById("SJMPE").innerHTML = SJMPE.toFixed(3).toString();
		}else{
			var SJMPE = "-";
			document.getElementById("SJMPE").innerHTML = SJMPE;
		}

		
		document.getElementById("SJLRem").innerHTML = "IPA with observed inter-arrival times";
		document.getElementById("SJMRem").innerHTML = "IPA with observed service time";

		
	
	}else{			
		document.getElementById("SJLRem").innerHTML = "IPA deactivated";
		document.getElementById("SJMRem").innerHTML = "IPA deactivated";
	}

	plotData();

}





