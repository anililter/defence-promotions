export interface User {
  id: number;
  username: string;
  role: 'admin' | 'editor';
  created_at: string;
}

export interface UserWithPassword extends User {
  password_hash: string;
}

export interface Event {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  venue: string | null;
  city: string | null;
  event_date: string | null;
  poster_url: string | null;
  ticket_url: string | null;
  status: 'upcoming' | 'past' | 'draft';
  created_at: string;
}

export interface Fight {
  id: number;
  event_id: number;
  fighter1_name: string;
  fighter1_record: string | null;
  fighter1_photo: string | null;
  fighter1_country: string | null;
  fighter2_name: string;
  fighter2_record: string | null;
  fighter2_photo: string | null;
  fighter2_country: string | null;
  weight_class: string | null;
  is_main_event: boolean;
  bout_order: number;
  result: string | null;
}

export interface EventWithFights extends Event {
  fights: Fight[];
}

export type JWTPayload = {
  userId: number;
  username: string;
  role: string;
};
