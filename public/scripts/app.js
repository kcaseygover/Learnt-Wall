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

$(document).ready(function () {

/*    var users = [
    { user_id: 'Lauren',
    password: '12345'},
    { user_id: 'Karen',
    password: '67890'}
    ];

    var resources = [
      {user: { user_id: 'Lauren',
      resource_id: 'url1',
      url: 'www.lighthouselabs.com',
      title: 'lighthouse Labs',
      description: '8 week web development bootcamp info',
      category: 'education'}},
      {user: { user_id: 'Karen'
      resource_id: 'url2',
      url: 'www.voltaeffect.com',
      title: 'Volta Labs',
      description: 'coworking space info',
      category: 'coworking'}}
    ];*/

      //functions to create the resource template then move the db info into it
    function renderResources(resourcesList) {
      $('.resource-feed').empty();

       // var sortResources = resourcesList.sort(function (a, b) {
        //  return a.created_at < b.created_at;
      //  });
      resourcesList.forEach(function (resource) {
        $('.resource-feed').append(createResourceElement(resource));
      });
    };

      //renderResources(resources);

    function createResourceElement(obj) {
      var $resource =
      `<article>
      <header class="resource-head">
      <a href="${obj.user.url}"><h3>${obj.user.title}</h3></a>
      <main>
      <p>${obj.user.description}</p>
      </main>
      <footer class="resource-foot">
      <p>${obj.user.category}</p>
      <img class="icons" src="/images/reply-action.png">
      <img class="icons" src="/images/retweet-action.png">
      <img class="icons" src="/images/like-action.png">
      </footer>
      </article>`
      return $resource;
    };


        //load resources from db
        function loadResources() {
          $.ajax({
            url: '/resources',
            method: 'GET',
            success: function (moreResources) {
              console.log('Success: ', moreResources);
              renderResources(moreResources)
            }
          });
        };

        loadResources();

          //new resource form functionality with logic/error msgs for empty
          // also clears the textarea after successful submission
  $('#add-new').submit(function (ev) {
            ev.preventDefault();
            var $postData = $(this).serialize();
            var $textVal = $(this).find('textarea').val();
            if ($textVal === "") {
              $('#flash').append("Your new resource must have a URL, title AND description!")
            } else {
              $.ajax({
                url:'/api/resources',
                method: 'POST',
                data: $postData,
                success: function (result) {
                  console.log('Success: ', result);
                  loadResources()
                }
              }); } $('textarea').val('');
            });

  //register functionality
    $('#register-button').submit(function (ev) {
            ev.preventDefault();
            var $postData = $(this).serialize();
            var $inputVal = $(this).find('input').val();
            if ($inputVal === "") {
              $('#flash').append("You must input an email and password.")
            } else {
              $.ajax({
                url:'/api/register',
                method: 'POST',
                data: $postData,
                success: function (result) {
                  console.log('Success: ', result);
                  window.location.href = "/";
                }
              }); }
            });

            //login functionality
          $('#login-button').submit(function (ev) {
            ev.preventDefault();
            var $postData = $(this).serialize();
            var $inputVal = $(this).find('input').val();
            if ($inputVal === "") {
              $('#flash').append("Enter your email and password.")
            } else {
              $.ajax({
                url:'/api/login',
                method: 'POST',
                data: $postData,
                success: function (result) {
                  console.log('Success: ', result);
                  window.location.href = "/";
                }
              }); }
            });


    $('.new-resource').hide();
        $('#add-button').click(function () {
      $('.new-resource').slideToggle( "fast", function () {
        $('.exampleInputEmail1').focus();
      });
    });
});
