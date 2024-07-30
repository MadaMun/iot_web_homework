export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  short: string;
  catagory: string;
  is_published: boolean;
}

export interface Drink {
  id: number;
  menu: string;
  prics: number;
  
  
}


export interface Order {
  id: number;
  drink_id: number;
  much: number;
  note: string;
}
