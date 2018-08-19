
export default (maxResults) => (docs, offset = 0) => (docs || [])
  .slice(offset)
  .map(d => {
    return { label: d.key, count: d.doc_count };
  })
  .reduce((acc, d) => {
    if (acc.length >= maxResults) {
      acc[maxResults] = acc[maxResults] || { count: 0, label: 'others' };
      acc[maxResults].count = acc[maxResults].count;
      acc[maxResults].count += d.count;
      return acc;
    }
    return [...acc, d];
  }, []);
