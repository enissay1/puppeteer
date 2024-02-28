<?php
// URL de l'endpoint de l'API
$url = "https://www.cdiscount.com/Js/external/tagcommander/vendorlist.min.js";
//$url = "https://www.cdiscount.com/Js/external/tagcommander/vendorlist.min.js";

// Initialisation de la session cURL
$ch = curl_init($url);

// Configuration des options cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retourner la réponse au lieu de l'afficher
curl_setopt($ch, CURLOPT_HEADER, 0); // Inclure les en-têtes dans la réponse
// curl_setopt($ch, CURLOPT_HTTPHEADER, array(
//     "Accept: */*",
//     "Accept-Encoding: gzip, deflate, br, zstd",
//     "Accept-Language: en-US,en;q=0.9,fr;q=0.8",
//     "Cache-Control: no-cache",
//     "Connection: keep-alive",
//     // "Cookie: Vos_Cookies_Ici", // Remplacez par vos propres cookies
//     "Pragma: no-cache",
//     "Referer: https://www.cdiscount.com/mp-3616-samgalaxya10nn.html",
//     "Sec-Fetch-Dest: empty",
//     "Sec-Fetch-Mode: cors",
//     "Sec-Fetch-Site: same-origin",
//     "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
// ));

// Exécution de la requête
$response = curl_exec($ch);

// Vérification des erreurs
if (curl_errno($ch)) {
    echo 'Erreur cURL : ' . curl_error($ch);
}

// Fermeture de la session cURL
curl_close($ch);
//var_dump($ch);
// Séparation des en-têtes et du corps de la réponse
// list($headers, $body) = explode("\r\n\r\n", $response, 2);

// // Affichage des en-têtes (si nécessaire)
// echo $headers;

// // Affichage du corps de la réponse
//echo $body;
//print_r($body);
// Décoder le corps de la réponse JSON
$jsonResponse = json_decode($response);

// Affichage du résultat JSON
echo json_encode($jsonResponse, JSON_PRETTY_PRINT);
