				var subMotivosDevArray = new Array(['001', '001', 'Submotivo Dev 1'],['002','002','Submotivo Dev 2'],['002','003','Submotivo Dev 3'],['002','004','Submotivo Dev 4']);
				var subMotivosCorArray = new Array(['001', '001', 'Submotivo 1'],['002','002','Submotivo 2'],['002','003','Submotivo 3'],['002','004','Submotivo 4']);

				function createOption(oCntrl, iPos, sTxt, sVal){ 
					var selOpcion=new Option(sTxt, sVal);
					eval(oCntrl.options[iPos]=selOpcion);
				}
			
				function onChangeComboBox(oMster, oCntrl, childObjects, divName, firstBlank){
					var parentId = oMster[oMster.selectedIndex].value;							
					while (oCntrl.length) oCntrl.remove(0);
					createOption(oCntrl, 0, '', '');
					index = 1;
					for(var i = 0; i < childObjects.length; i++) {			
						if (parentId == childObjects[i][0]) { 	
							createOption(oCntrl, index, childObjects[i][2] , childObjects[i][1]);
							index = index+1;
						}
					}
                                        if (oCntrl.length > 1 ) {			
						document.getElementById(divName).style.display = 'block';
					} else {
						document.getElementById(divName).style.display = 'none';
					}
                                        if (oCntrl.length > 1 && !firstBlank){
                                            oCntrl.remove(0);
                                        }                                      
				}

				// This method adds the element selected
				function addElementSelected(tableName, parentCboName, childCboName, parenTxtName, childTxtName) {
					var parent = getElementSelected(parentCboName);
					var child = getElementSelected(childCboName);
					
					if (validateNewRow(tableName, parent, child, parenTxtName, childCboName)) {						
						addRow(tableName, parent , child, parenTxtName);
					}
										
					
				}
				
				
				// This method deletes the element selected
				function deleteElementSelected(src, tableName, parentId, childId, parentTxtName, childTxtName) {				
					// Delete the values from the hidden inputs
					deleteElementSelectedValue(parentTxtName, parentId + '_' + childId);
					// Delete the roe from the table
					deleteRow(src, tableName);
				}

				// This method executes the validations to add a new value
				function validateNewRow(tableName, parent, child, parentTxtName, childCboName) {

					var childCbo = document.getElementById(childCboName);
					var idValue = parent.value + '_' +  child.value;
					// if the second combo is Empty			
					if (childCbo.length == 1) {
						if (parent.value == '') {
							alert('Debe seleccionar un valor.');
							return false;
						}
						if (existsElementSelected(parentTxtName, idValue)) {
							alert('Ya existe el elemento seleccionado.');
							return false;
						}
					} else {
						// if the second combo is not empty
						if (child.value == '') {
							alert('Debe seleccionar un valor para el segundo combo.');
							return false;
						}
						if (existsElementSelected(parentTxtName, idValue)) {
							alert('Ya existe el elemento seleccionado.');
							return false;
						}
					}
					return true;
				}
				
				
				function validateNewRowNoHistory(tableName, parent, child, parentTxtName, childCboName, historyTxt) 
				{   				
					var childCbo = document.getElementById(childCboName);
					var idValue = parent.value + '_' +  child.value;
					// if the second combo is Empty			
					if (childCbo.length == 1) 
					{
						if (parent.value == '') {
							alert('Debe seleccionar un valor.');
							return false;
						}
						if (existsElementInNewSelected(parentTxtName, idValue, historyTxt)) {
							alert('Ya existe el elemento seleccionado.');
							return false;
						}
					} 
					else 
					{
						// if the second combo is not empty
						if (child.value == '') {
							alert('Debe seleccionar un valor para el segundo combo.');
							return false;
						}
						if (existsElementInNewSelected(parentTxtName, idValue, historyTxt)) {
							alert('Ya existe el elemento seleccionado.');
							return false;
						}
					}
					
					return true;
				}
				
				

				// This method creates a row and adds the value in the hidden input for the value selected
				function addRow(tableName, parent, child, parentTxtName) {			
					
					var newRow = document.getElementById(tableName).insertRow();
                                        newRow.className = 'fo_group_even_tr';
					// Creates the parent column									    
   				    var oCell = newRow.insertCell();   				    
				    oCell.innerHTML = parent.text;				    
				                                        
					// Creates the child column				    
				    oCell = newRow.insertCell();
				    
					var childValue = ''; 
				    if (child.value != '') {
				    	oCell.innerHTML = child.text;
				    	childValue = child.value;   					
				    	
				    }
				    
   					var parentTxt = document.getElementById(parentTxtName);
   					if (parentTxt.value  != '') {
   						parentTxt.value = parentTxt.value + ',' + parent.value + '_' + childValue;
   					} else {
   						parentTxt.value = parent.value + '_' + childValue;
   					}
				    
					// Creates the delete button
				    oCell = newRow.insertCell();				    

				    oCell.innerHTML = "<input type='button' class='fo_button' value='Borrar' onclick='deleteElementSelected(this,"+ "\"" + tableName + "\","
				    		+ "\"" + parent.value + "\","  + "\"" + childValue + "\","
				    		+ "\"" + parentTxtName + "\""+ ");'/>";
				    
				}

				// This method deletes a row from the table
				function deleteRow(src, tableName) {					
     				var oRow = src.parentElement.parentElement;			
				    document.getElementById(tableName).deleteRow(oRow.rowIndex); 
				}	

				// This method returns the value selected from the combo
				function getElementSelected(cboId) {				
					var cboObject = document.getElementById(cboId);
					if (cboObject != null) {
						for (i = 0; i < cboObject.length; i++) {
					    	if (cboObject[i].selected) {
								return cboObject[i];
							}					       
					    }
					}
				}
				// This method checks if the elements exists in the hidden input 
				function existsElementSelected(elementId, id)	{
	            	var elements = document.getElementById(elementId).value.split(",");            	
					for (i = 0; i < elements.length; i++) {							
						if (elements[i] == id) {
							return true;
						}
				    }				    
					return false;
	            }
	            
	            		function existsElementInNewSelected(elementId, id, historyTxt)	
		    		{
					var elementsHist = document.getElementById(historyTxt).value.split(",");
					var elements = document.getElementById(elementId).value.split(",");            	
					for (i = 0; i < elements.length; i++) 
					{							
						if (elements[i] == id && elementsHist[i] == 'F') 
						{
							return true;
						}
					}				    
					return false;
	            		}

	            // This method deletes the value from the hidden input that will be submitted to the server
   				function deleteElementSelectedValue(elementId, id)	{
					var newValue = "";
	            	var elements = document.getElementById(elementId).value.split(",");
            		var deleted = false;

					for (i = 0; i < elements.length; i++) {
						if (elements[i] != id || deleted) {
							if (newValue != '') {
								newValue = newValue + ',';
							}				
							newValue = newValue + elements[i];
						} else {
							deleted = true;
						} 
				    }
					document.getElementById(elementId).value = newValue;
	            }


