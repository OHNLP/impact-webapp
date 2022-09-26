export interface Project {
  short_title: string,
  name: string,
  uid: string,
  
  // other information
  description: string | undefined,
  date_updated: Date | undefined,
  stat: any | undefined;
}