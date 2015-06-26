<%@ page session="true" %>

<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="http://fuego.com/jsp/ftl" prefix="f" %>

<html>
<head>
<title><c:out value="${form.titulo}"/></title>

<script language="javascript" type="text/javascript">
function salir() 
{
	var form = document.getElementById("reporteForm"); 
	form.submit();
}
</script>
</head>

<body>

<c:set var="workspaceDMZ" value="${form.workspaceDMZ}" scope="session" />

<% 
String url = (request.getRequestURL()).toString(); 
String workspaceDMZ=(String)session.getAttribute("workspaceDMZ");
boolean esDMZ = url.contains(workspaceDMZ); 
%>

<link rel="stylesheet" type="text/css" href="<f:webResources relativePath='./css/tpcstyle.css'/>">

<form id="reporteForm" method="post" enctype="multipart/form-data" name="fileForm" action="<f:postResults />">
<table class="fo_presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td align="center" height="100%" valign="top" width="100%">
<table class="fo_presentation_table" align="center" cellpadding="0" cellspacing="0" width="820">
<tr>
	<td class="fo_cell" colspan="1" rowspan="1" align="center" valign="middle">
		<table class="fo_table" cellpadding="0" cellspacing="0" width="100%" >
			<tr>
				<td class="fo_title_cell" colspan="1" rowspan="1" align="center" valign="middle">
					<div class="fo_title_label"><c:out value="${form.titulo}"/></div>
				</td>
			</tr>
			<TR>
				<TD class="fo_cell" align="center" valign="middle" colspan="1" rowspan="1">
<% if (esDMZ) { %>
				<IFRAME class="fo_iframe" style="border:1px SOLID #ffffff ;width:100%;height:580px;" 
					src="<c:out value="${form.urlScaneoDMZ}"/>" scrolling="auto">
				</IFRAME>
<% } else { %>
				<IFRAME class="fo_iframe" style="border:1px SOLID #ffffff ;width:100%;height:580px;" 
					src="<c:out value="${form.urlScaneo}"/>" scrolling="auto">
				</IFRAME>
<% } %>

				</TD>
			</TR>
		</table>
	</td>
</tr>
<tr>
	<td>						
		<table width="100%" class="fo_footer_table" align="right" border="0" cellspacing="5" cellpadding="0">
			<tr align="right" width="100%">
				<td align="right">
					<input class="fo_button" type="button" title="Volver" value="Volver" onClick="javascript:salir()">
				</td>
			</tr>
		</table>
	</td>
</tr>
</table>
</td>
</tr>
</table>
</form>
</body>
</html>
