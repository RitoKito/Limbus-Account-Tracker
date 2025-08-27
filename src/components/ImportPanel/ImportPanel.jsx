import { useRef, useState } from 'react'
import './ImportPanel.css'

const ImportPanel = ({ importAccountState, exportAccountState, resetAccountState, accountState }) => {
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
			console.log("Error during Import: Error while parsing", e);
			setOutcome('fail');
			setOutcomeString("Invalid Import String")
		}
	}

  const handleCopyToClipboard = (value) => {
    navigator.clipboard.writeText(value)
    .then(() => {
      console.log("Account State copied to clipboard")
    })
    .catch(e => {
      console.log('Copy failed', e);
    });
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
					placeholder='Paste import string...' 
					value={inputValue}
				/>

				<button onClick={() => handleImport()}>
					Import
				</button>
			</div>

			<div className='export-container'>

				<div className='left-items'>
						<button onClick={() => exportAccountState()}>
							Download Data
						</button>

						<button onClick={() => handleCopyToClipboard(accountState)}>
							Copy to Clipboard
						</button>
				</div>

				<div className='right-items'>
					<button className='clear-data' onClick={resetAccountState}>
						Clear Data
					</button>
				</div>
			</div>
    </div>
  )
}

export default ImportPanel