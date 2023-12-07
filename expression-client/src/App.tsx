import DefaultLayout from "./Layout";
import TabBar from "./components/TabBar";

function App() {  
  return (
    <DefaultLayout 
      header={<TabBar/>} 
      content={<div></div>} 
      footer={<div></div>} 
    />
  );
}

export default App;
