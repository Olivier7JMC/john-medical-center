# 🏥 John Medical Center (JMC) — Application Web Officielle

Bienvenue sur le dépôt officiel du projet web du **John Medical Center (JMC)**. Cette application web moderne, réactive et performante permet d'informer les patients, de présenter la structure médicale et ses services, de collecter les demandes de stage et de contact, et de gérer les candidatures via un panneau d'administration sécurisé.

---

## 🌟 Fonctionnalités Principales

- **Accueil & Présentation** : Vitrine interactive mettant en valeur les soins de santé, les équipes et l'engagement du centre médical.
- **Services Médicaux** : Maternité & Gynécologie, Pédiatrie, Médecine Générale, Chirurgie, Laboratoire & Imagerie, Urgences 24h/7j.
- **Formulaire de Demande de Stage** : Dépôt en ligne des dossiers de stage (académique et professionnel) avec téléversement de pièces justificatives (PDF/Word/Images) et notification e-mail automatique.
- **Campagnes de Santé & Sensibilisation** : Informations sur le don de sang, la santé maternelle et les missions médicales foraines.
- **Galerie Médicale** : Découverte des infrastructures et équipements modernes.
- **Espace Administrateur** : Interface de gestion et de traitement des candidatures de stage.
- **Formulaire de Contact Direct** : Envoi de messages directement transmis à la direction médicale via SMTP Hostinger.

---

## 🛠️ Stack Technique

- **Frontend** : React 19, TypeScript, Tailwind CSS v4, Lucide React (Icônes), Motion (Animations), React Helmet Async.
- **Backend / Serveur** : Node.js, Express, Nodemailer (gestion des e-mails), Multer (téléversement de fichiers).
- **Build & Compilation** : Vite (Frontend) + esbuild (Bundling CJS du serveur backend `server.ts`).

---

## 📋 Prérequis

Avant de commencer, assurez-vous de disposer de :

- **Node.js** : Version LTS recommandée (v20.x, v22.x ou ultérieure).
- **npm** : Inclus avec Node.js.
- **Git** : Pour le contrôle de version et la synchronisation GitHub.

---

## 🚀 Installation & Démarrage en local

### 1. Cloner le dépôt et accéder au dossier

```bash
git clone https://github.com/VOTRE_NOM_UTILISATEUR/VOTRE_NOM_DE_DEPOT.git
cd john-medical-center
```

### 2. Installer les dépendances

```bash
npm install
```

> 💡 **Note Windows / Conflit de dépendances** :
> Si vous rencontrez une erreur lors du `npm install` sous Windows ou un conflit de versions peer, exécutez :
> ```bash
> npm install --legacy-peer-deps
> ```
> 
> En cas d'erreur de restriction de script PowerShell (`Execution_Policies`), exécutez votre terminal en tant qu'Administrateur ou utilisez :
> ```powershell
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

### 3. Configurer l'environnement (`.env`)

Créez un fichier `.env` à la racine de votre projet en vous basant sur l'exemple ci-dessous :

```env
# Port du serveur (par défaut 3000)
PORT=3000

# Clé API Google Gemini AI (facultatif - pour les fonctions intelligentes)
GEMINI_API_KEY="VOTRE_CLE_API_GEMINI"

# Configuration SMTP Hostinger (Envoi des e-mails de stage et contact)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_USER="johnmedicalcente@johnmedicalcenter.com"
SMTP_PASS="VOTRE_MOT_DE_PASSE_SMTP"
RECEIVER_EMAIL="johnmedicalcente@johnmedicalcenter.com"
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible dans votre navigateur à l'adresse : `http://localhost:3000`.

---

## 📦 Build & Production Local

Pour préparer et tester le projet avant déploiement :

1. **Compiler le projet** :
   ```bash
   npm run build
   ```
   *Cette commande compile le frontend dans le dossier `dist/` et génère le fichier bundle backend `dist/server.cjs`.*

2. **Démarrer l'application en mode production** :
   ```bash
   npm start
   ```

---

## 🔄 Mise à jour du dépôt GitHub (Workflow Git)

Pour pousser vos modifications locales vers votre dépôt GitHub :

```bash
# 1. Vérifier l'état des fichiers modifiés
git status

# 2. Ajouter tous les fichiers modifiés au suivi
git add .

# 3. Créer un commit décrivant vos changements
git commit -m "Mise à jour de l'application et de la documentation README"

# 4. Envoyer les modifications vers la branche principale sur GitHub
git push origin main
```

---

## 🌐 Guide de Déploiement sur Hostinger

### Méthode 1 : Déploiement Automatique via Application Node.js (hPanel Hostinger)

1. Connectez-vous à votre espace **Hostinger hPanel**.
2. Allez dans la section **Applications Web Node.js** (ou Web App / VPS).
3. Liez votre compte GitHub et sélectionnez ce dépôt.
4. Renseignez les paramètres suivants :
   - **Version Node.js** : `20.x` ou `22.x`
   - **Répertoire racine** : `/`
   - **Commande de Build** : `npm install --legacy-peer-deps && npm run build`
   - **Commande de Démarrage (Start command)** : `npm start` (ou `node dist/server.cjs`)
5. Ajoutez vos variables d'environnement (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.) dans l'onglet des variables d'environnement d'Hostinger.
6. Cliquez sur **Déployer**.

### Méthode 2 : Déploiement sur VPS Hostinger (SSH)

1. Connectez-vous à votre VPS par SSH.
2. Clonez le dépôt et installez PM2 (`npm install -g pm2`).
3. Compilez l'application (`npm run build`).
4. Lancez le serveur avec PM2 :
   ```bash
   pm2 start dist/server.cjs --name "jmc-app"
   ```

---

## 📂 Structure du Projet

```text
├── public/                 # Assets statiques (icônes, images publiques)
├── src/
│   ├── assets/             # Médias et illustrations
│   ├── components/         # Composants React (Header, Hero, Services, Internships, Contact, etc.)
│   ├── lib/                # Utilitaires et fonctions partagées
│   ├── App.tsx             # Composant racine
│   ├── main.tsx            # Point d'entrée React
│   ├── types.ts            # Interfaces TypeScript
│   └── index.css           # Fichier Tailwind CSS principal
├── server.ts               # Serveur Express & API (Nodemailer, Uploads, Servage statique)
├── package.json            # Dépendances & scripts du projet
├── vite.config.ts          # Configuration Vite
└── README.md               # Documentation du dépôt
```

---

## 📄 Licence & Contact

**Centre Médical Jacques-Marie (JMC)**  
Tous droits réservés © 2026.  
Contact administration : `johnmedicalcente@johnmedicalcenter.com`
