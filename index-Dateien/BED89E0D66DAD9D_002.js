(function(){
	"use strict";
	var eKomiIsOlderIE=false;
	if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		var eKomiIEVersion=new Number(RegExp.$1);
		if(eKomiIEVersion<=6){
			eKomiIsOlderIE=true;
		};
	};
	var eKomiWidgetTexts = new Array ('', '', '', '', '', '', '', '', '', '', '');
	if(typeof eKomiIntegrationConfig != "undefined") {
		for (var eKomiIntegrationLoop=0;eKomiIntegrationLoop<eKomiIntegrationConfig.length;eKomiIntegrationLoop++){
			if(eKomiIntegrationConfig[eKomiIntegrationLoop].certId == 'BED89E0D66DAD9D') {
				if(typeof eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets == "undefined" || eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets.length <=0) {
					// not there or empty? So we search for the default
					eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets = new Array('eKomiWidget_default');
				};
				// START loop for widgets
				if(eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets) {
					for (var eKomiWidgetLoopTargets=0;eKomiWidgetLoopTargets<eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets.length;eKomiWidgetLoopTargets++){
						if(document.getElementById(eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets[eKomiWidgetLoopTargets])) {
							var eKomiWidgetRandomnes = Math.floor(Math.random()*10)+1; // (0.01 to 0.9) * 10 +1 = 1-10
							
							var eKomiWidgetElementText = document.createElement('textNode');
							eKomiWidgetElementText.innerHTML = 'eKomi - The Feedback Company: ' + eKomiWidgetTexts[eKomiWidgetRandomnes];
							
							var eKomiWidgetElementImg = document.createElement('img');
							eKomiWidgetElementImg.border = '0';
							eKomiWidgetElementImg.src = (document.location.protocol=='https:'?'https:':'http:') + '//connect.ekomi.de/widget/' + eKomiIntegrationConfig[eKomiIntegrationLoop].certId + '-' + eKomiWidgetRandomnes + '.gif';
							eKomiWidgetElementImg.alt = eKomiWidgetElementText.innerHTML;
							
							var eKomiWidgetElement = document.createElement('a');
							eKomiWidgetElement.id = 'eKomiWidget_' + eKomiIntegrationConfig[eKomiIntegrationLoop].certId + '_' + eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets[eKomiWidgetLoopTargets];
							eKomiWidgetElement.appendChild(eKomiWidgetElementImg);
							eKomiWidgetElement.href = 'https://www.ekomi.de/bewertungen-myeasycarsponsoringde.html';
							eKomiWidgetElement.onclick = Function('window.open(this.href, "_blank", ""); return false;');
							eKomiWidgetElement.title = eKomiWidgetElementText.innerHTML;
							
							var eKomiWidgetTarget = document.getElementById(eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets[eKomiWidgetLoopTargets]);
							while(eKomiWidgetTarget.lastChild) {eKomiWidgetTarget.removeChild(eKomiWidgetTarget.lastChild); };
							eKomiWidgetTarget.appendChild(eKomiWidgetElement);
						}else{
							if('console' in window){ console.warn('connectEkomiIntegration_BED89E0D66DAD9D - Cannot find elementId("' + eKomiIntegrationConfig[eKomiIntegrationLoop].widgetTargets[eKomiWidgetLoopTargets] + '") - skipping'); }
						};
					};
				};
				// END loop for widgets
				
				if(typeof eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets == "undefined" || eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets.length <=0) {
					// not there or empty? So we search for the default
					eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets = new Array('eKomiSeal_default');
				};
				// START loop for seals
				if(eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets) {
					for (var eKomiSealLoopTargets=0;eKomiSealLoopTargets<eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets.length;eKomiSealLoopTargets++){
						if(document.getElementById(eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets[eKomiSealLoopTargets])) {
							var eKomiSealElementText = document.createElement('textNode');
							eKomiSealElementText.innerHTML = 'eKomi - The Feedback Company: ';
							
							var eKomiSealElementImg = document.createElement('img');
							eKomiSealElementImg.border = '0';
							eKomiSealElementImg.src = (document.location.protocol=='https:'?'https:':'http:') + '//connect.ekomi.de/seal/' + eKomiIntegrationConfig[eKomiIntegrationLoop].certId + '-70x70.' + (eKomiIsOlderIE==true?'gif':'png');
							eKomiSealElementImg.alt = eKomiSealElementText.innerHTML;
							
							var eKomiSealElement = document.createElement('a');
							eKomiSealElement.id = 'eKomiSeal_' + eKomiIntegrationConfig[eKomiIntegrationLoop].certId + '_' + eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets[eKomiSealLoopTargets];
							eKomiSealElement.appendChild(eKomiSealElementImg);
							eKomiSealElement.href = 'https://www.ekomi.de/bewertungen-myeasycarsponsoringde.html';
							eKomiSealElement.onclick = Function('window.open(this.href, "_blank", ""); return false;');
							eKomiSealElement.title = eKomiSealElementText.innerHTML;
							
							var eKomiSealTarget = document.getElementById(eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets[eKomiSealLoopTargets]);
							while(eKomiSealTarget.lastChild) {eKomiSealTarget.removeChild(eKomiSealTarget.lastChild); };
							eKomiSealTarget.appendChild(eKomiSealElement);
						}else{
							if('console' in window){ console.warn('connectEkomiIntegration_BED89E0D66DAD9D - Cannot find elementId("' + eKomiIntegrationConfig[eKomiIntegrationLoop].sealTargets[eKomiSealLoopTargets] + '")  - skipping'); }
						};
					};
				};
				// END loop for seals
			}else{ 
				// im not in charge of this certID!
			};
		};
	}else{
		if('console' in window){ console.error('connectEkomiIntegration_BED89E0D66DAD9D - Cannot read eKomiIntegrationConfig'); }
	}
}());
			