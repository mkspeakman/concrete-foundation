<? defined('C5_EXECUTE') or die("Access Denied."); ?> 

<?
	Loader::model('attribute/categories/collection');
	// grab all tags in use based on the path
	$ak = CollectionAttributeKey::getByHandle('tags');
	$akc = $ak->getController();
	$pp = false;
	
	$tagCounts = array();
	
	if ($baseSearchPath != '') {
		$pp = Page::getByPath($baseSearchPath);
	}
	$ttags = $akc->getOptionUsageArray($pp);
	$tags = array();
	foreach($ttags as $t) {
		$tagCounts[] = $t->getSelectAttributeOptionUsageCount();
		$tags[] = $t;
	}
	shuffle($tags);
	$tagSizes = array();
	$count = count($tagCounts);
	foreach($tagCounts as $tagCount => $pos) {
		$tagSizes[$pos] = setFontPx(($pos + 1) / $count);
	}
	
	
	function setFontPx($weight) {
		$tagMinFontPx = '10';
		$tagMaxFontPx = '24';

		
		$em = ($weight * ($tagMaxFontPx - $tagMinFontPx)) + $tagMinFontPx;
		$em = round($em);
		return $em;
	}
?>


<? if ($title) { ?>
	<h3><?=$title?></h3>
<? } ?>

<div class="ccm-search-block-tag-cloud-wrapper ">

<ul id="ccm-search-block-tag-cloud-<?=$bID?>" class="ccm-search-block-tag-cloud">

<?
	for ($i = 0; $i < $ttags->count(); $i++) {
		$akct = $tags[$i];
		$qs = $akc->field('atSelectOptionID') . '[]=' . $akct->getSelectAttributeOptionID();
		?>
		<li><a style="font-size: <?=$tagSizes[$akct->getSelectAttributeOptionUsageCount()]?>px !important" href="<?=$this->url($resultTargetURL)?>?<?=$qs?>"><?=$akct->getSelectAttributeOptionValue()?></a>
		<span>(<?=$akct->getSelectAttributeOptionUsageCount()?>)</span>
		</li>
<? } ?>
</ul>

<div class="ccm-spacer">&nbsp;</div>
</div>