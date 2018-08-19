import docsToDataset from './docs-to-dataset';
import docs from './problems.json';

const dataset = [{ "count": 58690, "label": "cancer" }, { "count": 19887, "label": "disease" }, { "count": 6390, "label": "pain" }, { "count": 6121, "label": "heart" }, { "count": 5450, "label": "diabetes" }, { "count": 5271, "label": "disorder" }, { "count": 4771, "label": "chronic" }, { "count": 4512, "label": "depression" }, { "count": 4217, "label": "breast" }, { "count": 33780, "label": "others"}];

describe('docsToDataset function', () => {

  it('should turn docs into dataset', () => {
    expect(docsToDataset(9)(docs)).toEqual(dataset);
  });

  it('should return an empty array for a null document', () => {
    expect(docsToDataset(9)(null)).toEqual([]);
  });

});


