export default function toUrlSlug(text) {
    // Türkçe karakterlerin İngilizce karşılıkları
    const turkishToEnglishMap = {
      'ı': 'i', 'İ': 'I', 'ş': 's', 'Ş': 'S', 'ç': 'c', 'Ç': 'C',
      'ğ': 'g', 'Ğ': 'G', 'ü': 'u', 'Ü': 'U', 'ö': 'o', 'Ö': 'O',
      'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u'
    };
  
    // Türkçe karakterleri İngilizce'ye çevirme
    text = text.split('').map(char => turkishToEnglishMap[char] || char).join('');
  
    // Küçük harf yapma
    text = text.toLowerCase();
  
    // Özel karakterleri ve boşlukları - ile değiştirme
    text = text.replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri kaldırma
               .trim() // Baş ve sondaki boşlukları kaldırma
               .replace(/\s+/g, '-') // Birden fazla boşluğu tek tire ile değiştirme
               .replace(/-+/g, '-'); // Birden fazla tireyi tek tire ile değiştirme
  
    return text;
  }
  