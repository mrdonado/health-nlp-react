
export default (initialMax) => (docs, offset = 0) => (docs || [])
  .map(d => {
    return { label: d.key, count: d.doc_count };
  })
  .reduce((acc, d) => {
    const maxResults = initialMax + offset;
    if (acc.length >= maxResults) {
      acc[maxResults] = acc[maxResults] || { count: 0, label: 'others' };
      acc[maxResults].count = acc[maxResults].count;
      acc[maxResults].count += d.count;
      return acc;
    }
    return [...acc, d];
  }, []);
