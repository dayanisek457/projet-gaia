import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';
import { renderMarkdownWithMath } from '@/utils/markdown';

interface Calculation {
  id: string;
  title: string;
  description: string;
  content: string;
  category?: string;
}

const CalculsSection = () => {
  // Static calculation data - can be moved to database later if needed
  const calculations: Calculation[] = [
    {
      id: 'calc-1',
      title: 'Vitesse maximale avec Pitch Speed',
      description: 'Calcul de la vitesse théorique maximale en utilisant le Pitch Speed de l\'hélice (KV 1400, hélice 8x6)',
      category: 'Aérodynamique',
      content: `## 1. Calcul du Pitch Speed (Vitesse théorique de l'hélice)

Le "Pitch Speed" est la vitesse théorique à laquelle l'avion avancerait si l'hélice se vissait dans l'air sans recul. L'avion ne peut physiquement pas dépasser cette vitesse en palier. C'est le facteur limitant pour ce type d'avion.

**Données :**

* **Voltage sous charge :** Valeur réaliste: **10.5V**
* **KV :** 1400 tr/min/V
* **Efficacité Moteur :** ~80% du KV théorique
* **Pas de l'hélice (Pitch) :** 6 pouces = 0.1524 m

**Calcul des RPM (Rotations par minute) :**

$$\\text{RPM} = \\text{Voltage} \\times \\text{KV} \\times \\text{Efficacité} = 10.5 \\times 1400 \\times 0.80 = 11760 \\text{ tr/min}$$

**Calcul du Pitch Speed ($V_{pitch}$) :**

$$V_{pitch} = \\text{RPM} \\times \\text{Pitch} \\times 60^{-1} = 11760 \\times 0.1524 \\times \\frac{1}{60} = 29.9 \\text{ m/s} = 107 \\text{ km/h}$$

---

## 2. Facteurs limitants aérodynamiques

Le Pitch Speed de 107 km/h est une vitesse théorique impossible à atteindre en pratique.

**Facteurs de réduction :**

1. **Glissement (Slip) :** L'hélice "patine" dans l'air. La vitesse réelle se situe entre **75% et 85%** du Pitch Speed pour générer de la traction.

2. **Traînée (Drag) :** Configuration avec fuselage large (15 cm), ailes hautes et train d'atterrissage sorti.
   * Avion de course (profilé) : 90% du Pitch Speed
   * Trainer type Cessna : 70-75% du Pitch Speed

---

## 3. Estimation de la Vitesse Maximale Réelle

Application d'un coefficient de 75% (typique pour un trainer aile haute) :

$$V_{max} = 0.75 \\times 107 = 80 \\text{ km/h}$$

Vitesse maximale atteignable : **75 - 85 km/h** selon la qualité de construction.

---

## 4. Bilan Performance

Caractéristiques de vol avec les données moteur (KV 1400, hélice 8x6) :

| Paramètre | Valeur Estimée | Commentaire |
|-----------|---------------|-------------|
| **Vitesse Décrochage** | **31 km/h** | Dépend du poids/surface |
| **Vitesse Croisière** | **50 - 60 km/h** | Mi-gaz |
| **Vitesse Max (Réelle)** | **75 - 82 km/h** | Plafond aérodynamique (pas de 6 pouces) |
| **Rapport Poussée/Poids** | **0.8 : 1** | $\\frac{1.96 \\text{ kg}}{2.5 \\text{ kg}} = 0.78$ |

---

## Conclusion

Avec un pas de 6 pouces, la vitesse maximale se limite à **80 km/h**. La motorisation de 2 kg de poussée totale pour 2.5 kg offre une réserve de puissance confortable pour les montées et décollages courts (STOL).`
    },
    {
      id: 'calc-2',
      title: 'Estimation des vitesses (Cessna 172)',
      description: 'Calcul détaillé de la vitesse de décrochage et de la vitesse maximale pour le modèle Cessna 172',
      category: 'Aérodynamique',
      content: `## 1. Analyse et Hypothèses

Configuration :
* **Masse totale :** 2.5 kg
* **Nombre de moteurs :** 2
* **Poussée par moteur :** 0.98 kg
* **Puissance par moteur :** 288.4 W

**Interprétation :** Les valeurs de poussée et de puissance sont par moteur.

* **Poussée Totale :** $0.98 \\text{ kg} \\times 2 = 1.96 \\text{ kg}$ (soit $\\approx 19.2 \\text{ N}$)
* **Puissance Totale :** $288.4 \\text{ W} \\times 2 = 576.8 \\text{ W}$

Rapport Poussée/Poids : $\\approx 0.8$, Puissance : $\\approx 230 \\text{ W/kg}$ - Adapté pour une maquette type Cessna.

---

## 2. Calcul de la Vitesse de Décrochage ($V_{stall}$)

Vitesse minimale en dessous de laquelle l'avion décroche.

**Formule :**

$$V_{stall} = \\sqrt{\\frac{2 \\cdot m \\cdot g}{\\rho \\cdot S \\cdot C_{L_{max}}}}$$

**Données :**
* $m$ (Masse) = 2.5 kg
* $g$ (Gravité) = 9.81 m/s²
* $\\rho$ (Densité air) = 1.225 kg/m³
* $S$ (Surface alaire) = 0.55 m²
* $C_{L_{max}}$ (Coef. portance max) = 1.007

**Calcul :**

Poids : $2.5 \\times 9.81 = 24.525 \\text{ N}$

Dénominateur : $1.225 \\times 0.55 \\times 1.007 \\approx 0.678$

$$V_{stall} = \\sqrt{\\frac{2 \\times 24.525}{0.678}} = \\sqrt{\\frac{49.05}{0.678}} = \\sqrt{72.34} \\approx 8.5 \\text{ m/s}$$

**Résultat :** $V_{stall} \\approx 30.6 \\text{ km/h}$

---

## 3. Estimation de la Vitesse Maximale ($V_{max}$)

Vitesse atteinte lorsque la Traînée ($D$) égale la Poussée ($T$).

Coefficient de traînée parasite ($C_{D0}$) : 0.045 - 0.055 pour un Cessna 172 RC (ailes hautes, train sorti, fuselage carré).

**Méthode par équilibre Poussée/Traînée :**

$$V_{max} = \\sqrt{\\frac{2 \\cdot T}{\\rho \\cdot S \\cdot C_{D0}}}$$

**Données :**
* $T$ (Poussée totale) = $1.96 \\text{ kg} \\times 9.81 = 19.22 \\text{ N}$
* $C_{D0}$ = 0.05

**Calcul :**

Numérateur : $2 \\times 19.22 = 38.44$

Dénominateur : $1.225 \\times 0.55 \\times 0.05 \\approx 0.0337$

$$V_{max} = \\sqrt{\\frac{38.44}{0.0337}} = \\sqrt{1140} \\approx 33.7 \\text{ m/s}$$

**Résultat théorique :** $V_{max} \\approx 121 \\text{ km/h}$

**Note :** Vitesse limitée par le Pitch Speed de l'hélice.

### Vérification par la Puissance

Puissance disponible : 576 W avec efficacité hélice de 70% → Puissance utile : $\\approx 400 \\text{ W}$

$$P_{utile} = \\frac{1}{2} \\rho S C_{D0} v^3$$

$$v = \\sqrt[3]{\\frac{2 \\cdot 400}{1.225 \\cdot 0.55 \\cdot 0.05}} \\approx 28.7 \\text{ m/s} \\approx 103 \\text{ km/h}$$

Résultat plus réaliste : **103 km/h** (la poussée d'hélice diminue avec la vitesse).

---

## 4. Résumé des Performances

| Type de vitesse | Valeur (km/h) | Valeur (m/s) | Notes |
|----------------|---------------|--------------|-------|
| **Vitesse de décrochage** | 31 km/h | 8.5 m/s | Limite minimale |
| **Vitesse d'approche** | 40 km/h | 11 m/s | $1.3 \\times V_{stall}$ |
| **Vitesse de croisière** | 70 - 80 km/h | 20-22 m/s | Mi-gaz |
| **Vitesse Maximale** | 100 - 110 km/h | 28-30 m/s | Plein gaz, palier |

---

## Analyse du comportement

**Charge alaire :** $\\frac{2500 \\text{ g}}{55 \\text{ dm}^2} = 45 \\text{ g/dm}^2$

Charge alaire faible pour cette envergure. Comportement stable type "Trainer", vol lent sans décrochage brutal.

**Motorisation :** Rapport poussée/poids de 0.78 offre une réserve confortable pour montées et manœuvres.

---

## Note sur la précision

Données manquantes pour affiner : **pas (pitch) de l'hélice et KV des moteurs**.

* Pas faible (8x4) : couple élevé, vitesse limitée (~80 km/h)
* Pas élevé (8x6 ou 8x7) : vitesse jusqu'à 110 km/h`
    },
    {
      id: 'calc-3',
      title: 'Performances de décollage',
      description: 'Estimation du temps et de la distance de décollage en fonction du type de piste',
      category: 'Aérodynamique',
      content: `## Suffisance de la Poussée

La poussée est largement suffisante.

Pour un avion type "Trainer" (style Cessna), ratio poussée/poids recommandé : 0.5 à 0.6. 

Avec 1.96 kg de poussée totale pour 2.5 kg, ratio de **0.78** - très confortable. Décollage franc et court.

---

## 1. Vitesse Cible de Décollage

Vitesse de décrochage calculée : 31 km/h. 

Pour décoller en sécurité : $\\approx 1.2 \\times V_{stall}$ (autorité aux commandes).

**Vitesse de rotation ($V_r$) :** $\\approx 36$ km/h (soit 10 m/s)

---

## 2. Calcul de l'Accélération

L'avion accélère grâce à la poussée, ralenti par le frottement des roues et la traînée.

**Forces en présence :**

* **Poussée ($T$) :** $\\approx 19.2$ N (moyenne : 18 N en tenant compte de la diminution avec la vitesse)
* **Freinage (roues + air) :**
  * Piste bitume : $\\approx 1$ N
  * Piste herbe : $\\approx 3$ à 4 N (roues petites)
* **Masse ($m$) :** 2.5 kg

Selon la loi de Newton ($F = m \\cdot a$) :

$$a = \\frac{F_{totale}}{m} = \\frac{18 - 4}{2.5} \\approx 5.6 \\text{ m/s}^2 \\text{ (sur herbe)}$$

---

## 3. Temps et Distance de Décollage

Application de l'accélération constante jusqu'à 10 m/s :

| Type de Piste | Temps de roulage | Distance parcourue |
|---------------|------------------|---------------------|
| **Bitume / Dur** | ~ 1.5 secondes | ~ 7 à 9 mètres |
| **Herbe tondue** | ~ 2.0 secondes | ~ 10 à 15 mètres |

---

## Analyse et Recommandations

**Décollage rapide :** En moins de 3 secondes plein gaz, l'avion sera en l'air.

**Attention au couple :** Avec deux moteurs et accélération brutale, risque de déviation à gauche au sol (effet de couple).

**Technique recommandée :** Montée progressive des gaz sur 2-3 secondes. Permet à la dérive d'être efficace pour maintenir la trajectoire. Décollage plus réaliste avec environ 15-20 mètres de roulage.

**Différentiel moteur :** Si la radio le permet, réglage du différentiel des moteurs pour faciliter la direction au sol.`
    },
    {
      id: 'calc-4',
      title: 'Ratio Poids/Puissance',
      description: 'Analyse du rapport puissance/masse pour déterminer les capacités de vol',
      category: 'Performance',
      content: `## Indicateur Universel en RC

Ratio Poids/Puissance : indicateur universel pour déterminer les capacités de l'avion.

**Formule :**

$$\\frac{\\text{Puissance totale (W)}}{\\text{Masse (kg)}}$$

**Calcul :**

$$\\frac{576 \\text{ W}}{2.5 \\text{ kg}} \\approx 230 \\text{ W/kg}$$

---

## Classification des Performances

| Ratio (W/kg) | Type de vol | Capacités |
|--------------|-------------|-----------|
| **150 W/kg** | Vol pépère | Réaliste, stable |
| **250 W/kg** | Vol sportif | Looping faciles |
| **400 W/kg** | Voltige/3D | Acrobatie avancée |

---

## Conclusion

Ratio de **230 W/kg** : Zone "Sport", adaptée pour un Cessna puissant avec bonnes capacités de manœuvre.`
    },
    {
      id: 'calc-5',
      title: 'Autonomie et capacité batterie',
      description: 'Calcul de l\'autonomie de vol en fonction de la capacité batterie',
      category: 'Électrique',
      content: `## 1. Capacité Utilisable

Règle de sécurité : utilisation de 80% maximum de la capacité LiPo.

**Batterie 1400 mAh :**

$$\\text{Capacité utilisable} = 1400 \\text{ mAh} \\times 0.80 = 1120 \\text{ mAh} = 1.12 \\text{ Ah}$$

---

## 2. Autonomie Plein Gaz

Consommation totale : 52 Ampères (deux moteurs).

$$\\text{Temps} = \\frac{\\text{Capacité}}{\\text{Courant}} = \\frac{1.12 \\text{ Ah}}{52 \\text{ A}} \\approx 0.0215 \\text{ h} = 1.3 \\text{ min}$$

**Résultat :** 1 minute 18 secondes plein gaz.

---

## 3. Autonomie Vol Mixte

Consommation moyenne mi-gaz : 20-25A.

$$\\text{Temps} = \\frac{1.12 \\text{ Ah}}{22.5 \\text{ A}} \\approx 0.05 \\text{ h} = 3 \\text{ min}$$

**Résultat :** Moins de 3 minutes en vol mixte.

---

## Analyse Critique

**Problème identifié :** Autonomie de 2 min 45s insuffisante. Risque de coupure batterie lors d'une remise des gaz (go-around).

**Impact centrage :** Batterie 1400 mAh (~120-150g) trop légère. Risque de centrage arrière avec moteurs puissants.

---

## Recommandation

**Batterie recommandée :** 3300-5000 mAh (3S) pour bimoteur 2.5 kg consommant 50A+.

**Exemple avec 4000 mAh :**
* Poids : ~350g (améliore le centrage avant)
* Autonomie mixte : 8-10 minutes
* Marge de sécurité confortable

| Capacité | Poids | Autonomie Mixte | Remarque |
|----------|-------|-----------------|----------|
| **1400 mAh** | ~120-150g | ~3 min | Insuffisant, risqué |
| **4000 mAh** | ~350g | 8-10 min | Recommandé, confortable |
| **5000 mAh** | ~450g | 10-13 min | Optimal pour vol prolongé |`
    },
    {
      id: 'calc-6',
      title: 'Dimensionnement des ailes',
      description: 'Calcul de la surface alaire et des dimensions d\'aile (envergure, corde) pour profil NACA 5414',
      category: 'Aérodynamique',
      content: `## Données de base

* **Longueur fuselage :** 1.1 m
* **Profil d'aile :** NACA 5414
* **Coefficient de portance :** $C_L = 1.0$
* **Densité de l'air :** $\\rho = 1.225$ kg/m³
* **Allongement (AR) :** 6

---

## 1. Calcul de la Surface Alaire ($S$)

Formule de portance :

$$L = \\frac{1}{2} \\rho V^2 S C_L$$

Pour le vol en palier : $L = m \\cdot g$

$$S = \\frac{m \\cdot g}{\\frac{1}{2} \\rho V^2 C_L}$$

**Résultat :** $S = 0.55$ m²

---

## 2. Calcul de l'Envergure ($b$)

Relation avec l'allongement :

$$b = \\sqrt{S \\cdot AR} = \\sqrt{0.55 \\times 6}$$

$$b = \\sqrt{3.3} \\approx 1.8 \\text{ m}$$

**Avec marge de sécurité :** $b \\approx 1.7$ m

---

## 3. Calcul de la Corde Moyenne ($c$)

$$c = \\frac{S}{b} = \\frac{0.55}{1.7} \\approx 0.32 \\text{ m} = 32 \\text{ cm}$$

**Résultat final :** $c \\approx 30$ cm

---

## Résumé des Dimensions

| Paramètre | Valeur | Unité |
|-----------|--------|-------|
| **Surface alaire (S)** | 0.55 | m² |
| **Envergure (b)** | 1.7 | m |
| **Corde moyenne (c)** | 30 | cm |
| **Allongement (AR)** | 6 | - |
| **Profil** | NACA 5414 | - |`
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculs Techniques</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Retrouvez ici tous les calculs aérodynamiques et techniques effectués pour le projet Gaia. 
          Chaque calcul est structuré avec les données, formules et conclusions détaillées.
        </p>
      </div>

      {/* Calculations List */}
      <div className="space-y-8">
        {calculations.map((calc, index) => (
          <Card key={calc.id} className="shadow-xl border-2 border-gray-100 hover:border-primary/30 transition-all duration-300">
            <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {calc.title}
                    </CardTitle>
                    <p className="text-gray-600 text-base">{calc.description}</p>
                  </div>
                </div>
                {calc.category && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300 px-3 py-1">
                    {calc.category}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <div 
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownWithMath(calc.content) }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info box */}
      <Card className="mt-12 border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-3xl">📊</div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">À propos de ces calculs</h3>
              <p className="text-sm text-blue-800">
                Ces calculs sont effectués pour valider les performances théoriques de l'avion Gaia. 
                Ils prennent en compte les caractéristiques réelles du prototype et permettent d'optimiser 
                la conception avant la phase de test en vol.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculsSection;
