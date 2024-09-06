import { useState } from "preact/hooks";

// Components
import CategorySelect from "./components/CategorySelect";

// Pages
import Main from "./Pages/Main";

// Hooks
import useCategorySelect, { CategorySelectContext } from "./hooks/useCategorySelect";

const categories = [
  {
    id: 1,
    icon: "🍽️",
    title: "Delicious Bites & Sips",
    description: "Explore the world of food and beverages, from gourmet dishes to everyday snacks and drinks.",
  },
  {
    id: 2,
    icon: "🎶",
    title: "Tunes & Talent",
    description: "A mix of song titles and the artists who made them famous, spanning genres and decades.",
  },
  {
    id: 3,
    icon: "🗺️",
    title: "Wonders of the World",
    description: "Famous landmarks and iconic places from every corner of the globe.",
  },
  {
    id: 4,
    icon: "🌟",
    title: "Notable Names",
    description: "Recognizable people from history, entertainment, politics, and more.",
  },
  {
    id: 5,
    icon: "💬",
    title: "Sayings & Slang",
    description: "Common phrases, idioms, and everyday expressions that people use in conversations.",
  },
  {
    id: 6,
    icon: "🎥",
    title: "Screen Gems",
    description: "Blockbuster movies and popular TV shows, from timeless classics to modern hits.",
  },
  {
    id: 7,
    icon: "📚",
    title: "Pages & Pens",
    description: "Well-known books and the authors behind them, from bestsellers to literary classics.",
  },
  {
    id: 8,
    icon: "👩‍💼",
    title: "Careers & Callings",
    description: "Professions and jobs, from the ordinary to the extraordinary.",
  },
  {
    id: 9,
    icon: "🏡",
    title: "Home Essentials",
    description: "Items you’d typically find around the house, from the kitchen to the living room.",
  },
  {
    id: 10,
    icon: "🌍",
    title: "Nations & Capitals",
    description: "Countries from around the world and their capital cities, testing your geography knowledge.",
  },
];

function App() {
  const category = useCategorySelect();

  const [selectionOpen, setSelectionOpen] = useState(true);

  return (
    <CategorySelectContext.Provider value={category}>
      <CategorySelect open={selectionOpen} onClose={() => setSelectionOpen(false)} categories={categories} />
      <Main onChange={() => setSelectionOpen(true)} />
    </CategorySelectContext.Provider>
  );
}

export default App;
