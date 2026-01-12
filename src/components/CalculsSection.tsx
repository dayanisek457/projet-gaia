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
      content: `## Introduction

Tu as tout à fait raison de douter. Avec les nouvelles précisions (KV 1400 et hélice 8x6), nous pouvons affiner le calcul en utilisant le **"Pitch Speed"** (la vitesse théorique du flux d'air généré par l'hélice).

C'est souvent le facteur limitant pour ce type d'avion, bien avant la puissance brute.

## 1. Calcul du "Pitch Speed" (Vitesse théorique de l'hélice)

Le "Pitch Speed" est la vitesse à laquelle l'avion avancerait si l'hélice se "vissait" dans l'air sans aucun recul (comme une vis dans du bois). L'avion ne peut physiquement pas dépasser cette vitesse en palier.

**Données :**

* **Voltage sous charge :** Une batterie 11.1V (3S) chute un peu sous l'effort. Prenons une valeur réaliste de **10.5V**.
* **KV :** 1400 tr/min/V.
* **Efficacité Moteur :** Un moteur électrique en charge tourne généralement à ~80% de son KV théorique.
* **Pas de l'hélice (Pitch) :** 6 pouces = 0.1524 m.

**Calcul des RPM (Rotations par minute) :**

$$\\text{RPM} = \\text{Voltage} \\times \\text{KV} \\times \\text{Efficacité} = 10.5 \\times 1400 \\times 0.80 = 11760 \\text{ tr/min}$$

**Calcul du Pitch Speed ($V_{pitch}$) :**

$$V_{pitch} = \\text{RPM} \\times \\text{Pitch} \\times 60^{-1} = 11760 \\times 0.1524 \\times \\frac{1}{60} = 29.9 \\text{ m/s} = 107 \\text{ km/h}$$

---

## 2. La réalité aérodynamique (Le facteur "Cessna")

Le calcul ci-dessus (107 km/h) est une vitesse théorique impossible à atteindre en pratique pour un Cessna.

**Pourquoi ?**

1. **Le Glissement (Slip) :** L'hélice n'est pas une vis solide. Dans l'air, elle "patine". Pour qu'une hélice génère de la traction, elle doit tourner plus vite que l'air qui arrive sur elle. En général, la vitesse max réelle se situe entre **75% et 85%** du Pitch Speed.

2. **La Traînée (Drag) :** Tu as un **fuselage large** (15 cm), des **ailes hautes**, et surtout le **train sorti**. C'est un aérofrein permanent.
   * Un avion de course (fin et lisse) atteindrait 90% du Pitch Speed.
   * Un "Trainer" style Cessna atteint péniblement 70-75% du Pitch Speed.

---

## 3. Nouvelle Estimation de la Vitesse Max ($V_{max}$)

Appliquons un coefficient de "réalité" de 75% (typique pour un trainer aile haute) au Pitch Speed :

$$V_{max} = 0.75 \\times 107 = 80 \\text{ km/h}$$

Si l'avion est très bien construit et léger, tu pourras peut-être toucher les **85 km/h** en piqué léger ou plein gaz vent dans le dos, mais **80 km/h** est le "mur" réaliste.

---

## 4. Bilan Performance Révisé

Voici les caractéristiques de vol corrigées avec tes données moteur précises :

| Paramètre | Valeur Estimée | Commentaire |
|-----------|---------------|-------------|
| **Vitesse Décrochage** | **31 km/h** | Reste inchangée (dépend du poids/surface). |
| **Vitesse Croisière** | **50 - 60 km/h** | Ce sera ta vitesse confortable à mi-gaz. |
| **Vitesse Max (Réelle)** | **75 - 82 km/h** | Plafond aérodynamique dû à la traînée et au pas de 6. |
| **Rapport Poussée/Poids** | **0.8 : 1** | $\\frac{1.96 \\text{ kg}}{2.5 \\text{ kg}} = 0.78$. Très sain. |

---

## Conclusion

Tu avais raison : **100 km/h est hors de portée** avec un pas de 6 pouces sur cette cellule. Ton avion volera plutôt autour de **80 km/h à fond**, ce qui est beaucoup plus "maquette" et agréable pour un Cessna de 1.45m.

Avec 2 kg de poussée totale pour 2.5 kg, tu as une motorisation **très saine** : il ne sera pas une fusée de vitesse, mais il aura beaucoup de "couple" pour grimper, décoller court (STOL) et se sortir de situations dangereuses.`
    },
    {
      id: 'calc-2',
      title: 'Estimation des vitesses (Cessna 172)',
      description: 'Calcul détaillé de la vitesse de décrochage et de la vitesse maximale pour le modèle Cessna 172',
      category: 'Aérodynamique',
      content: `## 1. Analyse et Hypothèses Critiques

Il y a un point crucial à clarifier dans tes données : le rapport entre la motorisation et la masse.

* **Masse totale :** 2.5 kg
* **Configuration :** Tu as "Nombre de moteurs : 2" et tu indiques "Poussée : 0.98kg" et "Puissance : 288.4W"

**Interprétation :** Étant donné qu'un avion de 2.5 kg ne volerait pratiquement pas avec seulement 0.98 kg de poussée totale (ratio 0.4), je vais assumer que les valeurs de poussée et de puissance données sont par moteur.

* **Poussée Totale estimée :** $0.98 \\text{ kg} \\times 2 = 1.96 \\text{ kg}$ (soit $\\approx 19.2 \\text{ N}$)
* **Puissance Totale estimée :** $288.4 \\text{ W} \\times 2 = 576.8 \\text{ W}$

Ce rapport Poussée/Poids de $\\approx 0.8$ et une puissance de $\\approx 230 \\text{ W/kg}$ correspondent parfaitement à un vol réaliste et confortable pour une maquette de type Cessna.

---

## 2. Calcul de la Vitesse de Décrochage ($V_{stall}$)

C'est la vitesse minimale en dessous de laquelle l'avion tombe. C'est la donnée la plus importante pour l'atterrissage.

**Formule :**

$$V_{stall} = \\sqrt{\\frac{2 \\cdot m \\cdot g}{\\rho \\cdot S \\cdot C_{L_{max}}}}$$

**Données :**
* $m$ (Masse) = 2.5 kg
* $g$ (Gravité) = 9.81 m/s²
* $\\rho$ (Densité air) = 1.225 kg/m³
* $S$ (Surface alaire) = 0.55 m²
* $C_{L_{max}}$ (Coef. de portance max) = 1.007 (donnée fournie)

**Calcul :**

Poids ($W$) : $2.5 \\times 9.81 = 24.525 \\text{ N}$

Dénominateur : $1.225 \\times 0.55 \\times 1.007 \\approx 0.678$

$$V_{stall} = \\sqrt{\\frac{2 \\times 24.525}{0.678}} = \\sqrt{\\frac{49.05}{0.678}} = \\sqrt{72.34} \\approx 8.5 \\text{ m/s}$$

**Vitesse de décrochage (Min) :** $\\approx 30.6 \\text{ km/h}$

---

## 3. Estimation de la Vitesse Maximale ($V_{max}$)

La vitesse maximale est atteinte lorsque la Traînée ($D$) égale la Poussée ($T$).

Pour un avion type Cessna 172 (ailes hautes, train sorti, fuselage carré), le coefficient de traînée parasite ($C_{D0}$) est assez élevé. Nous allons l'estimer entre 0.045 et 0.055, ce qui est standard pour ce type de modèle RC.

**Méthode par l'équilibre Poussée / Traînée :**

$$V_{max} = \\sqrt{\\frac{2 \\cdot T}{\\rho \\cdot S \\cdot C_{D0}}}$$

**Données :**
* $T$ (Poussée totale) = $1.96 \\text{ kg} \\times 9.81 = 19.22 \\text{ N}$
* $C_{D0}$ (Estimé) = 0.05 (moyen pour un trainer avec train d'atterrissage)

**Calcul :**

Numérateur : $2 \\times 19.22 = 38.44$

Dénominateur : $1.225 \\times 0.55 \\times 0.05 \\approx 0.0337$

$$V_{max} = \\sqrt{\\frac{38.44}{0.0337}} = \\sqrt{1140} \\approx 33.7 \\text{ m/s}$$

**Vitesse Maximale (Aérodynamique) :** $\\approx 121 \\text{ km/h}$

**Note :** Cette vitesse est théorique. En réalité, tu seras limité par le "Pitch Speed" (la vitesse du pas de l'hélice).

### Vérification par la Puissance (Check énergétique)

Si on utilise la puissance disponible (576 W totaux) avec une efficacité d'hélice de 70% ($\\eta = 0.7$), la puissance utile est de $\\approx 400 \\text{ W}$.

$$P_{utile} = \\frac{1}{2} \\rho S C_{D0} v^3$$

$$v = \\sqrt[3]{\\frac{2 \\cdot 400}{1.225 \\cdot 0.55 \\cdot 0.05}} \\approx 28.7 \\text{ m/s} \\approx 103 \\text{ km/h}$$

Ce chiffre (103 km/h) est souvent plus réaliste que le calcul basé sur la poussée statique pure, car la poussée d'une hélice diminue à mesure que l'avion accélère.

---

## 4. Résumé des Performances Estimées

Voici les vitesses prévues pour ton bimoteur de 2.5 kg :

| Type de vitesse | Valeur (km/h) | Valeur (m/s) | Notes |
|----------------|---------------|--------------|-------|
| **Vitesse de décrochage** | 31 km/h | 8.5 m/s | Ne pas voler en dessous |
| **Vitesse d'approche** | 40 km/h | 11 m/s | Vitesse idéale pour atterrir ($1.3 \\times V_{stall}$) |
| **Vitesse de croisière** | 70 - 80 km/h | 20-22 m/s | Vol économique à mi-gaz |
| **Vitesse Maximale** | 100 - 110 km/h | 28-30 m/s | Plein gaz, palier |

---

## Analyse du comportement

**Charge alaire :** $\\frac{2500 \\text{ g}}{55 \\text{ dm}^2} = 45 \\text{ g/dm}^2$

C'est une charge alaire excellente (plutôt faible) pour cette envergure. L'avion sera très stable, facile à piloter et capable de voler lentement sans décrocher brutalement. C'est un comportement typique de "Trainer".

**Motorisation :** Avec deux moteurs fournissant près de 2 kg de poussée pour 2.5 kg de poids, tu as une réserve de puissance confortable pour des montées franches, mais pas pour du vol 3D vertical illimité (ce qui est normal pour un style Cessna).

---

## Ce qui manque pour être précis à 100%

Pour affiner la vitesse maximale exacte, il manque une donnée clé : **Le pas (pitch) de l'hélice et le KV des moteurs**.

* Si le pas est faible (ex: 8x4), l'avion aura beaucoup de couple mais plafonnera vite (ex: 80 km/h max).
* Si le pas est élevé (ex: 8x6 ou 8x7), il pourra atteindre les 110 km/h calculés ci-dessus.`
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
