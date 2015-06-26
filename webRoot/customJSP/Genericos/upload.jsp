<%@ page 
	session="true"
%>

<!-- INCLUDING TAC LIBS-->
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="http://fuego.com/jsp/ftl" prefix="f" %>

<html>
<head>
<title><c:out value='${fileHolder.titulo}'/></title>

<script language="javascript" type="text/javascript">
function actionGuardar()
{
	if(document.getElementById("attachment").value!=null && document.getElementById("attachment").value!="") 
	{
		if(confirm("El archivo seleccionado no ha sido agregado. ¿Desea ignorarlo y solo adjuntar los documentos de la lista?"))
			responder("guardar");
			return false;
	}
	else 
		responder("guardar");
}
	
function actionVolver()
{
	responder("volver");
}
function OnAttach()
{
	var path = document.getElementById("attachment").value;
	if(document.getElementById("attachment").value==null || document.getElementById("attachment").value=="") 
	{
		alert("Seleccionar un archivo para agregar");
		return false;
	}
	responder("agregar_"+path);
}
function OnDettach(indice)
{
	responder("borrar_"+indice);
}
function responder(value) 
{
	setInputElementValue('boton',value);
	var form = document.getElementById("fileForm"); 
	form.submit();
}
function setInputElementValue(elementId, value)
{ 
	var theElement = document.getElementById(elementId); 
	if(theElement != null) 
	{ 
		theElement.value = value; 
	} 
}

function errorInicial()
{
	document.getElementById("fo.msgContainer").style.display = '';
	document.getElementById("mensajeError").style.display = '';
}
function mensajeError()
{
	var msg=document.getElementById("mensajeErrorTD");
	if ((msg != null) && (msg.innerHTML != '')){
		errorInicial();
	}
}			
</script>
</head>
<body onload="mensajeError();">
<link rel="stylesheet" type="text/css" href="<f:webResources relativePath='./css/tpcstyle.css'/>">
<form id="fileForm" method="post" enctype="multipart/form-data" action="<f:postResults />">
<input	type="hidden" id="boton" value="<c:out value="${fileHolder.boton}"/>" <f:fieldName att="fileHolder.boton"/> />
<table class="fo_presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
	<tbody>
		<tr>
			<td align="center" height="100%" valign="top" width="100%">
				<table class="fo_presentation_table" align="center" cellpadding="0" cellspacing="0" width="800">
					<tbody>
						<tr>
							<td class="fo_cell" colspan="1" rowspan="1" align="center" valign="middle">
								<table class="fo_table" cellpadding="0" cellspacing="0">
									<tbody>
										<tr>
											<td class="fo_title_cell" colspan="1" rowspan="1" align="center" valign="middle">
												<div class="fo_title_label">Adjuntar Archivos</div>
											</td>
										</tr>
									</tbody>	
								</table>
							</td>
						</tr>
						<tr>
							<td class="fo_cell" colspan="1" rowspan="1" align="center" valign="middle">
								<table class="fo_table cellspacing="5">
									<COLGROUP>
										<COL width="15%"/>
										<COL width="50%"/>
										<COL width="35%"/>
									</COLGROUP>
									<tr>
										<td>
											<div class="fo_label" align="right">Archivo</div>
										</td>
										<td>										
											<input id="attachment" type="file" size="60" value="" <f:fieldName att="fileHolder.archivo"/> >
										</td>	
										<td>
											<input type="button" name="Agregar" value="Agregar" onclick="javascript:OnAttach();">
										</td>
									<tr>
								</table>
							</td>
						</tr>
						<tr>
							<td class="fo_cell" colspan="1" rowspan="1" align="center" valign="middle">
								<table class="fo_group_color" cellpadding="0" cellspacing="0" border="0" align="center">
									<tbody>
										<TR>
											<td class="fo_cell" colspan="1" rowspan="1" align="center" valign="middle">
											    <TABLE cellpadding="0" cellspacing="1" border="0">
													<tr>
												       <td width="550px" align="center" class="fo_group_header_color">
												  	      <a>Nombre archivo</a>
												       </td>
												       <td width="50px" align="center" class="fo_group_header_color">
													      <a>Eliminar</a>
												       </td>
												    </tr>
												<!---------------------------------------- LISTA DE DOCUMENTOS ------------------------------------->    	
												<c:forEach items="${fileHolder.documentos}" begin="0" varStatus="status" var="file">
													<tr class="fo_group_even_tr">
														<td width="550px" class="fo_cell" align="left" valign="middle" colspan="1" rowspan="1">
														   <c:out value="${fileHolder.documentos[status.index].labelDocumento}"/>
														</td>
														<td  width="50px" class="fo_cell" align="center" valign="middle" colspan="1" rowspan="1">
															<input class="fo_button_borrar" type="button" title="" value=".     ." onClick="javascript:OnDettach('<c:out value='${status.index}'/>')">
														</td>
													</tr>
												</c:forEach>
												</table>
											</td>
										</tr>			
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td>						
								<table width="100%" class="fo_footer_table" align="right" border="0" cellspacing="5" cellpadding="0">
									<tr align="right" width="100%">
										<td align="left">
											<input class="fo_button" type="button" title="Volver" value="Volver" onClick="javascript:actionVolver()">
										</td>
										<td align="right">
											<input class="fo_button" type="button" title="Guardar" value="Guardar" onClick="javascript:actionGuardar()">
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</tbody>	
				</table>
			</td>
		</tr>
	</tbody>

	<DIV id="fo.msgContainer" style="display:none" >
	<BR/>
	<SPAN id="fo.clientError">
	<TABLE cellpadding="2" style="display:none;border-collapse:collapse;width: 100%;border: 1px solid;" id="fo.clientErrorContainer">
		<COLGROUP>
			<COL/>
			<COL width="100%"/>
		</COLGROUP>
		<TR>
			<TD class="fo_presentation_error" id="fo.clientErrorIcon">
				<IMG src="../img/xobject.runtime/errorclient.png"/>
			</TD>
			<TD class="fo_presentation_error" id="fo.clientErrorMsg">

			</TD>
		</TR>
	</TABLE>
	</SPAN>
	<SPAN id="fobjecMsgDiv">
		<TABLE style='border-collapse:collapse;width: 100%;border: 1px solid;' cellpadding='2'>
		<colgroup>
			<col>	
			<col width='100%'>
		</colgroup>
		<TR id="mensajeError" style="display:none">
			<TD class="fo_presentation_error" id="fo.serverErrorIcon.0">
				<IMG src="../img/xobject.runtime/errorserver.png"/>
			</TD>
			<TD class="fo_presentation_error">
				<div id="mensajeErrorTD"><c:out value="${fileHolder.mensajeError}"/></div>
			</TD>
		</TR>
		</TABLE>
	</SPAN>
	<BR/>
	</DIV>
</table>

</form>
</body>
</html>

