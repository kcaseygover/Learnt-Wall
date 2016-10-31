/*$(() => {
  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((resources) => {
    for(resource of resources) {
      $("<div>").text(resources.title, resources.description, resources.url).appendTo($("body"));
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
      <a href="${resURL}"><h3>${resTitle}</h3></a>
      <main>
      <p>${resDesc}</p>
      </main>
      <footer class="resource-foot">
      <p>${resCat}</p>
      </footer>
      </article>`
      return $resource;
    };

/*    function createCategoryOptions(obj) {
      var $select =
      `<select class="form-control" id="exampleSelect1" name="category_id">
      <option id="Javascript" value=${category_id}>${category_name}</option>
      <option id="Databases" value=${category_id}>${category_name}</option>
      <option id="HTML/CSS" value=${category_id}>${category_name}</option>
      <option id="AJAX" value=${category_id}>${category_name}</option>
      <option id="jQuery" value=${category_id}>${category_name}</option>
      <option id="node" value=${category_id}>${category_name}</option>
    </select>`
      return $select;
    }*/

        //load resources from db
        function loadResources() {
          $.ajax({
            url: '/api/resources',
            method: 'GET',
            success: function (moreResources) {
              console.log('Success: ', moreResources);
              renderResources(moreResources)
            }
          });
        };

       loadResources();


/*        function isUserLogin() {
          $.ajax ({
            url: '/',
            method: 'GET',
            success: function (changeLogin) {
              if (Cookies.get('user_id')) {
                $('glyphicon-log-in').attr('glyphicon-log-out');
              }
            }
          });
        };

        isUserLogin();*/

          //new resource form functionality with logic/error msgs for empty
          // also clears the textarea after successful submission
  $('#add-form').submit(function (ev) {
            //ev.preventDefault();
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
                  loadResources();
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
                  //Cookies.set('user_id', result.id);
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
