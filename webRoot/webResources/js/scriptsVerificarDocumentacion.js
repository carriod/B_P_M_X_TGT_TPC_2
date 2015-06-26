function setInputElementValue(elementId, value)
{ 
    var theElement = document.getElementById(elementId); 
    if(theElement != null) 
    { 
    theElement.value = value; 
    } 
} 

function actualizarSeleccionadosSeleccionables(integrante,seleccionadosS,seleccionablesS)
{
        var seleccionados = document.getElementById('seleccionadosFuego').value.split(",");
        for(var i=0;i < seleccionados.length; i++)
        {
                if(seleccionados[i] != null && seleccionados[i].split("=")[0].replace("{","").replace(" ","") == integrante)
                {
                        if (i == seleccionados.length - 1)
                            seleccionados[i] = seleccionados[i].split("=")[0] + "=" + seleccionadosS + "}";
                        else
                            seleccionados[i] = seleccionados[i].split("=")[0] + "=" + seleccionadosS;
                }
        }


        var seleccionables = document.getElementById('seleccionablesFuego').value.split(",");
        for(var i=0;i < seleccionables.length; i++)
        {
                if(seleccionables[i] != null && seleccionables[i].split("=")[0].replace("{","").replace(" ","") == integrante)
                {
                        if (i == seleccionables.length - 1)
                            seleccionables[i] = seleccionables[i].split("=")[0] + "=" + seleccionablesS + "}";
                        else    
                            seleccionables[i] = seleccionables[i].split("=")[0] + "=" + seleccionablesS;
                }
        }
        setInputElementValue('seleccionadosFuego',seleccionados);
        setInputElementValue('seleccionablesFuego',seleccionables);
}

function getSeleccionados(integrante)
{
        var seleccionados = document.getElementById('seleccionadosFuego').value.split(",");
        for(var i=0;i < seleccionados.length; i++)
        {
                if(seleccionados[i] != null && seleccionados[i].split("=")[0].replace("{","").replace(" ","") == integrante)
                {
                        if(seleccionados[i].split("=").length > 1 )
                        {
                                return seleccionados[i].split("=")[1].replace("}","");
                        }
                        else{
                                return "";
                        }
                }
        }
        return "";
}

function getSeleccionables(integrante)
{
        var seleccionables = document.getElementById('seleccionablesFuego').value.split(",");
        for(var i=0;i < seleccionables.length; i++)
        {
                if(seleccionables[i] != null && seleccionables[i].split("=")[0].replace("{","").replace(" ","") == integrante)
                {
                        if(seleccionables[i].split("=").length > 1)
                        {
                                return seleccionables[i].split("=")[1].replace("}","");
                        }else{
                                return "";
                        }
                }
        }
        return "";
}

