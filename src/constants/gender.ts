type TGender = 'male' | 'female' | 'other';

const genders: TGender[] = ['male', 'female', 'other'];

export  const genderOptions = genders.map((gender) => ({
    value: gender,
    label: gender,
  }));