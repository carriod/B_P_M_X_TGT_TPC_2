function setInputElementValue(elementId, value)
{ 
	var theElement = document.getElementById(elementId); 
	if(theElement != null) 
	{ 
		theElement.value = value; 
	} 
}

function setVisible(bloqueName,indexId,indexValue)
{
	var i = 0;
	var div = document.getElementById(bloqueName+i);
	while(div!=null) {
		if(i == indexValue){
			div.style.display = "";					
			setInputElementValue(indexId,indexValue);
		}
		else{
			div.style.display = "none";
		}
		i=i+1;
		div = document.getElementById(bloqueName+i);
	}
}

function setAndSubmit(valueBoton, valueBotonIndex){
	var form = document.getElementById("Form1");
	setInputElementValue('boton', valueBoton);
	setInputElementValue('botonIndex', valueBotonIndex);
	form.submit();	
} 

function setTimeValue(elementId, value){ 
	var theElement = document.getElementById(elementId); 
	if(theElement != null) 
	{ 
		var vect = value.split('/');	
		theElement.value = vect[2]+'/'+vect[1]+'/'+vect[0];
	} 
}

function formatTimeValue(format, value){
	if (value=='') { 
		return '' 
	}
	var vect = value.split(' ');
	vect = vect[0].split('-')
	if (format == 'DMY') {
		return vect[2]+'/'+vect[1]+'/'+vect[0]; 
	} 
	if (format == 'YMD') {
		return vect[0]+'/'+vect[1]+'/'+vect[2]; 
	} 
}

function initTimeField(hiddenElementId, textElementId, imageId, value){
	var theElement = document.getElementById(hiddenElementId); 
	if(theElement != null) 
	{ 
		theElement.value = formatTimeValue('YMD', value); 
	} 
	var theElement = document.getElementById(textElementId); 
	if(theElement != null) 
	{ 
		theElement.value = formatTimeValue('DMY', value); 
	} 
	Calendar.setup( { inputField : textElementId, 
				ifFormat : '%d/%m/%Y', 
				button : imageId, 
				showsTime : false, 
				electric : false } );
}
