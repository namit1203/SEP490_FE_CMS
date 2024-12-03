const getStyles = (token: any, screens: any) => ({
  container: {
    margin: '0 auto',
    padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
    width: '380px'
  },
  footer: {
    marginTop: token.marginLG,
    textAlign: 'center',
    width: '100%'
  },
  forgotPassword: {
    float: 'right'
  },
  header: {
    marginBottom: token.marginXL
  },
  section: {
    alignItems: 'center',
    backgroundColor: token.colorBgContainer,
    display: 'flex',
    height: screens.sm ? '100vh' : 'auto',
    padding: screens.md ? `${token.sizeXXL}px 0px` : '0px'
  },
  text: {
    color: token.colorTextSecondary
  },
  title: {
    fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
  },
  card: {
    width: '100%',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
  }
})

export default getStyles
