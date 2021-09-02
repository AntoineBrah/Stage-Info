// Convention : les type en majuscule -> https://google.github.io/styleguide/jsguide.html#features-objects-enums

export enum EtatStage {
    PROPOSE = "propose",    // Le stage n'apparait pas dans le listing
    VALIDE = "valide",      // Le stage est valide , donc il est libre 
    REFUSE = "refuse",       // Le stage est refusé
    RESERVE = "reserve",    // Le stage est reservé à un étudiant, il est maintenant en attente de l'affectation
    AFFECT_ETUDIANT = "affectEtudiant",     // Le stage est affecté à un étudiant
    AFFECT_TUTEUR = "affectTuteur", // Les tuteurs peuvent choisir de tutoré le stage
    AFFECT_RAPPORTEUR= "affectRapporteur", // le rapporteur est choisie par le tuteur du stage (le rapporteur est un prof qui n'est pas le tuteur lui même)

    TERMINE = "termine" // Le stage à terminé une fois la soutenance passé (changement d'état en fonction de la date soutenance)
  }

  export enum NameEtatStage {
    PROPOSE = 'Proposé',
    VALIDE = 'Validé',
    REFUSE = 'Refusé',
    RESERVE ="Réservé",
    AFFECT_ETUDIANT = 'Étudiant affecté',
    AFFECT_TUTEUR = 'Tuteur affecté', // celui qui gère les stages
    AFFECT_RAPPORTEUR = 'Rapporteur affecté',
    TERMINE = 'Terminé',
    
    UNDEFINED = "Non définie"
  }