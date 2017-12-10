import { validate } from './analysis-form';
describe('Analysis form validators', () => {

  it('should complain about required values', () => {
    const values = {};
    expect(validate(values)).toEqual(
      {
        "message": "Required",
        "user_description": "Required",
        "user_name": "Required",
      }
    );
  });

  it('should complain about minimum lengths', () => {
    const values = {
      message: 'tooshort',
      user_description: 'tooshort',
      user_name: 'tsrt'
    };
    expect(validate(values)).toEqual({
      "message": "Must be at least 15 characters",
      "user_description": "Must be at least 10 characters",
      "user_name": "Must be at least 6 characters",
    });
  });

  it('should validate a correct input', () => {
    const values = {
      message: 'A pretty normal message to be analyzed, even with a problem and a solution',
      user_description: 'Some doctor from an important university',
      user_name: 'importantDoctorForYou'
    };
    expect(validate(values)).toEqual({
    });
  });

});