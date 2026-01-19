import * as XLSX from 'xlsx';

/**
 * Génère un fichier Excel complet avec tous les calculs techniques du projet Gaia
 * L'utilisateur peut modifier les valeurs des variables et les résultats se mettent à jour automatiquement
 */
export const generateCalculationsExcel = () => {
  // Créer un nouveau classeur
  const wb = XLSX.utils.book_new();

  // ===== FEUILLE 1: PARAMÈTRES GÉNÉRAUX =====
  const parametresData = [
    ['PARAMÈTRES GÉNÉRAUX DU PROJET GAIA'],
    [],
    ['Paramètre', 'Valeur', 'Unité', 'Description'],
    ['Masse totale (m)', 2.5, 'kg', 'Masse totale de l\'avion'],
    ['Gravité (g)', 9.81, 'm/s²', 'Accélération de la pesanteur'],
    ['Densité de l\'air (ρ)', 1.225, 'kg/m³', 'Au niveau de la mer, 15°C'],
    ['Surface alaire (S)', 0.55, 'm²', 'Surface totale des ailes'],
    ['CL max', 1.007, '', 'Coefficient de portance maximal'],
    ['CD0', 0.05, '', 'Coefficient de traînée parasite'],
    ['Allongement (AR)', 6, '', 'Rapport d\'allongement des ailes'],
    [],
    ['MOTORISATION'],
    ['Nombre de moteurs', 2, '', ''],
    ['KV moteur', 1400, 'tr/min/V', 'Constante de vitesse du moteur'],
    ['Voltage sous charge', 10.5, 'V', 'Tension batterie sous charge'],
    ['Efficacité moteur', 0.8, '', 'Rendement du moteur (80%)'],
    ['Poussée par moteur', 0.98, 'kg', 'Force de poussée unitaire'],
    ['Puissance par moteur', 288.4, 'W', 'Puissance électrique'],
    ['Courant par moteur', 26, 'A', 'Consommation électrique'],
    [],
    ['HÉLICE'],
    ['Diamètre hélice', 8, 'pouces', 'Diamètre de l\'hélice'],
    ['Pas hélice (Pitch)', 6, 'pouces', 'Pas de l\'hélice'],
    ['Efficacité hélice', 0.7, '', 'Rendement de l\'hélice (70%)'],
    [],
    ['BATTERIE'],
    ['Capacité batterie', 1400, 'mAh', 'Capacité nominale'],
    ['Utilisation max sécurité', 0.8, '', 'Limite de décharge (80%)'],
    [],
    ['DIMENSIONS'],
    ['Longueur fuselage', 1.1, 'm', 'Longueur totale'],
    ['Envergure (b)', 1.7, 'm', 'Distance bout d\'aile à bout d\'aile'],
    ['Corde moyenne (c)', 0.3, 'm', 'Largeur moyenne de l\'aile'],
  ];

  const wsParametres = XLSX.utils.aoa_to_sheet(parametresData);
  
  // Formater la feuille des paramètres
  if (!wsParametres['!cols']) wsParametres['!cols'] = [];
  wsParametres['!cols'][0] = { wch: 30 };
  wsParametres['!cols'][1] = { wch: 15 };
  wsParametres['!cols'][2] = { wch: 10 };
  wsParametres['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsParametres, 'Paramètres');

  // ===== FEUILLE 2: PITCH SPEED & VITESSE MAX =====
  const pitchSpeedData = [
    ['CALCUL DU PITCH SPEED ET VITESSE MAXIMALE'],
    [],
    ['DONNÉES D\'ENTRÉE (Référence Paramètres)'],
    ['Voltage sous charge', '=Paramètres!C6', 'V'],
    ['KV moteur', '=Paramètres!C15', 'tr/min/V'],
    ['Efficacité moteur', '=Paramètres!C16', ''],
    ['Pas hélice', '=Paramètres!C23', 'pouces'],
    [],
    ['CALCULS INTERMÉDIAIRES'],
    ['Pas en mètres', '=C7*0.0254', 'm', 'Conversion pouces → mètres'],
    ['RPM (Rotations/min)', '=C4*C5*C6', 'tr/min', 'Voltage × KV × Efficacité'],
    [],
    ['PITCH SPEED (Vitesse théorique)'],
    ['Pitch Speed', '=C11*C10/60', 'm/s', 'RPM × Pas / 60'],
    ['Pitch Speed', '=C13*3.6', 'km/h', 'Conversion m/s → km/h'],
    [],
    ['VITESSE MAXIMALE RÉELLE'],
    ['Facteur réduction', 0.75, '', 'Coefficient pour trainer (75%)'],
    ['Vitesse max réelle', '=C14*C17', 'km/h', 'Pitch Speed × Facteur'],
    [],
    ['RÉSUMÉ'],
    ['Pitch Speed théorique', '=C14', 'km/h'],
    ['Vitesse maximale réelle', '=C18', 'km/h'],
    ['Plage estimée', '=TEXT(C18*0.95,"0")&" - "&TEXT(C18*1.05,"0")', 'km/h'],
  ];

  const wsPitchSpeed = XLSX.utils.aoa_to_sheet(pitchSpeedData);
  if (!wsPitchSpeed['!cols']) wsPitchSpeed['!cols'] = [];
  wsPitchSpeed['!cols'][0] = { wch: 30 };
  wsPitchSpeed['!cols'][1] = { wch: 20 };
  wsPitchSpeed['!cols'][2] = { wch: 15 };
  wsPitchSpeed['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsPitchSpeed, 'Pitch Speed');

  // ===== FEUILLE 3: VITESSES DE VOL =====
  const vitessesData = [
    ['CALCUL DES VITESSES DE VOL'],
    [],
    ['DONNÉES D\'ENTRÉE'],
    ['Masse (m)', '=Paramètres!C4', 'kg'],
    ['Gravité (g)', '=Paramètres!C5', 'm/s²'],
    ['Densité air (ρ)', '=Paramètres!C6', 'kg/m³'],
    ['Surface alaire (S)', '=Paramètres!C7', 'm²'],
    ['CL max', '=Paramètres!C8', ''],
    ['CD0', '=Paramètres!C9', ''],
    ['Poussée totale', '=Paramètres!C17*Paramètres!C14', 'kg', '2 moteurs'],
    [],
    ['VITESSE DE DÉCROCHAGE (Vstall)'],
    ['Poids (N)', '=C4*C5', 'N'],
    ['Dénominateur', '=C6*C7*C8', ''],
    ['Vstall', '=SQRT(2*C13/C14)', 'm/s', 'Formule: sqrt(2×m×g / ρ×S×CLmax)'],
    ['Vstall', '=C15*3.6', 'km/h'],
    [],
    ['VITESSE MAXIMALE (Vmax) - Par traînée'],
    ['Poussée (N)', '=C10*9.81', 'N'],
    ['Numérateur', '=2*C19', ''],
    ['Dénominateur', '=C6*C7*C9', ''],
    ['Vmax théorique', '=SQRT(C20/C21)', 'm/s', 'Formule: sqrt(2×T / ρ×S×CD0)'],
    ['Vmax théorique', '=C22*3.6', 'km/h'],
    [],
    ['VITESSE MAXIMALE (Vmax) - Par puissance'],
    ['Puissance totale', '=Paramètres!C18*2', 'W'],
    ['Puissance utile', '=C26*0.7', 'W', 'Efficacité hélice 70%'],
    ['Vmax puissance', '=POWER(2*C27/(C6*C7*C9),1/3)', 'm/s', 'Formule cubique'],
    ['Vmax puissance', '=C28*3.6', 'km/h'],
    [],
    ['AUTRES VITESSES IMPORTANTES'],
    ['Vitesse approche', '=C16*1.3', 'km/h', '1.3 × Vstall'],
    ['Vitesse croisière min', 60, 'km/h', 'Estimation mi-gaz'],
    ['Vitesse croisière max', 70, 'km/h', 'Estimation mi-gaz'],
    [],
    ['RÉSUMÉ FINAL'],
    ['Vitesse de décrochage', '=C16', 'km/h'],
    ['Vitesse d\'approche', '=C32', 'km/h'],
    ['Vitesse de croisière', '=TEXT(C33,"0")&" - "&TEXT(C34,"0")', 'km/h'],
    ['Vitesse max (traînée)', '=C23', 'km/h'],
    ['Vitesse max (puissance)', '=C29', 'km/h'],
    ['Vitesse max réaliste', '=MIN(C29,"Pitch Speed"!C18)', 'km/h', 'Limitée par pitch'],
  ];

  const wsVitesses = XLSX.utils.aoa_to_sheet(vitessesData);
  if (!wsVitesses['!cols']) wsVitesses['!cols'] = [];
  wsVitesses['!cols'][0] = { wch: 30 };
  wsVitesses['!cols'][1] = { wch: 20 };
  wsVitesses['!cols'][2] = { wch: 15 };
  wsVitesses['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsVitesses, 'Vitesses');

  // ===== FEUILLE 4: PERFORMANCES DÉCOLLAGE =====
  const decollageData = [
    ['PERFORMANCES DE DÉCOLLAGE'],
    [],
    ['DONNÉES D\'ENTRÉE'],
    ['Masse (m)', '=Paramètres!C4', 'kg'],
    ['Poussée totale', '=Paramètres!C17*Paramètres!C14', 'kg'],
    ['Vitesse décrochage', '=Vitesses!C16', 'km/h'],
    [],
    ['VITESSE DE ROTATION'],
    ['Facteur sécurité', 1.2, '', 'Coefficient de sécurité'],
    ['Vr (Vitesse rotation)', '=C6*C8', 'km/h'],
    ['Vr', '=C9/3.6', 'm/s', 'Conversion en m/s'],
    [],
    ['CALCUL D\'ACCÉLÉRATION'],
    ['Poussée moyenne (N)', '=C5*9.81*0.9', 'N', 'Avec réduction vitesse'],
    ['Frottement bitume (N)', 1, 'N'],
    ['Frottement herbe (N)', 3.5, 'N'],
    [],
    ['Accélération bitume', '=(C13-C14)/C4', 'm/s²'],
    ['Accélération herbe', '=(C13-C15)/C4', 'm/s²'],
    [],
    ['TEMPS ET DISTANCE DE DÉCOLLAGE'],
    ['Type de piste', 'Bitume', '', 'Changer pour "Herbe"'],
    [],
    ['Accélération utilisée', '=IF(C21="Bitume",C17,C18)', 'm/s²'],
    ['Temps de roulage', '=C10/C23', 's'],
    ['Distance roulage', '=0.5*C23*C24^2', 'm'],
    [],
    ['RÉSUMÉ'],
    ['Type de piste', '=C21', ''],
    ['Vitesse de rotation', '=C9', 'km/h'],
    ['Temps de décollage', '=C24', 's'],
    ['Distance de décollage', '=C25', 'm'],
    [],
    ['COMPARAISON'],
    ['', 'Bitume', 'Herbe'],
    ['Temps (s)', '=C10/C17', '=C10/C18'],
    ['Distance (m)', '=0.5*C17*(C10/C17)^2', '=0.5*C18*(C10/C18)^2'],
  ];

  const wsDecollage = XLSX.utils.aoa_to_sheet(decollageData);
  if (!wsDecollage['!cols']) wsDecollage['!cols'] = [];
  wsDecollage['!cols'][0] = { wch: 30 };
  wsDecollage['!cols'][1] = { wch: 20 };
  wsDecollage['!cols'][2] = { wch: 15 };
  wsDecollage['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsDecollage, 'Décollage');

  // ===== FEUILLE 5: RATIO POIDS/PUISSANCE =====
  const ratioData = [
    ['RATIO POIDS/PUISSANCE'],
    [],
    ['DONNÉES D\'ENTRÉE'],
    ['Puissance totale', '=Paramètres!C18*Paramètres!C14', 'W'],
    ['Masse', '=Paramètres!C4', 'kg'],
    [],
    ['CALCUL DU RATIO'],
    ['Ratio W/kg', '=C4/C5', 'W/kg'],
    [],
    ['CLASSIFICATION'],
    ['Type de vol', '=IF(C8<200,"Vol pépère",IF(C8<300,"Vol sportif","Voltige/3D"))', ''],
    ['Capacités', '=IF(C8<200,"Réaliste, stable",IF(C8<300,"Looping faciles","Acrobatie avancée"))', ''],
    [],
    ['RÉFÉRENCES'],
    ['Type', 'Ratio min (W/kg)', 'Ratio max (W/kg)', 'Description'],
    ['Vol pépère', 100, 200, 'Vol réaliste et stable'],
    ['Vol sportif', 200, 300, 'Loopings faciles'],
    ['Voltige/3D', 300, 500, 'Acrobatie avancée'],
    [],
    ['RÉSUMÉ'],
    ['Puissance totale', '=C4', 'W'],
    ['Masse totale', '=C5', 'kg'],
    ['Ratio', '=C8', 'W/kg'],
    ['Type de vol', '=C10', ''],
    ['Capacités', '=C11', ''],
  ];

  const wsRatio = XLSX.utils.aoa_to_sheet(ratioData);
  if (!wsRatio['!cols']) wsRatio['!cols'] = [];
  wsRatio['!cols'][0] = { wch: 30 };
  wsRatio['!cols'][1] = { wch: 20 };
  wsRatio['!cols'][2] = { wch: 20 };
  wsRatio['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsRatio, 'Ratio Puissance');

  // ===== FEUILLE 6: AUTONOMIE =====
  const autonomieData = [
    ['AUTONOMIE ET CAPACITÉ BATTERIE'],
    [],
    ['DONNÉES D\'ENTRÉE'],
    ['Capacité batterie', '=Paramètres!C27', 'mAh'],
    ['Utilisation max', '=Paramètres!C28', '', '80% pour sécurité'],
    ['Courant par moteur', '=Paramètres!C19', 'A'],
    ['Nombre de moteurs', '=Paramètres!C14', ''],
    [],
    ['CAPACITÉ UTILISABLE'],
    ['Capacité utilisable', '=C4*C5', 'mAh'],
    ['Capacité utilisable', '=C10/1000', 'Ah', 'Conversion en Ah'],
    [],
    ['CONSOMMATION'],
    ['Courant total plein gaz', '=C6*C7', 'A'],
    ['Courant moyen mi-gaz', '=C13*0.45', 'A', 'Estimation 45%'],
    [],
    ['AUTONOMIE PLEIN GAZ'],
    ['Temps plein gaz', '=C11/C13*60', 'min'],
    ['Temps plein gaz', '=C17*60', 's'],
    [],
    ['AUTONOMIE VOL MIXTE'],
    ['Temps vol mixte', '=C11/C14*60', 'min'],
    ['Temps vol mixte', '=C20*60', 's'],
    [],
    ['RECOMMANDATIONS BATTERIE'],
    ['Capacité actuelle', '=C4', 'mAh'],
    ['Autonomie actuelle', '=C20', 'min'],
    ['Statut', '=IF(C20<5,"Insuffisant","Acceptable")', ''],
    [],
    ['Capacité recommandée', 4000, 'mAh', 'Pour 8-10 min'],
    ['Autonomie estimée', '=C28*C5/1000/C14*60', 'min', 'Avec batterie recommandée'],
    [],
    ['RÉSUMÉ'],
    ['Batterie actuelle', '=C4', 'mAh'],
    ['Autonomie plein gaz', '=C17', 'min'],
    ['Autonomie vol mixte', '=C20', 'min'],
    ['Recommandation', '=IF(C20<5,"Augmenter capacité batterie","Batterie suffisante")', ''],
  ];

  const wsAutonomie = XLSX.utils.aoa_to_sheet(autonomieData);
  if (!wsAutonomie['!cols']) wsAutonomie['!cols'] = [];
  wsAutonomie['!cols'][0] = { wch: 30 };
  wsAutonomie['!cols'][1] = { wch: 20 };
  wsAutonomie['!cols'][2] = { wch: 15 };
  wsAutonomie['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsAutonomie, 'Autonomie');

  // ===== FEUILLE 7: DIMENSIONS AILES =====
  const ailesData = [
    ['DIMENSIONNEMENT DES AILES'],
    [],
    ['DONNÉES D\'ENTRÉE'],
    ['Masse (m)', '=Paramètres!C4', 'kg'],
    ['Gravité (g)', '=Paramètres!C5', 'm/s²'],
    ['Densité air (ρ)', '=Paramètres!C6', 'kg/m³'],
    ['CL', 1.0, '', 'Coefficient de portance'],
    ['Allongement (AR)', '=Paramètres!C10', ''],
    ['Vitesse croisière', 15, 'm/s', 'Vitesse de croisière'],
    [],
    ['CALCUL SURFACE ALAIRE'],
    ['Poids (N)', '=C4*C5', 'N'],
    ['Portance requise', '=C12', 'N', 'L = Poids'],
    ['Dénominateur', '=0.5*C6*C9^2*C7', ''],
    ['Surface alaire (S)', '=C13/C14', 'm²', 'S = m×g / (0.5×ρ×V²×CL)'],
    [],
    ['CALCUL ENVERGURE'],
    ['Envergure (b)', '=SQRT(C15*C8)', 'm', 'b = sqrt(S × AR)'],
    [],
    ['CALCUL CORDE'],
    ['Corde moyenne (c)', '=C15/C17', 'm', 'c = S / b'],
    ['Corde (cm)', '=C19*100', 'cm'],
    [],
    ['VÉRIFICATION'],
    ['Surface calculée', '=C15', 'm²'],
    ['Surface paramètres', '=Paramètres!C7', 'm²'],
    ['Différence', '=ABS(C23-C24)/C24*100', '%'],
    [],
    ['RÉSUMÉ'],
    ['Surface alaire', '=C15', 'm²'],
    ['Envergure', '=C17', 'm'],
    ['Corde moyenne', '=C20', 'cm'],
    ['Allongement', '=C8', ''],
    ['Charge alaire', '=C4*1000/(C15*100)', 'g/dm²'],
  ];

  const wsAiles = XLSX.utils.aoa_to_sheet(ailesData);
  if (!wsAiles['!cols']) wsAiles['!cols'] = [];
  wsAiles['!cols'][0] = { wch: 30 };
  wsAiles['!cols'][1] = { wch: 20 };
  wsAiles['!cols'][2] = { wch: 15 };
  wsAiles['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsAiles, 'Dimensions Ailes');

  // ===== FEUILLE 8: SYNTHÈSE =====
  const syntheseData = [
    ['SYNTHÈSE COMPLÈTE DES CALCULS TECHNIQUES'],
    [],
    ['CARACTÉRISTIQUES GÉNÉRALES'],
    ['Masse totale', '=Paramètres!C4', 'kg'],
    ['Surface alaire', '=Paramètres!C7', 'm²'],
    ['Envergure', '=Paramètres!C30', 'm'],
    ['Charge alaire', '=C4*1000/(C5*100)', 'g/dm²'],
    [],
    ['MOTORISATION'],
    ['Puissance totale', '=Paramètres!C18*Paramètres!C14', 'W'],
    ['Poussée totale', '=Paramètres!C17*Paramètres!C14', 'kg'],
    ['Ratio puissance/masse', '="Ratio Puissance"!C8', 'W/kg'],
    ['Type de vol', '="Ratio Puissance"!C10', ''],
    [],
    ['PERFORMANCES DE VOL'],
    ['Vitesse décrochage', '=Vitesses!C16', 'km/h'],
    ['Vitesse approche', '=Vitesses!C32', 'km/h'],
    ['Vitesse croisière', '=Vitesses!C33', 'km/h'],
    ['Vitesse max (Pitch)', '="Pitch Speed"!C18', 'km/h'],
    ['Vitesse max (Puissance)', '=Vitesses!C29', 'km/h'],
    ['Vitesse max réelle', '=MIN(C20,C21)', 'km/h'],
    [],
    ['DÉCOLLAGE'],
    ['Temps décollage (bitume)', '=Décollage!C35', 's'],
    ['Distance décollage (bitume)', '=Décollage!C36', 'm'],
    ['Temps décollage (herbe)', '=Décollage!C37', 's'],
    ['Distance décollage (herbe)', '=Décollage!C38', 'm'],
    [],
    ['AUTONOMIE'],
    ['Capacité batterie', '=Paramètres!C27', 'mAh'],
    ['Autonomie plein gaz', '=Autonomie!C17', 'min'],
    ['Autonomie vol mixte', '=Autonomie!C20', 'min'],
    ['Recommandation batterie', '=Autonomie!C36', ''],
    [],
    ['ANALYSE'],
    ['Rapport poussée/poids', '=C11/C4', ''],
    ['Classification', '=IF(C36>1,"Excellent",IF(C36>0.8,"Très bon",IF(C36>0.6,"Bon","Limite")))', ''],
    ['Commentaire vitesse', '=IF(C22>100,"Rapide",IF(C22>70,"Normal","Lent"))', ''],
    ['Commentaire autonomie', '=IF(C33>8,"Excellente",IF(C33>5,"Bonne",IF(C33>3,"Acceptable","Insuffisante")))', ''],
  ];

  const wsSynthese = XLSX.utils.aoa_to_sheet(syntheseData);
  if (!wsSynthese['!cols']) wsSynthese['!cols'] = [];
  wsSynthese['!cols'][0] = { wch: 30 };
  wsSynthese['!cols'][1] = { wch: 20 };
  wsSynthese['!cols'][2] = { wch: 15 };
  wsSynthese['!cols'][3] = { wch: 40 };
  
  XLSX.utils.book_append_sheet(wb, wsSynthese, 'Synthèse');

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
