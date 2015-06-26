<%@ page
    session="true"
    import="javax.servlet.*, java.util.StringTokenizer" %><%
	String url;
	if(request.getParameter("url") != null)
		url = (String)request.getParameter("url");
	else throw new ServletException("Missing forwarding url to continue.");
	
	StringTokenizer st = new StringTokenizer(url);
	String aux = "";
	String Url2 = "";
	while (st.hasMoreTokens()) {
		aux =  st.nextToken("/");
		if(!aux.startsWith("workspace")
			&&!aux.equals("..")
			&&!aux.equals("webResources"))
		 Url2 = Url2 + "/" + aux;
	}

	//ServletContext sc = this.getServlet().getServletContext();
	RequestDispatcher rd = request.getRequestDispatcher(Url2);
	rd.forward(request, response);	
%>