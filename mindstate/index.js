/*
    Tokin Systems

    1. Client.js sends request to mind.js and/or memory.js
    2. Mind.js recognizes protocol, validates authentication, awaits data from memory.js.. if any, forwards deliverable to output.js for inspection.
        a. Memory.js returns data to mind.js or directly to output.js
    3. Output.js validates and verifies deliverable. Sends deliverable to client.js
*/

/* 
    ALL messages follow the following structure 
    var content = [1, 2, 3]
    devmsg = [
        {
            length: content.length, // always generated just before hashing
            permission: 'public', // general, private, or algorithmic
            function: 'add', // API call or { init: x => return x } method,
            models: {}, // map/reduce or crypto functions,
            tags: ['test:master object', 'nodejs:tokin systems'],
            uuid: '', // hash added after length of content,
            type: 'process' // running the function 'add' in a process
        },
        ...content
        ]
*/
