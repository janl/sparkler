function(head, req) {
  var config = require("config").config;

  // convenience
  function sendln(s) { send(s + "\n");}

  // creates a string that's an HTML tag & content with optional
  // content, attributes and prefix-spaces for indentation
  function tag(name, content, spaces, attributes) {
    attributes = attributes || {};
    spaces = spaces || "";
    var attr = [];
    for(var key in attributes) {
      var value = attributes[key];
      attr.push(key + "=" + '"' + value + '"');
    }
    attr = ((attr.length > 0) ? " ":"") + attr.join(" "); // magic!

    return spaces + "<" + name + attr + ">" + (content || "") + "</" + name + ">";
  }

  // start xml/rss output
  start({
    headers: {
      "Content-Type": "text/xml"
    }
  });
  sendln('<?xml version="1.0" encoding="utf-8"?>');
  sendln('<rss version="2.0" xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle" xmlns:dc="http://purl.org/dc/elements/1.1/">');
  sendln('<channel>');
  sendln('  <title>' + config.feed.title + '</title>');
  sendln('  <description>' + config.feed.description + '</description>');
  sendln('  <link>' + config.base_url + '_design/appcast/_rewrite/cast</link>');
  sendln('  <language>' + (config.feed.language || "en") + '</language>');

  var row;
  while(row = getRow()) {
    var item = row.value;
    var zip = config.app_bundle_name + ".zip";
    var length = row.value._attachments[zip].length;
    var type = row.value._attachments[zip].content_type;
    sendln('    <item>');
    sendln(tag("title", "Version " + row.id + " " + item.title, "    "));
    sendln(tag("sparkle:releaseNotesLink", config.base_url + "_design/appcast/_rewrite/release/" + row.id, "    "));
    sendln(tag("pubDate", item.pubDate, "    "));
    sendln(tag("enclosure", "", "    ", {
      url: config.base_url + row.id + "/" + zip,
      "sparkle:version": row.id,
      "sparkle:dsaSignature": item.sig,
      type: type,
      length: length
    }));
    sendln('    </item>');
  }

  sendln('</channel>');
  sendln('</rss>');
}
