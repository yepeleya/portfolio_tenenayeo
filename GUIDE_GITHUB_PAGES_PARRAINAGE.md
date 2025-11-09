# 🚀 Guide : Activer GitHub Pages pour le projet parrainage

## 📋 Problème actuel
Le lien `https://yepeleya.github.io/projet-parrainage-aeistc` retourne une erreur 404 car GitHub Pages n'est pas activé sur ce repository.

## ✅ Solution temporaire appliquée
En attendant, les liens "Voir le projet" pointent maintenant directement vers le code GitHub : `https://github.com/yepeleya/projet-parrainage-aeistc`

## 🛠️ Comment activer GitHub Pages sur le projet parrainage

### Étape 1 : Aller sur le repository
1. Va sur : `https://github.com/yepeleya/projet-parrainage-aeistc`
2. Clique sur **Settings** (en haut à droite)

### Étape 2 : Configurer GitHub Pages
1. Dans le menu de gauche, clique sur **Pages**
2. Dans **Source**, sélectionne **Deploy from a branch**
3. Dans **Branch**, sélectionne **main** (ou la branche principale)
4. Dans **Folder**, sélectionne **/ (root)**
5. Clique sur **Save**

### Étape 3 : Attendre le déploiement
- GitHub Pages va prendre 2-5 minutes pour se configurer
- Une fois prêt, tu verras un message vert avec l'URL

### Étape 4 : Tester l'URL
- L'URL sera : `https://yepeleya.github.io/projet-parrainage-aeistc`
- Teste cette URL pour voir si ton projet s'affiche

## 🔧 Si le projet ne s'affiche pas correctement

### Pour un projet PHP (comme le système de parrainage)
GitHub Pages ne supporte que les sites statiques (HTML/CSS/JS). Pour un projet PHP :

#### Option A : Créer une version démo statique
1. Crée une branche `demo` ou `gh-pages`
2. Convertis les pages PHP principales en HTML statique
3. Remplace les fonctionnalités PHP par du JavaScript simulé
4. Configure GitHub Pages pour utiliser cette branche

#### Option B : Héberger ailleurs
1. **Netlify** : Supporte quelques fonctionnalités PHP
2. **Heroku** : Support PHP complet (gratuit limité)
3. **000webhost** : Hébergement PHP gratuit
4. **InfinityFree** : PHP/MySQL gratuit

#### Option C : Créer une page de présentation
1. Crée un simple `index.html` avec :
   - Screenshots du projet
   - Description des fonctionnalités
   - Liens vers le code source
   - Démonstration vidéo si possible

## 📝 Exemple de page de présentation

Crée un fichier `index.html` dans le repository parrainage :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Système de Parrainage ISTC - Tenena Yeo</title>
    <style>
        /* Styles modernes ici */
    </style>
</head>
<body>
    <h1>🎓 Système de Parrainage ISTC Polytechnique</h1>
    
    <section>
        <h2>📋 Fonctionnalités</h2>
        <ul>
            <li>Inscription parrains/filleuls</li>
            <li>Système de matching automatique</li>
            <li>Messagerie intégrée</li>
            <li>Dashboard administrateur</li>
        </ul>
    </section>
    
    <section>
        <h2>🛠️ Technologies utilisées</h2>
        <p>PHP, MySQL, JavaScript, Bootstrap, HTML5/CSS3</p>
    </section>
    
    <section>
        <h2>📸 Captures d'écran</h2>
        <!-- Ajoute tes screenshots ici -->
    </section>
    
    <section>
        <h2>💻 Code source</h2>
        <a href="https://github.com/yepeleya/projet-parrainage-aeistc">
            Voir le code sur GitHub
        </a>
    </section>
</body>
</html>
```

## 🎯 Prochaines étapes

1. **Immédiat** : Les liens pointent maintenant vers GitHub (fonctionnel)
2. **Optionnel** : Activer GitHub Pages avec une page de présentation
3. **Avancé** : Héberger le projet PHP sur une plateforme compatible

---

**Note** : Une fois GitHub Pages activé, reviens modifier les liens dans le portfolio pour utiliser l'URL GitHub Pages au lieu du lien GitHub direct.