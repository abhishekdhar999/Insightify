declare module 'papaparse' {
    export type ParseResult<T> = {
      data: T[];
      errors: any[];
      meta: {
        delimiter: string;
        linebreak: string;
        aborted: boolean;
        truncated: boolean;
        cursor: number;
      };
    };
  
    export type ParseConfig<T> = {
      delimiter?: string;
      newline?: string;
      quoteChar?: string;
      escapeChar?: string;
      header?: boolean;
      dynamicTyping?: boolean | { [key: string]: boolean };
      preview?: number;
      encoding?: string;
      worker?: boolean;
      comments?: boolean | string;
      download?: boolean;
      skipEmptyLines?: boolean | 'greedy';
      chunk?: (results: ParseResult<T>, parser: Parser) => void;
      step?: (results: ParseResult<T>, parser: Parser) => void;
      complete?: (results: ParseResult<T>, file: File) => void;
      error?: (error: any, file: File) => void;
      beforeFirstChunk?: (chunk: string) => string | void;
      withCredentials?: boolean;
      transform?: (value: string, field: string | number) => any;
    };
  
    export function parse<T>(input: string | File, config?: ParseConfig<T>): ParseResult<T>;
  }
  