function pasarSeleccionados()
{
        //obtengo el listado de documentos seleccionables (columna izquierda)
        var seleccionables = document.getElementById("seleccionables");
        //inicio un String que va a ser el select nuevo del bloque de seleccionables
        var selSeleccionables = "<select multiple='multiple' id='seleccionables' style='width=95%;'>";
        //inicio un String que va a ser el select nuevo del bloque de seleccionados
        var selSeleccionados = "<select multiple='multiple' id='seleccionados' style='width=95%;'>";
        //obtengo el integrante actual
        var indexIntegrante = document.getElementById("clienteSel").value;
        //necesito variables para luego setearles a las posiciones del vector seleccionables y seleccionados
        var seleccionadosVar = "";
        var seleccionablesVar = "";
        //agrego los documentos que ya estaban en el select de seleccionados:
        var seleccionados = document.getElementById("seleccionados");
        var valueS = "";
        for(var j=0;j < seleccionados.options.length; j++)
        {
                valueS = seleccionados.options[j].value.replace(/"/g,"");
                selSeleccionados = selSeleccionados + "<option id='"+seleccionados.options[j].id+"' value='"+valueS+"'>"+valueS+"</option>";
                        seleccionadosVar = seleccionadosVar + seleccionados.options[j].id + "#" + valueS + ";" ;
        }
        ///////////////
        for(var i=0;i < seleccionables.options.length; i++)
        {
                valueS = seleccionables.options[i].value.replace(/"/g,"");
                if(seleccionables.options[i].selected)
                {
                        selSeleccionados = selSeleccionados + "<option id='"+seleccionables.options[i].id+"' value='"+valueS+"'>"+valueS+"</option>";
                        seleccionadosVar = seleccionadosVar + seleccionables.options[i].id + "#" + valueS+ ";";
                }else
                {
                        selSeleccionables = selSeleccionables + "<option id='"+seleccionables.options[i].id+"' value='"+valueS+"'>"+valueS+"</option>";
                        seleccionablesVar = seleccionablesVar + seleccionables.options[i].id + "#" + valueS+ ";";
                }
        }
        seleccionadosVar = seleccionadosVar.substring(0,seleccionadosVar.length-1);
        seleccionablesVar = seleccionablesVar.substring(0,seleccionablesVar.length-1);
        //seteo para el integrante actual los documentos asignados y los que quedan para asignar
        actualizarSeleccionadosSeleccionables(indexIntegrante,seleccionadosVar,seleccionablesVar);
        //agrego los selects para los bloques seleccionados y seleccionables:
        //obtengo el bloque del select correspondiente a los seleccionables y a los seleccionados
        var divSeleccionables = document.getElementById("seleccionablesDiv");
        var divSeleccionados = document.getElementById("seleccionadosDiv");
        selSeleccionados = selSeleccionados + "</select>";
        selSeleccionables = selSeleccionables + "</select>";
        divSeleccionados.innerHTML = selSeleccionados;
        divSeleccionables.innerHTML = selSeleccionables;
}

function quitarSeleccionados()
{
        //obtengo el listado de documentos seleccionables (columna izquierda)
        var seleccionados = document.getElementById("seleccionados");
        //inicio un String que va a ser el select nuevo del bloque de seleccionables
        var selSeleccionables = "<select multiple='multiple' id='seleccionables' style='width=95%;'>";
        //inicio un String que va a ser el select nuevo del bloque de seleccionados
        var selSeleccionados = "<select multiple='multiple' id='seleccionados' style='width=95%;'>";
        //obtengo el integrante actual
        var indexIntegrante = document.getElementById("clienteSel").value;
        //necesito variables para luego setearles a las posiciones del vector seleccionables y seleccionados
        var seleccionadosVar = "";
        var seleccionablesVar = "";
        //pongo los que ya habia en seleccionables:
        var seleccionables = document.getElementById("seleccionables");
        var valueS = "";
        for(var j=0;j < seleccionables.options.length; j++)
        {
                valueS = seleccionables.options[j].value.replace(/"/g,"");
                selSeleccionables = selSeleccionables + "<option id='"+seleccionables.options[j].id+"' value='"+valueS+"'>"+valueS+"</option>";
                seleccionablesVar = seleccionablesVar + seleccionables.options[j].id + "#" + valueS + ";";
                }
        ////////////////////
        for(var i=0;i < seleccionados.options.length; i++)
        {
                valueS = seleccionados.options[i].value.replace(/"/g,"");
                if(seleccionados.options[i].selected)
                {
                        selSeleccionables = selSeleccionables + "<option id='"+seleccionados.options[i].id+"' value='"+valueS+"'>"+valueS+"</option>";
                        seleccionablesVar = seleccionablesVar + seleccionados.options[i].id + "#" + valueS + ";";
                        
                }else
                {
                        selSeleccionados = selSeleccionados + "<option id='"+seleccionados.options[i].id+"' value='"+valueS+"'>"+valueS+"</option>";
                        seleccionadosVar = seleccionadosVar + seleccionados.options[i].id + "#" + valueS + ";";
                }
        }
        seleccionadosVar = seleccionadosVar.substring(0,seleccionadosVar.length-1);
        seleccionablesVar = seleccionablesVar.substring(0,seleccionablesVar.length-1);
        //seteo para el integrante actual los documentos asignados y los que quedan para asignar

        actualizarSeleccionadosSeleccionables(indexIntegrante,seleccionadosVar,seleccionablesVar);
        //agrego los selects para los bloques seleccionados y seleccionables:
        //obtengo el bloque del select correspondiente a los seleccionables y a los seleccionados
        var divSeleccionables = document.getElementById("seleccionablesDiv");
        var divSeleccionados = document.getElementById("seleccionadosDiv");
        selSeleccionados = selSeleccionados + "</select>";
        selSeleccionables = selSeleccionables + "</select>";
        divSeleccionados.innerHTML = selSeleccionados;
        divSeleccionables.innerHTML = selSeleccionables;
}

function refreshSeleccionadosSeleccionables()
{
    var seleccionadosS = "<select multiple='multiple' id='seleccionados' style='width=95%;'>";
    var iIntegrante = (document.getElementById("clienteSel")).value;
    var seleccionados = getSeleccionados(iIntegrante).split(";");
    var valueS = "";
    if(seleccionados != null && seleccionados.length > 0 && seleccionados[0].length > 1)
    {
        for(var j=0;j < seleccionados.length; j++)
        {
            if(seleccionados[j] != null && seleccionados[j].length > 0)
            {
                    valueS = seleccionados[j].substring(seleccionados[j].indexOf("#",0)+1,seleccionados[j].length);
                    seleccionadosS = seleccionadosS + "<option id='" + seleccionados[j].substring(0,seleccionados[j].indexOf("#",0))+"' value='"+valueS+"'>"+valueS+"</option>";
            }
        }
    }
    var seleccionables = getSeleccionables(iIntegrante).split(";");
    var seleccionablesS = "<select multiple='multiple' id='seleccionables' style='width=95%;'>";
    
    if(seleccionables != null)
    {
        for(var k=0;k < seleccionables.length;k++)
        {
            if(seleccionables[k] != null && seleccionables[k].length > 0)
            {
                valueS = seleccionables[k].substring(seleccionables[k].indexOf("#",0)+1,seleccionables[k].length);
                seleccionablesS = seleccionablesS + "<option id='" + seleccionables[k].substring(0,seleccionables[k].indexOf("#",0))+"' value='"+valueS+"'>"+valueS+"</option>";
            }
        }
    }
    seleccionadosS = seleccionadosS + "</select>";
    seleccionablesS = seleccionablesS + "</select>";
    //alert("seleccionadosS= " + seleccionadosS);
    //alert("seleccionablesS= " + seleccionablesS);
    var divSeleccionables = document.getElementById("seleccionablesDiv");
    var divSeleccionados = document.getElementById("seleccionadosDiv");
    divSeleccionados.innerHTML = seleccionadosS;
    divSeleccionables.innerHTML = seleccionablesS;
}

function changeCliente()
{
    var sel = document.getElementById("integrantesSelect");
    var aux = new Array();
    var display = 'none';
    for(var i=0;i < sel.options.length; i++)
        {
                if(sel.options[i].selected)
                {
                        display = '';
                        setInputElementValue('clienteSel',sel.options[i].value);
                }else
                {
                        display = 'none';
                }  

                aux = document.getElementsByTagName('tr');
                for(var j=0;j < aux.length; j++)
                {
                    if(aux[j].name == sel.options[i].value){
                        aux[j].style.display = display;
                    }
                }
        }
    //ahora tengo que cargar en los bloques de seleccionados y seleccionables los datos para el integrante seleccionado
    refreshSeleccionadosSeleccionables();
}

function getElementsByClass(searchClass,node,tag) 
{
        var classElements = new Array();
        if ( node == null )
                node = document;
        if ( tag == null )
                tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
        for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                        classElements[j] = els[i];
                        j++;
                }
        }
        return classElements;
}
