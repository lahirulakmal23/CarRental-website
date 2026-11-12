import { assets } from './constance'
import weddingImage from '../images/wedding_category.jpg'
import suvImage from '../images/SUV.jpg'

export const blogPosts = [
  {
    slug: 'choosing-your-rental-car', category: 'Rental Tips', title: 'How to Choose the Right Car for Your Journey', image: assets.hero_new,
    excerpt: 'From city trips to family getaways, find a vehicle that fits your plans.',
    sections: [
      { title: 'Start with your itinerary', text: 'Think about where you plan to go and how much time you will spend driving. A smaller car can be easier to park in town, while a larger vehicle offers more space for longer journeys.' },
      { title: 'Make room for everyone', text: 'Check the passenger capacity and luggage space before choosing. Include suitcases, child seats and any equipment you plan to bring.' },
      { title: 'Review your rental details', text: 'Confirm the transmission, fuel type, daily rate and booking terms. Ask about collection arrangements and any optional extras before you reserve.' },
    ],
  },
  {
    slug: 'planning-your-wedding-car', category: 'Wedding Cars', title: 'Planning Your Wedding Car: The Details That Matter', image: weddingImage,
    excerpt: 'A little planning helps make your arrival a memorable part of your special day.',
    sections: [
      { title: 'Choose a style you love', text: 'Consider how the car fits your celebration. Classic styling creates a timeless entrance, while a modern vehicle offers a different look. Check that there is enough room for comfortable travel in wedding attire.' },
      { title: 'Plan the route and timings', text: 'Share the ceremony and reception locations and allow time for photographs, traffic and getting in and out of the car. Confirm who will coordinate the pickup on the day.' },
      { title: 'Confirm the finishing touches', text: 'Ask about decorations, chauffeur arrangements and the total booking duration. Get the agreed details in writing so everyone knows what to expect.' },
    ],
  },
  {
    slug: 'family-road-trip-checklist', category: 'Travel Guides', title: 'Your Checklist for a Comfortable Family Road Trip', image: suvImage,
    excerpt: 'Get ready for the road with practical tips for a smoother family adventure.',
    sections: [
      { title: 'Choose space and comfort', text: 'Look for enough seats and luggage space for your group. Confirm any child seat requirements with the rental provider before your trip.' },
      { title: 'Pack the everyday essentials', text: 'Keep water, snacks, charging cables and the things you need during the drive within reach. Download your route ahead of time if you expect limited mobile coverage.' },
      { title: 'Leave time to explore', text: 'Plan regular stops and keep the itinerary flexible. Before collecting the car, confirm the return location and time so the final day stays relaxed.' },
    ],
  },
]
