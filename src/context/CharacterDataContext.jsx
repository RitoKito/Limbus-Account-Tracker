import { createContext, useContext, useState, useMemo } from "react";

export const CharacterDataContext = createContext();

export const useCharacterData = () => useContext(CharacterDataContext);

export function CharacterDataProvider({ children, preloadedData }) {
  const [characters, setCharacters] = useState(preloadedData || []);
	const loading = characters.length === 0;

	const contextValue = useMemo(() => ({ characters, loading }), [characters, loading]);

	return(
		<CharacterDataContext.Provider value={contextValue}>
			{children}
		</CharacterDataContext.Provider>
	)
}