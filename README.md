# Groupomania

###### Comment l'installer ?

- Télécharger le projet
- Le décompresser sur votre machine
- Avec un éditeur du style Visual Studio Code, ouvrir le terminal
- Accèder au dossier backend et taper npm install
- Accèder ensuite au dossier frontend et taper npm install
- Installer Wamp
- Dans le dossier .env, renseignez les informations de votre base de données
- Retournez sur votre console terminal, dans le dossier backend, tapez "npm run dev"
- Dans le terminal, dans le dossier frontend, tapez "npm run serv"

**Félicitations, votre site est en place ! Vous pouvez commencer à l'utiliser.**

###### Configurer les envois de mail :

- Dans votre éditeur, ouvrez le fichier user.js se trouvant des backend/API/
- Modifiez cette partie :

`const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'VOTRE_NOM_UTILISATEUR',
        pass: 'VOTRE_MOT_DE_PASS'
    }
});`

Exemple : 
`const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'groupomania@gmail.com',
        pass: 'motdepasses3cur1s3**'
    }
});`
