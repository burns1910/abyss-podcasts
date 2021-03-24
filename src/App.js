import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Tracklists from "./components/Tracklists"
import Tracklist from "./components/Tracklist"

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Tracklists} path='/' exact />
        <Route component={Tracklist} path='/:id' />
      </Switch>
    </Router>
  )
}

export default App;