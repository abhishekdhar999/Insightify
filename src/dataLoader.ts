import Papa from 'papaparse';

export interface SalaryData {
  work_year: number;
  experience_level:string,
  employment_type:string,
  job_title:string,
  salary: number;
  salary_currency:string,
  salary_in_usd: number,
  employee_residence:string,
  remote_ratio: number,
  company_location:string,
  company_size:string,
}

export const loadCSVData = (filePath: string): Promise<SalaryData[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse<SalaryData>(filePath, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results:any) => {
          resolve(results.data);
        },
        error: (error:any) => {
          reject(error);
        }
      });
    });
  };