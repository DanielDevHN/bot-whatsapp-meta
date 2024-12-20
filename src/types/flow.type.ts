


export interface ResponseContent {
  type: "text" | "list"; 
  content: any;
}

export interface Flow {
  trigger_words: string[];
  responses: ResponseContent[];
}
