<fieldset>
<legend><?=t('Date/Time Options')?></legend>

<div class="clearfix">
<?=$form->label('akDateDisplayMode', t('Ask User For'))?>
<div class="input">
<? 
	$akDateDisplayModeOptions = array(
		'date_time' => t('Both Date and Time'),
		'date' => t('Date Only'),
		'text' => t('Text Input Field')

	);
	?>
<?=$form->select('akDateDisplayMode', $akDateDisplayModeOptions, $akDateDisplayMode)?>
</div>
</div>

</fieldset>