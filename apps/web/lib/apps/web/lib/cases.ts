import { api } from "./api";


export interface CaseDecision {

  id: string;

  text: string;

  status: string;

}



export interface CourtCase {

  id: string;

  number: string;

  title: string;

  description: string;

  status: string;


  author?: {

    username: string;

  };


  judge?: {

    username: string;

  };


  decision?: CaseDecision;

}



export async function getCases(): Promise<CourtCase[]> {

  return api<CourtCase[]>(
    "/cases"
  );

}



export async function getCase(
  id: string
): Promise<CourtCase> {


  return api<CourtCase>(
    `/cases/${id}/full`
  );


}