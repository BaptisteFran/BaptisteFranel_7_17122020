# Groupomania

###### Comment l'installer ?

- Télécharger le projet
- Le décompresser sur votre machine
- Avec un éditeur du style Visual Studio Code, ouvrir le terminal
- Accèder au dossier backend et taper npm install
- Accèder ensuite au dossier frontend et taper npm install
- Installer une base de donnée MySQL (Wamp dans mon exemple)
- Dans le dossier .env, renseignez les informations de votre base de données
- Retournez sur votre console terminal, dans le dossier backend, tapez "npm run dev"
- Dans le terminal, dans le dossier frontend, tapez "npm run serve"

**Félicitations, votre site est en place ! Vous pouvez commencer à l'utiliser.**

###### Configurer les envois de mail :

- Dans votre éditeur, ouvrez le fichier .env se trouvant des backend/
- Modifiez cette partie :


`
EMAIL_ADDRESS = votre_email
EMAIL_PASSWORD = votre_mot_de_passe
EMAIL_HOST = votre_serveur_smpt
`


###### Création du premier utilisateur

- Le premier utilisateur aura TOUJOURS les droits d'administration
- Après la création du premier utilisateur, tous les comptes auront un compte d'utilisateur normal
- Si vous souhaitez modifier les droits d'un compte, il vous faudra les modifier via le panneau d'administration avec le premier compte créé.


###### Gestion des droits utilisateurs :

Les utilisateurs ont pour l'instant 3 niveaux de droits différents :
- 0 : Utilisateur banni
- 1 : Utilisateur
- 768 : Administrateur
