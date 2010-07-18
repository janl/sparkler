function(doc, req) {
  return {
    headers: {
      "Content-Type": "text/html;charset:utf8"
    },
    body: doc.description
  };
}
