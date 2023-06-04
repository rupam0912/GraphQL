import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const App = () => {
  return (
    <div className="App">
      <h1>My Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
};

export default App;
