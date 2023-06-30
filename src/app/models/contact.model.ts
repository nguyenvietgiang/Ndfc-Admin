export interface Contact {
    id: string;
    name: string;
    email: string;
    topic: string;
    detail: string;
  }
  
  export interface CreateContactRequest {
    name: string;
    email: string;
    topic: string;
    detail: string;
  }