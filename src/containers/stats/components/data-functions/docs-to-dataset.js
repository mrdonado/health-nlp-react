const MAX_RESULTS = 9; 

export default docs => (docs || [])
  .map(d => {
    return { label: d.key, count: d.doc_count };
  })
  .reduce((acc, d) => {
    if (acc.length >= MAX_RESULTS) {
      acc[MAX_RESULTS] = acc[MAX_RESULTS] || { count: 0, label: 'others' };
      acc[MAX_RESULTS].count = acc[MAX_RESULTS].count;
      acc[MAX_RESULTS].count += d.count;
      return acc;
    }
    return [...acc, d];
  }, []);