// ********************The functions below were developed to address historic asserts *************************************
                    // i means index form which delete button has to delete the historic record
                    
                    function addElementSelectedHist(tableName, parentCboName, childCboName, parenTxtName, childTxtName) {
                            var parent = getElementSelected(parentCboName);
                            var child = getElementSelected(childCboName);
                            if (validateNewRow(tableName, parent, child, parenTxtName, childCboName)) {						
                                    addRowHist(tableName, parent , child, parenTxtName);
                            }
                    }
                    
                    function addElementSelectedHistMultiple(tableName, parentCboName, childCboName, parenTxtName, childTxtName, historyTxt) {
			var parent = getElementSelected(parentCboName);
			var child = getElementSelected(childCboName);

			if (validateNewRowNoHistory(tableName, parent, child, parenTxtName, childCboName, historyTxt)) {						
				addRowHist(tableName, parent , child, parenTxtName);
			}
                    }
                    
                    
                    function addElementSelectedHistRech(tableName, parentCboName, childCboName, parenTxtName, childTxtName) {
                            var parent = getElementSelected(parentCboName);
                            var child = getElementSelected(childCboName);
                            if (validateNewRow(tableName, parent, child, parenTxtName, childCboName)) {						
                                    addRowHistRech(tableName, parent , child, parenTxtName);
                            }
                    }
                                                           
                    
                    function addRowHist(tableName, parent, child, parentTxtName) {			
                            
                            var newRow = document.getElementById(tableName).insertRow();
                            newRow.className = 'fo_group_even_tr';
                            // Creates the parent column									    
                        var oCell = newRow.insertCell();   				    
                        oCell.innerHTML = parent.text;				    
                                                            
                            // Creates the child column				    
                        oCell = newRow.insertCell();
                        
                            var childValue = ''; 
                        if (child.value != '') {
                            oCell.innerHTML = child.text;
                            childValue = child.value;   					
                            
                        }
                        
                            var parentTxt = document.getElementById(parentTxtName);
                            if (parentTxt.value  != '') {
                                    parentTxt.value = parentTxt.value + ',' + parent.value + '_' + childValue;
                            } else {
                                    parentTxt.value = parent.value + '_' + childValue;
                            }
                        
                            // Creates the delete button
                        oCell = newRow.insertCell();				    
                        
                        oCell.innerHTML = "<input type='button' class='fo_button' value='Borrar' onclick='deleteElementSelected(this,"+ "\"" + tableName + "\","
                                    + "\"" + parent.value + "\","  + "\"" + childValue + "\","
                                    + "\"" + parentTxtName + "\""+ ");deleteLastFlag()'/>";
                        
                    }
                    
                    function addRowHistRech(tableName, parent, child, parentTxtName) {			
                            
                            var newRow = document.getElementById(tableName).insertRow();
                            newRow.className = 'fo_group_even_tr';
                            // Creates the parent column									    
                        var oCell = newRow.insertCell();   				    
                        oCell.innerHTML = parent.text;				    
                                                            
                            // Creates the child column				    
                        oCell = newRow.insertCell();
                        
                            var childValue = ''; 
                        if (child.value != '') {
                            oCell.innerHTML = child.text;
                            childValue = child.value;   					
                            
                        }
                        
                            var parentTxt = document.getElementById(parentTxtName);
                            if (parentTxt.value  != '') {
                                    parentTxt.value = parentTxt.value + ',' + parent.value + '_' + childValue;
                            } else {
                                    parentTxt.value = parent.value + '_' + childValue;
                            }
                        
                            // Creates the delete button
                        oCell = newRow.insertCell();				    
                        
                        oCell.innerHTML = "<input type='button' class='fo_button' value='Borrar' onclick='deleteElementSelected(this,"+ "\"" + tableName + "\","
                                    + "\"" + parent.value + "\","  + "\"" + childValue + "\","
                                    + "\"" + parentTxtName + "\""+ ");deleteLastFlagRech()'/>";
                        
                    }                    
                    
// ********************The functions below were developed to address historic asserts *************************************                    
                    