//   Utilisation concrète ->   $(selecteur).action sur notre sélection()
//   $() -> propriété pour utiliser les fonctions et méthodes jQuery
//   Juste plus rapide à écrire que jQuery() !

(function($) {

  // fn sans extension explicite permet d'ajouter de nouvelles propriétés à notre plugin en une seule fois :
  $.fn.my_wysiwyg=function(options) {

    // Création des options de la barre d'outils :
    // Boutons
    let buttons = {
      buttons : ['gras', 'italique', 'barré', 'couleur', 'police', 'lien', 'taille', 'plus', 'minus', 'gauche', 'droite', 'centré', 'justifié', 'générer', 'enregistrer', 'youtube', 'dailymotion', 'image']
    };

    // Paramètrage des boutons :
    let parameters = $.extend(buttons, options);

      // On retourne nos 'options' sur chacun de nos éléments :
      return this.each(function() {

        // WRAP permet d'envelopper les éléments Html sélectionnés
        // on sélectionne notre Wysiwyg :
        $(this).wrap("<div class='wysiwyg'></div>");

        // PARENT() permet d'accéder au parent direct de l'élément avec la class wysiwyg (premier sélectionné)
        // variable wrap devient notre accès au parent Wysiwyg :
        let wrap = $(this).parent();

        // APPEND permet d'insérer du contenu en tant que dernier enfant de notre div éditeur
        wrap.append("<div class='editor' contenteditable='true'></div>");

        // Puis on masque la zone de texte avec HIDE() pour faire joli :
        $(this).hide();

        // PREPEND lui, insert le contenu en tant que premier enfant
        // on place ainsi nos bouttons au début :
        wrap.prepend("<div class='buttons'></div>");


                            /// ///        Fonctionnalités pour chacun des boutons de la barre d'outils        /// ///


        // Sélection dans notre tableau du bouton GRAS
        // Si bouton est différent de -1 est qu'il est donc dans notre tableau :
        if ($.inArray("gras", parameters.buttons) != -1) {

          // FIND permet de sélectionner tous les descendants de l'élément :
          // On ajoute a notre options bouton le bouton HTML
          wrap.find(".buttons").append("<button class='gras'><img src='assets/bold.png'/></button>");

          // On ajoute la fonction GRAS à ce bouton :
          wrap.find(".gras").click(function() {

            // au click on exécute la fonction
            // avec execCommand on affecte la zone active :
            document.execCommand('bold', false, null);
            // Exécution de la fonction 'bold' => ( Ajoute ou enlève l'affichage bold de la sélection ou au point d'insertion. )
          });
        };


        // Sélection dans notre tableau du bouton ITALIQUE
        if ($.inArray("italique", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='italique'><img src='assets/italic.png'/></span></button>");

          wrap.find(".italique").click(function() {
            // Exécution de la commande italic =>
            // ( Active / désactive l'italique pour la sélection ou le point d'insertion. )
            document.execCommand('italic', false, null);
          });
        };

        // Sélection dans notre tableau du bouton BARRER
        if ($.inArray("barré", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='barré'><img src='assets/strikethrough.png'/></button>");
          
          wrap.find(".barré").click(function() {
            // Exécution de la commande strike =>
            // ( Active ou désactive le barré pour la sélection ou le point d'insertion. )
            document.execCommand('strikeThrough', false, null);
          });
        };



        // Sélection dans notre tableau du bouton TAILLE
        if ($.inArray("taille", parameters.buttons) != -1) {

          // Création du bouton html SELECT avec les différentes options :
          wrap.find(".buttons").append("<select class='taille'></select>");

          wrap.find(".taille").append("<option value=''>Taille</option>");
          wrap.find(".taille").append("<option value='1'>6px</option>");
          wrap.find(".taille").append("<option value='2'>8px</option>");
          wrap.find(".taille").append("<option value='3'>12px</option>");
          wrap.find(".taille").append("<option value='4'>14px</option>");
          wrap.find(".taille").append("<option value='5'>20px</option>");
          wrap.find(".taille").append("<option value='6'>24px</option>");
          wrap.find(".taille").append("<option value='7'>32px</option>");

          // On déclenche l'évent .CHANGE sur notre élément select :
          wrap.find(".taille").change(function() {

            // On affecte la font-size de l'élément actif avec => .VAL() qui permet d'obtenir l'élément sélectionné dans notre SELECT :

            // Puis execution de la commande fontSize =>
            // ( Modifie la taille de police pour la sélection ou au point d'insertion. )
            document.execCommand('fontSize', false, $(this).val());
          });
        };


        // Sélection dans notre tableau du bouton POLICE
        if ($.inArray("police", parameters.buttons) != -1) {
          // Création du bouton html SELECT avec les différentes options :
          wrap.find(".buttons").append("<select class='police'></select>");

          wrap.find(".police").append("<option value=''>Police</option>");
          wrap.find(".police").append("<option value='Calibri'>Calibri (par défaut)</option>");
          wrap.find(".police").append("<option value='Arial'>Arial</option>");
          wrap.find(".police").append("<option value='Courier'>Courier</option>");
          wrap.find(".police").append("<option value='Times New Roman'>Times New Roman</option>");
          
          // On déclenche le .change pour la police sélectionnée :
          wrap.find(".police").change(function() {

            // Et execution de la commande fontName sur l'élément actif obtenu avec .val() =>
            // ( Modifie le nom de police de la sélection ou du point d'insertion. )
            document.execCommand('fontName', false, $(this).val());
          });
        };


        // Sélection dans notre tableau du bouton COULEUR
        if ($.inArray("couleur", parameters.buttons) != -1) {
          // Création du bouton html SELECT avec les différentes options :
          wrap.find(".buttons").append("<select class='color'></select>");

          wrap.find(".color").append("<option value=''>Couleur</option>");
          wrap.find(".color").append("<option value='000000'>Noir (par défaut)</option>");
          wrap.find(".color").append("<option value='#0000FF'>Bleu</option>");
          wrap.find(".color").append("<option value='#bc34ff'>Violet</option>");
          wrap.find(".color").append("<option value='#FFD700'>Doré</option>");
          wrap.find(".color").append("<option value='#C0C0C0'>Silver</option>");
          wrap.find(".color").append("<option value='#FF00FF'>Rose</option>");
          wrap.find(".color").append("<option value='#FF0000'>Rouge</option>");
          wrap.find(".color").append("<option value='#228B22'>Vert</option>");
          wrap.find(".color").append("<option value='#FF7F50'>Orange</option>");

          wrap.find(".color").change(function() {

            // Exécution de la commande foreColor =>
            // ( Modifie une couleur de police pour la sélection ou au point d'insertion. )
            document.execCommand('foreColor', false, $(this).val());
          });
        };

        // Sélection dans notre tableau du bouton COULEUR
        // Création du bouton html SELECT avec les différentes options :
        if ($.inArray("lien", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='lien'><img src='assets/link.png'/></button>");

          // Fonction 'au click' qui envoie un prompt pour que l'utilisateur entre l'URL qu'il veut définir sur son texte : (<a> Blabla </a>)
          wrap.find(".lien").click(function() {

            // Variable linkURL contenant le prompt :
            let linkURL = prompt('Veuillez entrer l\'URLn:', 'http://');

            // Exécution de la commande createLink =>
            // ( Crée un lien d'ancrage à partir de la sélection, uniquement s'il existe une sélection. )
            document.execCommand('createLink', false, linkURL);
          });
        };


        // Définition de la variable ZOOM :
        let zoom = 3;

        // ZOOM PLUS :
        if ($.inArray("plus", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='plus'><img src='assets/plus.png'/></button>");

          wrap.find(".plus").click(function() {
            // Au click, incrémentation de notre var zoom
            zoom = zoom+1;

            // Execution de la commande fontSize =>
            // ( Modifie la taille de police pour la sélection ou au point d'insertion. )
            document.execCommand('fontSize', false, zoom);
          });
        };
        // ZOOM MOINS :
        if ($.inArray("minus", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='minus'><img src='assets/minus.png'/></button><br><br>");

          wrap.find(".minus").click(function() {
            // Au click, décrémentation
            zoom = zoom-1;
            // Execution de commande
            document.execCommand('fontSize', false, zoom);
          });
        };


        // Texte à gauche :
        if ($.inArray("gauche", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='gauche'><img src='assets/left.png'/></button>");
          
          wrap.find(".gauche").click(function() {
            // Au click exécution de la commande justifyLeft =>
            // ( Justifie le point de sélection ou d'insertion à gauche. )
            document.execCommand('justifyLeft', false, null);
          });
        };

        // Texte à droite
        if ($.inArray("droite", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='droite'><img src='assets/right.png'/></button>");
          
          wrap.find(".droite").click(function() {
            // Exécution de la commande justifyRight =>
            // ( Justifie à droite la sélection ou le point d'insertion. )
            document.execCommand('justifyRight', false, null);
          });
        };

        // Texte centré (par défaut) :
        if ($.inArray("centré", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='centré'><img src='assets/center.png'/></button>");
          
          wrap.find(".centré").click(function() {

            // ( Centre le point de sélection ou d'insertion. )
            document.execCommand('justifyCenter', false, null);
          });
        };

        // Texte justifié :
        if ($.inArray("justifié", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='justifié'><img src='assets/justify.png'/></button>");
          
          wrap.find(".justifié").click(function() {

            // ( Justifie le point de sélection ou d'insertion. )
            document.execCommand('justifyFull', false, null);
          });
        };


        // Sélection dans notre tableau du bouton GENERER :
        if ($.inArray("générer", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='générer'><img src='assets/html.png'/></button>");

          // Fonction au click
          wrap.find(".générer").click(function() {

            // Variable html qui permet de récupérer et définir du contenu textuel dans nos éléments :
            // html() au lieu de text() pour neutraliser les balises et s'afficher sous format texte.
            let html = wrap.find(".editor").html();

            // Variable str qui permet de découper la chaîne de caractères à chaque <br> et content à chaque emplacement vide :
            // (méthode qui est utilisée pour découper une chaîne de caractères à l'emplacement où une correspondance a été trouvée grâce à une expression rationnelle.)
            let str = html.split("<br>");
            let content = "";

            // Pour chaque string on execute la fonction qui prend en param le contenu texte
            $.each(str, function(index, value) {

              // On identifie chaque phrase et met la valeur dans les balises <p>
              let str1 = "<p> " + value + "</p>";
              // a chaque vide on ajoute la valeur avec ses balises <p>
              content += str1;

              // Variable n créee qui ajoute notre html balisé dans le textarea :
              let n = wrap.find("textarea").html(content);
            });

            // toggle permet à l'animation GENERER de démarrer immédiatement sur tout le contenu :
            wrap.find("textarea").toggle();
            wrap.find(".editor").toggle();
          });
        };


        // ENREGISTRER le contenu texte
        if ($.inArray("enregistrer", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='enregistrer'><img src='assets/save.png'/></button>");
          wrap.find(".enregistrer").click(function() {


            // Récupération format html du texte contenu dans l'éditeur
            let texte = $('.editor').html();

            // Sauvegarde du contenu dans localStorage
            // (Les données stockées dans le localStorage n'ont pas de délai d'expiration contrairement à sessionStorage.)
            localStorage.setItem('sauvegarde', texte);
            
              if (localStorage.length > 0) {
                alert('Sauvegarde réussie !');
              }

              // Le contenu est censé être sauvegardé ....
              let sauvegarde = localStorage.getItem('sauvegarde');
              return sauvegarde;
            
            });
        };
        


        // CREATION LIEN YOUTUBE
        if ($.inArray("youtube", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='youtube'><img src='assets/youtube.png'</img></button>");

          wrap.find(".youtube").click(function() {

            // Création variable video qui sort le prompt demandant l'URL :
            let video = prompt("Veuillez entrer l'URL", "https://");

            // Pour convertir l'URL YT en URL 'incorporée' sinon ça charge pas
            let urlReplaceY = video.replace("watch?v=", "embed/");


            // Affichage de notre vidéo YT :
            let youtubeVideo = '<iframe width="560" height="315" src="'+ urlReplaceY +'" frameborder="0"  allowfullscreen></iframe>';
            
            wrap.find(".editor").append(youtubeVideo);
          });
        };


        // CREATION LIEN DAILYMOTION
        if ($.inArray("dailymotion", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<button class='dailymotion'><img src='assets/dailymotion.png'</img></button>");
          
          wrap.find(".dailymotion").click(function() {

            // Création variable video qui sort le prompt demandant l'URL :
            let video = prompt("Veuillez entrer l'URL", "https://");

            // Pour convertir l'URL Dailymotion comme l'URL YT
            let urlReplaceD = video.replace("video/", "embed/video/");

            // Affichage de la vidéo Dailymotion :
            let dailyVideo = '<iframe frameborder="0" width="480" height="270" src="'+ urlReplaceD +'" allowfullscreen></iframe>';
            wrap.find(".editor").append(dailyVideo);
          });
        };


        // CREATION INSERTION D'IMAGES :
        if ($.inArray("image", parameters.buttons) != -1) {
          wrap.find(".buttons").append("<input class='image' type ='file'>");

          wrap.find(".image").change(function() {

            // On parcours les fichiers images grace au type=file de notre input sous forme de mini tableau :
              if (this.files && this.files[0]) {

                // Création de notre nouvel objet reader
                // FileReader est un constructeur :
                // Permet à des applications web de lire le contenu de fichiers (ou de tampons de mémoire brute) de façon asynchrone. On peut ainsi lire le contenu des objets File.
                let reader = new FileReader();

                // ONLOADEND => Cet évènement est déclenché chaque fois qu'une opération de lecture est terminée (que ce soit un succès ou un échec).
                reader.onloadend = function (e) {

                  // A chaque fois qu'on charge une image, on l'affiche.

                  // Affichage de l'image dans l'éditeur (taille forcée pour les tests)
                  $('.editor').append("<img style='width:500px' style='height:270px' src="+ reader.result +">")
                }

                // Cette méthode démarre la lecture du contenu pour le blob indiqué.
                // Une fois que la lecture est terminée, l'attribut result contient une URL de données qui représente les données du fichier :
                reader.readAsDataURL(this.files[0]);
              }
            });
          }

    });

  };

})(jQuery);