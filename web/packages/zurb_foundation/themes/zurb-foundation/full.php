<?php defined('C5_EXECUTE') or die(_("Access Denied."));
$this -> inc('elements/header.php');
?>

<div class="row">
	<div class="large-12 columns">
		<?php $b = new Area('Main');
		$b -> display($c);
		?>
	</div>
</div>

<?php $this -> inc('elements/footer.php'); ?>