

export default function layout({title, description, data}){

    return `   
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="${description}">
            <link rel="stylesheet" href="/main.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
            <title>${title}</title>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const __data = ${JSON.stringify(data)}
            </script>
            <script src="/main.js" type="module"></script>
        </body>
        </html>
    `
}

