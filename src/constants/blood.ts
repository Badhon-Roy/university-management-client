type TBlood = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
const bloods: TBlood[] = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
]
export const bloodGroupOptions = bloods.map((blood) => ({
    value: blood,
    label: blood,
}));