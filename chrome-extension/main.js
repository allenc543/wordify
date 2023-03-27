
document.addEventListener('keydown', function(event) {
    // get the highlighted text
    const selection = window.getSelection();
    const text = selection.toString().trim();
  
    // check if the 'd' key is pressed and the highlighted text is not empty
    if (event.key === 'd' && text !== '') {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // log definition to console
                const actualDefinition = data[0].meanings[0].definitions[0].definition;
                // console.log(actualDefinition);
                console.log(`Here's the definition of "${text}":\n${actualDefinition}`);

                const reqBody = {word: text, definition: actualDefinition}
                const url = 'http://localhost:3000';
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reqBody)
                })
                    // .then((res) => console.log(`${text} has been added to database`))
                    // idk why this .then line doesn't log anything. the line below doesn't depend on success of post
                console.log(`the word "${text}" has been added to database`)
                             
            })
            .catch(error => {
                console.log('error with dictionary request: ' + error);
            });

    }
  });

