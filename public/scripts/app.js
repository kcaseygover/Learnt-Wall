/*$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});*/
const pg = require('pg-then');

const db = new pg.Client(config);

// connect to our database
db.connect((err) => {
  if (err) throw err;

  db.query('', (err, result) => {
    if (err) throw err;
    console.log(result);
    db.end();
  });
});
