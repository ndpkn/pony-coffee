import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {

    return (
        <Html lang='ru'>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true}/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800&display=swap" rel="stylesheet"/>
                {/* <script src="https://js.pusher.com/8.0.1/pusher.min.js" async/> */}
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}