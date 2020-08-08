import styled from 'styled-components/native';

export const Container = styled.SafeAreaView({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F5F5F5',
});

export const Header = styled.View({
  width: '100%',
  height: '7%',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
});

export const FormView = styled.View({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Input = styled.TextInput({
  paddingHorizontal: '20px',
  paddingVertical: '15px',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
  alignSelf: 'stretch',
  marginBottom: '15px',
  marginHorizontal: '20px',
  fontSize: '16px',
});
