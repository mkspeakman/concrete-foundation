<?php defined('C5_EXECUTE') or die(_("Access Denied."));
class ZurbFoundationPackage extends Package {
	protected $pkgHandle = 'zurb_foundation';
	protected $appVersionRequired = '5.6.1';
	protected $pkgVersion = '1.0';
	public function getPackageDescription() {
		return t("Integration of Zurb's Foundation and Theme");
	}

	public function getPackageName() {
		return t("ZurbFoundation");
	}

	public function install() { $pkg = parent::install();
	
	//add theme
	PageTheme::add('zurb-foundation', $pkg);
	
	}


}
?>