<%@ page
    session="true"
    import="java.util.*, java.text.*, javax.swing.*, fuego.portal.*"
%>
<!-- INCLUDING TAC LIBS-->
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="http://fuego.com/jsp/ftl" prefix="f" %>

<%@ include file="/jsp/init.jsp" %>

<html>
<head>
<title>Carga Masiva de Usuarios</title>
</head>

<link rel="stylesheet" type="text/css"
	href='<f:webResources relativePath="./css/fostyle.css"/>'>
	
<body>

<jsp:include page='<%=jspBundlePages.getString("HEADER")%>'/>
<link rel="stylesheet" type="text/css" href="../css/<%=stylesheet%>">

<form id="fileForm" method="post" enctype="multipart/form-data" name="fileForm" action="<f:postResults />">
  <table class="fo_table2" align="center">
  <tr class="fo_title">
  <td class="fo_title" align="center">
    ARCHIVO EXCEL A CARGAR
  </td>
  </tr>

  <tr class="fo_title2">
  <td class="fo_title2" align="left">
    Por favor seleccione el archivo:
  </td>
  </tr>
	<br>
  <tr>
  <td>
    <input size="40" id="attachment" type="file" <f:fieldName att="form.archivo"/> value="">
  </td>
  </tr>
  <tr>
  <td align="right">
    <input type="button" class="fo_button" name="Aceptar" value="Aceptar" onclick="document.fileForm.submit()">
    <input type="button" class="fo_button" name="Cerrar" value="Cerrar" onclick="document.emptyForm.submit()">
  </td>
  </tr>
  </table>
</form>
<form id="emptyForm" name="emptyForm" method="post" action="<f:postResults/>">
<input type="hidden" name="none" value="">
</form>

<jsp:include page='<%=jspBundlePages.getString("FOOTER")%>'/>

</body>
</html>
