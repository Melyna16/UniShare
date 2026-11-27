// ============================================
// ANNOUNCEMENTS
// ============================================

export const MOCK_ANNONCES = [
  {
    id: '1',
    titre: 'Nouvelle machine à café à la cafétéria',
    auteur: 'Admin Faculté',
    role: 'Admin',
    date: 'Il y a 2h',
    type: 'info',
    riskScore: null,
    isSuspect: false,
    likes: 12,
    comments: 3,
  },
  {
    id: '2',
    titre: 'Report du cours de Base de données',
    auteur: 'Délégué M2 ISII',
    role: 'Délégué',
    date: 'Il y a 5h',
    type: 'urgent',
    riskScore: null,
    isSuspect: false,
    likes: 45,
    comments: 10,
  },
  {
    id: '3',
    titre: 'Cherche partenaire pour projet IA',
    auteur: 'Sarah M.',
    role: 'Étudiant',
    date: 'Hier',
    type: 'entraide',
    riskScore: null,
    isSuspect: false,
    likes: 5,
    comments: 1,
  },
  {
    id: '4',
    titre: "GAGNEZ DE L'ARGENT RAPIDEMENT ! Cliquez sur ce lien",
    auteur: 'Inconnu_22',
    role: 'Étudiant',
    date: 'Il y a 1 jour',
    type: 'info',
    riskScore: 92,
    isSuspect: true,
    likes: 0,
    comments: 0,
  },
];

// ============================================
// RESOURCES
// ============================================

export const MOCK_RESSOURCES = [
  { id: '1', titre: 'Cours Réseaux Avancés', module: 'Réseaux', type: 'PDF', taille: '2.4 MB' },
  { id: '2', titre: 'TD 3 - Machine Learning', module: 'IA', type: 'PDF', taille: '1.1 MB' },
  { id: '3', titre: 'Examen 2023 - Génie Logiciel', module: 'GL', type: 'PDF', taille: '800 KB' },
  {
    id: '4',
    titre: 'TP 1 - Développement Mobile',
    module: 'Mobile',
    type: 'ZIP',
    taille: '5.2 MB',
  },
];

// ============================================
// MESSAGING SYSTEM
// ============================================

export type Specialty = 'ISII' | 'RSE';
export type ConversationType = 'entraide' | 'resource' | 'direct';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  attachment?: { name: string; size: string };
}

export interface Conversation {
  id: string;
  type: ConversationType;
  title: string;
  participantName: string;
  specialty?: Specialty;
  submittedBy?: string;
  status?: 'pending' | 'approved' | 'rejected';
  lastMessage: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export const MOCK_DELEGATES: Record<Specialty, { id: string; name: string }> = {
  ISII: { id: 'del-isii', name: 'Délégué ISII' },
  RSE: { id: 'del-rse', name: 'Délégué RSE' },
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    type: 'entraide',
    title: 'Livre Algorithmique',
    participantName: 'Karim B.',
    lastMessage: 'Oui oui, je te le ramène demain en cours.',
    updatedAt: 'Il y a 10 min',
    messages: [
      { id: '1', text: 'Salut Karim ! Le livre est toujours dispo ?', sender: 'me' },
      { id: '2', text: 'Salut ! Oui oui, je te le ramène demain en cours.', sender: 'other' },
    ],
  },
  {
    id: 'c2',
    type: 'entraide',
    title: 'Calculatrice Casio',
    participantName: 'Sarah M.',
    lastMessage: 'Oui bien sûr, tu peux passer la récupérer.',
    updatedAt: 'Hier',
    messages: [
      { id: '1', text: 'Salut ! La calculatrice est toujours disponible ?', sender: 'me' },
      { id: '2', text: 'Oui bien sûr, tu peux passer la récupérer à la bibliothèque.', sender: 'other' },
    ],
  },
  {
    id: 'c3',
    type: 'resource',
    title: 'Soumission : Cours Réseaux Avancés',
    participantName: 'Délégué ISII',
    specialty: 'ISII',
    submittedBy: 'Melyna Doe',
    status: 'pending',
    lastMessage: "J'ai bien reçu ton PDF, je le vérifie ce soir.",
    updatedAt: 'Il y a 2h',
    messages: [
      {
        id: '1',
        text: 'Bonjour, voici mon cours de Réseaux pour validation.',
        sender: 'me',
        attachment: { name: 'Cours_Reseaux.pdf', size: '2.4 MB' },
      },
      { id: '2', text: "J'ai bien reçu ton PDF, je le vérifie ce soir.", sender: 'other' },
    ],
  },
];