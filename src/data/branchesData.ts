import { Branch } from '../types';

export const BRANCHES_DATA: Branch[] = [
  {
    id: 'bahtim',
    name: 'فرع بهتيم (الشارع الجديد)',
    address: 'بهتيم، قسم ثان شبرا الخيمة، محافظة القليوبية، مصر (الشارع الجديد، أمام شارع نادي بهتيم)',
    shortAddress: 'بهتيم، قسم ثان شبرا الخيمة - الشارع الجديد',
    phone: '01020999996',
    hotline: '17196',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('المطعم السوري بهتيم قسم ثان شبرا الخيمة محافظة القليوبية مصر الشارع الجديد'),
    workingHours: 'يومياً من 11:00 صباحاً حتى 3:00 بعد منتصف الليل',
    isMain: true,
  },
  {
    id: 'orabi',
    name: 'فرع عرابي (كوبري عرابي)',
    address: 'عمارة معمل البرج، أمام النساجون الشرقيون، محطة كوبري عرابي، شبرا الخيمة',
    shortAddress: 'عمارة معمل البرج، أمام النساجون الشرقيون، محطة كوبري عرابي',
    hotline: '17196',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('المطعم السوري عمارة معمل البرج أمام النساجون الشرقيون محطة كوبري عرابي شبرا الخيمة'),
    workingHours: 'يومياً من 11:00 صباحاً حتى 3:00 بعد منتصف الليل',
    isMain: false,
  },
];
