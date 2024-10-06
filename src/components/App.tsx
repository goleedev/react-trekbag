import BackgroundHeading from './BackgroundHeading';
import Header from './Header';
import ItemList from './ItemList';
import Sidebar from './SideBar';

function App() {
  return (
    <>
      <BackgroundHeading />

      <main>
        <Header />
        <ItemList />
        <Sidebar />
      </main>
    </>
  );
}

export default App;
