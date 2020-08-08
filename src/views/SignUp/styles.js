import styled from 'styled-components/native';

export const Container = styled.SafeAreaView({
  flex: 1,
  alignItems: 'center',
  marginTop: 30,
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
