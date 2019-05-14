function plotData(){

   	//constructSpaceForPlots();
	

   	if(MQLPlotMode){
		var trace1 = {x:MQLEstTimeArray, y: MQLEstArray, type: 'scatter', line: {shape: 'hv'}};
	   	var MQLTheo = Number(document.getElementById("MQLTheo").innerHTML);
	   	var plotLayout1;
	   	
	   	if(isNaN(MQLTheo)){
	   		plotLayout1 = 
			{
				title: 'Evolution of the Estimate of Mean Queue Length', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Departures Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Mean Que Length', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},

			}

	   	}else{
	   		plotLayout1 = 
			{
				title: 'Evolution of the Estimate of Mean Queue Length', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Departures Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Mean Que Length', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},
				shapes: [
				    {
				      type: 'line',
				      x0: MQLEstTimeArray[0],
				      y0: MQLTheo,
				      x1: MQLEstTimeArray[MQLEstTimeArray.length-1],
				      y1: MQLTheo,
				      line: {
				        color: 'rgb(255, 10, 10)',
				        width: 0.5
				      }
				    }
			    ],

			}
	   	}

		var myPlot1 = document.getElementById('myPlot1');
				////Plotly.newPlot(myPlot, data, plotLayout,{displayModeBar: false});
		Plotly.newPlot(myPlot1, [trace1], plotLayout1);
	}


	if(MSTPlotMode){
		var trace2 = {x:MSTEstTimeArray, y: MSTEstArray,type: 'scatter', line: {shape: 'hv'}};
	   	var MSTTheo = Number(document.getElementById("MSTTheo").innerHTML);
	   	var plotLayout2;
	   	if(isNaN(MSTTheo)){

	   		plotLayout2 = 
			{
				title: 'Evolution of the Estimate of Mean System Time', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Departures Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Mean System Time', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},
				
			}

	   	}else{

	   		plotLayout2 = 
			{
				title: 'Evolution of the Estimate of Mean System Time', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Departures Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Mean System Time', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},
				shapes: [
				    {
				      type: 'line',
				      x0: MSTEstTimeArray[0],
				      y0: MSTTheo,
				      x1: MSTEstTimeArray[MSTEstTimeArray.length-1],
				      y1: MSTTheo,
				      line: {
				        color: 'rgb(255, 10, 10)',
				        width: 0.5
				      }
				    }
			    ],

			}
	   	}

		var myPlot2 = document.getElementById('myPlot2');
				////Plotly.newPlot(myPlot, data, plotLayout,{displayModeBar: false});
		Plotly.newPlot(myPlot2, [trace2], plotLayout2);
	}







   	if(SJLPlotMode && IPAEstimatorMode){
		var trace3 = {x:SJLEstTimeArray, y: SJLEstArray,type: 'scatter', line: {shape: 'hv'}};
	    var SJLTheo = Number(document.getElementById("SJLTheo").innerHTML);
	    var plotLayout3;

	    if(isNaN(SJLTheo)){

	    	plotLayout3 = 
			{
				title: 'Evolution of IPA Based Sensitivity Estimation: <br> Sensitivity of Mean System Time to Arrival Rate', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Arrivals Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Sensitivity', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},

			}

	    }else{

	    	plotLayout3 = 
			{
				title: 'Evolution of IPA Based Sensitivity Estimation: <br> Sensitivity of Mean System Time to Arrival Rate', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Arrivals Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Sensitivity', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},
				shapes: [
				    {
				      type: 'line',
				      x0: SJLEstTimeArray[0],
				      y0: SJLTheo,
				      x1: SJLEstTimeArray[SJLEstTimeArray.length-1],
				      y1: SJLTheo,
				      line: {
				        color: 'rgb(255, 10, 10)',
				        width: 0.5
				      }
				    }
			    ],

			}

	    }

		var myPlot3 = document.getElementById('myPlot3');
		Plotly.newPlot(myPlot3, [trace3], plotLayout3);
	}

	if(SJMPlotMode && IPAEstimatorMode){
		var trace4 = {x:SJMEstTimeArray, y: SJMEstArray,type: 'scatter', line: {shape: 'hv'}};
	   	var SJMTheo = Number(document.getElementById("SJMTheo").innerHTML);
	   	
	   	var plotLayout4;

	   	if(isNaN(SJMTheo)){
	   		
	   		plotLayout4 = 
			{
				title: 'Evolution of IPA Based Sensitivity Estimation: <br> Sensitivity of Mean System Time to Service Rate', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Departures Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Sensitivity', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},

			}

	   	}else{
	   		
	   		plotLayout4 = 
			{
				title: 'Evolution of IPA Based Sensitivity Estimation: <br> Sensitivity of Mean System Time to Service Rate', 
				////autosize: true,
			    //width: 1000,
			    //height: 400,
			    ////automargin: true,
			    xaxis: {
					title: 'Number of Departures Observed', 
					showline: true,
					showgrid: true, 
					zeroline: true,
					////automargin: true,
				}, 
				yaxis: {
					title: 'Sensitivity', 
				    showline: true,
				    showgrid: true,
				    zeroline: true,
				    ////automargin: true,
				},
				shapes: [
				    {
				      type: 'line',
				      x0: SJMEstTimeArray[0],
				      y0: SJMTheo,
				      x1: SJMEstTimeArray[SJMEstTimeArray.length-1],
				      y1: SJMTheo,
				      line: {
				        color: 'rgb(255, 10, 10)',
				        width: 0.5
				      }
				    }
			    ],
			}

	   	}

		var myPlot4 = document.getElementById('myPlot4');
				////Plotly.newPlot(myPlot, data, plotLayout,{displayModeBar: false});
		Plotly.newPlot(myPlot4, [trace4], plotLayout4);
	}


}


// function constructSpaceForPlots(){
// 	//clearing old divs
// 	document.getElementById('PlotsParent1').innerHTML = "";

// 	// appending new divs

//     var outerDiv;
//     var innerDiv;

//     outerDiv = document.createElement('div'); 
//     outerDiv.id = 'outerDivID1';
    

//     for(var i = 1; i<3; i++){
        
//         innerDiv = document.createElement('div');
//         innerDiv.style.margin = "50px 10px 20px 30px";
//         innerDiv.className = 'col col-lg-6';
//         innerDiv.id = 'myPlot' + i;
//         //outerDiv.className = 'col col-lg-12';
//         outerDiv.appendChild(innerDiv);
        
//     }
//     document.getElementById('PlotsParent1').appendChild(outerDiv);




//     document.getElementById('PlotsParent2').innerHTML = "";

// 	// appending new divs

//     var outerDiv;
//     var innerDiv;

//     outerDiv = document.createElement('div');
//     outerDiv.id = 'outerDivID2';

//     for(var i = 3; i<5; i++){
        
//         innerDiv = document.createElement('div');
//         innerDiv.style.margin = "50px 10px 20px 30px";
//         innerDiv.className = 'col col-lg-6';
//         innerDiv.id = 'myPlot' + i;
//         //outerDiv.className = 'col col-lg-12';
//         outerDiv.appendChild(innerDiv);
        
//     }
//     document.getElementById('PlotsParent2').appendChild(outerDiv);
    
// }

