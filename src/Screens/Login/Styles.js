import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    paddingTop: 80,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputIcon: {
    paddingRight: 10,
  },
  inputText: {
    width: '100%',
    height: 50,
  },
  btnEnabled: {
    width: '95%',
    backgroundColor: '#00AAAB',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  btnDisabled: {
    width: '95%',
    backgroundColor: '#3CDECE',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#00AAAB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorView: {
    alignSelf: 'flex-start',
    paddingLeft: 50,
  },
  imageLogo: {
    width: 180,
    height: 180,
  },
});
