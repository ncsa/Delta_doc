$( document ).ready(function() {

  // Create link and text for navigation back to the documentation hub home page
  var hub_link = document.createElement("a");
  var hub_text = document.createTextNode("NCSA Documentation Hub");
  hub_link.appendChild(hub_text);
  hub_link.setAttribute("href", "https://docs.ncsa.illinois.edu");

  var separator = document.createTextNode(" | ");

  // This replaces the GitHub link in the upper-right with the "Documentation Hub" link
  aside = document.querySelector("body > div > section > div > div > div:nth-child(1) > ul > li.wy-breadcrumbs-aside > a");

  // This allows you to replace the 'home' logo with the aside.repalceWith() text
  //aside = document.querySelector("body > div > section > div > div > div:nth-child(1) > ul > li");
  
  // Next to the default "Edit on GitHub", add a separator, then the hub link.
  aside.replaceWith(hub_link);


  // Insert "Documentation Hub" below html_logo in sidebar navigation
  // var docshub_link = document.createElement("a");
  // var docshub_link_text = document.createTextNode("Documentation Hub");
  // docshub_link.appendChild(docshub_link_text);
  // docshub_link.setAttribute("href","https://docs.ncsa.illinois.edu");
  
  // wysidenavsearch = document.querySelector("body > div > nav > div > div.wy-side-nav-search > a");
  // wysidenavsearch.appendChild(docshub_link);
  
});
