# 🚀 Guide : Héberger tes projets pour "Voir le projet"

## 📋 Statut actuel de tes projets

### ✅ Projets déjà hébergés (GitHub Pages)
- **Système de Parrainage ISTC** : https://yepeleya.github.io/projet-parrainage
- **Convertisseur de Devises** : https://yepeleya.github.io/currency-converter
- **Générateur QR Code** : https://yepeleya.github.io/qr-generator
- **Todo App** : https://yepeleya.github.io/todo-app
- **Calculatrice Scientifique** : https://yepeleya.github.io/scientific-calculator

### ⏳ Projet à héberger
- **Plateforme JIG 2026** : Actuellement avec `external: "#"`

---

## 🛠️ Solutions d'hébergement

### 1. **GitHub Pages** (GRATUIT - Recommandé pour tes projets)

#### Pour projets Front-end simples (HTML/CSS/JS)
```bash
# Dans ton repo GitHub
1. Va dans Settings > Pages
2. Source : Deploy from a branch
3. Branch : main ou gh-pages
4. Folder : / (root) ou /docs
5. Save
```

#### Pour projets React/Vue
```bash
# Ajouter dans package.json
"homepage": "https://yepeleya.github.io/nom-du-repo",

# Build et deploy
npm run build
npm install --save-dev gh-pages
npx gh-pages -d build
```

### 2. **Netlify** (GRATUIT - Plus facile)

#### Avantages :
- Drag & drop du dossier build
- URL personnalisée possible
- Support formulaires
- Redirections faciles

#### Étapes :
1. Va sur netlify.com
2. Connecte ton GitHub
3. Sélectionne le repo
4. Build command : `npm run build`
5. Publish directory : `build`

### 3. **Vercel** (GRATUIT - Excellent pour React)

#### Avantages :
- Déploiement automatique
- Performance optimale
- Preview URLs

#### Étapes :
1. Va sur vercel.com
2. Import depuis GitHub
3. Configuration automatique
4. Deploy !

### 4. **Firebase Hosting** (GRATUIT)

#### Pour projets plus complexes
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🎯 Plan d'action pour ton projet JIG 2026

### Option 1 : Héberger sur Netlify (Recommandé)
Le projet JIG 2026 est en PHP, donc tu as plusieurs options :

1. **Version démo statique** : Créer une version HTML/CSS/JS qui montre l'interface
2. **Hébergement PHP gratuit** : 
   - 000webhost.com
   - InfinityFree
   - AwardSpace

### Option 2 : GitHub Pages avec version démo
Créer une branche `demo` avec une version front-end only qui montre :
- L'interface de connexion
- Le dashboard
- La galerie
- Screenshots des fonctionnalités

---

## 🔧 Mise à jour automatique des URLs

J'ai créé une fonction qui :
- ✅ Détecte automatiquement si un projet est disponible
- ✅ Génère les URLs GitHub Pages automatiquement
- ✅ Affiche un message informatif si le projet n'est pas encore hébergé
- ✅ Montre un chargement avec le béret quand on clique

### Comment mettre à jour tes projets :

#### 1. Pour activer GitHub Pages sur un repo existant :
```bash
# Dans le repo du projet
git checkout -b gh-pages
# Assure-toi que index.html est à la racine
git push origin gh-pages
```

#### 2. Pour mettre à jour ton portfolio :
```typescript
// Dans ModernProjectsPage.tsx, remplace les "#" par :
external: "https://yepeleya.github.io/nom-du-repo",
```

---

## 📱 Projets à prioriser pour l'hébergement

### Priorité 1 (Impact maximal)
1. **JIG 2026** - Version démo avec screenshots
2. **Système de Parrainage** - Déjà fait ✅

### Priorité 2 (Portfolio complet)
1. Tous les autres projets - Déjà faits ✅

---

## 🚀 Prochaines étapes

1. **Immédiat** : Le système de chargement avec béret est déjà en place
2. **Cette semaine** : Héberger JIG 2026 en version démo
3. **Optionnel** : Migrer certains projets vers Netlify pour de meilleures performances

---

## 💡 Conseils pro

- **Toujours tester** tes projets hébergés sur mobile
- **Optimiser les images** pour des temps de chargement rapides
- **Ajouter un README.md** attractif dans chaque repo
- **Utiliser des domaines personnalisés** si tu veux un look plus pro

---

Veux-tu que je t'aide à héberger un projet spécifique ? 🤔
