import Homecontent from './Component/Homecontent/Homecontent'
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AnimeComponent from './Component/Homecontent/Contents/AnimeComponent';
import Lobby from './Component/Homecontent/Contents/Lobby';
import Dashboard from './Component/Dashboard/Dashboard';
import AllPost from './Component/Dashboard/Contents/AllPost';
import CreatePost from './Component/Dashboard/Contents/CreatePost';
import Authentic from './Component/Session/Authentic';
import { DataWebProvider } from './Component/Context/DataWebProvaider';

function App() {
  return (
    <DataWebProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homecontent/>}>
            <Route path='' element={<Lobby/>}/>
            <Route path='anime' element={<AnimeComponent/>}/>
          </Route>
          <Route path='/autehnticate' element={<Authentic/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}>
            <Route path='' element={<Navigate to="post"/>}/>
            <Route path='post' element={<AllPost/>}/>
            <Route path='post/make' element={<CreatePost/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </DataWebProvider>
  );
}

export default App;
