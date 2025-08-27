import { useRef, useState } from 'react'
import './ImportPanel.css'

const ImportPanel = ({ importAccountState, exportAccountState }) => {
	const [inputValue, setInputValue] = useState('');
	const [outcomeString, setOutcomeString] = useState('');
	const [outcome, setOutcome] = useState('');

	const fileInputRef = useRef(null);

	const handleLoadFromFile = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];

		if(!file) return;

		const reader = new FileReader();

		reader.onload = (e) => {
			setInputValue(e.target.result);
		};

		reader.onerror = () => {
			console.error('Failed to read file');
		};

		reader.readAsText(file);
	};

	const handleImport = () => {
		try {
			importAccountState(inputValue)
			setOutcome('success');
			setOutcomeString('Import Successful')
		}
		catch(e) {
			console.log("Error during Import: Error while parsing");
			console.log(e);
			setOutcome('fail');
			setOutcomeString("Invalid Import String")
		}
	}

  return(
    <div className="import-panel">

			<button onClick={handleLoadFromFile}>
				Load From File
			</button>

			<input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

			<div className='outcome-status'>
				<span>Status: </span>
				<span className={`string-import-outcome ${outcome}`}>
					{outcomeString}
				</span>
			</div>

			<div className='string-import-container'>
				<input 
					onChange={(e) => setInputValue(e.target.value)} 
					placeholder='Enter Import String...' 
					value={inputValue}
				/>

				<button onClick={() => handleImport()}>
					Import
				</button>
			</div>
			
			<div className='export-container'>
				<button onClick={() => exportAccountState()}>
					Download Data
				</button>

				<button>
					Copy to Clipboard
				</button>
			</div>
    </div>
  )
}

export default ImportPanel