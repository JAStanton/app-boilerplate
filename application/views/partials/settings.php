<script>
	var SETTINGS = {};
	<?php foreach ($settings as $key => $value) {
		echo "SETTINGS.{$key} = '{$value}';\n";
	} ?>
</script>