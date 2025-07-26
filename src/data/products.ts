import { Product } from '@/hooks/useCart';
import image1 from '@/assets/BergkristallRoh.jpeg';
import image2 from '@/assets/BergkristallA.jpeg';
import image3 from '@/assets/BergkristallA.jpeg';
import image4 from '@/assets/BergkristallSpitze.jpeg';
import image5 from '@/assets/BergkristallTs.jpeg';
import image6 from '@/assets/CitrinA.jpeg';
import image7 from '@/assets/CitrinA.jpeg';
import image8 from '@/assets/CitrinTs.jpeg';
import image9 from '@/assets/CitrinRoh.jpeg';
import image10 from '@/assets/CitrinTs.jpeg';
import image11 from '@/assets/CitrinRoh.jpeg';
import image12 from '@/assets/CitrinTs.jpeg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Rose Quartz',
    description: 'The stone of unconditional love and compassion. Perfect for heart chakra healing.',
    price: 24.99,
    image: image1,
    category: 'love'
  },
  {
    id: '2',
    name: 'Amethyst Cluster',
    description: 'Spiritual growth and protection. Enhances intuition and meditation practices.',
    price: 39.99,
    image: image2,
    category: 'spiritual'
  },
  {
    id: '3',
    name: 'Clear Quartz Point',
    description: 'Master healer and amplifier. Cleanses and energizes all chakras.',
    price: 19.99,
    image: image3,
    category: 'healing'
  },
  {
    id: '4',
    name: 'Citrine Tumbled',
    description: 'Abundance and manifestation stone. Brings joy and positive energy.',
    price: 15.99,
    image: image4,
    category: 'abundance'
  },
  {
    id: '5',
    name: 'Black Tourmaline',
    description: 'Powerful protection stone. Shields against negative energy.',
    price: 22.99,
    image: image5,
    category: 'protection'
  },
  {
    id: '6',
    name: 'Selenite Wand',
    description: 'Cleansing and purification. Perfect for charging other crystals.',
    price: 18.99,
    image: image6,
    category: 'cleansing'
  },
  {
    id: '7',
    name: 'Labradorite Palm Stone',
    description: 'Transformation and magic. Awakens your inner mystical nature.',
    price: 32.99,
    image: image7,
    category: 'transformation'
  },
  {
    id: '8',
    name: 'Green Aventurine',
    description: 'Prosperity and luck. Great for attracting wealth and opportunities.',
    price: 16.99,
    image: image8,
    category: 'prosperity'
  },
  {
    id: '9',
    name: 'Moonstone Sphere',
    description: 'Divine feminine energy. Enhances intuition and emotional balance.',
    price: 45.99,
    image: image9,
    category: 'intuition'
  },
  {
    id: '10',
    name: 'Tiger Eye Bracelet',
    description: 'Courage and confidence. Promotes personal power and focus.',
    price: 28.99,
    image: image10,
    category: 'courage'
  },
  {
    id: '11',
    name: 'Fluorite Octahedron',
    description: 'Mental clarity and focus. Perfect for studying and concentration.',
    price: 35.99,
    image: image11,
    category: 'clarity'
  },
  {
    id: '12',
    name: 'Carnelian Tumbled Set',
    description: 'Creativity and motivation. Ignites passion and personal power.',
    price: 21.99,
    image: image12,
    category: 'creativity'
  }
];