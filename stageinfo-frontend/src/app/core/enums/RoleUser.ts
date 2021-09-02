// Convention : les type en majuscule -> https://google.github.io/styleguide/jsguide.html#features-objects-enums

export enum RoleUser {
    INVITE = 'invite',
    ETUDIANT = 'etudiant',
    TUTEUR = 'tuteur',
    REPRESENTANT_ENTREPRISE ="repEntreprise",
    RESPONSABLE_PARCOURS = 'respParcours',
    RESPONSABLE_STAGES = 'respStages', // celui qui gère les stages
    SECRETAIRE = 'secretaire',
    ADMIN = 'admin'
  }

export enum NameRoleUser {
  INVITE = 'Invité',
  ETUDIANT = 'Étudiant',
  TUTEUR = 'Tuteur',
  REPRESENTANT_ENTREPRISE ="Représentant entreprise",
  RESPONSABLE_PARCOURS = 'Responsable parcours',
  RESPONSABLE_STAGES = 'Responsable Stages', // celui qui gère les stages
  SECRETAIRE = 'Secretaire',
  ADMIN = 'Admin',

  UNDEFINED = "Non définie"
}