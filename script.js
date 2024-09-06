// Callback Implementation with 5-second delay and data fetching
function executeCallback() {
    const outputDiv = document.getElementById('output-callback');
    outputDiv.textContent = 'Loading...';

    // Simulating a delay with a callback
    setTimeout(() => {
        outputDiv.textContent = 'Callback executed after 5 seconds';

        // Fetch data after callback is executed
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                outputDiv.textContent = JSON.stringify(data.posts[0], null, 2);
            })
            .catch(error => {
                outputDiv.textContent = `Error: ${error.message}`;
            });
    }, 5000); // 5-second delay
}

// Promise Implementation with timeout and error handling
function fetchPostPromise() {
    const outputDiv = document.getElementById('output-promise');
    outputDiv.textContent = 'Loading...'; // Show loading message

    // Promise to fetch data with a 5-second timeout
    const fetchData = new Promise((resolve, reject) => {
        const fetchPromise = fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));

        // Timeout after 5 seconds
        const timeout = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, 5000);

        // Clear timeout if fetchPromise completes before 5 seconds
        fetchPromise.then(() => clearTimeout(timeout));
    });

    // Handle the Promise
    fetchData
        .then(data => {
            outputDiv.textContent = JSON.stringify(data.posts[0], null, 2);
        })
        .catch(error => {
            outputDiv.textContent = `Error: ${error.message}`;
        });
}

// Async/Await Implementation with timeout and error handling
async function fetchPostAsync() {
    const outputDiv = document.getElementById('output-async');
    outputDiv.textContent = 'Loading...';

    try {
        const fetchPromise = fetch('https://dummyjson.com/posts');

        // Timeout Promise that rejects after 5 seconds
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Operation timed out')), 5000);
        });

        // Race between the fetch and the timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]);

        const data = await response.json();
        outputDiv.textContent = JSON.stringify(data.posts[0], null, 2);
    } catch (error) {
        outputDiv.textContent = `Error: ${error.message}`;
    }
}
