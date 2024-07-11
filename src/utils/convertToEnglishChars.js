export function convertToEnglishChars(text) {
    const turkishChars = {
      'ü': 'u', 'Ü': 'U',
      'ş': 's', 'Ş': 'S',
      'ı': 'i', 'İ': 'I',
      'ğ': 'g', 'Ğ': 'G',
      'ç': 'c', 'Ç': 'C',
      'ö': 'o', 'Ö': 'O',
      ' ': '-', // Boşlukları tireye çevirme örneği
    };
  
    return text.replace(/[üÜşŞıİğĞçÇöÖ ]/g, char => turkishChars[char] || char);
  }

