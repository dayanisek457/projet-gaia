# Guide du Calculateur Physique Gaia

## Vue d'ensemble

Le calculateur physique est un outil intégré dans l'interface d'administration qui permet d'effectuer des calculs aérodynamiques en temps réel pour le projet Gaia.

## Accès au Calculateur

1. Connectez-vous à l'interface admin à `/admin`
2. Cliquez sur l'onglet **"Calculateur"** dans la barre de navigation
3. Le calculateur s'affiche dans un iframe embarqué

Vous pouvez également accéder au calculateur depuis la carte "Calculateur Physique" sur le dashboard principal de l'admin.

## Fonctionnalités

Le calculateur permet de:
- Calculer les performances aérodynamiques de l'avion Gaia
- Modifier les paramètres en temps réel et voir les résultats instantanément
- Exporter les résultats des calculs
- Réinitialiser les valeurs par défaut

### Paramètres Disponibles

#### Moteur & Hélice
- Voltage sous charge (V)
- KV Moteur (tr/min/V)
- Efficacité Moteur (%)
- Pas de l'hélice (pouces)
- Nombre de moteurs
- Poussée par moteur (kg)
- Puissance par moteur (W)

#### Caractéristiques Avion
- Masse totale (kg)
- Surface alaire (m²)
- Envergure (m)
- Corde moyenne (m)
- CL max (coefficient portance)
- CD0 (coefficient traînée)
- Efficacité hélice (%)

#### Batterie
- Capacité batterie (mAh)
- Utilisation max (%)
- Courant total (A) - plein gaz
- Courant moyen (A) - mi-gaz

#### Environnement
- Densité air (kg/m³)
- Gravité (m/s²)

### Résultats Calculés

Le calculateur affiche automatiquement:
- **Vitesse Maximale**: Vitesse max atteignable en vol horizontal
- **Régime Moteur (RPM)**: Tours par minute du moteur
- **Pitch Speed**: Vitesse théorique sans glissement
- **Vitesse de Décrochage**: Vitesse minimale pour maintenir le vol
- **Vitesse d'Approche**: Recommandée pour l'approche
- **Vitesse de Croisière**: Vol stable à mi-gaz
- **Distance de Décollage**: Distance nécessaire pour décoller
- **Autonomie**: Plein gaz et vol mixte
- **Ratios de Performance**: Poids/Puissance, Poussée/Poids
- **Charge Alaire**: kg/m²
- **Allongement (AR)**: Ratio d'allongement de l'aile
- **Puissance Totale**: Watts totaux et utilisables

## Utilisation

1. **Modifier les Paramètres**: Entrez les valeurs souhaitées dans les champs de gauche
2. **Voir les Résultats**: Les résultats se mettent à jour automatiquement à droite
3. **Exporter**: Cliquez sur "📊 Exporter" pour télécharger les résultats en format texte
4. **Réinitialiser**: Cliquez sur "↺ Réinitialiser" pour revenir aux valeurs par défaut

## Intégration Technique

### Fichiers
- **Composant React**: `/src/components/PhysicsCalculator.tsx`
- **Fichier HTML**: `/public/Gaia Dashboard - Fixed.html`
- **Page Admin**: `/src/pages/Admin.tsx` (intégration)

### Structure du Composant

```tsx
const PhysicsCalculator = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1>Calculateur Physique</h1>
        <p>Effectuez des calculs aérodynamiques en temps réel</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tableau de Bord Gaia - Calculs Aérodynamiques</CardTitle>
        </CardHeader>
        <CardContent>
          <iframe src="/Gaia Dashboard - Fixed.html" />
        </CardContent>
      </Card>
    </div>
  );
};
```

### Configuration de l'Iframe

L'iframe est configurée avec:
- **Source**: `/Gaia Dashboard - Fixed.html`
- **Hauteur**: `calc(100vh - 250px)` avec un minimum de 800px
- **Largeur**: 100% du conteneur
- **Style**: Bordure arrondie pour cohérence avec l'interface

## Notes Importantes

1. **Authentification Requise**: L'accès au calculateur nécessite une connexion à l'interface admin
2. **Calculs Locaux**: Tous les calculs sont effectués côté client (dans le navigateur)
3. **Pas de Sauvegarde Auto**: Les paramètres ne sont pas sauvegardés automatiquement
4. **Export Manuel**: Utilisez la fonction d'export pour sauvegarder vos résultats

## Maintenance

Pour modifier le calculateur:
1. Éditez le fichier `/public/Gaia Dashboard - Fixed.html`
2. Les modifications seront automatiquement reflétées dans l'admin
3. Aucune recompilation nécessaire pour les changements HTML

## Support

Pour toute question ou problème:
- Vérifiez que le fichier HTML est bien présent dans `/public/`
- Assurez-vous d'être authentifié dans l'interface admin
- Consultez la console du navigateur pour d'éventuelles erreurs

## Captures d'Écran

### Calculateur Complet
![Calculateur Physique](https://github.com/user-attachments/assets/53fdd9a9-1f0f-466b-9cc4-5006b6be2a67)

### Interface Admin
![Page de Connexion Admin](https://github.com/user-attachments/assets/e6058274-61d0-46d6-870a-515a56e2c153)
