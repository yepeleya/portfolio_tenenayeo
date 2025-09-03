# 📊 Guide Analytics pour Portfolio Tenena Yeo

## 🚀 Configuration Google Analytics 4

### 1. Créer un compte Google Analytics
1. Allez sur [https://analytics.google.com](https://analytics.google.com)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Commencer" → "Créer un compte"
4. Nom du compte : "Portfolio Tenena Yeo"
5. Créer une propriété : "Portfolio Website"
6. Secteur d'activité : "Technologie"
7. Objectifs : "Obtenir des informations de base"

### 2. Configurer le stream de données
1. Type de plateforme : **Web**
2. URL du site web : `https://yepeleya.github.io/portfolio_tenenayeo`
3. Nom du stream : "Portfolio GitHub Pages"
4. **Copiez votre ID de mesure** (format: G-XXXXXXXXXX)

### 3. Activer le tracking
1. Ouvrez `src/utils/analytics.ts`
2. Remplacez `'G-XXXXXXXXXX'` par votre vrai ID
3. Commitez et poussez les changements

```typescript
export const GA_TRACKING_ID = 'G-VOTRE-VRAI-ID-ICI';
```

## 📈 Données que vous suivrez

### Automatiquement trackées :
- ✅ **Pages vues** (Accueil, À propos, Projets, Contact)
- ✅ **Sessions utilisateurs**
- ✅ **Utilisateurs uniques**
- ✅ **Géolocalisation des visiteurs**
- ✅ **Appareils utilisés** (mobile/desktop)
- ✅ **Sources de trafic** (Google, réseaux sociaux, direct)

### Événements personnalisés :
- 🎯 **Clics sur projets** (`trackProjectClick`)
- 📧 **Soumissions de formulaire** (`trackContactForm`)
- 📄 **Téléchargements CV** (`trackCVDownload`)
- 🌙 **Changements de thème** (`trackThemeToggle`)

## 🔧 Alternatives Analytics

### 1. **Vercel Analytics** (si vous migrez vers Vercel)
```bash
npm install @vercel/analytics
```

### 2. **Plausible Analytics** (respectueux de la vie privée)
```html
<script defer data-domain="votre-domaine.com" src="https://plausible.io/js/script.js"></script>
```

### 3. **Microsoft Clarity** (heatmaps gratuits)
- Inscription sur [https://clarity.microsoft.com](https://clarity.microsoft.com)
- Suivi des heatmaps et enregistrements de sessions

### 4. **GitHub Insights** (basique mais gratuit)
- Allez dans votre repo → Insights → Traffic
- Données limitées mais utiles pour commencer

## 📊 Dashboard Recommandé

### Métriques importantes à suivre :
1. **Trafic organique** (recherches Google)
2. **Temps passé sur le site**
3. **Taux de rebond** (objectif < 60%)
4. **Pages les plus visitées**
5. **Téléchargements CV**
6. **Soumissions formulaire contact**
7. **Clics sur projets GitHub**

### Rapports utiles :
- **Acquisition** → Sources de trafic
- **Engagement** → Pages et écrans
- **Événements** → Actions personnalisées
- **Tech** → Navigateurs et appareils

## 🎯 Objectifs de croissance

### Court terme (1-3 mois) :
- 📈 **100+ visiteurs uniques/mois**
- 📧 **5+ contacts qualifiés**
- 📄 **20+ téléchargements CV**

### Moyen terme (6 mois) :
- 📈 **500+ visiteurs uniques/mois**
- 🌍 **Visibilité internationale**
- 💼 **Opportunités d'emploi via le portfolio**

## 🚨 Configuration Urgente

**Étape 1** : Créer compte Google Analytics
**Étape 2** : Copier l'ID de mesure
**Étape 3** : Modifier `analytics.ts` avec votre ID
**Étape 4** : Push vers GitHub
**Étape 5** : Vérifier les données dans 24h

---

💡 **Astuce** : Commencez par Google Analytics (gratuit et complet), puis ajoutez d'autres outils selon vos besoins.
