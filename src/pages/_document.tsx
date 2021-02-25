import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body
          data-analytics={
            process.env.ANALYTICS_ENABLED === 'true' &&
            `{
            "title":"${process.env.ANALYTICS_NAME}",
            "handle":"${process.env.ANALYTICS_HANDLE}",
            "createDate":${process.env.ANALYTICS_CREATE_DATE},
            "doctype":20,
            "ATIxtsite":549286,
            "ATIxtn2":"25",
            "IVWcp":"infoportal_rbb"
          }`
          }
        >
          <Main />
          <NextScript />
          {process.env.ANALYTICS_ENABLED === 'true' && (
            <>
              <script src='https://www.rbb-online.de/basis/js/jquery-2.2.4.min.js'></script>
              <script src='https://www.rbb-online.de/basis/js/underscore-1.8.2.js'></script>
              <script src='https://www.rbb-online.de/basis/js/underscore.string-3.0.3.js'></script>
              <script src='https://www.rbb-online.de/basis/js/analytics.js'></script>
              <script src='https://www.rbb-online.de/basis/js/xtcore.js'></script>
            </>
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
