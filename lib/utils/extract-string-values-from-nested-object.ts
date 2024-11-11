export function extractStringValues(obj: any): string[] {
  let result: string[] = [];

  // Helper function to recursively extract strings
  function extract(obj: any) {
    if (typeof obj === "string") {
      result.push(obj);
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          extract(obj[key]);
        }
      }
    }
  }

  extract(obj);
  return result;
}