<? defined('C5_EXECUTE') or die("Access Denied."); ?>

<?=Loader::helper('concrete/dashboard')->getDashboardPaneHeaderWrapper(t('Connect to Community'), false)?>
<? 
	$mi = Marketplace::getInstance();
	if ($mi->hasConnectionError() && $mi->getConnectionError() == Marketplace::E_MARKETPLACE_SUPPORT_MANUALLY_DISABLED) { ?>
		<p><?=t("External marketplace support has been disabled for this website.")?></p>
	<? } else { ?>
		<style type="text/css">
		div.ccm-pane-body {padding-top: 0px; padding-right: 0px; padding-left: 0px}
		div.ccm-pane-body div.ccm-error { padding:15px 20px; };
		</style>
		<?
		print $mi->getMarketplaceFrame('100%', '300', false, $startStep);
	}
?>
<?=Loader::helper('concrete/dashboard')->getDashboardPaneFooterWrapper();?>
