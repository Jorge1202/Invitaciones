import { Role, Plan } from "@prisma/client";

export interface InvitationData {
  global: {
    primaryColor: string;
    secondaryColor: string;
    musicUrl?: string;
    mainBgImage?: string;
  };
  cover: {
    title: string;
    name1: string;
    name2: string;
    date: string;
    time?: string;
    quote?: string;
    heroImage?: string;
  };
  family?: {
    parents1?: string[];
    parents2?: string[];
    godparents?: { role: string; names: string }[];
  };
  itinerary?: {
    time: string;
    title: string;
    location: string;
    icon: string;
  }[];
  locations?: {
    type: string;
    name: string;
    address: string;
    mapUrl: string;
  }[];
  details?: {
    dressCode?: string;
    noKids?: boolean;
    lodging?: string;
  };
  gifts?: {
    message?: string;
    bankDetails?: { bank: string; account: string; clabe?: string; name: string };
    registries?: { store: string; url: string }[];
  };
  rsvp: {
    deadline: string;
    whatsappContact: string;
  };
}
