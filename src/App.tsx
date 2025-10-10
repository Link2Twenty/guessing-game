import { useEffect, useState } from 'preact/hooks';

// Components
import CategorySelect from './components/CategorySelect';

// Pages
import Main from './Pages/Main';

// Hooks
import useCategorySelect, { CategorySelectContext } from './hooks/useCategorySelect';

function App() {
  const category = useCategorySelect();

  const [selectionOpen, setSelectionOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const ac = new AbortController();

    fetch('./api/categories.json', { signal: ac.signal })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setSelectionOpen(true);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error(err);
      });

    return () => ac.abort();
  }, []);

  return (
    <CategorySelectContext.Provider value={category}>
      <CategorySelect open={selectionOpen} onClose={() => setSelectionOpen(false)} categories={categories} />
      <Main onChange={() => setSelectionOpen(true)} />
    </CategorySelectContext.Provider>
  );
}

export default App;
