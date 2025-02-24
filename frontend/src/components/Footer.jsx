import  packageJson from '../../package.json'

const Footer = () => {
  const footerStyle = {
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <footer>
        <br />
        <em>Bloglist app( version: { packageJson.version } ), CI/CD module of the Full Stack open, course 2024-2025</em>
      </footer>
    </div>
  )
}

export default Footer
