<%@ page
    session="true"
    import="java.util.*, java.text.*, javax.swing.*"
%>
<!-- INCLUDING TAC LIBS-->
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="http://fuego.com/jsp/ftl" prefix="f" %>

<%@ include file="/jsp/init.jsp" %>


<html>
<head>
	<title>Analizar SAGI</title>
	<script language="javascript" type="text/javascript">
	function responder(value) 
	{
		setInputElementValue('boton',value);
		var form = document.getElementById("formAnalisis"); 
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
	<link rel="stylesheet" type="text/css" href="<f:webResources relativePath='css/jquery.cleditor.css'/>">
	<script type="text/javascript" src="<f:webResources relativePath='js/jquery-1.4.2.min.js'/>"></script>
	<script type="text/javascript" src="<f:webResources relativePath='js/jquery-ui-1.8rc2.custom.min.js'/>"></script>
	<script type="text/javascript" src="<f:webResources relativePath='js/jquery.cleditor.js'/>"></script>	
	<script type="text/javascript" src="<f:webResources relativePath='js/jquery.cleditor.table.js'/>"></script>
    <script type="text/javascript">
		 $(document).ready(function () { $("#input").cleditor(); });
    </script> 
</head>
<body onload="mensajeError();">
<form id="formAnalisis" method="post" enctype="multipart/form-data" name="formAnalisis" action="<f:postResults />">
	<input	type="hidden" id="boton" value="<c:out value="${form.boton}"/>" <f:fieldName att="form.boton"/> />
	<textarea id="input" <f:fieldName att="form.analisisConFormato"/> > 
		<c:out value="${form.analisisConFormato}"/>
	</textarea>
	<table width="100%" class="fo_footer_table" align="right" border="0" cellspacing="5" cellpadding="0">
		<tr align="right" width="100%">
			<td align="left">
				<input class="fo_button" type="button" id="cancelar" title="Cancelar" value="Cancelar" onclick="javascript:responder(this.id)">
			</td>
			<td align="right">
				<input class="fo_button" type="button" id="continuar" title="Guardar Continuar" value="Guardar Continuar" onclick="javascript:responder(this.id)">
			</td>
		</tr>
	</table>
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
				<div id="mensajeErrorTD"><c:out value="${form.mensajeError}"/></div>
			</TD>
		</TR>
		</TABLE>
	</SPAN>
	<BR/>
	</DIV>
</form>
</body>
</html>



