const shitlogEnabled = false

try {
  global.shitLog = x =>
    // If (shitlogEnabled) console.log(x)
    x
} catch (e) {
  window.shitLog = x =>
    // If (shitlogEnabled) console.log(x)
    x
}

const Layout = ({ children }) => (
  <div>
    <head>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tingle/0.13.2/tingle.min.css"
      />
      <link rel="stylesheet" href="/static/css.css" />
    </head>

    <div>{children}</div>
  </div>
)
export default Layout
