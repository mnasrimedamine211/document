export interface Document {
  text: string;
  annotations: Annotation[];
}
export interface Annotation {
  label: string;
  color: string ;
  start: number | null;
  end: number | null;
  text: string ;
}
export interface DocumentType {
  text: string;
  labels: Label[];
}
export interface Label {
  label: string;
  color: string;
}
export interface Select {
  start: number | null;
  end: number | null;
  text: string | null;
}
