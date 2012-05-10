<?= $header ?>

	<div class="container">
      <div class="hero-unit">
        <h1>Admin Control Panel</h1>
      </div>

      <div class="row">
      	<div class="span12">
      		<div id="display_ajax_content"></div>
      		
      		<a href="#" class="ajax" title="Ajax Action" data-url="hello_world" data-display-id="display_ajax_content">Ajax Action</a>

      		<hr>

      		<form action="hello_world_2" method="POST" class="well form-inline ajax" >
				<input type="text" class="input-small" name="test-input" placeholder="sample input">
				<button type="submit" class="btn" data-loading-text="submitting...">Do This</button>
			</form>

      	</div>
      </div>

	</div>
	
<?= $footer ?>