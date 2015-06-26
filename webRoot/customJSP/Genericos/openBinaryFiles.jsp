<%@ page
    session="true" 
    import="java.io.*"
%><%
	//IMPORTANTE!!!! NO DEJAR NINGUN ESPACIO EN BLANCO ENTRE LOS TAGS... SINO ESCRIBO A LA PAGINA
	String extension = "", descripcion = "", fileName = "";
	byte[] binario = null;
	int tamanio = 0;

	if(session.getAttribute("extension") != null)
		extension = (String)session.getAttribute("extension");
	
	if(session.getAttribute("binario") != null)
		binario = (byte[])session.getAttribute("binario");
    
	if(session.getAttribute("descripcion") != null)
		descripcion = (String)session.getAttribute("descripcion");
	
	if(session.getAttribute("fileName") != null)
		fileName = (String)session.getAttribute("fileName");
	
	if(session.getAttribute("tamanio") != null)
		tamanio = ((Long)session.getAttribute("tamanio")).intValue();

	response.reset();
	response.setContentType(contenidoDe(extension));

	if(binario != null) {
		OutputStream outStream = response.getOutputStream();
		response.setHeader("Content-Description",fileName);
		if(extension.equals("csv")||extension.equals("doc")||extension.equals("docx")||extension.equals("xls")||extension.equals("xlsx")){
			response.setHeader("Content-Disposition","attachment; filename=\"" + fileName + "\"");
		}else{
			response.setHeader("Content-Disposition","inline; filename=\"" + fileName + "\"");
		}
		response.setHeader("Content-Length","" + binario.length);
    	
    	outStream.write(binario,0,binario.length);
		outStream.flush();
		outStream.close();
		return;
   	}
%><%!
	//Extensiones soportadas
	private static final String[] ext = {"doc", "docx", 
						"txt", "html", "htm", "xml", "jpg", "tif", "gif", "pdf", 
						"xls", "xlsx", 
						"zip", "csv", "msg", 
						"rtf", "xsl", "css", "wav", "mp3", 
						"mpg","mpeg", "asf", "ppt", 
						"pps", "ppz"};
	//Tipo de contenido de las extensiones
	private static final String[] ct = {"application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
						"text/plain", "text/HTML", "text/html", "text/xml",
						"image/JPEG", "image/TIFF", "image/GIF", "application/pdf", 
						"application/vnd.ms-excel; charset=utf-8", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						"application/zip", "application/vnd.ms-excel; charset=utf-8","application/pkcs7-mime",
						"application/rtf", "text/xsl", "text/css", "audio/wav", "audio/mpeg3",
						"video/mpeg", "video/mpeg", "video/x-ms-asf", "application/vnd.ms-powerpoint",
						"application/vnd.ms-powerpoint","application/vnd.ms-powerpoint"};

	private static String contenidoDe(String extension) {
	  for(int i=0 ; i<ext.length ; i++) {
	    if(ext[i].equals(extension.toLowerCase())) return ct[i];
	  }
	  return "application/download";
	}
%>