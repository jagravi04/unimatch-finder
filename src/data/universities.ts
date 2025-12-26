import { University } from "@/types/university";

// Mock data - this will be replaced with Supabase data
export const mockUniversities: University[] = [
  {
    id: "1",
    name: "Harvard University",
    country: "USA",
    city: "Cambridge, MA",
    degree_level: "Bachelor's",
    tuition_fee: 54000,
    min_gpa: 3.9,
    min_ielts: 7.5,
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    ranking: 1,
    acceptance_rate: 4,
    description: "One of the world's most prestigious universities, known for excellence in law, business, and medicine."
  },
  {
    id: "2",
    name: "University of Oxford",
    country: "UK",
    city: "Oxford",
    degree_level: "Master's",
    tuition_fee: 38000,
    min_gpa: 3.7,
    min_ielts: 7.0,
    image_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
    ranking: 2,
    acceptance_rate: 17,
    description: "The oldest university in the English-speaking world, renowned for academic excellence."
  },
  {
    id: "3",
    name: "University of Toronto",
    country: "Canada",
    city: "Toronto, ON",
    degree_level: "Bachelor's",
    tuition_fee: 45000,
    min_gpa: 3.5,
    min_ielts: 6.5,
    image_url: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=800",
    ranking: 18,
    acceptance_rate: 43,
    description: "Canada's leading institution of learning, discovery and knowledge creation."
  },
  {
    id: "4",
    name: "Technical University of Munich",
    country: "Germany",
    city: "Munich",
    degree_level: "Master's",
    tuition_fee: 12000,
    min_gpa: 3.3,
    min_ielts: 6.5,
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    ranking: 30,
    acceptance_rate: 8,
    description: "Germany's leading technical university, known for engineering and natural sciences."
  },
  {
    id: "5",
    name: "University of Melbourne",
    country: "Australia",
    city: "Melbourne, VIC",
    degree_level: "Bachelor's",
    tuition_fee: 35000,
    min_gpa: 3.4,
    min_ielts: 6.5,
    image_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800",
    ranking: 33,
    acceptance_rate: 70,
    description: "Australia's leading university, consistently ranked among the world's best."
  },
  {
    id: "6",
    name: "ETH Zurich",
    country: "Switzerland",
    city: "Zurich",
    degree_level: "PhD",
    tuition_fee: 8000,
    min_gpa: 3.8,
    min_ielts: 7.0,
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    ranking: 7,
    acceptance_rate: 27,
    description: "One of the world's leading universities for technology and natural sciences."
  },
  {
    id: "7",
    name: "MIT",
    country: "USA",
    city: "Cambridge, MA",
    degree_level: "Master's",
    tuition_fee: 57000,
    min_gpa: 3.9,
    min_ielts: 7.5,
    image_url: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800",
    ranking: 3,
    acceptance_rate: 4,
    description: "The world's leading research university in science, technology, and innovation."
  },
  {
    id: "8",
    name: "University of British Columbia",
    country: "Canada",
    city: "Vancouver, BC",
    degree_level: "Bachelor's",
    tuition_fee: 42000,
    min_gpa: 3.2,
    min_ielts: 6.5,
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
    ranking: 35,
    acceptance_rate: 52,
    description: "A global centre for research and teaching, consistently ranked among the top universities."
  }
];

export const countries = ["USA", "UK", "Canada", "Germany", "Australia", "Switzerland"];
export const degreeLevels = ["Bachelor's", "Master's", "PhD"];
