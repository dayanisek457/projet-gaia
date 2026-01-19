import * as XLSX from 'xlsx';

/**
 * Génère un fichier Excel sur une seule feuille avec tous les calculs techniques du projet Gaia
 * L'utilisateur peut modifier les valeurs des paramètres et les résultats se mettent à jour automatiquement
 */
export const generateCalculationsExcel = () => {
  // Créer un nouveau classeur
  const wb = XLSX.utils.book_new();

  // ===== FEUILLE UNIQUE: PARAMÈTRES ET CALCULS =====
  const data = [
    ['CALCULATEUR TECHNIQUE PROJET GAIA - Modifiez les valeurs en BLEU, les résultats se calculent automatiquement'],
    [],
    ['═══════════════════════════════════════', '', '', '═══════════════════════════════════════'],
    ['PARAMÈTRES D\'ENTRÉE (Modifiables)', '', '', 'RÉSULTATS DES CALCULS (Automatiques)'],
    ['═══════════════════════════════════════', '', '', '═══════════════════════════════════════'],
    [],
    // Ligne 7: Headers
    ['Paramètre', 'Valeur', 'Unité', 'Calcul', 'Résultat', 'Unité'],
    [],
    // SECTION 1: PARAMÈTRES GÉNÉRAUX
    ['──── PARAMÈTRES GÉNÉRAUX ────', '', '', '──── PITCH SPEED ────', '', ''],
    ['Masse totale (m)', 2.5, 'kg', 'Pas en mètres', '=B23*0.0254', 'm'],
    ['Gravité (g)', 9.81, 'm/s²', 'RPM', '=B15*B14*B16', 'tr/min'],
    ['Densité air (ρ)', 1.225, 'kg/m³', 'Pitch Speed', '=E11*E10/60', 'm/s'],
    ['Surface alaire (S)', 0.55, 'm²', 'Pitch Speed', '=E12*3.6', 'km/h'],
    ['CL max', 1.007, '', 'Facteur réduction', 0.75, ''],
    ['CD0', 0.05, '', 'Vitesse max réelle', '=E13*E14', 'km/h'],
    [],
    // SECTION 2: MOTORISATION
    ['──── MOTORISATION ────', '', '', '──── VITESSES DE VOL ────', '', ''],
    ['Nombre de moteurs', 2, '', 'Poids (N)', '=B10*B11', 'N'],
    ['KV moteur', 1400, 'tr/min/V', 'Dénominateur Vstall', '=B12*B13*B14', ''],
    ['Voltage sous charge', 10.5, 'V', 'Vstall', '=SQRT(2*E18/E19)', 'm/s'],
    ['Efficacité moteur', 0.8, '', 'Vstall', '=E20*3.6', 'km/h'],
    ['Poussée par moteur', 0.98, 'kg', 'Vitesse approche', '=E21*1.3', 'km/h'],
    ['Puissance par moteur', 288.4, 'W', 'Poussée totale (N)', '=B22*B18*9.81', 'N'],
    ['Courant par moteur', 26, 'A', 'Vmax (traînée)', '=SQRT(2*E23/(B12*B13*B15))', 'm/s'],
    [],
    // SECTION 3: HÉLICE
    ['──── HÉLICE ────', '', '', 'Vmax (traînée)', '=E24*3.6', 'km/h'],
    ['Diamètre hélice', 8, 'pouces', 'Puissance totale', '=B23*B18', 'W'],
    ['Pas hélice (Pitch)', 6, 'pouces', 'Puissance utile (70%)', '=E26*0.7', 'W'],
    ['Efficacité hélice', 0.7, '', 'Vmax (puissance)', '=POWER(2*E27/(B12*B13*B15),1/3)', 'm/s'],
    [],
    // SECTION 4: BATTERIE
    ['──── BATTERIE ────', '', '', 'Vmax (puissance)', '=E28*3.6', 'km/h'],
    ['Capacité batterie', 1400, 'mAh', 'Vitesse croisière min', 60, 'km/h'],
    ['Utilisation max (80%)', 0.8, '', 'Vitesse croisière max', 70, 'km/h'],
    [],
    // SECTION 5: DIMENSIONS
    ['──── DIMENSIONS ────', '', '', '──── DÉCOLLAGE ────', '', ''],
    ['Longueur fuselage', 1.1, 'm', 'Vitesse rotation (1.2×Vstall)', '=E21*1.2', 'km/h'],
    ['Envergure (b)', 1.7, 'm', 'Vitesse rotation', '=E35/3.6', 'm/s'],
    ['Corde moyenne (c)', 0.3, 'm', 'Poussée moyenne (N)', '=E23*0.9', 'N'],
    ['Allongement (AR)', 6, '', 'Frottement bitume (N)', 1, 'N'],
    ['CL coefficient', 1.0, '', 'Frottement herbe (N)', 3.5, 'N'],
    ['Vitesse croisière', 15, 'm/s', 'Accél. bitume', '=(E37-E38)/B10', 'm/s²'],
    [],
    // SECTION 6: CALCULS ADDITIONNELS
    ['', '', '', 'Accél. herbe', '=(E37-E39)/B10', 'm/s²'],
    ['', '', '', 'Temps décollage bitume', '=E36/E40', 's'],
    ['', '', '', 'Distance décollage bitume', '=0.5*E40*E42^2', 'm'],
    ['', '', '', 'Temps décollage herbe', '=E36/E41', 's'],
    ['', '', '', 'Distance décollage herbe', '=0.5*E41*E44^2', 'm'],
    [],
    // SECTION 7: PERFORMANCE
    ['', '', '', '──── PERFORMANCE ────', '', ''],
    ['', '', '', 'Ratio W/kg', '=E26/B10', 'W/kg'],
    ['', '', '', 'Type de vol', '=IF(E48<200,"Vol pépère",IF(E48<300,"Vol sportif","Voltige"))', ''],
    [],
    // SECTION 8: AUTONOMIE
    ['', '', '', '──── AUTONOMIE ────', '', ''],
    ['', '', '', 'Capacité utilisable', '=B32*B33', 'mAh'],
    ['', '', '', 'Capacité utilisable', '=E51/1000', 'Ah'],
    ['', '', '', 'Courant total', '=B24*B18', 'A'],
    ['', '', '', 'Temps plein gaz', '=E52/E53*60', 'min'],
    ['', '', '', 'Courant mi-gaz (45%)', '=E53*0.45', 'A'],
    ['', '', '', 'Temps vol mixte', '=E52/E55*60', 'min'],
    [],
    // SECTION 9: DIMENSIONS AILES
    ['', '', '', '──── DIMENSIONS AILES ────', '', ''],
    ['', '', '', 'Surface calculée', '=B10*B11/(0.5*B12*B41^2*B40)', 'm²'],
    ['', '', '', 'Envergure calculée', '=SQRT(E58*B39)', 'm'],
    ['', '', '', 'Corde calculée', '=E58/E59*100', 'cm'],
    ['', '', '', 'Charge alaire', '=B10*1000/(B13*100)', 'g/dm²'],
    [],
    // SECTION 10: SYNTHÈSE
    ['═══════════════════════════════════════', '', '', '═══════════════════════════════════════'],
    ['SYNTHÈSE DES RÉSULTATS PRINCIPAUX', '', '', '', '', ''],
    ['═══════════════════════════════════════', '', '', '═══════════════════════════════════════'],
    [],
    ['Résultat', '', '', 'Valeur', '', 'Unité'],
    ['Vitesse de décrochage', '', '', '=E21', '', 'km/h'],
    ['Vitesse d\'approche', '', '', '=E22', '', 'km/h'],
    ['Vitesse maximale (Pitch)', '', '', '=E15', '', 'km/h'],
    ['Vitesse maximale (Puissance)', '', '', '=E29', '', 'km/h'],
    ['Vitesse max réaliste', '', '', '=MIN(E15,E29)', '', 'km/h'],
    ['Temps décollage (bitume)', '', '', '=E42', '', 's'],
    ['Distance décollage (bitume)', '', '', '=E43', '', 'm'],
    ['Temps décollage (herbe)', '', '', '=E44', '', 's'],
    ['Distance décollage (herbe)', '', '', '=E45', '', 'm'],
    ['Ratio Puissance/Masse', '', '', '=E48', '', 'W/kg'],
    ['Type de vol', '', '', '=E49', '', ''],
    ['Autonomie plein gaz', '', '', '=E54', '', 'min'],
    ['Autonomie vol mixte', '', '', '=E56', '', 'min'],
    ['Rapport Poussée/Poids', '', '', '=B22*B18/B10', '', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  
  // Formater les colonnes
  if (!ws['!cols']) ws['!cols'] = [];
  ws['!cols'][0] = { wch: 30 };  // Colonne A: Paramètre
  ws['!cols'][1] = { wch: 12 };  // Colonne B: Valeur
  ws['!cols'][2] = { wch: 10 };  // Colonne C: Unité
  ws['!cols'][3] = { wch: 30 };  // Colonne D: Calcul
  ws['!cols'][4] = { wch: 15 };  // Colonne E: Résultat
  ws['!cols'][5] = { wch: 10 };  // Colonne F: Unité
  
  XLSX.utils.book_append_sheet(wb, ws, 'Calculs Techniques');

  // Générer le fichier Excel
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Créer un lien de téléchargement
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Gaia_Calculs_Techniques_${new Date().toISOString().split('T')[0]}.xlsx`;
  link.click();
  
  // Nettoyer
  window.URL.revokeObjectURL(url);
};
