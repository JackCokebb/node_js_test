module.exports = {
  html: function (title, list, body, control) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
    `;
  },
  list: function (files) {
    let list = "<ul>";
    files.forEach((elem, inx, arr) => {
      list = list + `<li><a href="?id=${elem}">${elem}</a></li>`;
    });
    list = list + "</ul>";
    return list;
  },
};

//module.exports = template;
