import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

const red = '#ed1b23ff';

export const Container = styled.SafeAreaView({
  flex: 1,
  marginTop: 20,
  backgroundColor: '#F5F5F5',
});

export const Header = styled.View({
  width: '100%',
  height: '7%',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
});

export const FormView = styled.View({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Input = styled.TextInput({
  paddingHorizontal: '20px',
  paddingVertical: '10px',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
  alignSelf: 'stretch',
  marginBottom: '15px',
  marginHorizontal: '20px',
  fontSize: '16px',
});

export const ButtonElements = styled(Button).attrs((props) => ({
  buttonStyle: {
    width: props.width ? props.width : 120,
    alignSelf: 'center',
    backgroundColor: props.backgroundColor ? props.backgroundColor : red,
  },
  loadingProps: { color: 'white' },
}))({});
