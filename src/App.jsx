import NavigationBar from './components/NavigationBar/NavigationBar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AccountSettings from './pages/AccountSettings.jsx'
import AccountStateWidget from './components/AccountStateWidget/AccountStateWidget.jsx'
import { CharacterDataProvider } from './context/CharacterDataContext.jsx'

export default function App({ preloadedCharacters }) {
  return(
		<BrowserRouter basename='/Limbus-Account-Tracker/'>
			<div className='layout'>
				<CharacterDataProvider preloadedData={preloadedCharacters}>
					<NavigationBar />
					<AccountStateWidget/>
					<div className='content-wrapper'>
						<Routes>
							<Route path="/" element={<AccountSettings/>}/>
						</Routes>
					</div>
				</CharacterDataProvider>
			</div>
		</BrowserRouter>
	)
}