<%@ page
    session="true" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="http://fuego.com/jsp/ftl" prefix="f" %>
<html>
<head>
	<script language="javascript">
		function submitear()
		{
			var form = document.getElementById("formulario");
			if(form != null)
			{
				window.open('<f:webResources relativePath="../customJSP/Genericos/forwarderOpenBinaryFiles.jsp"/>?url=<f:webResources relativePath="../customJSP/Genericos/openBinaryFiles.jsp"/>');
				form.submit();
			}
		}
	</script>
</head>
<body onload="javascript:submitear();">
	<form id="formulario" method="POST" action='<f:postResults/>'>
	</form>
<% 
	session.setAttribute("binario",request.getAttribute("binario"));
	session.setAttribute("extension",request.getAttribute("extension"));
	session.setAttribute("descripcion",request.getAttribute("descripcion"));
	session.setAttribute("fileName",request.getAttribute("fileName"));
	session.setAttribute("tamanio",request.getAttribute("tamanio"));

%>
</body>
</html>