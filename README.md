
What's the big deal?
===============

This is my boilerplate for creating ajax heavy apps using codeignitor on the back end and bootstrap on the front-end. The big deal is I need a way to share information easily and quickly between my PHP and my Javascript while handeling user input / errors and while writing dry code.

## Quick Start
The files to pay attention to are:

Main controller, this loads assets, and partials:

    /application/controllers/welcome.php

Partials, header and footer load in Twitter Bootstrap, Modal is from bootstrap, and settings shares PHP config variables with Javascript under the global variable "SETTINGS" (very useful).

    application/views/partials/footer.php
    application/views/partials/header.php
    application/views/partials/modal.php
    application/views/partials/settings.php

Ajax Controller, handles javascript ajax responses in JSON to later be parsed by the javascript and validated.

    /application/controllers/ajax.php

Helper.js the meat of the javascript, binds events to ajax actions (see examples), handles responses to server.

    /assets/js/helper.js
    /assets/js/app.js
    /assets/css/app.css

Main View, pay attention to the data attributes to the elements, by giving a form or an anchor tag a class of ajax it binds events using helper.js. Usually you wont have to do anything more than this to preform an action and handle its response. This makes the application ideal for speedy development. Give an element a data-url (refers to the ajax controller) and display the response in a div by giving the element an attribute of data-display-id, or various other actions. More on this later.

    /application/views/app.php



 (optional) Check out: http://www.farinspace.com/codeigniter-htaccess-file/ for htaccess / config:

    .htaccess
    application/config/config.php
    
(optional) Asset Management Library, check out http://getsparks.org/packages/carabiner/versions/HEAD/show

     application/config/carabiner.php
     application/library/carabiner.php
     application/library/cssmin.php
     application/library/jsmin.php

(optional) bootstrap

    /assets/css/bootstrap.css
    /assets/css/bootstrap.min.css
    /assets/css/bootstrap-responsive.css
    /assets/css/bootstrap-responsive.min.css
    /assets/js/bootstrap.js
    /assets/js/bootstrap.min.js

##Examples

after copying all the files above into your codeignitor install, you can begin creating quick user actions with just html. For example:

###Basic ajax action with results in a div:

    <div id="display_ajax_content"></div>
    <a href="#" class="ajax" title="Ajax Action" data-url="hello_world" data-display-id="display_ajax_content">Ajax Action</a>

Things to pay attention to here is that my anchor has a 

class = "ajax" which is binded by helpr.js

data-url =  "hello_world" which is a function in my ajax controller

data-display-id = "display_ajax_content" which refers to my div with the element ID that matches.

###Delete/ confirm ajax action:

    <a href="#" class="btn btn-danger ajax" data-confirm="Are you sure you want to do this action?" title="Ajax Action" data-url="hello_world">Delete Ajax Action</a>

data-confirm="Are you sure you want to do this action?"  this is the prompt that will appear either continuing with the ajax or canceling, great for when you want to preform an action that cannot be undone.

###Ajax form action / input validation:

      <form action="hello_world_2" method="POST" class="well form-inline ajax" >
            <div class="control-group">
                  <input type="text" class="input-small" name="test-input" placeholder="sample input">
                  <button type="submit" class="btn" data-loading-text="submitting...">Do This</button>
            </div>
      </form>

form class = "ajax"

form action = "hello_world_2"  function in ajax controller

div class = "control-group" important for error validation

button data-loading-text="submitting..." bootstrap function that keeps the user informed that the ajax is in process

input  all inputs will get sent to 
