const URL = "https://de.wiktionary.org/w/api.php?origin=*&action=query&prop=revisions&rvprop=content&format=json&titles="

export type WikiPageResult = {
  id: number;
  title: string;
  content: string;
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const executeRequest = async (query: string) => {
  const queryVariants= capitalize(query) + '|' + query.toLowerCase()

  return fetch(URL + queryVariants)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const searchWiktionary = async (query: string): Promise<WikiPageResult[]> => {
  const results = await executeRequest(query);
  const pages = results.query.pages;

  console.log(results)

  return Object.values(pages).reduce(
    (acc: WikiPageResult[], page: any) => {
      if ('missing' in page) return acc;
      
      acc.push({
        id: page.pageid,
        content: page.revisions[0]['*'],
        title: page.title,
      });
      return acc;
    }, 
    [],
  );
}
